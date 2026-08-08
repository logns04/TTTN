# Thiết kế: Website Thương mại Điện tử Nội thất

**Ngày:** 2026-08-07
**Trạng thái:** Đã chốt
**Nguồn yêu cầu:** `WEB FULLSTACK.docx` (đề bài đồ án)

---

## 1. Mục tiêu

Xây dựng website bán nội thất fullstack gồm hai khu vực tách biệt: **Client** (khách hàng) và **Admin** (quản trị), đáp ứng đầy đủ checklist mục 7 của đề bài.

Đề bài có một số lỗ hổng và mâu thuẫn nội tại. Spec này giải quyết chúng ở mục 3.

## 2. Stack

| Tầng | Công nghệ |
|---|---|
| Frontend | React 19, Vite, TypeScript, React Router DOM, Redux Toolkit, Axios, TailwindCSS 4, shadcn/ui, react-hook-form + Zod, Recharts, TipTap |
| Backend | Node 22, Express 5, TypeScript, Prisma, MySQL 8, JWT, bcrypt, Multer, Zod |
| Dev DB | MySQL 8 qua Docker Compose (port 3307) |
| Ảnh | Local disk `/uploads` hôm nay → Cloudinary sau, qua tầng abstraction |

Đề bài cho phép "Sequelize **hoặc** Prisma" → chọn Prisma. Cho phép "Redux Toolkit **hoặc** Context API" → chọn Redux Toolkit.

## 3. Giải quyết lỗ hổng và mâu thuẫn của đề bài

| # | Vấn đề trong đề bài | Quyết định |
|---|---|---|
| 1 | Mục 4 đòi Dashboard hiển thị "Tổng đơn hàng" và mục 7 đòi "Biểu đồ thống kê", nhưng **không có bảng `orders`, không có checkout, không có mục quản lý đơn hàng** | Bổ sung `orders` + `order_items`, trang checkout, trang "Đơn hàng của tôi", màn admin quản lý đơn + đổi trạng thái |
| 2 | Mục 4 nói role = `Admin/User`, mục 7 nói `SuperAdmin/Admin/Editor` | Dùng 4 role: `SUPERADMIN`, `ADMIN`, `EDITOR`, `USER`. Ma trận quyền ở mục 6 |
| 3 | Mục 7 đòi "Upload 1 hoặc nhiều ảnh" nhưng `products` chỉ có 1 cột `image` | Giữ `products.image` làm ảnh đại diện, thêm bảng `product_images` cho gallery |
| 4 | Mục 4 có màn "Quản lý giao diện" (logo, màu, ẩn/hiện mục) nhưng mục 5 không có bảng lưu | Thêm bảng `settings` dạng key–value |
| 5 | Mục 4 ghi Danh mục có "Trạng thái", Banner có "Trạng thái", Tin tức có "Ngày đăng" — mục 5 thiếu các cột này | Thêm `categories.status`, `banners.status`, `news.publishedAt` |
| 6 | `categories` không có `parentId` — nội thất cần phân theo phòng rồi tới loại đồ | Danh mục **2 cấp** (cha → con) |
| 7 | Mục 7 đòi "Dark/Light Mode", mục 4 đòi admin "thay đổi màu giao diện" — hai cơ chế đè nhau | Dark/Light là toggle của người dùng (localStorage). Admin chỉ chọn **màu nhấn** (primary), lưu `settings`, inject CSS variable, áp cho cả hai theme |
| 8 | `carts.user_id` nhưng không nói giỏ hàng của khách chưa đăng nhập | **Bắt buộc đăng nhập mới thêm vào giỏ.** Giỏ hàng chỉ tồn tại trong DB, không có localStorage cart, không có merge |
| 9 | Mục 7 nói "Biểu đồ thống kê" nhưng không nói biểu đồ gì | 4 card tổng + 4 biểu đồ: doanh thu 12 tháng (area), đơn theo trạng thái (donut), top 5 sản phẩm bán chạy (bar), sản phẩm theo danh mục (bar) |
| 10 | Không bảng nào có `created_at`/`updated_at`, không có `slug` | Thêm timestamps cho mọi bảng nội dung; thêm `slug` cho `products`, `categories`, `news` |
| 11 | `users` thiếu `phone`/`address` nhưng đặt hàng cần | Thêm `phone`, `address`, `avatar`, `isActive` |
| 12 | Mục 7 đòi deploy Render, nhưng **Render không có MySQL managed** (chỉ PostgreSQL) | Render host Frontend (Static Site) + Backend (Web Service); MySQL dùng provider free bên ngoài, chốt cụ thể ở bước deploy |

