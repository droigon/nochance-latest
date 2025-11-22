import {
  CheckCircle2,
  MessageCircle,
  ExternalLink,
  Facebook,
  Instagram,
} from "lucide-react";

interface BusinessDetailsProps {
  businessName: string;
  description?: string | null;
  services: string[];
  isPhoneVerified: boolean;
  isCACRegistered: boolean;
  isVerified: boolean;
  whatsapp?: string | null;
  facebook?: string | null;
  instagram?: string | null;
}

export default function BusinessDetails({
  businessName,
  description,
  services,
  isPhoneVerified,
  isCACRegistered,
  isVerified,
  whatsapp,
  facebook,
  instagram,
}: BusinessDetailsProps) {
  const defaultDescription = `${businessName} offers premium tailoring services specializing in custom-made clothing for men and women. With over 10 years of experience, we provide exceptional craftsmanship, personalized service, and the ability to create garments from corporate wear to traditional attire.`;

  return (
    <section className="bg-white p-6 mb-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        Business Details
      </h2>
      <p className="text-gray-700 text-sm leading-relaxed mb-6">
        {description || defaultDescription}
      </p>

      {/* Services */}
      {services.length > 0 && (
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">Services</h3>
          <div className="flex flex-wrap gap-2">
            {services.map((service) => (
              <span
                key={service}
                className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full text-xs font-medium transition cursor-pointer"
              >
                {service}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Verification Status */}
      <div className="pt-4 border-t border-gray-200 flex flex-wrap gap-4">
        <div className="flex items-center gap-2">
          <CheckCircle2
            className={`w-5 h-5 ${
              isPhoneVerified ? "text-green-600" : "text-gray-300"
            }`}
          />
          <span className="text-sm text-gray-700">Phone Verified</span>
        </div>

        <div className="flex items-center gap-2">
          <CheckCircle2
            className={`w-5 h-5 ${
              isCACRegistered ? "text-green-600" : "text-gray-300"
            }`}
          />
          <span className="text-sm text-gray-700">CAC Registered</span>
        </div>

        <div className="flex items-center gap-2">
          <CheckCircle2
            className={`w-5 h-5 ${
              isVerified ? "text-green-600" : "text-gray-300"
            }`}
          />
          <span className="text-sm text-gray-700">Verified Identity</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3 mt-6 pt-4 border-t border-gray-200">
        <button className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-semibold transition flex items-center gap-2">
          <MessageCircle className="w-4 h-4" />
          Write a review
        </button>
        {whatsapp && (
          <a
            href={`https://wa.me/${whatsapp.replace(/\D/g, "")}`}
            target="_blank"
            rel="noreferrer"
            className="px-4 py-2.5 border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-lg text-sm font-semibold transition flex items-center gap-2"
          >
            <MessageCircle className="w-4 h-4" />
            WhatsApp
            <ExternalLink className="w-3 h-3" />
          </a>
        )}
        {facebook && (
          <a
            href={`https://facebook.com/${facebook.replace(/^@/, "")}`}
            target="_blank"
            rel="noreferrer"
            className="px-4 py-2.5 border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-lg text-sm font-semibold transition flex items-center gap-2"
          >
            <Facebook className="w-4 h-4" />
            Facebook
            <ExternalLink className="w-3 h-3" />
          </a>
        )}
        {instagram && (
          <a
            href={`https://instagram.com/${instagram.replace(/^@/, "")}`}
            target="_blank"
            rel="noreferrer"
            className="px-4 py-2.5 border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-lg text-sm font-semibold transition flex items-center gap-2"
          >
            <Instagram className="w-4 h-4" />
            Instagram
            <ExternalLink className="w-3 h-3" />
          </a>
        )}
      </div>
    </section>
  );
}
