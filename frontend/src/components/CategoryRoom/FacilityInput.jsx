import { useState } from 'react';

export default function FacilityInput({ facilities, onFacilitiesChange }) {
  const [inputValue, setInputValue] = useState('');

  const handleAdd = () => {
    if (inputValue.trim()) {
      onFacilitiesChange([...facilities, inputValue.trim()]);
      setInputValue('');
    }
  };

  const handleRemove = (index) => {
    onFacilitiesChange(facilities.filter((_, i) => i !== index));
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAdd();
    }
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">Fasilitas Ruangan</label>
      <div className="flex gap-2 mb-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Tambah fasilitas (e.g. AC, TV, WiFi)"
        />
        <button
          type="button"
          onClick={handleAdd}
          className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700"
        >
          + Tambah
        </button>
      </div>
      {facilities?.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {facilities.map((facility, index) => (
            <span
              key={index}
              className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
            >
              {facility}
              <button
                type="button"
                onClick={() => handleRemove(index)}
                className="ml-1 text-blue-600 hover:text-blue-800"
              >
                ×
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}