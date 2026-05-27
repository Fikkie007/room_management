import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import ReCAPTCHA from 'react-google-recaptcha';
import loginSchema from '../validations/loginSchema';
import InputField from '../components/InputField';
import authApi from '../services/api/authApi';

const RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY;

function LoginPage() {
  const navigate = useNavigate();
  const recaptchaRef = useRef(null);
  const [formData, setFormData] = useState({
    id_klinik: '',
    id: '',
    password: '',
    captchaToken: '',
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleCaptchaChange = (token) => {
    setFormData((prev) => ({ ...prev, captchaToken: token || '' }));
    if (errors.captcha) {
      setErrors((prev) => ({ ...prev, captcha: '' }));
    }
  };

  const resetCaptcha = () => {
    recaptchaRef.current?.reset();
    setFormData((prev) => ({ ...prev, captchaToken: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});

    try {
      await loginSchema.validate(formData, { abortEarly: false });

      if (import.meta.env.PROD && !formData.captchaToken) {
        setErrors({ captcha: 'Please verify that you are not a robot' });
        setIsLoading(false);
        return;
      }

      const data = await authApi.login(formData);

      localStorage.setItem('token', data.data.token);
      localStorage.setItem('user', JSON.stringify(data.data.user));
      navigate('/kategori-ruangan');
    } catch (err) {
      if (err.name === 'ValidationError') {
        const validationErrors = {};
        err.inner.forEach((error) => {
          validationErrors[error.path] = error.message;
        });
        setErrors(validationErrors);
      } else {
        setErrors({ general: err.message || 'User tidak ditemukan' });
      }
      resetCaptcha();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br p-4">
      <div className="w-full max-w-[480px]">
        <div className="bg-gradient-to-br rounded-3xl shadow-2xl pt-16 px-8 pb-8 relative overflow-hidden">
          <p className="mb-8">
            Selamat datang di Medeva! Silahkan login untuk melanjutkan
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {errors.general && (
              <div className="bg-red-500/20 text-sm p-3 rounded-lg text-center">
                {errors.general}
              </div>
            )}

            <InputField
              name="id_klinik"
              type="text"
              placeholder="Masukkan Klinik ID"
              value={formData.id_klinik}
              error={errors.id_klinik}
              onChange={handleChange}
              icon={
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              }
            />

            <InputField
              name="id"
              type="text"
              placeholder="Masukkan User ID"
              value={formData.id}
              error={errors.id}
              onChange={handleChange}
              icon={
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              }
            />

            <InputField
              name="password"
              type="password"
              placeholder="Password"
              value={formData.password}
              error={errors.password}
              onChange={handleChange}
              icon={
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              }
            />

            {RECAPTCHA_SITE_KEY && (
              <div className="flex justify-center">
                <ReCAPTCHA
                  ref={recaptchaRef}
                  sitekey={RECAPTCHA_SITE_KEY}
                  onChange={handleCaptchaChange}
                  theme="light"
                />
              </div>
            )}
            {errors.captcha && (
              <p className="text-red-300 text-sm text-center">{errors.captcha}</p>
            )}

            <div className="text-left">
              <a href="#" className="text-sm transition-colors">
                Lupa Password?
              </a>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold rounded-xl shadow-lg transition-colors duration-200 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  <span>Logging in...</span>
                </>
              ) : (
                'Masuk'
              )}
            </button>
          </form>

          <div className="mt-6 text-right">
            <p>Masuk ke medeva apotek</p>
          </div>

          <div className="absolute -bottom-32 -right-32 w-64 h-64 bg-white/10 rounded-full" />
          <div className="absolute -bottom-16 -left-16 w-32 h-32 bg-white/10 rounded-full" />
        </div>
      </div>
    </div>
  );
}

export default LoginPage;