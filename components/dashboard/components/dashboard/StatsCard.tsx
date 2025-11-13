import { cn } from "@/lib/utils";

interface StatsCardProps {
  icon: React.ReactNode;
  label: string;
  value: number;
  iconBgColor?: string;
}

export function StatsCard({ icon, label, value, iconBgColor = "bg-purple-50" }: StatsCardProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm flex items-start gap-4 border border-gray-100 transition hover:shadow-md">
      <div className={cn("w-12 h-12 rounded-md flex items-center justify-center", iconBgColor)}>
        {icon}
      </div>
      <div>
        <h4 className="text-lg font-semibold text-gray-900">{value}</h4>
        <p className="text-sm text-gray-600">{label}</p>
      </div>
    </div>
  );
}
