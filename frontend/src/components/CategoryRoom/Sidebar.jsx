import { DoorOpen } from "lucide-react";

export default function Sidebar() {
    return (
        <aside className="w-64 shadow-sm hidden md:flex flex-col" >
            {/* Menu */}
            <nav className="flex-1 p-4 space-y-2" >
                <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-blue-50 text-blue-600 font-medium">
                    <DoorOpen className="w-5 h-5" />
                    Kategori Ruangan
                </button>
            </nav>
        </aside >
    );
}