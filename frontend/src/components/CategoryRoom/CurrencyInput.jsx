import { useState, useMemo } from 'react';

function formatCurrency(value) {
  if (!value) return '';

  const numericValue = String(value).replace(/\D/g, '');
  if (!numericValue) return '';

  const formatted = numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  return `Rp ${formatted}`;
}

function parseCurrency(value) {
  if (!value) return '';
  return String(value).replace(/\D/g, '');
}

export default function CurrencyInput({ label, name, value, error, onChange, placeholder }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editingValue, setEditingValue] = useState('');

  const displayValue = useMemo(() => {
    if (isEditing) return editingValue;
    return formatCurrency(value);
  }, [isEditing, editingValue, value]);

  const handleChange = (e) => {
    const input = e.target.value;
    const rawValue = parseCurrency(input);
    setEditingValue(formatCurrency(rawValue));

    onChange({
      target: {
        name: name,
        value: rawValue
      }
    });
  };

  const handleFocus = () => {
    setIsEditing(true);
    setEditingValue(formatCurrency(value));
  };

  const handleBlur = () => {
    setIsEditing(false);
    setEditingValue('');
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">{label} *</label>
      <input
        type="text"
        name={name}
        value={displayValue}
        onChange={handleChange}
        onBlur={handleBlur}
        onFocus={handleFocus}
        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${error ? 'border-red-500' : 'border-gray-200'}`}
        placeholder={placeholder || 'Rp 0'}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}