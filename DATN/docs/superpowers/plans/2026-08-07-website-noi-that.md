# Website Nội thất — Implementation Plan

> **Cho người thực thi:** Plan này chạy tuần tự theo phase. Mỗi phase kết thúc bằng một bước xác minh có lệnh cụ thể và một commit. Không sang phase sau khi phase trước chưa chạy được.

**Goal:** Website thương mại điện tử nội thất fullstack, hai khu vực Client/Admin, đáp ứng đủ checklist mục 7 của đề bài `WEB FULLSTACK.docx`.

**Architecture:** Monorepo hai project độc lập — `client/` (React 19 + Vite) và `server/` (Express 5 + Prisma + MySQL). Server chia theo module nghiệp vụ, mỗi module có ranh giới routes → controller → service, chỉ service được gọi Prisma. Client tách `pages/client` và `pages/admin` dưới hai layout riêng, state dùng Redux Toolkit, gọi API qua một axios instance duy nhất.

**Tech Stack:** React 19, Vite, TypeScript, TailwindCSS 4, shadcn/ui, Redux Toolkit, Axios, react-hook-form + Zod, Recharts, TipTap · Node 22, Express 5, Prisma, MySQL 8, JWT, bcrypt, Multer, Zod · MySQL dev qua Docker Compose.

**Spec:** `docs/superpowers/specs/2026-08-07-website-noi-that-design.md`

**Lệch khỏi mặc định của skill (có chủ ý, theo yêu cầu người dùng):**
- Không TDD, không test tự động. Mỗi phase có bước xác minh thủ công bằng lệnh `curl`/browser thay cho bước chạy test.
- Ảnh dùng local disk qua tầng abstraction `StorageProvider`; chuyển sang Cloudinary ở Phase 12 (làm sau).

---

## File Structure

### server/

| File | Trách nhiệm |
|---|---|
| `docker-compose.yml` (root) | MySQL 8 dev, port 3307, named volume |
| `server/prisma/schema.prisma` | 11 model + 3 enum |
| `server/prisma/seed.ts` | Dữ liệu mẫu nội thất |
| `server/scripts/generate-placeholders.ts` | Sinh ảnh SVG placeholder vào `public/uploads/seed/` |
| `server/src/config/env.ts` | Đọc + validate env bằng Zod, fail-fast lúc boot |
| `server/src/config/prisma.ts` | PrismaClient singleton |
| `server/src/utils/AppError.ts` | Lỗi có chủ đích kèm statusCode |
| `server/src/utils/slugify.ts` | Bỏ dấu tiếng Việt → slug; `uniqueSlug()` chống trùng |
| `server/src/utils/pagination.ts` | Parse page/limit → skip/take + build meta |
| `server/src/utils/apiResponse.ts` | `ok()`, `created()` — chuẩn hoá response |
| `server/src/storage/index.ts` | Chọn provider theo env; export `storage` |
| `server/src/storage/local.ts` | Ghi buffer ra `public/uploads`, trả URL |
| `server/src/storage/cloudinary.ts` | Phase 12 |
| `server/src/middleware/auth.ts` | `requireAuth`, `requireRole(...)`, `optionalAuth` |
| `server/src/middleware/upload.ts` | Multer memoryStorage, lọc mime ảnh, max 5MB |
| `server/src/middleware/validate.ts` | `validate({body,query,params})` |
| `server/src/middleware/error.ts` | `notFound` + `errorHandler` |
| `server/src/modules/<m>/…` | Mỗi module 4 file: `routes.ts`, `controller.ts`, `service.ts`, `schema.ts` |
| `server/src/app.ts` | Express app, cors, static `/uploads`, mount `/api` |
| `server/src/server.ts` | listen |

Modules: `auth`, `products`, `categories`, `banners`, `news`, `users`, `cart`, `orders`, `settings`, `dashboard`, `upload`.

### client/

