import * as yup from "yup";

const loginSchema = yup.object().shape({
  id_klinik: yup.string().required("Masukkan Klinik ID"),
  id: yup.string().required("Masukkan User ID"),
  password: yup.string().required("Masukkan Password"),
});

export default loginSchema;
