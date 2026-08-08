/**
 * Seed dữ liệu mẫu nội thất. Chạy được nhiều lần — mỗi lần xoá sạch rồi tạo lại.
 *
 * Chạy: npm run db:seed   (cần `npm run placeholders` trước để có ảnh)
 */
import { OrderStatus, PaymentMethod, PrismaClient, Role } from '@prisma/client';
import bcrypt from 'bcryptjs';

import { SETTING_DEFS } from '../src/modules/settings/keys';
import { buildUploadPath } from '../src/storage/types';
import { slugify } from '../src/utils/slugify';
import { BANNERS } from './data/banners';
import { CATEGORIES } from './data/categories';
import { PRODUCT_IMAGE_COUNT, SEED_IMAGE_DIR, logoImageFile } from './data/imageNames';
import { NEWS } from './data/news';
import { photoUrl } from './data/photos';
import { PRODUCTS } from './data/products';

const prisma = new PrismaClient();

/**
 * Đường dẫn tương đối, không kèm origin. Nhờ vậy cùng một bộ dữ liệu seed chạy
 * được ở localhost và trên hosting mà không phải seed lại.
 */
const seedUrl = (fileName: string) => buildUploadPath(`${SEED_IMAGE_DIR}/${fileName}`);

/**
 * PRNG có seed cố định thay cho Math.random: chạy seed hai lần cho ra cùng một
 * bộ đơn hàng, nên số liệu dashboard không nhảy mỗi lần reset DB.
 */
let randomState = 20260807;
const random = (): number => {
  randomState = (randomState * 1103515245 + 12345) % 2147483648;
  return randomState / 2147483648;
};
const pick = <T>(items: T[]): T => items[Math.floor(random() * items.length)]!;
const between = (min: number, max: number): number =>
  min + Math.floor(random() * (max - min + 1));

const clean = async () => {
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.cartItem.deleteMany();
  await prisma.cart.deleteMany();
  await prisma.productImage.deleteMany();
  await prisma.product.deleteMany();
  await prisma.news.deleteMany();
  await prisma.banner.deleteMany();
  await prisma.setting.deleteMany();
  // Danh mục con trước, cha sau — self-relation dùng NoAction nên xoá sai thứ
  // tự sẽ vướng khoá ngoại.
  await prisma.category.deleteMany({ where: { parentId: { not: null } } });
  await prisma.category.deleteMany();
  await prisma.user.deleteMany();
};

const seedUsers = async () => {
  const password = await bcrypt.hash('123456', 10);

  const staff = await Promise.all([
    prisma.user.create({
      data: {
        name: 'Nguyễn Quản Trị',
        email: 'superadmin@noithat.vn',
        password,
        role: Role.SUPERADMIN,
        phone: '0901000001',
        address: '128 Nguyễn Văn Trỗi, Phú Nhuận, TP.HCM',
      },
    }),
    prisma.user.create({
      data: {
        name: 'Trần Quản Lý',
        email: 'admin@noithat.vn',
        password,
        role: Role.ADMIN,
        phone: '0901000002',
        address: '45 Lê Văn Sỹ, Quận 3, TP.HCM',
      },
    }),
    prisma.user.create({
      data: {
        name: 'Lê Biên Tập',
        email: 'editor@noithat.vn',
        password,
        role: Role.EDITOR,
        phone: '0901000003',
        address: '12 Hoàng Hoa Thám, Bình Thạnh, TP.HCM',
      },
    }),
  ]);

  const customers = await Promise.all(
    [
      { name: 'Phạm Khách Hàng', email: 'user@noithat.vn', phone: '0912000001', address: '77 Trần Hưng Đạo, Quận 1, TP.HCM' },
      { name: 'Võ Thị Mai', email: 'mai.vo@gmail.com', phone: '0912000002', address: '210 Cách Mạng Tháng 8, Quận 10, TP.HCM' },
      { name: 'Đỗ Minh Khang', email: 'khang.do@gmail.com', phone: '0912000003', address: '58 Nguyễn Thị Minh Khai, Quận 1, TP.HCM' },
      { name: 'Bùi Thanh Hà', email: 'ha.bui@gmail.com', phone: '0912000004', address: '9 Phan Xích Long, Phú Nhuận, TP.HCM' },
    ].map((customer) =>
      prisma.user.create({ data: { ...customer, password, role: Role.USER } }),
    ),
  );

  return { superadmin: staff[0]!, admin: staff[1]!, editor: staff[2]!, customers };
};

