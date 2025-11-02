import React from "react";

type Category = {
  id: string;
  title: string;
  items: string[];
};

function CategoryCard({ category }: { category: Category }) {
  return (
    <div className="bg-white border border-gray-100 rounded-lg shadow-sm p-4">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-8 h-8 rounded-full bg-purple-50 flex items-center justify-center text-purple-600 font-semibold">
          {category.title.charAt(0)}
        </div>
        <h3 className="text-sm font-medium text-gray-900">{category.title}</h3>
      </div>

      <ul className="grid grid-cols-2 gap-y-1 text-xs text-gray-500 leading-tight">
        {category.items.map((it, idx) => (
          <li key={idx} className="pr-2">
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
    <section className="py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-xl font-semibold text-gray-900">
            Browse by Category
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map((c) => (
            <CategoryCard key={c.id} category={c} />
          ))}
        </div>
      </div>
    </section>
  );
}

const DEFAULT_CATEGORIES: Category[] = [
  {
    id: "food-1",
    title: "Food & Drinks",
    items: [
      "Restaurants",
      "Bakeries",
      "Bars & Lounges",
      "Cafes",
      "Fast Food",
      "Food Vendors",
    ],
  },
  {
    id: "food-2",
    title: "Food & Drinks",
    items: [
      "Tailors",
      "Salons & Barbers",
      "Nail Technicians",
      "Shoe Makers",
      "Boutiques",
      "Makeup Artists",
    ],
  },
  {
    id: "food-3",
    title: "Food & Drinks",
    items: [
      "Electricians",
      "AC/Gen Repair",
      "Security",
      "Plumbers",
      "Cleaners",
      "Gardening",
    ],
  },
  {
    id: "food-4",
    title: "Food & Drinks",
    items: [
      "Clinics",
      "Labs",
      "Dentists",
      "Pharmacies",
      "Physiotherapy",
      "Opticians",
    ],
  },
  {
    id: "food-5",
    title: "Food & Drinks",
    items: [
      "Electronics Shops",
      "Supermarkets",
      "Computer Shops",
      "Gift Shops",
      "Phone Accessories",
      "Bookstores",
    ],
  },
  {
    id: "food-6",
    title: "Food & Drinks",
    items: [
      "Ride-hailing",
      "Auto Mechanics",
      "Toll Agencies",
      "Logistics",
      "Car Wash",
      "Spare Parts",
    ],
  },
  {
    id: "food-7",
    title: "Food & Drinks",
    items: ["Event Planners", "Rentals", "Videographers", "Decorators", "DJs"],
  },
  {
    id: "food-8",
    title: "Food & Drinks",
    items: ["Tutors", "Skills Academies", "Computer Training", "Music Lessons"],
  },
  {
    id: "food-9",
    title: "Food & Drinks",
    items: ["Builders", "Welders", "Tilts", "Architects"],
  },
  {
    id: "food-10",
    title: "Food & Drinks",
    items: ["Caterers", "Event Venues", "Cooks", "Food Trucks"],
  },
  {
    id: "food-11",
    title: "Food & Drinks",
    items: ["Florists", "Gift Stores", "Party Supplies"],
  },
  {
    id: "food-12",
    title: "Food & Drinks",
    items: ["Pet Care", "Veterinarians", "Pet Shops"],
  },
];
