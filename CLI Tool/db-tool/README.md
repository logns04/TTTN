# Database Backup Restore Tool
# CLI Tool hỗ trợ * 

- Backup Database
- Restore Database
- Verify
- Rollback
- History

# Cài đặt dự án 

Cài đặt package:
npm install

# Cấu hình Database 

Mở file:
config/db.config.json
Ví dụ:
{
  "dialect": "mysql",
  "host": "localhost",
  "port": 3306,
  "username": "root",
  "password": "",
  "database": "dataBS"
}

# Chạy chương trình

Chạy:
npm run dev

Menu:
Database Tool
Backup
Restore
Verify
Rollback
History
Exit

# Thực hiện Backup

Chọn:
Backup
Hệ thống:
Testing Connection...
Passed
Creating full database backup...
Backup completed
Kết quả:
Data/
mysql_dataBS_16-06-2026_10-00/
Sinh:
full.sql
metadata.json
backup.log

# Thực hiện Restore

Chọn:
Restore
Nhập:
Data/mysql_dataBS_16-06-2026_10-00
Hệ thống:
Loading Metadata...
Passed
Creating Snapshot...
Restore Success

# Thực hiện Verify
Chọn:
Verify
Kết quả:

========== VERIFY RESULT ==========
Table Count : PASS
Row Count : PASS
Primary Key : PASS
Foreign Key : PASS
Constraint : PASS
Index : PASS
Trigger : PASS
Procedure : PASS
Checksum : PASS

VERIFY PASS

# Thực hiện Rollback

Rollback được thực hiện tự động khi restore thất bại.
Ví dụ:
Restore Failed
↓
Rollback
↓
Restore Snapshot
↓
Rollback Success

Snapshot được lưu tại:
Rollback/mysql_dataBS/

# History

Lưu tại:
Logs/history.json
Ví dụ:
[
  {
    "id": "001",
    "action": "backup",
    "database": "dataBS",
    "status": "SUCCESS",
    "time": "2026-06-16"
  }
]

# Build

Biên dịch TypeScript:
npm run build
Kết quả:
dist/

# Deploy

Server:
npm install
npm run build
node dist/index.js