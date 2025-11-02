import Image from "next/image";
export default function HowReportingWorks() {
  const steps = [
    {
      id: 1,
      icon: "/assets/icons/search-2.svg",
      title: "Target Details",
      desc: "Who or what you reported",
    },
    {
      id: 2,
      icon: "/assets/icons/document.svg",
      title: "Incident Info",
      desc: "When and how it happened",
    },
    {
      id: 3,
      icon: "/assets/icons/upload.svg",
      title: "Upload Evidence",
      desc: "Receipts, screenshots, links",
    },
    {
      id: 4,
      icon: "/assets/icons/profile.svg",
      title: "Your Details",
      desc: "Contact info for follow up",
    },
    {
      id: 5,
      icon: "/assets/icons/search.svg",
      title: "Investigation",
      desc: "We review and take action",
    },
  ];

  return (
    <div className="py-8">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-semibold">How Reporting Works</h3>
        <p className="text-gray-600 mt-2">
          Our simple 5-step process ensures your report is thorough and
          actionable
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-5 gap-6 items-start">
        {steps.map((s) => (
          <div key={s.id} className="text-center">
            <div className=" ">
              <Image
                src={s.icon}
                width={24}
                height={24}
                className=" mx-auto rounded-full bg-gray-100 flex items-center justify-center"
                alt={s.icon}
              />
            </div>
            <div className="w-16 h-16 mx-auto rounded-full flex items-center justify-center  font-bold">
              {s.id}
            </div>
            <div className="mt-3 font-medium">{s.title}</div>
            <div className="text-xs text-gray-500 mt-1">{s.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