## 4. Kiến trúc

Monorepo một thư mục, hai project độc lập — tách rõ Client/Backend như đề bài yêu cầu nhưng dev và commit ở một chỗ. Deploy Render thành hai service riêng.

```
website-interior/
├── client/                  React + Vite
├── server/                  Express + Prisma
├── docker-compose.yml       MySQL 8 dev
└── docs/
```

### 4.1 Server

Chia theo module. Mỗi module tự chứa, có ranh giới rõ, đọc hiểu và sửa được độc lập.

```
server/
├── prisma/
│   ├── schema.prisma
│   ├── migrations/
│   └── seed.ts
└── src/
    ├── config/
    │   ├── env.ts            đọc + validate biến môi trường bằng Zod, fail-fast
    │   └── prisma.ts         PrismaClient singleton
    ├── storage/
    │   ├── index.ts          interface StorageProvider { save(), remove() }
    │   ├── local.ts          ghi vào server/public/uploads  ← đang dùng
    │   └── cloudinary.ts     ← thêm sau, đổi 1 dòng ở index.ts
    ├── middleware/
    │   ├── auth.ts           requireAuth, requireRole(...roles)
    │   ├── upload.ts         Multer memoryStorage + lọc mime + giới hạn 5MB
    │   ├── validate.ts       validate(schema) cho body/query/params
    │   └── error.ts          notFound + errorHandler toàn cục
    ├── modules/
    │   ├── auth/             { routes, controller, service, schema }
    │   ├── products/
    │   ├── categories/
    │   ├── banners/
    │   ├── news/
    │   ├── users/
    │   ├── cart/
    │   ├── orders/
    │   ├── settings/
    │   ├── dashboard/
    │   └── upload/
    ├── utils/
    │   ├── AppError.ts
    │   ├── slugify.ts        bỏ dấu tiếng Việt
    │   ├── pagination.ts
    │   └── apiResponse.ts
    ├── app.ts                khởi tạo Express, cors, static /uploads, mount routes
    └── server.ts             listen
```

**Quy ước tách lớp:** `routes` chỉ khai báo đường dẫn + middleware; `controller` chỉ đọc request và trả response; `service` chứa toàn bộ logic nghiệp vụ và là nơi duy nhất gọi Prisma. Controller không được gọi Prisma trực tiếp — giữ được ranh giới này thì service test được độc lập và logic không rò rỉ vào tầng HTTP.

### 4.2 Client

```
client/src/
├── store/
│   ├── index.ts
│   └── slices/           authSlice, cartSlice, themeSlice, settingsSlice
├── services/
│   ├── axios.ts          baseURL + interceptor gắn Bearer token, bắt 401
│   └── *.api.ts          productApi, categoryApi, orderApi, ...
├── components/
│   ├── ui/               shadcn/ui
│   └── common/           ProductCard, Pagination, PriceFilter, ImageUploader, RichTextEditor, DataTable, ConfirmDialog
├── layouts/              ClientLayout (Header/Footer), AdminLayout (Sidebar/Topbar)
├── pages/
│   ├── client/           Home, Products, ProductDetail, Cart, Checkout, MyOrders, News, NewsDetail, Login, Register
│   └── admin/            Dashboard, Products, Categories, Banners, News, Users, Orders, Appearance
├── routes/               router.tsx, ProtectedRoute, RoleRoute
├── hooks/                useAppDispatch, useAppSelector, useDebounce
└── lib/                  utils.ts, formatCurrency.ts, constants.ts
```

## 5. Cơ sở dữ liệu — 11 bảng

Giữ nguyên tên bảng và tên cột mà đề bài đã ghi ở mục 5; các cột thêm được đánh dấu **(+)**.

### users
`id`, `name`, `email` 🔒, `password`, `role` ⟨SUPERADMIN|ADMIN|EDITOR|USER⟩, **(+)** `phone`, `address`, `avatar`, `isActive`, `createdAt`, `updatedAt`

