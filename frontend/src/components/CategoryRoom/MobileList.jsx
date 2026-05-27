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

function MobileActionButtons({ item, onEdit, onDelete }) {
  return (
    <div className="flex items-center gap-1">
      <button
        onClick={() => onEdit(item)}
        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
      </button>
      <button
        onClick={() => onDelete(item)}
        className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      </button>
    </div>
  );
}

function MobileStatusBadge({ isActive }) {
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
        isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
      }`}
    >
      {isActive ? 'Aktif' : 'Nonaktif'}
    </span>
  );
}

function MobileListItem({ item, isAdmin, onEdit, onDelete }) {
  return (
    <div className="px-4 py-4">
      <div className="flex justify-between items-start mb-3">
        <h3 className="font-semibold text-gray-900">{item.nama_ruangan}</h3>
        {isAdmin && (
          <MobileActionButtons item={item} onEdit={onEdit} onDelete={onDelete} />
        )}
      </div>
      <div className="grid grid-cols-2 gap-2 text-sm">
        <div>
          <span className="text-gray-500">Klinik:</span>
          <span className="text-gray-900 ml-1">{item.klinik?.nama || '-'}</span>
        </div>
        <div>
          <span className="text-gray-500">Kelas:</span>
          <span className="text-gray-900 ml-1">{item.kelasRuangan?.nama_kelas || '-'}</span>
        </div>
        <div>
          <span className="text-gray-500">JK:</span>
          <span className="text-gray-900 ml-1">{item.jenis_kelamin}</span>
        </div>
        <div>
          <span className="text-gray-500">Usia:</span>
          <span className="text-gray-900 ml-1">{item.usia}</span>
        </div>
        <div className="col-span-2">
          <span className="text-gray-500">Penyakit:</span>
          <span className="text-gray-900 ml-1">{item.penyakit}</span>
        </div>
        <div className="col-span-2">
          <span className="text-gray-500">Fasilitas:</span>
          {item.fasilitas_ruangan?.length > 0 ? (
            <div className="flex flex-wrap gap-1 mt-1">
              {item.fasilitas_ruangan.map((facility, index) => (
                <span
                  key={index}
                  className="inline-block px-2 py-0.5 bg-blue-100 text-blue-800 rounded text-xs"
                >
                  {facility}
                </span>
              ))}
            </div>
          ) : (
            <span className="text-gray-400 ml-1">-</span>
          )}
        </div>
        <div className="col-span-2">
          <span className="text-gray-500">Harga:</span>
          <span className="text-gray-900 font-medium ml-1">{formatPrice(item.harga_ruangan)}</span>
        </div>
        <div className="col-span-2 flex items-center gap-2">
          <span className="text-gray-500">Status:</span>
          <MobileStatusBadge isActive={item.is_active} />
        </div>
      </div>
    </div>
  );
}

export default function MobileList({ data, isLoading, isAdmin, onEdit, onDelete }) {
  return (
    <div className="md:hidden divide-y divide-gray-200">
      {isLoading ? (
        <div className="px-4 py-8 text-center text-gray-500">
          <LoadingSpinner />
        </div>
      ) : data.length === 0 ? (
        <div className="px-4 py-8 text-center text-gray-500">
          Tidak ada data ruangan
        </div>
      ) : (
        data.map((item) => (
          <MobileListItem
            key={item.id}
            item={item}
            isAdmin={isAdmin}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))
      )}
    </div>
  );
}