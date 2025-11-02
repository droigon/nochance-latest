const sample = [
  {
    id: "qs1",
    name: "QuickCash Investment Ltd",
    fraudType: "Investment Fraud",
    reportedDate: "1/15/2024",
    lossAmount: "₦850,000",
    status: "Verified",
    summary:
      "Promised 50% returns in 30 days, disappeared with investments. Multiple victims confirmed.",
  },
  {
    id: "fd1",
    name: "FastDelivery Services",
    fraudType: "E-commerce Scam",
    reportedDate: "1/12/2024",
    lossAmount: "₦125,000",
    status: "Verified",
    summary:
      "Collected payment for electronics delivery, never delivered items. Fake tracking numbers provided.",
  },
  {
    id: "ml1",
    name: "MegaLoans Nigeria",
    fraudType: "Loan Scam",
    reportedDate: "1/10/2024",
    lossAmount: "₦45,000",
    status: "Investigating",
    summary:
      "Requested upfront fees for loan processing, no loan disbursed. Under investigation.",
  },
  {
    id: "tr1",
    name: "TechHub Repairs",
    fraudType: "Service Fraud",
    reportedDate: "1/8/2024",
    lossAmount: "₦78,000",
    status: "Resolved",
    summary:
      "Collected payment for laptop repairs, damaged device further. Issue resolved through mediation.",
  },
];

function StatusBadge({ status }: { status: string }) {
  const getStatusStyles = (status: string) => {
    switch (status) {
      case "Verified":
        return "bg-red-50 text-red-700 border-red-200";
      case "Investigating":
        return "bg-yellow-50 text-yellow-700 border-yellow-200";
      case "Resolved":
        return "bg-green-50 text-green-700 border-green-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  return (
    <span
      className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium border ${getStatusStyles(
        status
      )}`}
    >
      <div
        className={`w-2 h-2 rounded-full mr-1 ${
          status === "Verified"
            ? "bg-red-400"
            : status === "Investigating"
            ? "bg-yellow-400"
            : status === "Resolved"
            ? "bg-green-400"
            : "bg-gray-400"
        }`}
      />
      {status}
    </span>
  );
}

export default function VerifiedScams() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {sample.map((s) => (
        <div
          key={s.id}
          className="bg-white rounded-lg shadow-sm border border-gray-100 p-6"
        >
          <div className="flex items-start justify-between mb-3">
            <div>
              <h3 className="font-semibold text-gray-900 text-base">
                {s.name}
              </h3>
              <div className="flex items-center gap-3 mt-1">
                <span className="text-xs text-gray-500">
                  📅 Reported: {s.reportedDate}
                </span>
                <span className="text-xs text-gray-500">🔍 {s.fraudType}</span>
                <span className="text-xs text-red-600 font-semibold">
                  💰 Loss: {s.lossAmount}
                </span>
              </div>
            </div>
            <StatusBadge status={s.status} />
          </div>

          <div className="bg-red-50 border-l-4 border-red-400 p-3 mb-4">
            <p className="text-sm text-gray-700 leading-relaxed">{s.summary}</p>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center text-xs text-gray-500">
              <span className="mr-2">✅ Verified by Nochance Team</span>
            </div>
            <button className="text-sm text-purple-600 hover:text-purple-700 font-medium flex items-center gap-1">
              View Full Report
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