### categories
`id`, `name`, `description`, **(+)** `parentId` → categories.id, `slug` 🔒, `image`, `status`, `sortOrder`, `createdAt`, `updatedAt`

Chỉ hỗ trợ 2 cấp. Không cho phép cha có cha.

### products
`id`, `categoryId`, `name`, `image`, `price`, `salePrice`, `quantity`, `description`, `isNew`, `isSale`, `isBest`, **(+)** `slug` 🔒, `shortDescription`, `status`, `viewCount`, `createdAt`, `updatedAt`

`price`/`salePrice` dùng `Decimal(12,2)` — không dùng float cho tiền.

### product_images **(+ bảng mới)**
`id`, `productId` → products.id (cascade), `url`, `sortOrder`

### banners
`id`, `title`, `image`, `link`, **(+)** `status`, `sortOrder`, `createdAt`, `updatedAt`

### news
`id`, `title`, `image`, `content`, **(+)** `slug` 🔒, `summary`, `publishedAt`, `authorId` → users.id, `status`, `createdAt`, `updatedAt`

### carts
`id`, `userId` 🔒 → users.id, **(+)** `createdAt`, `updatedAt`

### cart_items
`id`, `cartId` → carts.id (cascade), `productId` → products.id, `quantity`, **(+)** unique(`cartId`, `productId`)

### orders **(+ bảng mới)**
`id`, `code` 🔒, `userId` → users.id, `customerName`, `customerPhone`, `customerEmail`, `shippingAddress`, `note`, `subtotal`, `shippingFee`, `total`, `status` ⟨PENDING|CONFIRMED|SHIPPING|COMPLETED|CANCELLED⟩, `paymentMethod` ⟨COD|BANK_TRANSFER⟩, `createdAt`, `updatedAt`

### order_items **(+ bảng mới)**
`id`, `orderId` → orders.id (cascade), `productId` → products.id (nullable, set null khi xóa SP), `productName`, `productImage`, `price`, `quantity`, `subtotal`

**Snapshot có chủ ý:** `productName`, `productImage`, `price` được copy vào lúc đặt hàng. Admin sửa giá hoặc xóa sản phẩm về sau không làm sai lệch đơn hàng cũ. Đây là yêu cầu đúng đắn của mọi hệ thống đơn hàng, không phải tối ưu sớm.

### settings **(+ bảng mới)**
`id`, `key` 🔒, `value`, `type` ⟨TEXT|IMAGE|COLOR|BOOLEAN⟩

Khóa dùng: `siteName`, `logo`, `primaryColor`, `hotline`, `email`, `address`, `homeBanner`, `showNewProducts`, `showBestProducts`, `showSaleProducts`, `showNews`.

## 6. Phân quyền

| Chức năng | SUPERADMIN | ADMIN | EDITOR | USER |
|---|---|---|---|---|
| Sản phẩm, Danh mục | CRUD | CRUD | chỉ xem | — |
| Tin tức, Banner | CRUD | CRUD | tạo/sửa, **không xóa** | — |
| Đơn hàng | CRUD | xem + đổi trạng thái | — | — |
| Người dùng | CRUD | chỉ xem | — | — |
| Quản lý giao diện | có | — | — | — |
| Dashboard | có | có | chỉ xem | — |
| Mua hàng phía client | — | — | — | có |

Không cho phép tự đổi role của chính mình. Không cho phép xóa user SUPERADMIN cuối cùng.

## 7. API

Prefix `/api`. Response chuẩn hoá:

```json
{ "success": true, "data": {}, "message": "", "meta": { "page": 1, "limit": 12, "total": 40, "totalPages": 4 } }
```