const seedCategories = async () => {
  /** Tên danh mục con -> id, để phần seed sản phẩm tra ra khoá ngoại. */
  const subCategoryIds = new Map<string, number>();
  let parentOrder = 0;

  for (const category of CATEGORIES) {
    parentOrder += 1;
    const parent = await prisma.category.create({
      data: {
        name: category.name,
        slug: slugify(category.name),
        description: category.description,
        image: photoUrl(category.icon, category.name, 600, 600),
        sortOrder: parentOrder,
      },
    });

    let childOrder = 0;
    for (const child of category.children) {
      childOrder += 1;
      const created = await prisma.category.create({
        data: {
          parentId: parent.id,
          name: child.name,
          slug: slugify(child.name),
          description: child.description,
          image: photoUrl(child.icon, child.name, 600, 600),
          sortOrder: childOrder,
        },
      });
      subCategoryIds.set(child.name, created.id);
    }
  }

  return subCategoryIds;
};

const seedProducts = async (subCategoryIds: Map<string, number>) => {
  const createdIds: { id: number; name: string; image: string; price: number }[] = [];

  for (const product of PRODUCTS) {
    const categoryId = subCategoryIds.get(product.category);
    if (!categoryId) {
      throw new Error(
        `Sản phẩm "${product.name}" trỏ tới danh mục con "${product.category}" không tồn tại trong categories.ts`,
      );
    }

    // Mỗi ảnh gallery khoá vào một tấm khác nhau bằng cách đổi seed.
    const image = photoUrl(product.icon, product.name);

    const created = await prisma.product.create({
      data: {
        categoryId,
        name: product.name,
        slug: slugify(product.name),
        image,
        price: product.price,
        salePrice: product.salePrice ?? null,
        effectivePrice: product.salePrice ?? product.price,
        quantity: product.quantity,
        shortDescription: product.shortDescription,
        description: product.description,
        isNew: product.isNew ?? false,
        isSale: product.isSale ?? false,
        isBest: product.isBest ?? false,
        viewCount: between(20, 900),
        images: {
          create: Array.from({ length: PRODUCT_IMAGE_COUNT }, (_, index) => ({
            // Ảnh đầu trùng ảnh đại diện, hai ảnh sau đổi seed để ra tấm khác.
            url:
              index === 0
                ? image
                : photoUrl(product.icon, `${product.name}#${index}`),
            sortOrder: index,
          })),
        },
      },
    });

    createdIds.push({
      id: created.id,
      name: created.name,
      image,
      price: product.salePrice ?? product.price,
    });
  }

  return createdIds;
};

const seedBanners = async () => {
  for (const banner of BANNERS) {
    await prisma.banner.create({
      data: {
        title: banner.title,
        // Banner khổ ngang 8:3
        image: photoUrl(banner.icon, banner.title, 1600, 600),
        link: banner.link,
        sortOrder: banner.sortOrder,
      },
    });
  }
};

const seedNews = async (authorId: number) => {
  const now = Date.now();

  for (const article of NEWS) {
    const publishedAt = new Date(now - article.daysAgo * 24 * 60 * 60 * 1000);
    await prisma.news.create({
      data: {
        title: article.title,
        slug: slugify(article.title),
        image: photoUrl(article.icon, article.title, 800, 500),
        summary: article.summary,
        content: article.content,
        publishedAt,
        createdAt: publishedAt,
        authorId,
      },
    });
  }
};

const seedSettings = async () => {
  for (const setting of SETTING_DEFS) {
    let value = setting.value;
    // Logo giữ SVG tự sinh: logo là đồ hoạ, không phải ảnh chụp.
    if (setting.key === 'logo') value = seedUrl(logoImageFile());
    if (setting.key === 'homeBanner' && BANNERS[0]) {
      value = photoUrl(BANNERS[0].icon, BANNERS[0].title, 1600, 600);
    }

    await prisma.setting.create({
      data: { key: setting.key, value, type: setting.type },
    });
  }
};

/**
 * Đơn hàng mẫu rải trong 12 tháng gần nhất.
 *
 * Có chủ đích: Dashboard của đề bài yêu cầu "Tổng đơn hàng" và "Biểu đồ thống
 * kê". Nếu không seed đơn thì mọi biểu đồ đều rỗng, nhìn như tính năng bị lỗi.
 * Phần lớn đơn ở trạng thái COMPLETED để biểu đồ doanh thu có đường cong thật.
 */
