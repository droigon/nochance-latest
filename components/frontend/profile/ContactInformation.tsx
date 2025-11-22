import { Mail } from "lucide-react";
import {
  FaPhone,
  FaWhatsapp,
  FaFacebook,
  FaTelegram,
  FaTiktok,
  FaYoutube,
  FaInstagram,
} from "react-icons/fa";
interface ContactInformationProps {
  whatsapp?: string | null;
  phoneNumber?: string | null;
  email?: string | null;
  instagram?: string | null;
  telegram?: string | null;
  tiktok?: string | null;
  facebook?: string | null;
  x?: string | null;
  youtube?: string | null;
}

export default function ContactInformation({
  whatsapp,
  phoneNumber,
  email,
  instagram,
  telegram,
  tiktok,
  facebook,
  x,
  youtube,
}: ContactInformationProps) {
  const contacts = [];

  if (whatsapp) {
    contacts.push({
      icon: FaWhatsapp,
      iconColor: "text-[#1E1D1D]",
      fillColor: "bg-[#EFEFEF]",
      title: "WhatsApp",
      href: `https://wa.me/${whatsapp.replace(/\D/g, "")}`,
      label: whatsapp.startsWith("+") ? whatsapp : `+${whatsapp}`,
      external: true,
    });
  }

  if (phoneNumber) {
    contacts.push({
      icon: FaPhone,
      iconColor: "text-[#1E1D1D]",
      title: "Phone number",
      href: `tel:${phoneNumber}`,
      label: phoneNumber,
      external: false,
    });
  }

  if (email) {
    contacts.push({
      icon: Mail,
      iconColor: "text-[#1E1D1D]",
      title: "Email",
      href: `mailto:${email}`,
      label: email,
      external: false,
    });
  }

  if (instagram) {
    contacts.push({
      icon: FaInstagram,
      iconColor: "text-[#1E1D1D]",
      title: "Instagram",
      href: `https://instagram.com/${instagram.replace(/^@/, "")}`,
      label: `@${instagram.replace(/^@/, "")}`,
      external: true,
    });
  }

  if (contacts.length === 0) {
    return null;
  }

  return (
    <section className="bg-white  p-6 mb-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        Contact Information
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 justify-content-center gap-4">
        {contacts.map((contact, idx) => {
          const Icon = contact.icon;
          return (
            <a
              key={idx}
              href={contact.href}
              target={contact.external ? "_blank" : undefined}
              rel={contact.external ? "noreferrer" : undefined}
              className="flex items-center gap-3 text-gray-700 transition"
            >
              <Icon
                className={`w-12 h-12 ${contact.iconColor} bg-[#EFEFEF] rounded-xl p-4`}
                style={{ backgroundColor: contact.fillColor }}
              />
              <div className="flex flex-col">
                <span className="text-sm font-bold">{contact.title}</span>
                <span className="text-sm text-gray-500">{contact.label}</span>
              </div>
            </a>
          );
        })}
      </div>
    </section>
  );
}
