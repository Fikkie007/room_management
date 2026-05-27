import kategoriRuanganSchema from '../../validations/kategoriRuanganSchema';
import useFormOptions from '../../hooks/useFormOptions';
import SelectField from './SelectField';
import FacilityInput from './FacilityInput';
import CurrencyInput from './CurrencyInput';

function ToggleField({ label, name, checked, onChange }) {
  return (
    <div className="flex items-center justify-between">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange({ target: { name, value: !checked } })}
        className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
          checked ? 'bg-green-500' : 'bg-gray-200'
        }`}
      >
        <span
          className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
            checked ? 'translate-x-5' : 'translate-x-0'
          }`}
        />
      </button>
    </div>
  );
}

function SubmitButton({ isSubmitting, mode }) {
  return (
    <button
      type="submit"
      disabled={isSubmitting}
      className="px-6 py-3 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center gap-2"
    >
      {isSubmitting && (
        <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      )}
      {mode === 'add' ? 'Simpan' : 'Update'}
    </button>
  );
}

function InputField({ label, name, value, error, onChange, placeholder }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">{label} *</label>
      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${error ? 'border-red-500' : 'border-gray-200'}`}
        placeholder={placeholder}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}

const GENDER_OPTIONS = [
  { value: 'Laki-laki', label: 'Laki-laki' },
  { value: 'Perempuan', label: 'Perempuan' },
  { value: 'Campur', label: 'Campur' },
];

export default function RoomForm({ isOpen, onClose, mode, formData, formErrors, isSubmitting, onFormChange, onSubmit }) {
  const { klinikList, kelasList, isLoading } = useFormOptions(isOpen);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await kategoriRuanganSchema.validate(formData, { abortEarly: false });
      onSubmit(formData);
    } catch (err) {
      if (err.name === 'ValidationError') {
        const errors = {};
        err.inner.forEach((error) => { errors[error.path] = error.message; });
        onSubmit(formData, errors);
      }
    }
  };

  const handleFacilitiesChange = (newFacilities) => {
    onFormChange({ target: { name: 'fasilitas_ruangan', value: newFacilities } });
  };

  if (!isOpen) return null;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">

      <InputField
        label="Nama Ruangan"
        name="nama_ruangan"
        value={formData.nama_ruangan}
        error={formErrors.nama_ruangan}
        onChange={onFormChange}
        placeholder="Masukkan nama ruangan"
      />

      <div className="grid grid-cols-2 gap-4">
        <SelectField
          label="Klinik"
          name="id_klinik"
          value={formData.id_klinik}
          error={formErrors.id_klinik}
          onChange={onFormChange}
          options={klinikList}
          placeholder="Pilih klinik"
          disabled={isLoading}
        />
        <SelectField
          label="Kelas Ruangan"
          name="id_kelas_ruangan"
          value={formData.id_kelas_ruangan}
          error={formErrors.id_kelas_ruangan}
          onChange={onFormChange}
          options={kelasList}
          placeholder="Pilih kelas ruangan"
          disabled={isLoading}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <SelectField
          label="Jenis Kelamin"
          name="jenis_kelamin"
          value={formData.jenis_kelamin}
          error={formErrors.jenis_kelamin}
          onChange={onFormChange}
          options={GENDER_OPTIONS}
          placeholder="Pilih jenis kelamin"
        />
        <InputField
          label="Usia"
          name="usia"
          value={formData.usia}
          error={formErrors.usia}
          onChange={onFormChange}
          placeholder="e.g. 18-60 tahun"
        />
      </div>

      <InputField
        label="Penyakit"
        name="penyakit"
        value={formData.penyakit}
        error={formErrors.penyakit}
        onChange={onFormChange}
        placeholder="Masukkan jenis penyakit"
      />

      <FacilityInput
        facilities={formData.fasilitas_ruangan || []}
        onFacilitiesChange={handleFacilitiesChange}
      />

      <CurrencyInput
        label="Harga Ruangan"
        name="harga_ruangan"
        value={formData.harga_ruangan}
        error={formErrors.harga_ruangan}
        onChange={onFormChange}
        placeholder="Rp 0"
      />

      <ToggleField
        label="Status Aktif"
        name="is_active"
        checked={formData.is_active ?? true}
        onChange={onFormChange}
      />

      <div className="flex justify-end gap-3 pt-4">
        <button
          type="button"
          onClick={onClose}
          className="px-6 py-3 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
        >
          Batal
        </button>
        <SubmitButton isSubmitting={isSubmitting} mode={mode} />
      </div>
    </form>
  );
}