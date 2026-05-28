export default function Footer() {
    return (
        <footer className="w-full bg-white border-t border-gray-200 py-4 px-6">
            <div className="max-w-7xl mx-auto flex items-center justify-center">
                <p className="text-sm text-gray-500 text-center">
                    © {new Date().getFullYear()} PT Medeva Multi Talenta
                </p>
            </div>
        </footer>
    );
}