# Nội Thất An Viên — Website thương mại điện tử nội thất

Đồ án môn **Web Fullstack**. Website bán nội thất gồm hai khu vực tách biệt: **Client** (khách hàng) và **Admin** (quản trị).

| | |
|---|---|
| **Frontend** | React 19 · Vite · TypeScript · TailwindCSS 4 · Redux Toolkit · Axios · React Router · Recharts · TipTap |
| **Backend** | Node 22 · Express 5 · TypeScript · Prisma · MySQL 8 · JWT · bcrypt · Multer · Zod |
| **Tài liệu** | [Spec thiết kế](docs/superpowers/specs/2026-08-07-website-noi-that-design.md) · [Kế hoạch triển khai](docs/superpowers/plans/2026-08-07-website-noi-that.md) |

---

## 1. Chạy trên máy

### Yêu cầu

- **Node.js 22** trở lên
- **Docker Desktop** (để chạy MySQL). Nếu đã có MySQL 8 sẵn thì bỏ qua Docker, chỉ cần sửa `DATABASE_URL`.

### Các bước

```bash
# 1. MySQL (Docker) — cổng 3308 để không đụng MySQL/XAMPP sẵn có
docker compose up -d
```

```bash
# 2. Backend
cd server
npm install
cp .env.example .env
npx prisma migrate dev        # tạo 11 bảng
npm run placeholders          # sinh 168 ảnh minh hoạ nội thất
npm run db:seed               # nạp dữ liệu mẫu
npm run dev                   # http://localhost:5000
```

```bash
# 3. Frontend (mở terminal khác)
cd client
npm install
npm run dev                   # http://localhost:5173
```

Mở **http://localhost:5173**. Khu vực quản trị ở **/admin**.

### Tài khoản demo

Mật khẩu chung: **`123456`**. Trang đăng nhập có nút bấm để điền nhanh.

| Email | Vai trò | Vào được |
|---|---|---|
| `superadmin@noithat.vn` | Super Admin | Tất cả, kể cả Người dùng và Quản lý giao diện |
| `admin@noithat.vn` | Admin | Sản phẩm, danh mục, banner, tin tức, đơn hàng; chỉ **xem** người dùng |
| `editor@noithat.vn` | Biên tập | Tin tức và banner (tạo/sửa, **không xoá**); xem dashboard |
| `user@noithat.vn` | Khách hàng | Mua hàng phía client |

### Dữ liệu mẫu

8 danh mục cha · 26 danh mục con · 40 sản phẩm (mỗi sản phẩm 3 ảnh) · 5 banner · 8 bài viết · 39 đơn hàng rải trong 12 tháng · 7 tài khoản.

Đơn hàng mẫu có chủ đích: không có chúng thì Dashboard và các biểu đồ đều bằng 0, trông như tính năng bị lỗi.

**Ảnh minh hoạ được sinh tại máy** (`npm run placeholders`) chứ không lấy từ Internet, nên demo luôn có hình kể cả khi không có mạng. Muốn dùng ảnh thật thì upload đè ở trang quản trị.

### Lệnh hay dùng

| Lệnh | Ở đâu | Việc |
|---|---|---|
| `npm run dev` | server / client | Chạy chế độ phát triển |
| `npm run build` | server / client | Build production |
| `npm run typecheck` | server | Kiểm tra kiểu |
| `npm run db:studio` | server | Mở Prisma Studio xem/sửa DB |
| `npm run db:reset` | server | Xoá sạch DB, chạy lại migration + seed |
| `npm run placeholders` | server | Sinh lại ảnh minh hoạ |

---

## 2. Biến môi trường

### `server/.env`

| Biến | Mặc định | Ghi chú |
|---|---|---|
| `PORT` | `5000` | |
| `CLIENT_URL` | `http://localhost:5173` | Dùng cho CORS |
| `DATABASE_URL` | `mysql://root:noithat123@localhost:3308/noithat` | |
| `JWT_SECRET` | — | **Bắt buộc**, tối thiểu 32 ký tự |
| `JWT_EXPIRES_IN` | `7d` | |
| `STORAGE_DRIVER` | `local` | `local` hoặc `cloudinary` |
| `CLOUDINARY_CLOUD_NAME` / `_API_KEY` / `_API_SECRET` | — | Chỉ cần khi `STORAGE_DRIVER=cloudinary` |

