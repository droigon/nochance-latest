import {
  DEFAULT_CATEGORIES,
  type Category,
} from "@/utils/constants/categories";

function CategoryCard({ category }: { category: Category }) {
  return (
    <div className="bg-white border border-gray-100 rounded-lg sm:rounded-xl shadow-sm p-3 sm:p-4">
      <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
        <div
          className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full p-2 ${category.color} flex items-center justify-center flex-shrink-0`}
        >
          {category.icon}
        </div>
        <h3 className="text-xs sm:text-sm font-medium text-gray-900 truncate">
          {category.title}
        </h3>
      </div>

      <ul className="grid grid-cols-2 gap-y-1 text-xs text-gray-500 leading-tight">
        {category.items.map((it, idx) => (
          <li key={idx} className="pr-1 sm:pr-2 truncate">
            {it}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function CategoryGrid({
  categories = DEFAULT_CATEGORIES,
}: {
  categories?: Category[];
}) {
  return (
    <section className="py-6 sm:py-8 md:py-10 lg:py-12 px-4 sm:px-6 md:px-8 lg:px-16">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-6 sm:mb-8">
          <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900">
            Browse by Category
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
          {categories.map((c) => (
            <CategoryCard key={c.id} category={c} />
          ))}
        </div>
      </div>
    </section>
  );
}