```
POST   /api/auth/register
POST   /api/auth/login
GET    /api/auth/me                        auth
POST   /api/auth/logout                    auth

GET    /api/products                       ?page&limit&search&category&minPrice&maxPrice
                                           &sort=price_asc|price_desc|name_asc|name_desc|newest
                                           &isNew&isSale&isBest
GET    /api/products/:slug
GET    /api/products/:id/related
POST   /api/products                       ADMIN+
PUT    /api/products/:id                   ADMIN+
DELETE /api/products/:id                   ADMIN+

GET    /api/categories                     ?flat=true
GET    /api/categories/tree
POST   /api/categories                     ADMIN+
PUT    /api/categories/:id                 ADMIN+
DELETE /api/categories/:id                 ADMIN+

GET    /api/banners                        (public: chỉ status=true)
CRUD   /api/banners                        ADMIN+ / EDITOR không xóa

GET    /api/news                           ?page&limit&search
GET    /api/news/:slug
CRUD   /api/news                           ADMIN+ / EDITOR không xóa

GET    /api/users                          ADMIN+ (xem), SUPERADMIN (sửa/xóa)
CRUD   /api/users                          SUPERADMIN

GET    /api/cart                           auth
POST   /api/cart/items                     auth
PUT    /api/cart/items/:id                 auth
DELETE /api/cart/items/:id                 auth
DELETE /api/cart                           auth

POST   /api/orders                         auth   ← checkout
GET    /api/orders/my                      auth
GET    /api/orders                         ADMIN+
GET    /api/orders/:id                     ADMIN+ hoặc chủ đơn
PATCH  /api/orders/:id/status              ADMIN+

GET    /api/settings                       public
PUT    /api/settings                       SUPERADMIN

GET    /api/dashboard/stats                ADMIN+   4 card tổng
GET    /api/dashboard/revenue?year=        ADMIN+   doanh thu 12 tháng
GET    /api/dashboard/order-status         ADMIN+
GET    /api/dashboard/top-products         ADMIN+
GET    /api/dashboard/products-by-category ADMIN+

POST   /api/upload                         ADMIN+ / EDITOR   single + multiple
```

## 8. Luồng nghiệp vụ quan trọng

**Checkout** — chạy trong một Prisma transaction:
1. Đọc giỏ hàng của user, chặn nếu rỗng.
2. Với từng item: kiểm tra sản phẩm còn `status=true` và `quantity >= item.quantity`. Thiếu hàng thì abort toàn bộ, trả lỗi 409 kèm tên sản phẩm.
3. Giá dùng để tính là `salePrice ?? price` tại thời điểm đặt.
4. Tạo `orders` + `order_items` (snapshot), `code` dạng `DH` + timestamp base36.
5. Trừ `products.quantity`.
6. Xóa `cart_items` của giỏ.

**Đổi trạng thái đơn** — chỉ cho phép chuyển tiến: `PENDING → CONFIRMED → SHIPPING → COMPLETED`. Hủy được từ `PENDING` hoặc `CONFIRMED`, khi hủy thì **cộng lại tồn kho**. Từ `COMPLETED` không đổi được nữa.

**Quản lý giao diện** — `GET /api/settings` gọi một lần lúc app khởi động, đổ vào `settingsSlice`. `primaryColor` được set vào CSS variable `--primary` trên `:root`. Các cờ `showNewProducts`… điều khiển việc render section ở trang chủ.

## 9. Xử lý lỗi

- `AppError(statusCode, message)` cho lỗi có chủ đích.
- `errorHandler` toàn cục: Zod → 422 kèm danh sách field; Prisma `P2002` → 409 trùng dữ liệu; `P2025` → 404; còn lại → 500 (chỉ log stack, không trả ra client ở production).
- Client: axios interceptor bắt 401 → xóa token, đẩy về `/login`; các lỗi khác → toast.

## 10. Dữ liệu mẫu

Ảnh placeholder **tự sinh tại local** (SVG tông trung tính ấm, có tên sản phẩm/danh mục), không phụ thuộc mạng — demo luôn có hình. Thay bằng ảnh thật sau chỉ là upload lại.

8 danh mục cha (Phòng khách, Phòng ngủ, Phòng ăn, Phòng làm việc, Nhà bếp, Phòng tắm, Ngoài trời, Trang trí) · ~20 danh mục con · 40 sản phẩm · 5 banner · 8 tin tức · 4 user (một cho mỗi role) · settings mặc định.

## 11. Ngoài phạm vi

Thanh toán online, wishlist, đánh giá/bình luận, mã giảm giá, đa ngôn ngữ, SSR/SEO nâng cao, refresh token, test tự động.

## 12. Kiểm tra

Không có test tự động (đề bài không yêu cầu). Xác minh bằng cách chạy thật và đi hết các luồng: đăng nhập bốn role, CRUD từng module, upload nhiều ảnh, search/filter/sort/phân trang, thêm giỏ, checkout, đổi trạng thái đơn, dashboard hiển thị số liệu và biểu đồ, dark/light, responsive mobile.
