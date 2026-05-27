import * as yup from 'yup';

const kategoriRuanganSchema = yup.object().shape({
  id_klinik: yup.string().required('Klinik wajib dipilih'),
  id_kelas_ruangan: yup.string().required('Kelas ruangan wajib dipilih'),
  jenis_kelamin: yup.string().required('Jenis kelamin wajib diisi').max(20, 'Jenis kelamin maksimal 20 karakter'),
  usia: yup.string().required('Usia wajib diisi').max(20, 'Usia maksimal 20 karakter'),
  penyakit: yup.string().required('Penyakit wajib diisi').max(100, 'Penyakit maksimal 100 karakter'),
  nama_ruangan: yup.string().required('Nama ruangan wajib diisi').max(100, 'Nama ruangan maksimal 100 karakter'),
  harga_ruangan: yup.string().required('Harga ruangan wajib diisi').max(100, 'Harga ruangan maksimal 100 karakter'),
  fasilitas_ruangan: yup.array().of(yup.string()).optional().nullable(),
  is_active: yup.boolean().default(true),
});

export default kategoriRuanganSchema;