# Website thương mại điện tử nội thất

# 1. Chạy trên máy

```bash
# 1. MySQL (Docker)
docker compose up -d
```
```bash
# 2. Backend
cd server
npm install
cp .env.example .env
npx prisma migrate dev
npm run placeholders 
npm run db:seed
npm run dev   
```

```bash
# 3. Frontend mở terminal mới
cd client
npm install
npm run dev 
```

# 2. Đã deloy lên Render

## Link trang khách hàng : https://noithat-web-l9d3.onrender.com/
## Link trang admin : https://noithat-web-l9d3.onrender.com/admin 

