import 'dotenv/config';

const arg = (name: string): string | undefined => {
  const index = process.argv.indexOf(`--${name}`);
  return index > -1 ? process.argv[index + 1] : undefined;
};

const lookupOrder = async (code: string) => {
  try {
    const { PrismaClient } = await import('@prisma/client');
    const prisma = new PrismaClient();
    try {
      return await prisma.order.findUnique({
        where: { code },
        select: { code: true, total: true, status: true, paidAt: true },
      });
    } finally {
      await prisma.$disconnect();
    }
  } catch {
    return null;
  }
};

const main = async () => {
  const orderCode = process.argv[2];
  if (!orderCode || orderCode.startsWith('--')) {
    console.error('Thiếu mã đơn.\n  npm run sepay:simulate -- DH...');
    process.exit(1);
  }

  const apiKey = arg('key') ?? process.env.SEPAY_WEBHOOK_API_KEY;
  if (!apiKey) {
    console.error('Thiếu khoá webhook. Đặt SEPAY_WEBHOOK_API_KEY trong .env hoặc truyền --key.');
    process.exit(1);
  }

  const baseUrl = (arg('url') ?? `http://localhost:${process.env.PORT ?? 5000}`).replace(/\/+$/, '');
  const order = await lookupOrder(orderCode);
  const amountArg = arg('amount');

  if (!order && !amountArg) {
    console.error(
      `Không đọc được đơn ${orderCode} từ database này.\n` +
        'Nếu đang bắn lên bản deploy thì truyền thêm --amount <số tiền>.',
    );
    process.exit(1);
  }

  const amount = Number(amountArg ?? order!.total);

  if (order) {
    console.log(
      `Đơn ${order.code}: cần ${Number(order.total).toLocaleString('vi-VN')}đ, ` +
        `trạng thái ${order.status}, ${order.paidAt ? 'đã thanh toán' : 'chưa thanh toán'}`,
    );
  } else {
    console.log(`Đơn ${orderCode}: không tra được ở database này, dùng số tiền bạn truyền vào.`);
  }

  const payload = {
    id: Math.floor(Date.now() / 1000),
    gateway: 'MBBank',
    transactionDate: new Date().toISOString().slice(0, 19).replace('T', ' '),
    accountNumber: process.env.SEPAY_BANK_ACCOUNT ?? '0123456789',
    subAccount: null,
    code: orderCode,
    content: `CHUYEN TIEN ${orderCode} GD ${Math.floor(Math.random() * 900000 + 100000)}`,
    transferType: 'in',
    description: 'Giao dich gia lap tu script',
    transferAmount: amount,
    accumulated: 0,
    referenceCode: `FT${Date.now()}`,
  };

  console.log(`Gửi ${amount.toLocaleString('vi-VN')}đ tới ${baseUrl}/api/payments/sepay/webhook`);

  const response = await fetch(`${baseUrl}/api/payments/sepay/webhook`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Apikey ${apiKey}` },
    body: JSON.stringify(payload),
  });

  const body = await response.text();
  console.log(`-> HTTP ${response.status} ${body}`);

  if (response.status === 401) {
    console.error('Khoá webhook không khớp với khoá đang đặt ở máy chủ đó.');
    process.exit(1);
  }

  const after = await lookupOrder(orderCode);
  if (after) {
    console.log(
      `Sau webhook: trạng thái ${after.status}, ` +
        (after.paidAt
          ? `đã thanh toán lúc ${after.paidAt.toLocaleString('vi-VN')}`
          : 'CHƯA thanh toán'),
    );
  } else {
    console.log('Mở lại trang đơn hàng để xem trạng thái.');
  }
};

main().catch((error) => {
  console.error('Lỗi:', error);
  process.exit(1);
});
