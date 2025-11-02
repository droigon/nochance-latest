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
                <span className="text-xs text-gray-500 flex items-center gap-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                  >
                    <path
                      d="M4.08333 8.10623e-05V1.16675H7.58333V8.10623e-05H8.75V1.16675H11.0833C11.2467 1.16675 11.3847 1.22314 11.4975 1.33591C11.6103 1.44869 11.6667 1.58675 11.6667 1.75008V11.0834C11.6667 11.2467 11.6103 11.3848 11.4975 11.4976C11.3847 11.6104 11.2467 11.6667 11.0833 11.6667H0.583333C0.42 11.6667 0.281944 11.6104 0.169167 11.4976C0.0563889 11.3848 0 11.2467 0 11.0834V1.75008C0 1.58675 0.0563889 1.44869 0.169167 1.33591C0.281944 1.22314 0.42 1.16675 0.583333 1.16675H2.91667V8.10623e-05H4.08333ZM10.5 5.83341H1.16667V10.5001H10.5V5.83341ZM2.91667 2.33342H1.16667V4.66675H10.5V2.33342H8.75V3.50008H7.58333V2.33342H4.08333V3.50008H2.91667V2.33342Z"
                      fill="#4B5563"
                    />
                  </svg>{" "}
                  Reported: {s.reportedDate}
                </span>
                <span className="text-xs text-gray-500 flex items-center gap-1">
                  {" "}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="13"
                    height="13"
                    viewBox="0 0 13 13"
                    fill="none"
                  >
                    <path
                      d="M5.53 -3.24249e-05L11.305 0.8283L12.1333 6.6033L6.76667 11.9583C6.65778 12.075 6.52167 12.1333 6.35833 12.1333C6.195 12.1333 6.05889 12.075 5.95 11.9583L0.175 6.1833C0.0583333 6.07441 0 5.9383 0 5.77497C0 5.61163 0.0583333 5.47552 0.175 5.36663L5.53 -3.24249e-05ZM5.95 1.23663L1.41167 5.77497L6.35833 10.7216L10.8967 6.1833L10.2783 1.85497L5.95 1.23663ZM7.18667 4.94663C7.03889 4.79886 6.93778 4.6258 6.88333 4.42747C6.82889 4.22913 6.82889 4.02886 6.88333 3.82663C6.93778 3.62441 7.03889 3.44941 7.18667 3.30163C7.33444 3.15386 7.5075 3.05274 7.70583 2.9983C7.90417 2.94386 8.10444 2.94386 8.30667 2.9983C8.50889 3.05274 8.68389 3.15386 8.83167 3.30163C8.97944 3.44941 9.08056 3.62441 9.135 3.82663C9.18944 4.02886 9.18944 4.22913 9.135 4.42747C9.08056 4.6258 8.97944 4.79886 8.83167 4.94663C8.68389 5.09441 8.50889 5.19552 8.30667 5.24997C8.10444 5.30441 7.90417 5.30441 7.70583 5.24997C7.5075 5.19552 7.33444 5.09441 7.18667 4.94663Z"
                      fill="#4B5563"
                    />
                  </svg>{" "}
                  {s.fraudType}
                </span>
                <span className="text-xs text-red-600 font-semibold flex items-center gap-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="15"
                    height="14"
                    viewBox="0 0 15 14"
                    fill="none"
                  >
                    <path
                      d="M7.29427 12.8333C6.50094 12.8333 5.7426 12.6816 5.01927 12.3783C4.32705 12.0827 3.71066 11.6646 3.1701 11.1241C2.62955 10.5835 2.21149 9.96714 1.91594 9.27492C1.6126 8.55159 1.46094 7.79325 1.46094 6.99992C1.46094 6.20659 1.6126 5.44825 1.91594 4.72492C2.21149 4.0327 2.62955 3.41631 3.1701 2.87575C3.71066 2.3352 4.32705 1.91714 5.01927 1.62158C5.7426 1.31825 6.50094 1.16658 7.29427 1.16658C8.0876 1.16658 8.84594 1.31825 9.56927 1.62158C10.2615 1.91714 10.8779 2.3352 11.4184 2.87575C11.959 3.41631 12.377 4.0327 12.6726 4.72492C12.9759 5.44825 13.1276 6.20659 13.1276 6.99992C13.1276 7.79325 12.9759 8.55159 12.6726 9.27492C12.377 9.96714 11.959 10.5835 11.4184 11.1241C10.8779 11.6646 10.2615 12.0827 9.56927 12.3783C8.84594 12.6816 8.0876 12.8333 7.29427 12.8333ZM7.29427 11.6666C8.14205 11.6666 8.9276 11.4527 9.65094 11.0249C10.3509 10.6127 10.907 10.0566 11.3193 9.35659C11.747 8.63325 11.9609 7.8477 11.9609 6.99992C11.9609 6.15214 11.747 5.36659 11.3193 4.64325C10.907 3.94325 10.3509 3.38714 9.65094 2.97492C8.9276 2.54714 8.14205 2.33325 7.29427 2.33325C6.44649 2.33325 5.66094 2.54714 4.9376 2.97492C4.2376 3.38714 3.68149 3.94325 3.26927 4.64325C2.84149 5.36659 2.6276 6.15214 2.6276 6.99992C2.6276 7.8477 2.84149 8.63325 3.26927 9.35659C3.68149 10.0566 4.2376 10.6127 4.9376 11.0249C5.66094 11.4527 6.44649 11.6666 7.29427 11.6666ZM5.2526 8.16659H8.46094C8.53872 8.16659 8.60677 8.13742 8.6651 8.07909C8.72344 8.02075 8.7526 7.9527 8.7526 7.87492C8.7526 7.79714 8.72344 7.72909 8.6651 7.67075C8.60677 7.61242 8.53872 7.58325 8.46094 7.58325H6.1276C5.86316 7.58325 5.6201 7.51714 5.39844 7.38492C5.17677 7.2527 4.99983 7.07575 4.8676 6.85409C4.73538 6.63242 4.66927 6.38936 4.66927 6.12492C4.66927 5.86047 4.73538 5.61742 4.8676 5.39575C4.99983 5.17409 5.17677 4.99714 5.39844 4.86492C5.6201 4.7327 5.86316 4.66658 6.1276 4.66658H6.71094V3.49992H7.8776V4.66658H9.33594V5.83325H6.1276C6.04983 5.83325 5.98177 5.86242 5.92344 5.92075C5.8651 5.97909 5.83594 6.04714 5.83594 6.12492C5.83594 6.2027 5.8651 6.27075 5.92344 6.32909C5.98177 6.38742 6.04983 6.41659 6.1276 6.41659H8.46094C8.72538 6.41659 8.96844 6.4827 9.1901 6.61492C9.41177 6.74714 9.58872 6.92409 9.72094 7.14575C9.85316 7.36742 9.91927 7.61047 9.91927 7.87492C9.91927 8.13936 9.85316 8.38242 9.72094 8.60409C9.58872 8.82575 9.41177 9.0027 9.1901 9.13492C8.96844 9.26714 8.72538 9.33325 8.46094 9.33325H7.8776V10.4999H6.71094V9.33325H5.2526V8.16659Z"
                      fill="#DC2626"
                    />
                  </svg>{" "}
                  Loss: {s.lossAmount}
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
              <span className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="11"
                  height="13"
                  viewBox="0 0 11 13"
                  fill="none"
                >
                  <path
                    d="M5.25 4.1008e-05L10.045 1.06171C10.1772 1.09282 10.2861 1.16282 10.3717 1.27171C10.4572 1.3806 10.5 1.50115 10.5 1.63337V7.45504C10.5 8.04615 10.3619 8.59837 10.0858 9.11171C9.80972 9.62504 9.42667 10.045 8.93667 10.3717L5.25 12.8334L1.56333 10.3717C1.07333 10.045 0.690278 9.62504 0.414167 9.11171C0.138056 8.59837 0 8.04615 0 7.45504V1.63337C0 1.50115 0.0427778 1.3806 0.128333 1.27171C0.213889 1.16282 0.322778 1.09282 0.455 1.06171L5.25 4.1008e-05ZM5.25 1.19004L1.16667 2.10004V7.45504C1.16667 7.85171 1.25806 8.22115 1.44083 8.56337C1.62361 8.9056 1.87833 9.1856 2.205 9.40337L5.25 11.4334L8.295 9.40337C8.62167 9.1856 8.87639 8.9056 9.05917 8.56337C9.24194 8.22115 9.33333 7.85171 9.33333 7.45504V2.10004L5.25 1.19004ZM7.85167 4.21171L8.66833 5.04004L4.95833 8.75004L2.485 6.27671L3.31333 5.44837L4.95833 7.10504L7.85167 4.21171Z"
                    fill="#6B7280"
                  />
                </svg>{" "}
                Verified by Nochance Team
              </span>
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
