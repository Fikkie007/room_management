import { Bell } from "lucide-react";

export default function Header({ user, onLogout }) {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          <div className="flex items-center gap-4">
            <h1 className="text-xl font-semibold text-gray-900">
              {user.nama_lengkap}
            </h1>
          </div>

          <div>
            <p className="font-semibold text-gray-800">Medeva Mint</p>
          </div>

          <div className="flex items-center gap-4">

            {/* Notification Icon */}
            <button className="relative p-2 rounded-full hover:bg-gray-100 transition-colors">
              <Bell className="w-5 h-5 text-gray-700" />

              {/* Notification Badge */}
              <span className="absolute -top-1 -right-1 flex items-center justify-center w-4 h-4 text-[10px] font-bold text-white bg-red-500 rounded-full">
                3
              </span>
            </button>

            {user && (
              <div className="flex-col">
                <span className="text-sm text-gray-600 hidden sm:block">
                  {user.klinik?.nama || '-'}
                </span>
                <span className="text-sm text-gray-600 hidden sm:block">
                  ({user.is_admin ? 'Admin' : 'User'})
                </span>
              </div>
            )}

            <button
              onClick={onLogout}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}