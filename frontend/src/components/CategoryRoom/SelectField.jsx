const SelectField = ({ label, name, value, error, onChange, options, placeholder, disabled }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">{label} *</label>
    <select
      name={name}
      value={value}
      onChange={onChange}
      disabled={disabled}
      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${error ? 'border-red-500' : 'border-gray-200'}`}
    >
      <option value="">{placeholder || 'Pilih opsi'}</option>
      {options.map((opt) => (
        <option key={opt.id || opt.value} value={opt.id || opt.value}>
          {opt.nama || opt.nama_kelas || opt.label}
        </option>
      ))}
    </select>
    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
  </div>
);

export default SelectField;