const seedOrders = async (
  customers: { id: number; name: string; phone: string | null; email: string; address: string | null }[],
  products: { id: number; name: string; image: string; price: number }[],
) => {
  const RECENT_STATUSES = [
    OrderStatus.PENDING,
    OrderStatus.CONFIRMED,
    OrderStatus.SHIPPING,
    OrderStatus.COMPLETED,
  ];

  let sequence = 0;
  const today = new Date();

  for (let monthsAgo = 11; monthsAgo >= 0; monthsAgo -= 1) {
    const ordersThisMonth = between(2, 4);

    for (let n = 0; n < ordersThisMonth; n += 1) {
      sequence += 1;

      // Tháng hiện tại chỉ được rải tới hôm nay, không thì sinh ra đơn có ngày
      // đặt trong tương lai — nhìn là biết dữ liệu giả.
      const lastDay = monthsAgo === 0 ? Math.max(1, today.getDate()) : 27;

      const createdAt = new Date(
        today.getFullYear(),
        today.getMonth() - monthsAgo,
        between(1, lastDay),
        between(8, 20),
        between(0, 59),
      );

      // Đơn cũ coi như đã xong; đơn trong 2 tháng gần nhất mới còn đang chạy.
      let status: OrderStatus;
      if (monthsAgo >= 2) {
        status = random() < 0.12 ? OrderStatus.CANCELLED : OrderStatus.COMPLETED;
      } else {
        status = pick(RECENT_STATUSES);
      }

      const itemCount = between(1, 3);
      const chosen = new Map<number, { name: string; image: string; price: number; quantity: number }>();

      while (chosen.size < itemCount) {
        const product = pick(products);
        if (chosen.has(product.id)) continue;
        chosen.set(product.id, {
          name: product.name,
          image: product.image,
          price: product.price,
          quantity: between(1, 2),
        });
      }

      const items = [...chosen.entries()].map(([productId, item]) => ({
        productId,
        productName: item.name,
        productImage: item.image,
        price: item.price,
        quantity: item.quantity,
        subtotal: item.price * item.quantity,
      }));

      const subtotal = items.reduce((sum, item) => sum + item.subtotal, 0);
      const shippingFee = subtotal >= 5_000_000 ? 0 : 300_000;
      const customer = pick(customers);

      await prisma.order.create({
        data: {
          code: `DH${createdAt.getFullYear()}${String(createdAt.getMonth() + 1).padStart(2, '0')}${String(sequence).padStart(3, '0')}`,
          userId: customer.id,
          customerName: customer.name,
          customerPhone: customer.phone ?? '0900000000',
          customerEmail: customer.email,
          shippingAddress: customer.address ?? 'TP.HCM',
          note: random() < 0.3 ? 'Giao giờ hành chính, gọi trước 15 phút.' : null,
          subtotal,
          shippingFee,
          total: subtotal + shippingFee,
          status,
          paymentMethod: random() < 0.7 ? PaymentMethod.COD : PaymentMethod.BANK_TRANSFER,
          createdAt,
          updatedAt: createdAt,
          items: { create: items },
        },
      });
    }
  }

  return sequence;
};

const main = async () => {
  console.log('Xoá dữ liệu cũ...');
  await clean();

  console.log('Tạo người dùng...');
  const { editor, customers } = await seedUsers();

  console.log('Tạo danh mục...');
  const subCategoryIds = await seedCategories();

  console.log('Tạo sản phẩm...');
  const products = await seedProducts(subCategoryIds);

  console.log('Tạo banner, tin tức, cấu hình...');
  await seedBanners();
  await seedNews(editor.id);
  await seedSettings();

  console.log('Tạo đơn hàng mẫu...');
  const orderCount = await seedOrders(customers, products);

  const [categories, subCategories] = await Promise.all([
    prisma.category.count({ where: { parentId: null } }),
    prisma.category.count({ where: { parentId: { not: null } } }),
  ]);

  console.log(`
Seed xong:
  - ${categories} danh mục cha, ${subCategories} danh mục con
  - ${products.length} sản phẩm (mỗi sản phẩm ${PRODUCT_IMAGE_COUNT} ảnh)
  - ${BANNERS.length} banner, ${NEWS.length} bài viết, ${SETTING_DEFS.length} cấu hình
  - ${orderCount} đơn hàng rải trong 12 tháng
  - 7 tài khoản, mật khẩu chung: 123456
      superadmin@noithat.vn | admin@noithat.vn | editor@noithat.vn | user@noithat.vn
`);
};

main()
  .catch((error) => {
    console.error('Seed thất bại:', error);
    process.exit(1);
  })
  .finally(() => void prisma.$disconnect());
