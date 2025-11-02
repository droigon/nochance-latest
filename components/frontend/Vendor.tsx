import { ArrowRight, Star } from "lucide-react";
import PrimaryButton from "../ui/PrimaryButton";

export default function VendorsSection() {
  return (
    <div className="bg-gray-50 py-16 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Best in Hair Vendors Section */}
        <section className="mb-20">
          <div className="mb-16 flex items-start justify-between">
            <div className="max-w-3xl">
              <div className="features-label mb-2">Only trusted sellers</div>

              <h2 className="features-title mb-3">Best in Hair Vendors</h2>

              <p className="features-subtitle">
                Top-rated sellers with verified trust scores
              </p>
            </div>

            <div>
              <PrimaryButton variant="outline">
                See More <ArrowRight size={16} />
              </PrimaryButton>
            </div>
          </div>

          {/* Vendor Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="flex items-start gap-4 mb-4">
                  {/* Logo/Avatar */}
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                    <div className="w-6 h-6 bg-white rounded opacity-80"></div>
                  </div>

                  {/* Vendor Info */}
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">
                      Adunni Hair Palace
                    </h3>
                    <div className="flex items-center gap-1 text-sm text-gray-600 mt-1">
                      <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                      <span>Premium quality hair extensions</span>
                    </div>
                  </div>
                </div>

                {/* Rating and Trust Score */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className="w-4 h-4 fill-green-500 text-green-500"
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">
                      (2,847 reviews)
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-sm text-gray-500">Trust Score:</span>
                    <span className="text-lg font-semibold text-green-500 ml-1">
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