| File | Trách nhiệm |
|---|---|
| `client/src/lib/formatCurrency.ts` | Format VND |
| `client/src/lib/constants.ts` | Nhãn trạng thái đơn, nhãn role, options sort |
| `client/src/services/axios.ts` | baseURL, gắn Bearer, bắt 401 |
| `client/src/services/*.api.ts` | Một file cho mỗi domain |
| `client/src/store/slices/authSlice.ts` | user + token, login/register/logout/fetchMe |
| `client/src/store/slices/cartSlice.ts` | giỏ hàng từ server |
| `client/src/store/slices/themeSlice.ts` | dark/light, persist localStorage |
| `client/src/store/slices/settingsSlice.ts` | settings công khai + inject `--primary` |
| `client/src/routes/router.tsx` | Toàn bộ route |
| `client/src/routes/ProtectedRoute.tsx` | Chặn chưa đăng nhập |
| `client/src/routes/RoleRoute.tsx` | Chặn theo role |
| `client/src/layouts/ClientLayout.tsx` | Header + Footer + Outlet |
| `client/src/layouts/AdminLayout.tsx` | Sidebar + Topbar + Outlet |
| `client/src/components/common/*` | ProductCard, Pagination, PriceFilter, ImageUploader, RichTextEditor, DataTable, ConfirmDialog, StatCard, ThemeToggle |
| `client/src/pages/client/*` | 10 trang khách hàng |
| `client/src/pages/admin/*` | 8 trang quản trị |

---

## Phase 1 — Hạ tầng dev

**Files:** `docker-compose.yml`, `.gitignore`, `server/.env`, `server/.env.example`

- [ ] Viết `docker-compose.yml`: MySQL 8, `MYSQL_DATABASE=noithat`, root password `noithat123`, map `3307:3306`, named volume `noithat_mysql`.
- [ ] Viết `.gitignore` gộp cho cả monorepo: `node_modules`, `dist`, `.env`, `server/public/uploads/*` (giữ `.gitkeep`), `.next`, log.
- [ ] `docker compose up -d`
- [ ] **Xác minh:** `docker compose exec db mysql -uroot -pnoithat123 -e "show databases;"` → thấy `noithat`.
- [ ] Commit: `chore: setup MySQL dev qua docker compose`

## Phase 2 — Scaffold server

**Files:** `server/package.json`, `server/tsconfig.json`, `server/src/config/*`, `server/src/utils/*`, `server/src/middleware/error.ts`, `server/src/app.ts`, `server/src/server.ts`

- [ ] `npm init` + cài: `express@5 cors dotenv zod jsonwebtoken bcryptjs multer @prisma/client` và dev: `typescript tsx @types/*  prisma`.
- [ ] Scripts: `dev` (tsx watch), `build` (tsc), `start`, `db:migrate`, `db:seed`, `db:studio`, `placeholders`.
- [ ] `config/env.ts`: Zod schema cho `PORT`, `DATABASE_URL`, `JWT_SECRET`, `JWT_EXPIRES_IN`, `CLIENT_URL`, `STORAGE_DRIVER`, `PUBLIC_URL`. Throw ngay lúc import nếu thiếu.
- [ ] `utils/AppError.ts`, `utils/apiResponse.ts`, `utils/pagination.ts`, `utils/slugify.ts`.
- [ ] `middleware/error.ts`: map Zod → 422, Prisma P2002 → 409, P2025 → 404, còn lại 500.
- [ ] `app.ts` + `server.ts`, thêm `GET /api/health`.
- [ ] **Xác minh:** `npm run dev` rồi `curl http://localhost:5000/api/health` → `{"success":true,...}`.
- [ ] Commit: `feat(server): scaffold express + ts + error handling`

## Phase 3 — Prisma schema + migration

**Files:** `server/prisma/schema.prisma`

