export default function RightPanel() {
  return (
    <aside className="w-80 flex-shrink-0">
      <div className="sticky top-6 space-y-4">
        <div className="rounded-lg border border-gray-100 bg-white p-4">
          <h3 className="text-sm font-semibold mb-2">
            Why Verification Matters
          </h3>
          <ul className="text-sm text-gray-600 space-y-3">
            <li className="flex items-start gap-3">
              <div className="w-7 h-7 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center">
                1
              </div>
              <div>
                <div className="font-medium">Build Trust Faster</div>
                <div className="text-xs text-gray-500">
                  Verified sellers are 3x more likely to get first sale
                </div>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-7 h-7 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center">
                2
              </div>
              <div>
                <div className="font-medium">Prevent Fraud</div>
                <div className="text-xs text-gray-500">
                  Our verification protects you from scammers
                </div>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-7 h-7 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center">
                3
              </div>
              <div>
                <div className="font-medium">Get Discovered</div>
                <div className="text-xs text-gray-500">
                  Verified accounts appear higher in search
                </div>
              </div>
            </li>
          </ul>
        </div>

        <div className="rounded-lg border border-yellow-100 bg-yellow-50 p-4 text-sm text-gray-700">
          <div className="font-semibold mb-1">Security Reminder</div>
          Your documents are protected with bank-level encryption and will never
          be shared with third parties.
        </div>
      </div>
    </aside>
  );
}
