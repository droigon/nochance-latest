export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="w-12 h-12 rounded-full border-4 border-t-transparent border-purple-600 animate-spin mx-auto" />
        <p className="mt-4 text-sm text-gray-600">Loading dashboard…</p>
      </div>
    </div>
  );
}