- [ ] Viết 11 model đúng mục 5 của spec, 3 enum (`Role`, `OrderStatus`, `PaymentMethod`), `SettingType`.
- [ ] `Decimal(12,2)` cho `price`, `salePrice`, `subtotal`, `shippingFee`, `total`.
- [ ] Index: `products(categoryId)`, `products(isNew,isSale,isBest)`, `orders(userId)`, `orders(status)`.
- [ ] `onDelete: Cascade` cho `product_images`, `cart_items`, `order_items`; `SetNull` cho `order_items.productId`.
- [ ] `npx prisma migrate dev --name init`
- [ ] **Xác minh:** `npx prisma migrate status` → up to date; `docker compose exec db mysql -uroot -pnoithat123 noithat -e "show tables;"` → 11 bảng + `_prisma_migrations`.
- [ ] Commit: `feat(server): prisma schema 11 bảng + migration init`

## Phase 4 — Ảnh placeholder + seed

**Files:** `server/scripts/generate-placeholders.ts`, `server/prisma/seed.ts`

- [ ] Script sinh SVG: nền gradient tông trung tính ấm (be/nâu nhạt/xám xanh), line-art đơn giản theo loại đồ, chữ tên sản phẩm. Xuất ra `server/public/uploads/seed/`.
- [ ] Seed: 8 danh mục cha, ~20 con, 40 sản phẩm (rải `isNew`/`isSale`/`isBest`, một số có `salePrice`, mỗi SP 3 ảnh gallery), 5 banner, 8 tin tức, 4 user (`superadmin@noithat.vn`, `admin@…`, `editor@…`, `user@…`, mật khẩu `123456`), 11 settings mặc định.
- [ ] `npm run placeholders && npm run db:seed`
- [ ] **Xác minh:** `docker compose exec db mysql -uroot -pnoithat123 noithat -e "select count(*) from products; select count(*) from product_images;"` → 40 và 120.
- [ ] Commit: `feat(server): sinh ảnh placeholder + seed dữ liệu nội thất`

## Phase 5 — Auth + phân quyền

**Files:** `server/src/modules/auth/*`, `server/src/middleware/auth.ts`, `server/src/middleware/validate.ts`

- [ ] `auth/schema.ts`: register (name, email, password ≥ 6, phone?, address?), login.
- [ ] `auth/service.ts`: bcrypt 10 rounds, sign JWT 7 ngày, không bao giờ trả `password` ra ngoài.
- [ ] `middleware/auth.ts`: `requireAuth` đọc `Authorization: Bearer`, `requireRole(...roles)` theo ma trận mục 6.
- [ ] Mount `/api/auth`.
- [ ] **Xác minh:** `curl -X POST localhost:5000/api/auth/login -H "Content-Type: application/json" -d '{"email":"admin@noithat.vn","password":"123456"}'` → có `token`; gọi `/api/auth/me` với token → đúng user; gọi không token → 401.
- [ ] Commit: `feat(server): auth JWT + phân quyền 4 role`

## Phase 6 — Upload + 5 module CRUD

**Files:** `server/src/storage/*`, `server/src/middleware/upload.ts`, `server/src/modules/{upload,products,categories,banners,news,users}/*`

- [ ] `storage/index.ts` export `storage: StorageProvider` chọn theo `STORAGE_DRIVER`; `local.ts` ghi ra `public/uploads/<yyyy-mm>/<nanoid>.<ext>`.
- [ ] `upload`: `POST /api/upload` (field `file`) và `POST /api/upload/multiple` (field `files`, max 8).
- [ ] `products`: list có `page,limit,search,category(gồm cả danh mục con),minPrice,maxPrice,sort,isNew,isSale,isBest`; detail theo slug kèm `images` + `category`; `related` cùng danh mục loại trừ chính nó; create/update xử lý `slug` unique + đồng bộ `product_images`.
- [ ] `categories`: `tree` trả cha lồng con; chặn tạo cấp 3; chặn xóa danh mục còn sản phẩm.
- [ ] `banners`, `news` (slug + publishedAt), `users` (không tự đổi role mình, không xóa SUPERADMIN cuối).
- [ ] **Xác minh:** `curl "localhost:5000/api/products?page=1&limit=5&sort=price_asc"` → 5 item + `meta.total=40`; `curl "localhost:5000/api/products?search=sofa&minPrice=1000000"` → lọc đúng; `curl localhost:5000/api/categories/tree` → cây 2 cấp.
- [ ] Commit: `feat(server): upload + CRUD products/categories/banners/news/users`

