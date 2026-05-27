# CLAUDE.md - Room Category Management

## Ringkasan Proyek

Aplikasi **Room Category Management** adalah sistem manajemen kategori ruangan dengan fitur Role-Based Access Control (RBAC). Aplikasi ini dibangun menggunakan React.js (frontend) dan Express.js (backend).

## Tech Stack

### Frontend
- **React.js** dengan JavaScript
- **Vite** sebagai build tool
- **Tailwind CSS**
- **Yup** untuk validasi form

### Backend
- **Express.js** + **Node.js**
- **JWT** untuk autentikasi
- Database: PostgreSQL

## Struktur Proyek

```
room_management/
├── frontend/                 # React + Vite
│   ├── src/
│   │   ├── components/       # Komponen reusable
│   │   ├── hooks/            # Custom hooks
│   │   ├── services/api/     # API service layer
│   │   ├── utils/            # Helper functions
│   │   ├── pages/            # Page components
│   │   └── validations/      # Yup schemas
│   └── vite.config.js
├── backend/                  # Express.js
│   ├── routes/               # Route definitions
│   ├── controllers/          # Request handlers
│   ├── services/             # Business logic
│   ├── middleware/           # Auth, error handling
│   └── seeds/                 # Seed data
└── README.md
```

## Fitur Utama

### A. Autentikasi & RBAC

**Role Admin:**
- `GET /kategori-ruangan` - Melihat daftar ruangan
- `POST /kategori-ruangan` - Menambah ruangan baru
- `PUT /kategori-ruangan/:id` - Mengedit data ruangan

**Role User:**
- `GET /kategori-ruangan` - Melihat daftar ruangan
- `GET /kategori-ruangan/:id` - Melihat detail ruangan

### B. Manajemen Ruangan
- Daftar ruangan dengan pagination (`page`, `perPage`)
- Pencarian berdasarkan nama ruangan
- Modal/card/halaman untuk tambah ruangan (Admin)
- Edit data ruangan inline atau modal form (Admin)
- Semua perubahan disimpan via API

### C. Validasi Form (Yup)
- Validasi menyesuaikan struktur tabel `users` dan `kategori_ruangan`
- Tipe data, nullable, dan mandatory field
- Error message jelas di bawah setiap field

### D. Responsive Design
- **Desktop (>= 1024px):** Grid 3 kolom atau tabel lebar
- **Tablet (>= 768px & < 1024px):** Grid 2 kolom atau compact table
- **Mobile (< 768px):** List vertikal dengan overflow menu

## API Endpoints

### Autentikasi
```
POST /auth/login     - Login user
POST /auth/register  - Register user baru
```

### Kategori Ruangan
```
GET    /kategori-ruangan       - Daftar ruangan (dengan pagination & search)
GET    /kategori-ruangan/:id    - Detail ruangan
POST   /kategori-ruangan        - Tambah ruangan (Admin only)
PUT    /kategori-ruangan/:id   - Update ruangan (Admin only)
DELETE /kategori-ruangan/:id   - Hapus ruangan (Admin only)
```

## Query Parameters

### Pagination
- `page` - Nomor halaman (default: 1)
- `perPage` - Jumlah item per halaman (default: 10)

### Search
- `search` - Pencarian berdasarkan nama ruangan

## Database Schema

### Tabel: users
- `id` - Primary key
- `username` - Unique, required
- `email` - Unique, required
- `password` - Required (hashed)
- `role` - 'admin' atau 'user'
- `created_at`, `updated_at`

### Tabel: kategori_ruangan
- `id` - Primary key
- `nama_ruangan` - Required
- `klinik_id` - Foreign key ke tabel klinik
- `kelas_ruangan_id` - Foreign key ke tabel kelas_ruangan
- `created_at`, `updated_at`

### Tabel: klinik (Master)
- `id` - Primary key
- `nama_klinik` - Required

### Tabel: kelas_ruangan (Master)
- `id` - Primary key
- `nama_kelas` - Required

## Environment Variables

### Frontend (.env)
```
VITE_API_BASE_URL=http://localhost:3000/api
```

### Backend (.env)
```
PORT=3000
JWT_SECRET=your_jwt_secret_key
DATABASE_URL=your_database_connection_string
```

## Cara Menjalankan Proyek

### Prasyarat
- Node.js v18+
- npm atau yarn

### Backend
```bash
cd backend
npm install
npm run dev      # Development mode
npm start        # Production mode
```

### Frontend
```bash
cd frontend
npm install
npm run dev      # Development mode (http://localhost:5173)
npm run build    # Build untuk production
npm run preview  # Preview production build
```

### Seed Data
```bash
cd backend
npm run seed     # Jalankan seeder untuk data awal
```

## Vite Proxy Configuration

```javascript
// vite.config.js
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true
      }
    }
  }
})
```

## Checklist Pengembangan

- [✅] Setup proyek (frontend + backend)
- [✅] Implementasi database & migrations
- [✅] Seed data untuk master tables (users, klinik, kelas_ruangan)
- [✅] Autentikasi dengan JWT
- [✅] Middleware RBAC
- [✅] CRUD endpoints untuk kategori_ruangan
- [✅] Frontend: Login/Register page
- [ ] Frontend: Daftar ruangan dengan pagination & search
- [ ] Frontend: Form tambah/edit ruangan (Admin)
- [ ] Validasi Yup untuk semua form
- [ ] Responsive design (desktop/tablet/mobile)
- [ ] Error handling & UX feedback
- [ ] Dokumentasi README

## Rubrik Penilaian (0-5 per aspek)

| Aspek | Skor |
|-------|------|
| Kode & Struktur | 0-5 |
| Implementasi RBAC | 0-5 |
| Validasi Yup & UX error | 0-5 |
| Responsiveness & visual fidelity | 0-5 |
| Dokumentasi & ease-of-run | 0-5 |

## Referensi Desain

- **UI Design:** Figma Category Room Design (lihat dokumen asli)
- **Database Design:** DBDiagrams Category Room Design (lihat dokumen asli)

## Catatan Penting

1. Pastikan middleware backend memverifikasi token untuk endpoint yang sensitif
2. Gunakan HTTPS untuk produksi
3. Password harus di-hash sebelum disimpan ke database
4. Implementasi refresh token untuk keamanan tambahan (opsional)
5. Gunakan environment variables untuk konfigurasi sensitif