Server **validate biến môi trường lúc khởi động** và chết ngay nếu thiếu, thay vì lỗi mơ hồ giữa lúc chạy.

### `client/.env`

| Biến | Ghi chú |
|---|---|
| `VITE_API_URL` | Chỉ cần khi deploy. Dev để trống — Vite proxy `/api` sang backend. Đặt origin backend, **không** kèm `/api` |

---

## 3. Cấu trúc

```
website-interior/
├── docker-compose.yml          MySQL 8 cho môi trường dev
├── server/
│   ├── prisma/
│   │   ├── schema.prisma       11 bảng
│   │   ├── data/               dữ liệu mẫu tách riêng theo loại
│   │   └── seed.ts
│   ├── scripts/
│   │   └── generate-placeholders.ts   sinh 168 ảnh SVG nội thất
│   └── src/
│       ├── config/             env (validate bằng Zod), prisma
│       ├── storage/            StorageProvider: local | cloudinary
│       ├── middleware/         auth, upload, validate, error
│       ├── modules/            11 module, mỗi module: routes → controller → service
│       └── utils/              AppError, apiResponse, pagination, slugify
└── client/src/
    ├── store/slices/           auth, cart, theme, settings
    ├── services/               axios instance + api theo domain
    ├── components/{ui,common,admin}/
    ├── layouts/                ClientLayout · AdminLayout
    ├── pages/{client,admin}/
    └── routes/                 router, ProtectedRoute, RoleRoute
```

**Quy ước tách lớp ở backend:** `routes` chỉ khai báo đường dẫn và middleware · `controller` chỉ đọc request và trả response · `service` chứa logic nghiệp vụ và là **nơi duy nhất** gọi Prisma. Nhờ vậy logic không rò rỉ vào tầng HTTP.

---

## 4. API

Prefix `/api`. Mọi response cùng một hình dạng:

```json
{ "success": true, "data": {}, "message": "", "meta": { "page": 1, "limit": 12, "total": 40, "totalPages": 4 } }
```

```
POST   /auth/register · /auth/login · /auth/logout        GET/PUT /auth/me

GET    /products      ?page&limit&search&category&minPrice&maxPrice
                      &sort=newest|oldest|price_asc|price_desc|name_asc|name_desc|popular
                      &isNew&isSale&isBest
GET    /products/:slug · /products/:id/related · /products/admin/:id
POST   /products      PUT /products/:id      DELETE /products/:id

GET    /categories · /categories/tree · /categories/:id      CRUD /categories
GET    /banners · /banners/:id                               CRUD /banners
GET    /news ?page&limit&search · /news/:slug                CRUD /news
GET    /users ?page&limit&search&role                        CRUD /users

GET    /cart          POST /cart/items   PUT /cart/items/:id   DELETE /cart/items/:id · /cart
POST   /orders        GET /orders/my · /orders · /orders/:id   PATCH /orders/:id/status

GET    /settings (công khai) · /settings/admin                PUT /settings
GET    /dashboard/stats · /revenue?year · /order-status · /top-products · /products-by-category
POST   /upload · /upload/multiple
```

### Vài quyết định đáng nói

- **Đặt hàng chạy trong một transaction**: kiểm tồn kho → tạo đơn + snapshot → trừ kho → dọn giỏ. Cùng thành công hoặc cùng thất bại, không có tình trạng tạo được đơn mà kho không trừ.
- **`order_items` lưu snapshot** tên/ảnh/giá lúc đặt. Admin sửa giá hay xoá sản phẩm về sau không làm sai lệch đơn cũ.
- **Trạng thái đơn chỉ đi tiến**: `Chờ xác nhận → Đã xác nhận → Đang giao → Hoàn thành`. Huỷ được từ hai trạng thái đầu và **cộng lại tồn kho**.
- **Cột `products.effectivePrice`** = `salePrice ?? price`, ghi lại mỗi lần lưu. Cần cột riêng vì lọc theo khoảng giá và sắp xếp theo giá phải chạy trên giá khách thực trả, mà Prisma không sắp xếp được theo biểu thức tính.
- **`register` luôn đặt `role = USER`**, bỏ qua `role` gửi trong body — nếu không thì ai cũng tự đăng ký được tài khoản Super Admin.
- **Đăng nhập sai email và sai mật khẩu trả cùng một message**, để người ngoài không dò được email nào đã tồn tại.
- **Không cho upload SVG**: SVG chứa được `<script>` và ảnh được serve từ chính origin của API.
- **`Decimal` và `BigInt` được chuẩn hoá thành số** ở tầng response, nên client không bao giờ nhận giá dạng chuỗi.

