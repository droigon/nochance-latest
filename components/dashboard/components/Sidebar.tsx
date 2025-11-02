import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white shadow-md flex flex-col">
      <div className="h-16 flex items-center justify-center text-xl font-bold">
        MyApp
      </div>
      <nav className="flex-1 px-4 space-y-2">
        <Link href="/admin" className="block p-2 rounded hover:bg-gray-100">
          Admin
        </Link>
        <Link href="/vendor" className="block p-2 rounded hover:bg-gray-100">
          Vendor
        </Link>
        <Link href="/user" className="block p-2 rounded hover:bg-gray-100">
          User
        </Link>
      </nav>
    </aside>
  );
}