## Phase 7 — Cart + Orders + Settings + Dashboard

**Files:** `server/src/modules/{cart,orders,settings,dashboard}/*`

- [ ] `cart`: mọi route `requireAuth`; `getOrCreateCart(userId)`; thêm item thì upsert theo unique(cartId, productId); chặn `quantity > product.quantity`.
- [ ] `orders`: checkout trong `prisma.$transaction` theo đúng 6 bước ở spec mục 8; `code = 'DH' + Date.now().toString(36).toUpperCase()`.
- [ ] Đổi trạng thái: chỉ tiến `PENDING→CONFIRMED→SHIPPING→COMPLETED`; hủy từ PENDING/CONFIRMED và **cộng lại tồn kho**; từ COMPLETED/CANCELLED không đổi.
- [ ] `settings`: `GET` public trả object phẳng `{key: value}`; `PUT` SUPERADMIN nhận object, upsert từng key.
- [ ] `dashboard`: `stats`, `revenue?year` (12 tháng, chỉ tính đơn COMPLETED), `order-status`, `top-products` (groupBy order_items), `products-by-category`.
- [ ] **Xác minh:** login user → thêm 2 SP vào giỏ → `POST /api/orders` → 201 có `code`; kiểm tra `products.quantity` đã giảm và `cart_items` đã rỗng; login admin → `PATCH /api/orders/:id/status {"status":"COMPLETED"}` → `GET /api/dashboard/revenue?year=2026` thấy doanh thu tháng 8.
- [ ] Commit: `feat(server): cart, checkout, settings, dashboard`

## Phase 8 — Scaffold client

**Files:** `client/*` (Vite init), `client/src/{lib,services,store,routes,layouts}/*`

- [ ] `npm create vite@latest client -- --template react-ts`; cài Tailwind 4 + `@tailwindcss/vite`, shadcn/ui, `react-router-dom @reduxjs/toolkit react-redux axios react-hook-form @hookform/resolvers zod recharts lucide-react sonner`.
- [ ] `vite.config.ts`: alias `@` → `src`, proxy `/api` và `/uploads` → `localhost:5000`.
- [ ] `services/axios.ts` + 4 slice + `store/index.ts`.
- [ ] `ClientLayout` (Header: logo từ settings, menu danh mục 2 cấp, ô tìm kiếm, badge giỏ, ThemeToggle, dropdown user) + `AdminLayout` (sidebar 8 mục theo role).
- [ ] `router.tsx` + `ProtectedRoute` + `RoleRoute`.
- [ ] **Xác minh:** `npm run dev` → mở `localhost:5173`, layout render, `/admin` khi chưa đăng nhập bị đẩy về `/login`.
- [ ] Commit: `feat(client): scaffold vite + tailwind + shadcn + store + routing`

## Phase 9 — Trang khách hàng

**Files:** `client/src/pages/client/*`, `client/src/components/common/*`

- [ ] `Home`: banner slider, lưới danh mục, 3 section sản phẩm (ẩn/hiện theo settings), tin tức mới.
- [ ] `Products`: sidebar lọc danh mục + khoảng giá, select sort, ô search debounce 400ms, phân trang, đồng bộ toàn bộ vào URL query để F5 không mất filter.
- [ ] `ProductDetail`: gallery ảnh chính + thumbnail, giá gạch ngang khi có `salePrice`, chọn số lượng, thêm giỏ, tab mô tả, sản phẩm liên quan.
- [ ] `Cart`, `Checkout` (form Zod, prefill từ user), `MyOrders` (kèm trạng thái + chi tiết).
- [ ] `News`, `NewsDetail`, `Login`, `Register`.
- [ ] **Xác minh (browser):** filter/sort/phân trang đổi URL và đổi kết quả; chưa đăng nhập bấm "Thêm vào giỏ" → đẩy sang `/login`; đăng nhập rồi đặt hàng thành công → đơn xuất hiện ở `MyOrders`; toggle dark/light; thu về 375px không tràn ngang.
- [ ] Commit: `feat(client): hoàn thiện các trang khách hàng`

