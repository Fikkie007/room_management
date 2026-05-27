import { formatPrice } from '../../utils/formatters';

function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center gap-2">
      <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
      </svg>
      <span>Loading...</span>
    </div>
  );
}

function ActionButtons({ item, onEdit, onDelete }) {
  return (
    <div className="flex items-center justify-center gap-2">
      <button
        onClick={() => onEdit(item)}
        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
        title="Edit"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
      </button>
      <button
        onClick={() => onDelete(item)}
        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
        title="Delete"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      </button>
    </div>
  );
}

function StatusBadge({ isActive }) {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
        isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
      }`}
    >
      {isActive ? 'Aktif' : 'Nonaktif'}
    </span>
  );
}

function FacilityTags({ facilities }) {
  if (!facilities || facilities.length === 0) {
    return <span className="text-gray-400">-</span>;
  }
  return (
    <div className="flex flex-wrap gap-1 max-w-[200px]">
      {facilities.slice(0, 3).map((facility, index) => (
        <span
          key={index}
          className="inline-block px-2 py-0.5 bg-blue-100 text-blue-800 rounded text-xs"
        >
          {facility}
        </span>
      ))}
      {facilities.length > 3 && (
        <span className="inline-block px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs">
          +{facilities.length - 3}
        </span>
      )}
    </div>
  );
}

export default function DataTable({ data, isLoading, isAdmin, onEdit, onDelete }) {
  const colSpan = isAdmin ? 10 : 9;

  return (
    <div className="hidden md:block overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Nama Ruangan</th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Klinik</th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Kelas</th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Jenis Kelamin</th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Usia</th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Penyakit</th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Fasilitas</th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Harga</th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Status</th>
            {isAdmin && (
              <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">Aksi</th>
            )}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {isLoading ? (
            <tr>
              <td colSpan={colSpan} className="px-6 py-8 text-center text-gray-500">
                <LoadingSpinner />
              </td>
            </tr>
          ) : data.length === 0 ? (
            <tr>
              <td colSpan={colSpan} className="px-6 py-8 text-center text-gray-500">
                Tidak ada data ruangan
              </td>
            </tr>
          ) : (
            data.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm text-gray-900 font-medium">{item.nama_ruangan}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{item.klinik?.nama || '-'}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{item.kelasRuangan?.nama_kelas || '-'}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{item.jenis_kelamin}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{item.usia}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{item.penyakit}</td>
                <td className="px-6 py-4">
                  <FacilityTags facilities={item.fasilitas_ruangan} />
                </td>
                <td className="px-6 py-4 text-sm text-gray-900 font-medium">{formatPrice(item.harga_ruangan)}</td>
                <td className="px-6 py-4">
                  <StatusBadge isActive={item.is_active} />
                </td>
                {isAdmin && (
                  <td className="px-6 py-4 text-center">
                    <ActionButtons item={item} onEdit={onEdit} onDelete={onDelete} />
                  </td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}