import { ArrowRight, Star } from "lucide-react";
import PrimaryButton from "../ui/PrimaryButton";

export default function VendorsSection() {
  return (
    <div className="bg-gray-50 py-8 sm:py-12 md:py-16 px-4 sm:px-6 md:px-8 lg:px-16">
      <div className="max-w-6xl mx-auto">
        {/* Best in Hair Vendors Section */}
        <section className="mb-12 sm:mb-16 md:mb-20">
          <div className="mb-8 sm:mb-12 md:mb-16 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="max-w-3xl">
              <div className="features-label mb-2 text-xs sm:text-sm">Only trusted sellers</div>

              <h2 className="features-title mb-2 sm:mb-3 text-xl sm:text-2xl md:text-3xl">Best in Hair Vendors</h2>

              <p className="features-subtitle text-xs sm:text-sm md:text-base">
                Top-rated sellers with verified trust scores
              </p>
            </div>

            <PrimaryButton variant="outline" className="text-xs sm:text-sm md:text-base px-3 sm:px-4 py-2 sm:py-2 whitespace-nowrap flex-shrink-0">
              See More <ArrowRight size={14} className="sm:size-[18px]" />
            </PrimaryButton>
          </div>

          {/* Vendor Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            {[1, 2, 3].map((index) => (
              <div
                key={index}
                className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="flex items-start gap-3 sm:gap-4 mb-3 sm:mb-4">
                  {/* Logo/Avatar */}
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <div className="w-5 h-5 sm:w-6 sm:h-6 bg-white rounded opacity-80"></div>
                  </div>

                  {/* Vendor Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-xs sm:text-sm md:text-base text-gray-900 truncate">
                      Adunni Hair Palace
                    </h3>
                    <div className="flex items-center gap-1 text-xs sm:text-sm text-gray-600 mt-1">
                      <div className="w-2 h-2 sm:w-3 sm:h-3 bg-purple-500 rounded-full flex-shrink-0"></div>
                      <span className="truncate">Premium quality hair extensions</span>
                    </div>
                  </div>
                </div>

                {/* Rating and Trust Score */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-2">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-0.5">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className="w-3 h-3 sm:w-4 sm:h-4 fill-green-500 text-green-500"
                        />
                      ))}
                    </div>
                    <span className="text-xs sm:text-sm text-gray-600">
                      (2.8k)
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs sm:text-sm text-gray-500">Trust:</span>
                    <span className="text-base sm:text-lg font-semibold text-green-500 ml-1">
                      98
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
