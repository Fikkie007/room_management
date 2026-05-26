import prisma from '../../src/config/database.js';
import bcrypt from 'bcryptjs';

const seedDatabase = async () => {
  try {
    console.log('🌱 Starting seed...');

    // Seed Klinik
    const klinikData = [
      { nama: 'Klinik Utama', alamat: 'Jl. Utama No. 1', kode_auth: 'AUTH001' },
      { nama: 'Klinik Cabang A', alamat: 'Jl. Cabang A No. 2', kode_auth: 'AUTH002' },
      { nama: 'Klinik Cabang B', alamat: 'Jl. Cabang B No. 3', kode_auth: 'AUTH003' },
    ];

    const createdKlinik = [];
    for (const data of klinikData) {
      const existing = await prisma.klinik.findFirst({
        where: { nama: data.nama },
      });
      if (!existing) {
        const klinik = await prisma.klinik.create({ data });
        createdKlinik.push(klinik);
        console.log(`✅ Created klinik: ${klinik.nama}`);
      } else {
        createdKlinik.push(existing);
        console.log(`⏭️ Klinik ${data.nama} already exists`);
      }
    }

    // Seed Kelas Ruangan
    const kelasRuanganData = [
      { nama_kelas: 'Kelas I', id_klinik: createdKlinik[0]?.id },
      { nama_kelas: 'Kelas II', id_klinik: createdKlinik[0]?.id },
      { nama_kelas: 'Kelas III', id_klinik: createdKlinik[0]?.id },
      { nama_kelas: 'VIP', id_klinik: createdKlinik[0]?.id },
      { nama_kelas: 'VVIP', id_klinik: createdKlinik[0]?.id },
    ];

    const createdKelas = [];
    for (const data of kelasRuanganData) {
      const existing = await prisma.kelasRuangan.findFirst({
        where: { nama_kelas: data.nama_kelas, id_klinik: data.id_klinik },
      });
      if (!existing) {
        const kelas = await prisma.kelasRuangan.create({ data });
        createdKelas.push(kelas);
        console.log(`✅ Created kelas: ${kelas.nama_kelas}`);
      } else {
        createdKelas.push(existing);
        console.log(`⏭️ Kelas ${data.nama_kelas} already exists`);
      }
    }

    // Seed Users
    const password_hash = await bcrypt.hash('password123', 10);
    const usersData = [
      {
        nama_lengkap: 'Admin User',
        username: 'admin',
        email: 'admin@example.com',
        password_hash,
        id_klinik: createdKlinik[0]?.id,
        is_admin: true,
      },
      {
        nama_lengkap: 'Regular User',
        username: 'user',
        email: 'user@example.com',
        password_hash,
        id_klinik: createdKlinik[0]?.id,
        is_admin: false,
      },
    ];

    for (const userData of usersData) {
      const existingUser = await prisma.user.findUnique({
        where: { email: userData.email },
      });

      if (!existingUser) {
        await prisma.user.create({ data: userData });
        console.log(`✅ Created user: ${userData.username}`);
      } else {
        console.log(`⏭️ User ${userData.username} already exists`);
      }
    }

    // Seed Kategori Ruangan
    const kategoriRuanganData = [
      {
        id_klinik: createdKlinik[0]?.id,
        id_kelas_ruangan: createdKelas[0]?.id,
        jenis_kelamin: 'Laki-laki',
        usia: '25-40',
        penyakit: 'Demam',
        nama_ruangan: 'Ruangan A1',
        harga_ruangan: '500000',
        fasilitas_ruangan: ['AC', 'TV', 'Kamar Mandi'],
      },
      {
        id_klinik: createdKlinik[0]?.id,
        id_kelas_ruangan: createdKelas[3]?.id,
        jenis_kelamin: 'Perempuan',
        usia: '30-50',
        penyakit: 'Rawat Inap',
        nama_ruangan: 'Ruangan VIP 1',
        harga_ruangan: '1500000',
        fasilitas_ruangan: ['AC', 'TV', 'Kamar Mandi', 'Sofa', 'Mini Bar'],
      },
    ];

    for (const data of kategoriRuanganData) {
      const existing = await prisma.kategoriRuangan.findFirst({
        where: { nama_ruangan: data.nama_ruangan, id_klinik: data.id_klinik },
      });
      if (!existing) {
        await prisma.kategoriRuangan.create({ data });
        console.log(`✅ Created ruangan: ${data.nama_ruangan}`);
      } else {
        console.log(`⏭️ Ruangan ${data.nama_ruangan} already exists`);
      }
    }

    console.log('🎉 Seed completed successfully!');
  } catch (error) {
    console.error('❌ Seed failed:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
};

seedDatabase();