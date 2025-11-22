import { User } from "lucide-react";

interface SessionItemProps {
  device: string;
  location: string;
  isActive?: boolean;
}

export default function SessionItem({
  device,
  location,
  isActive = false,
}: SessionItemProps) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
          <User className="w-4 h-4 text-gray-600" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-900">{device}</span>
            {isActive && (
              <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
                Active
              </span>
            )}
          </div>
          <p className="text-xs text-gray-600">{location}</p>
        </div>
      </div>
      {!isActive && (
        <button className="text-sm text-red-600 hover:text-red-800">
          End session
        </button>
      )}
    </div>
  );
}
