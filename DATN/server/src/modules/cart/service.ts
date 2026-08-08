import { shippingFeeFor } from '../../config/business';
import { prisma } from '../../config/prisma';
import { conflict, notFoundError } from '../../utils/AppError';
import type { AddItemInput } from './schema';

const itemSelect = {
  id: true,
  quantity: true,
  product: {
    select: {
      id: true,
      name: true,
      slug: true,
      image: true,
      price: true,
      salePrice: true,
      effectivePrice: true,
      quantity: true,
      status: true,
    },
  },
} as const;

/**
 * Giỏ hàng được tạo lười: chỉ sinh row khi người dùng thực sự cần tới nó.
 * upsert thay vì find-rồi-create để không có khoảng trống race condition.
 */
const getOrCreateCart = (userId: number) =>
  prisma.cart.upsert({
    where: { userId },
    create: { userId },
    update: {},
    select: { id: true },
  });

export const getCart = async (userId: number) => {
  const cart = await getOrCreateCart(userId);

  const items = await prisma.cartItem.findMany({
    where: { cartId: cart.id },
    select: itemSelect,
    orderBy: { id: 'asc' },
  });

  const lines = items.map((item) => {
    const unitPrice = Number(item.product.effectivePrice);
    return {
      ...item,
      unitPrice,
      lineTotal: unitPrice * item.quantity,
      /** Sản phẩm bị ẩn hoặc hết hàng sau khi đã cho vào giỏ. */
      unavailable: !item.product.status || item.product.quantity < item.quantity,
    };
  });

  const subtotal = lines.reduce((sum, line) => sum + line.lineTotal, 0);
  const shippingFee = shippingFeeFor(subtotal);

  return {
    id: cart.id,
    items: lines,
    totalQuantity: lines.reduce((sum, line) => sum + line.quantity, 0),
    subtotal,
    shippingFee,
    total: subtotal + shippingFee,
    hasUnavailable: lines.some((line) => line.unavailable),
  };
};

export const addItem = async (userId: number, input: AddItemInput) => {
  const product = await prisma.product.findUnique({
    where: { id: input.productId },
    select: { id: true, name: true, quantity: true, status: true },
  });
  if (!product || !product.status) {
    throw notFoundError('Sản phẩm không tồn tại hoặc đã ngừng bán');
  }

  const cart = await getOrCreateCart(userId);
  const existing = await prisma.cartItem.findUnique({
    where: { cartId_productId: { cartId: cart.id, productId: product.id } },
    select: { id: true, quantity: true },
  });

  // Cộng dồn với số đã có trong giỏ rồi mới so với tồn kho, chứ không chỉ so
  // riêng lượng vừa thêm.
  const nextQuantity = (existing?.quantity ?? 0) + input.quantity;
  if (nextQuantity > product.quantity) {
    throw conflict(
      product.quantity === 0
        ? `Sản phẩm "${product.name}" đã hết hàng`
        : `Sản phẩm "${product.name}" chỉ còn ${product.quantity} trong kho`,
    );
  }

  await prisma.cartItem.upsert({
    where: { cartId_productId: { cartId: cart.id, productId: product.id } },
    create: { cartId: cart.id, productId: product.id, quantity: input.quantity },
    update: { quantity: nextQuantity },
  });

  return getCart(userId);
};

/** Chỉ cho phép sửa item nằm trong giỏ của chính người gọi. */
const findOwnItem = async (userId: number, itemId: number) => {
  const item = await prisma.cartItem.findFirst({
    where: { id: itemId, cart: { userId } },
    select: { id: true, product: { select: { name: true, quantity: true } } },
  });
  if (!item) throw notFoundError('Không tìm thấy sản phẩm này trong giỏ hàng');
  return item;
};

export const updateItem = async (userId: number, itemId: number, quantity: number) => {
  const item = await findOwnItem(userId, itemId);

  if (quantity > item.product.quantity) {
    throw conflict(`Sản phẩm "${item.product.name}" chỉ còn ${item.product.quantity} trong kho`);
  }

  await prisma.cartItem.update({ where: { id: item.id }, data: { quantity } });
  return getCart(userId);
};

export const removeItem = async (userId: number, itemId: number) => {
  const item = await findOwnItem(userId, itemId);
  await prisma.cartItem.delete({ where: { id: item.id } });
  return getCart(userId);
};

export const clear = async (userId: number) => {
  const cart = await getOrCreateCart(userId);
  await prisma.cartItem.deleteMany({ where: { cartId: cart.id } });
  return getCart(userId);
};