---

## 5. Deploy lên Render

> **Render không có MySQL** (chỉ PostgreSQL). Vì vậy Frontend và Backend đặt trên Render, còn MySQL dùng nhà cung cấp khác.

Chỉ 3 bước. Repo có sẵn [`render.yaml`](render.yaml) nên Render tự tạo cả hai service và tự nối URL cho nhau — bạn chỉ điền **một** giá trị.

### Bước 1 — Tạo MySQL trên Aiven

[aiven.io](https://aiven.io/free-mysql-database) → đăng ký (không cần thẻ) → **Create service → MySQL** → chọn gói **Free**, region gần nhất (Singapore).

Chờ service chuyển sang *Running*, vào tab **Overview** copy **Service URI**. Aiven đưa ra dạng:

```
mysql://avnadmin:<pass>@<host>.aivencloud.com:13507/defaultdb?ssl-mode=REQUIRED
```

⚠️ **Phải thay đoạn cuối.** `ssl-mode` là tham số của MySQL client, **Prisma không hiểu** — để nguyên thì kết nối sẽ fail. Đổi thành:

```
mysql://avnadmin:<pass>@<host>.aivencloud.com:13507/defaultdb?sslaccept=accept_invalid_certs
```

Đây mới là giá trị dán vào `DATABASE_URL`.

Vì sao `accept_invalid_certs` chứ không phải `strict`: Aiven cấp chứng chỉ bằng CA riêng của từng project, CA đó không nằm trong trust store hệ thống nên `strict` sẽ báo `self signed certificate`. Kết nối **vẫn được mã hoá TLS**, chỉ là không xác minh CA — chấp nhận được ở phạm vi đồ án.

Muốn xác minh CA đầy đủ: tải **CA certificate** ở tab Overview của Aiven, commit vào `server/`, rồi dùng `?sslaccept=strict&sslcert=./ca.pem`.

> **Đừng dùng TiDB Cloud** dù nó quảng cáo tương thích MySQL: hỗ trợ khoá ngoại không đầy đủ, còn schema này phụ thuộc nhiều vào FK (`Cascade` cho `product_images`/`cart_items`/`order_items`, `Restrict` cho `products.categoryId`, `SetNull` cho `order_items.productId`). Migration có thể fail, hoặc tệ hơn là chạy được nhưng xoá dữ liệu sai âm thầm.
>
> **Supabase / Neon / Render Postgres cũng không dùng được** — đều là PostgreSQL.

### Bước 2 — Render Blueprint

Render → **New → Blueprint** → chọn repo này. Nó hỏi đúng một giá trị: **`DATABASE_URL`**.

Mọi thứ còn lại tự động: `JWT_SECRET` Render sinh, `CLIENT_URL` và `VITE_API_URL` lấy domain của nhau qua `fromService`, rewrite rule cho SPA đã khai trong file.

### Bước 3 — Nạp dữ liệu

Vào **Shell** của service `noithat-api`, chạy một lần:

```bash
npm run db:seed
```

Xong. Kiểm 3 thứ: ảnh có hiện · F5 ở `/products` không ra 404 · đăng nhập `superadmin@noithat.vn` / `123456` vào được `/admin`.

### Lỗi hay gặp

| Hiện tượng | Nguyên nhân |
|---|---|
| Build fail: `self signed certificate` | Đang dùng `?sslaccept=strict` — đổi sang `?sslaccept=accept_invalid_certs` |
| Build fail: `Can't reach database server` | Còn để `?ssl-mode=REQUIRED` của Aiven (Prisma không hiểu), hoặc service chưa *Running* |
| Trang trắng, console báo lỗi CORS | `CLIENT_URL` chưa trỏ đúng frontend — Blueprint tự set, nếu đổi tay thì phải redeploy backend |
| Ảnh không hiện | Frontend chưa redeploy sau khi `VITE_API_URL` đổi (biến `VITE_*` nhúng lúc build, không đọc lúc chạy) |
| F5 ở `/products` ra 404 | Rewrite rule chưa ăn — kiểm tab Redirects/Rewrites của static site |
| Đăng nhập báo sai mật khẩu | Chưa chạy `npm run db:seed` |
| Lần đầu mở site load rất chậm | Render free tier ngủ sau 15 phút không ai truy cập, lần gọi đầu mất ~50 giây để dựng lại. Bình thường |

### Ảnh khi deploy

Filesystem của Render free tier là **ephemeral** — xoá sạch sau mỗi lần redeploy. Đã xử lý bằng cách để `npm run placeholders` chạy trong `buildCommand`: ảnh minh hoạ được sinh lại mỗi lần deploy nên site **không bao giờ trắng**, và không cần dịch vụ ngoài.

Chỉ **ảnh bạn tự upload** qua trang admin là mất sau redeploy. Với đồ án thì thường không sao. Muốn nó không mất:

1. Tạo tài khoản Cloudinary (miễn phí), lấy `cloud name`, `api key`, `api secret`
2. Trong tab Environment của `noithat-api`: đổi `STORAGE_DRIVER` thành `cloudinary` và thêm ba biến `CLOUDINARY_*`

Không phải sửa một dòng code nào — tầng lưu ảnh đã tách interface sẵn, và provider Cloudinary gọi REST API bằng `fetch` có sẵn của Node nên cũng không thêm dependency.

**Đường dẫn ảnh không phụ thuộc domain.** DB lưu đường dẫn tương đối (`/uploads/...`) cho ảnh local và URL tuyệt đối cho ảnh Cloudinary; client tự ghép origin (xem `client/src/lib/imageUrl.ts`). Đổi domain về sau không phải seed lại.

---

## 5b. Thanh toán chuyển khoản tự động (SePay)

Khách chọn *Chuyển khoản*, hệ thống hiện mã QR VietQR kèm nội dung là **mã đơn hàng**. Khi tiền về, SePay gọi webhook, hệ thống khớp mã đơn và **tự chuyển đơn sang Đã xác nhận** — không cần nhân viên đối soát tay.

### Bật tính năng

Thêm 4 biến vào Environment của `noithat-api` (hoặc `server/.env` khi chạy máy):

| Biến | Ý nghĩa |
|---|---|
| `SEPAY_WEBHOOK_API_KEY` | Khoá tự đặt, phải trùng ô *API Key* lúc tạo webhook ở [my.sepay.vn](https://my.sepay.vn) |
| `SEPAY_BANK_ACCOUNT` | Số tài khoản nhận tiền |
| `SEPAY_BANK_CODE` | Tên ngân hàng chuẩn VietQR: `MBBank`, `Vietcombank`, `ACB`... |
| `SEPAY_ACCOUNT_NAME` | Tên chủ tài khoản, chỉ để hiển thị |

Rồi ở my.sepay.vn tạo webhook trỏ tới:

```
https://noithat-api.onrender.com/api/payments/sepay/webhook
```

Chọn kiểu xác thực **API Key**, dán đúng khoá ở trên, sự kiện **Có tiền vào**.

Chưa cấu hình thì trang thanh toán hiện "cửa hàng chưa cấu hình", và endpoint webhook **từ chối mọi request** — cố ý fail-closed, vì nếu để mở thì ai cũng POST được một payload giả để đánh dấu đơn đã thanh toán.

### SePay không có sandbox

Tài liệu SePay chỉ có nút *Gửi thử* trên dashboard hoặc chuyển khoản thật số tiền nhỏ. Nên repo có sẵn script giả lập, payload y hệt SePay:

**Chạy ở máy** (backend local, đơn nằm trong DB local) — script tự tra số tiền:

```bash
cd server
npm run sepay:simulate -- DHXXXX                  # trả đủ tiền
npm run sepay:simulate -- DHXXXX --amount 1000    # thử trả thiếu
```

**Bắn lên bản đã deploy** — đơn nằm trong DB của server nên máy này không tra được, phải tự nhập số tiền:

```bash
npm run sepay:simulate -- DHXXXX \
  --amount 990000 \
  --url https://noithat-api.onrender.com \
  --key <giá trị SEPAY_WEBHOOK_API_KEY đang đặt trên Render>
```

Khoá phải trùng với biến trên Render, không thì trả 401.

### Những trường hợp đã xử lý

| Tình huống | Hành vi |
|---|---|
| Trả đủ tiền | Ghi nhận, đánh dấu đã thanh toán, `PENDING → CONFIRMED` |
| SePay gửi lại cùng giao dịch | Bỏ qua nhờ `payments.sepayId` unique — không cộng đôi |
| Trả thiếu tiền | **Vẫn lưu giao dịch** nhưng không xác nhận đơn, để người bán tự xử |
| Nội dung sai, không có mã đơn | Vẫn lưu để tra cứu, không khớp đơn nào |
| Giao dịch tiền ra | Lưu, không đụng tới đơn |
| Mã đơn lẫn trong câu chữ | Vẫn tách được bằng regex trên nội dung đã bỏ dấu |
| Đơn đã huỷ | Không đánh dấu đã thanh toán |

Toàn bộ giao dịch xem ở `GET /api/payments` (ADMIN trở lên), gồm cả giao dịch không khớp đơn.

---

## 6. Đối chiếu yêu cầu của đề bài (mục 7)

| Yêu cầu | Trạng thái | Ở đâu |
|---|---|---|
| React + Vite cho Frontend | ✅ | `client/` |
| NodeJS + Express cho Backend | ✅ | `server/` |
| Kết nối MySQL bằng Prisma | ✅ | `server/prisma/schema.prisma` |
| Thiết kế RESTful API | ✅ | mục 4 |
| Đăng nhập bằng JWT | ✅ | `modules/auth` |
| Phân quyền SuperAdmin / Admin / Editor | ✅ | `middleware/auth.ts`, spec mục 6 |
| CRUD đầy đủ | ✅ | products, categories, banners, news, users, orders |
| Giao diện responsive máy tính và điện thoại | ✅ | kiểm ở 375px, không tràn ngang |
| Phân chia rõ Client và Admin | ✅ | hai layout, hai nhóm route |
| Phân trang sản phẩm | ✅ | `Pagination` + `meta` từ server |
| Tìm kiếm và lọc sản phẩm | ✅ | tên, danh mục 2 cấp, khoảng giá, 3 cờ, 6 kiểu sắp xếp — tất cả đồng bộ vào URL |
| Upload 1 hoặc nhiều ảnh, lưu đường dẫn vào DB | ✅ | `/upload`, `/upload/multiple`, bảng `product_images` |
| Biểu đồ thống kê trong Dashboard | ✅ | 4 biểu đồ + 7 số tổng |
| Dark / Light Mode | ✅ | `themeSlice`, biến CSS theo token |
| Triển khai lên hosting hoặc VPS | ⏳ | hướng dẫn ở mục 5, chưa deploy |

### Ngoài đề bài, thêm vào vì đề bài cần tới nhưng chưa nói

`orders` + `order_items` + checkout + quản lý đơn (đề bài đòi "Tổng đơn hàng" và "Biểu đồ thống kê" nhưng không có bảng đơn) · `product_images` (đòi upload nhiều ảnh nhưng chỉ có một cột `image`) · `settings` (đòi "Quản lý giao diện" nhưng không có bảng lưu) · `parentId` cho danh mục · `slug`, `status`, `publishedAt` và timestamps. Chi tiết 12 điểm trong [spec mục 3](docs/superpowers/specs/2026-08-07-website-noi-that-design.md).

---

## 7. Giới hạn đã biết

- **Không có test tự động.** Kiểm tra bằng cách chạy thật và đi hết các luồng.
- **Không có cổng thẻ quốc tế.** Chỉ COD và chuyển khoản ngân hàng (có tự động xác nhận qua SePay, xem mục 5b).
- **Xoá sản phẩm không xoá file ảnh** trên ổ đĩa/Cloudinary: DB chỉ lưu URL chứ không lưu storage key, và ảnh có thể đang được đơn hàng cũ tham chiếu. Ảnh mồ côi là đánh đổi có ý thức.
- **Giỏ hàng bắt buộc đăng nhập.** Không có giỏ hàng cho khách vô danh.
- **Mô tả sản phẩm và nội dung tin tức được render bằng `dangerouslySetInnerHTML`.** An toàn ở phạm vi đồ án vì nội dung chỉ do nhân viên nhập trong trang quản trị, không phải từ người dùng cuối. Nếu mở cho người dùng gửi nội dung thì phải thêm sanitize phía server.
# TTTN1
