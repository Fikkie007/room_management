const InputField = ({ name, type, placeholder, icon, value, error, onChange }) => (
  <div>
    <div className="relative">
      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
        {icon}
      </span>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`w-full pl-12 pr-4 py-4 bg-white rounded-xl text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300 ${
          error ? 'ring-2 ring-red-400' : ''
        }`}
      />
    </div>
    {error && <p className="text-red-300 text-sm mt-1 pl-2">{error}</p>}
  </div>
);

export default InputField;