## Phase 10 — Admin panel

**Files:** `client/src/pages/admin/*`

- [ ] `Dashboard`: 4 StatCard + 4 biểu đồ Recharts.
- [ ] CRUD `Products` (ImageUploader nhiều ảnh, chọn danh mục 2 cấp, 3 cờ new/sale/best), `Categories`, `Banners`, `News` (TipTap), `Users`, `Orders` (đổi trạng thái).
- [ ] `Appearance`: đổi logo, banner trang chủ, color picker màu nhấn, 4 switch ẩn/hiện section — chỉ SUPERADMIN.
- [ ] **Xác minh (browser):** đăng nhập từng role thấy đúng số mục sidebar; EDITOR không thấy nút xóa tin tức; tạo sản phẩm với 4 ảnh → hiện đủ ở client; đổi màu nhấn ở Appearance → client đổi màu ngay.
- [ ] Commit: `feat(client): admin panel + dashboard + quản lý giao diện`

## Phase 11 — Rà soát toàn bộ + README

**Files:** `README.md`

- [ ] Đi lại toàn bộ checklist mục 7 của đề bài, đánh dấu từng dòng.
- [ ] README: yêu cầu môi trường, lệnh chạy local, 4 tài khoản demo, bảng biến môi trường, các bước deploy Render + MySQL provider ngoài, bảng đối chiếu mục 7.
- [ ] Commit: `docs: README + checklist đối chiếu đề bài`

## Phase 12 — Cloudinary (làm sau)

**Files:** `server/src/storage/cloudinary.ts`, `server/src/storage/index.ts`

- [ ] Cài `cloudinary`, viết provider `save()`/`remove()` dùng `upload_stream`.
- [ ] Thêm 3 env `CLOUDINARY_*`, đổi `STORAGE_DRIVER=cloudinary`.
- [ ] **Xác minh:** upload một ảnh ở admin → URL trả về thuộc `res.cloudinary.com` và ảnh hiển thị được.
- [ ] Commit: `feat(server): storage provider cloudinary`

---

## Self-review

**Spec coverage:** Mục 3 lỗ hổng → Phase 3 (orders/product_images/settings/parentId/cột thiếu), Phase 5 (4 role), Phase 7 (checkout, settings, dashboard), Phase 9 (bắt đăng nhập mới thêm giỏ), Phase 10 (dark/light + màu admin). Mục 4 kiến trúc → Phase 2, 8. Mục 5 DB → Phase 3. Mục 6 phân quyền → Phase 5 + xác minh Phase 10. Mục 7 API → Phase 5, 6, 7. Mục 8 luồng nghiệp vụ → Phase 7. Mục 9 xử lý lỗi → Phase 2. Mục 10 dữ liệu mẫu → Phase 4. Mục 12 kiểm tra → Phase 9, 10, 11. Không còn mục nào của spec chưa có phase.

**Placeholder scan:** Không có TBD/TODO. Mọi bước xác minh đều có lệnh cụ thể và kết quả mong đợi cụ thể.

**Type consistency:** `StorageProvider.save()/remove()` dùng nhất quán ở Phase 6 và 12. `getOrCreateCart(userId)` chỉ khai báo và dùng trong module `cart`. Tên settings key ở Phase 4 (seed) trùng khớp với danh sách ở spec mục 5 và với Phase 10 (`Appearance`).
