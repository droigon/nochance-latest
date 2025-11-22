export default function RightPanel() {
  return (
    <aside className="w-full lg:w-80 lg:flex-shrink-0">
      <div className="lg:sticky lg:top-8 space-y-3 md:space-y-4">
        <div className="rounded-lg border border-gray-100 bg-white p-3 md:p-4 shadow-sm">
          <h3 className="text-xs md:text-sm text-gray-700 font-semibold mb-2 md:mb-3">
            Why Verification Matters
          </h3>
          <ul className="text-xs md:text-sm text-gray-600 space-y-2 md:space-y-3">
            <li className="flex items-start gap-2 md:gap-3">
              <div className="w-6 h-6 md:w-7 md:h-7 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center flex-shrink-0 text-xs font-semibold">
                1
              </div>
              <div>
                <div className="font-medium text-gray-900">Build Trust Faster</div>
                <div className="text-xs text-gray-500 mt-0.5">
                  Verified sellers are 3x more likely to get first sale
                </div>
              </div>
            </li>
            <li className="flex items-start gap-2 md:gap-3">
              <div className="w-6 h-6 md:w-7 md:h-7 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center flex-shrink-0 text-xs font-semibold">
                2
              </div>
              <div>
                <div className="font-medium text-gray-900">Prevent Fraud</div>
                <div className="text-xs text-gray-500 mt-0.5">
                  Our verification protects you from scammers
                </div>
              </div>
            </li>
            <li className="flex items-start gap-2 md:gap-3">
              <div className="w-6 h-6 md:w-7 md:h-7 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center flex-shrink-0 text-xs font-semibold">
                3
              </div>
              <div>
                <div className="font-medium text-gray-900">Get Discovered</div>
                <div className="text-xs text-gray-500 mt-0.5">
                  Verified accounts appear higher in search
                </div>
              </div>
            </li>
          </ul>
        </div>

        <div className="rounded-lg border border-yellow-100 bg-yellow-50 p-3 md:p-4 text-xs md:text-sm text-gray-700 shadow-sm">
          <div className="font-semibold text-gray-900 mb-1 md:mb-2">Security Reminder</div>
          <p className="text-xs text-gray-600">
            Your documents are protected with bank-level encryption and will never
            be shared with third parties.
          </p>
        </div>
      </div>
    </aside>
  );
}
