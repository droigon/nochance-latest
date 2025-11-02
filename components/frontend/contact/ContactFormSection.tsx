import React from "react";
import PrimaryButton from "../../ui/PrimaryButton";
import { Textarea } from "../../ui/Textarea";

export default function ContactFormSection() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Left side - description & social */}
      <div className="lg:col-span-6">
        <h3 className=" heading-3 text-left font-semibold text-gray-900 mb-4">
          Reach us out / for any query
        </h3>
        <p className="text-gray-600 mb-6">
          We&apos;d love to hear from you. Fill out the form, and our team will
          get back to you soon.
        </p>

        <div className="mt-8">
          <p className="text-sm text-gray-700 mb-4">Follow us on:</p>
          <div className="flex items-center gap-3 text-gray-700">
            {["in", "tw", "fb"].map((social) => (
              <a
                key={social}
                href="#"
                className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-black"
              >
                {social}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Right side - form */}
      <div className="lg:col-span-6">
        <form className="bg-transparent">
          <div className="grid grid-cols-2 gap-3">
            <input
              type="text"
              placeholder="First Name*"
              className="bg-gray-100 border border-gray-200 px-3 py-2 text-sm rounded"
            />
            <input
              type="text"
              placeholder="Last Name*"
              className="bg-gray-100 border border-gray-200 px-3 py-2 text-sm rounded"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
            <input
              type="email"
              placeholder="Email*"
              className="bg-gray-100 border border-gray-200 px-3 py-2 text-sm rounded"
            />
            <input
              type="text"
              placeholder="Phone Number*"
              className="bg-gray-100 border border-gray-200 px-3 py-2 text-sm rounded"
            />
          </div>

          <Textarea placeholder="Write a Message" className="mt-3" rows={6} />

          <div className="mt-4">
            <PrimaryButton variant="gradient" size="full">
              Submit Message
            </PrimaryButton>
          </div>
        </form>
      </div>
    </div>
  );
}
