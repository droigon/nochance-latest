import Image from "next/image";
export default function ContactInfoSection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Message Us */}
      <div className="bg-white p-6 rounded shadow-sm flex items-start gap-4">
        <div className="w-12 h-12 rounded-md bg-white flex items-center justify-center text-purple-600">
          <Image
            src="/assets/icons/mail.svg"
            alt="Email Icon"
            width={34}
            height={34}
          />
        </div>
        <div>
          <h4 className="text-lg font-medium text-gray-900">Message Us</h4>
          <p className="text-sm text-purple-600">admin@nochance.app</p>
        </div>
      </div>

      {/* Call Us */}
      <div className="bg-white p-6 rounded shadow-sm flex items-start gap-4">
        <div className="w-12 h-12 rounded-md bg-white  flex items-center justify-center text-purple-600">
          <Image
            src="/assets/icons/headphone.svg"
            alt="Phone Icon"
            width={34}
            height={34}
          />
        </div>
        <div>
          <h4 className="text-lg font-medium text-gray-900">Call Us</h4>
          <p className="text-sm text-purple-600">+1 (000) 000-0000</p>
        </div>
      </div>

      {/* Office Location */}
      <div className="bg-white p-6 rounded shadow-sm flex items-start gap-4">
        <div className="w-12 h-12 rounded-md bg-white flex items-center justify-center text-purple-600">
          <Image
            src="/assets/icons/location.svg"
            alt="Location Icon"
            width={34}
            height={34}
          />
        </div>
        <div>
          <h4 className="text-lg font-medium text-gray-900">Office Location</h4>
          <p className="text-sm text-purple-600">Ahmedabad, India - 380001</p>
        </div>
      </div>
    </div>
  );
}
