-- CreateTable
CREATE TABLE "klinik" (
    "id" TEXT NOT NULL,
    "nama" VARCHAR(50) NOT NULL,
    "alamat" VARCHAR(100),
    "kode_auth" VARCHAR(50) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "klinik_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "kelas_ruangan" (
    "id" TEXT NOT NULL,
    "klinik_id" TEXT NOT NULL,
    "nama_kelas" VARCHAR(40) NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "kelas_ruangan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "klinik_id" TEXT NOT NULL,
    "nama_lengkap" VARCHAR(40) NOT NULL,
    "email" VARCHAR(30) NOT NULL,
    "username" VARCHAR(20) NOT NULL,
    "password_hash" VARCHAR(255) NOT NULL,
    "is_admin" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "kategori_ruangan" (
    "id" TEXT NOT NULL,
    "klinik_id" TEXT NOT NULL,
    "kelas_ruangan_id" TEXT NOT NULL,
    "jenis_kelamin" VARCHAR(20) NOT NULL,
    "usia" VARCHAR(20) NOT NULL,
    "penyakit" VARCHAR(100) NOT NULL,
    "nama_ruangan" VARCHAR(100) NOT NULL,
    "harga_ruangan" VARCHAR(100) NOT NULL,
    "fasilitas_ruangan" JSONB,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "kategori_ruangan_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- AddForeignKey
ALTER TABLE "kelas_ruangan" ADD CONSTRAINT "kelas_ruangan_klinik_id_fkey" FOREIGN KEY ("klinik_id") REFERENCES "klinik"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_klinik_id_fkey" FOREIGN KEY ("klinik_id") REFERENCES "klinik"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "kategori_ruangan" ADD CONSTRAINT "kategori_ruangan_klinik_id_fkey" FOREIGN KEY ("klinik_id") REFERENCES "klinik"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "kategori_ruangan" ADD CONSTRAINT "kategori_ruangan_kelas_ruangan_id_fkey" FOREIGN KEY ("kelas_ruangan_id") REFERENCES "kelas_ruangan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
