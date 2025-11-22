import Header from "@/components/frontend/Header";
import Footer from "@/components/frontend/Footer";
import FooterCTA from "@/components/frontend/FooterCTA";
import SearchBar from "@/components/frontend/SearchBar";
import { SortMenu } from "@/components/frontend/search/SortMenu";
import { serverApiFetch } from "@/lib/serverApi";
import type {
  BusinessProfile,
  BusinessSearchResponse,
} from "@/utils/types/business";
import type { StandardResponse } from "@/utils/types/api";
import Link from "next/link";
import { Suspense } from "react";
import {
  Facebook,
  Globe,
  Instagram,
  MapPin,
  MessageCircle,
  ShieldCheck,
} from "lucide-react";

// Force dynamic rendering since we use searchParams and fetch with no-store
export const dynamic = "force-dynamic";

const PAGE_SIZE = 10;
const getDefaultRating = () => 4.0; // Default rating when trustLevel is removed

type PageSearchParams = {
  q?: string;
  page?: string;
  sort?: string;
};

type CategoryStat = {
  label: string;
  count: number;
};

type QuickStats = {
  totalBusinesses: number;
  totalReviews: number;
  avgRating: string;
  newThisMonth: number;
};

const fallbackResponse: BusinessSearchResponse = {
  items: [],
  total: 0,
  page: 1,
  limit: PAGE_SIZE,
  filters: {},
};

const buildSearchUrl = (params: {
  q?: string;
  page: number;
  sort?: string;
}) => {
  const qs = new URLSearchParams();
  qs.set("page", params.page.toString());
  qs.set("limit", PAGE_SIZE.toString());
  if (params.q) qs.set("q", params.q);
  if (params.sort) qs.set("sort", params.sort);
  const query = qs.toString();
  return `/api/v1/business/search${query ? `?${query}` : ""}`;
};

const formatBusinessType = (value?: string | null) => {
  if (!value) return "General Business";
  return value
    .toLowerCase()
    .split("_")
    .map((chunk) => chunk.charAt(0).toUpperCase() + chunk.slice(1))
    .join(" ");
};

const formatReviewLabel = (count: number) =>
  count > 0
    ? `${count.toLocaleString()} review${count === 1 ? "" : "s"}`
    : "No reviews yet";

const buildCategories = (items: BusinessProfile[]): CategoryStat[] => {
  const map = new Map<string, number>();
  items.forEach((item) => {
    const label =
      formatBusinessType(item.verification?.businessVerification?.type) ||
      formatBusinessType(item.businessType);
    map.set(label, (map.get(label) ?? 0) + 1);
  });
  return Array.from(map.entries())
    .map(([label, count]) => ({ label, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 6);
};

const buildQuickStats = (
  summary: BusinessSearchResponse,
  items: BusinessProfile[]
): QuickStats => {
  const totalReviews = items.reduce(
    (sum, item) => sum + (item._count?.reviews ?? 0),
    0
  );
  const avgRating =
    items.length > 0
      ? (
          items.reduce((sum) => sum + getDefaultRating(), 0) / items.length
        ).toFixed(1)
      : "–";
  const newThisMonth = items.filter((item) => {
    if (!item.createdAt) return false;
    const created = new Date(item.createdAt);
    const now = new Date();
    const diffDays =
      (now.getTime() - created.getTime()) / (1000 * 60 * 60 * 24);
    return diffDays <= 30;
  }).length;

  return {
    totalBusinesses: summary.total,
    totalReviews,
    avgRating,
    newThisMonth,
  };
};

const sortResults = (items: BusinessProfile[], sort: string) => {
  const clone = [...items];
  switch (sort) {
    case "trust":
      // Sort by verified status when trustLevel is removed
      return clone.sort((a, b) => (b.verified ? 1 : 0) - (a.verified ? 1 : 0));
    case "newest":
      return clone.sort(
        (a, b) =>
          new Date(b.createdAt ?? 0).getTime() -
          new Date(a.createdAt ?? 0).getTime()
      );
    case "rating":
    default:
      return clone.sort(
        (a, b) => (b._count?.reviews ?? 0) - (a._count?.reviews ?? 0)
      );
  }
};

const buildSocialLinks = (business: BusinessProfile) => {
  const socials = business.verification?.socialMediaVerification;
  if (!socials) return [];
  return [
    socials.instagram && {
      label: "Instagram",
      icon: Instagram,
      href: `https://instagram.com/${socials.instagram.replace(/^@/, "")}`,
    },
    socials.whatsapp && {
      label: "WhatsApp",
      icon: MessageCircle,
      href: socials.whatsapp.startsWith("http")
        ? socials.whatsapp
        : `https://wa.me/${socials.whatsapp.replace(/\D/g, "")}`,
    },
    socials.facebook && {
      label: "Facebook",
      icon: Facebook,
      href: socials.facebook.startsWith("http")
        ? socials.facebook
        : `https://facebook.com/${socials.facebook}`,
    },
  ].filter(Boolean) as {
    label: string;
    icon: typeof Instagram;
    href: string;
  }[];
};

async function fetchSearchResults(params: {
  q?: string;
  page: number;
  sort?: string;
}) {
  try {
    const response = await serverApiFetch<
      StandardResponse<BusinessSearchResponse>
    >(buildSearchUrl(params));
    if (!response.success || !response.data) {
      return fallbackResponse;
    }
    return response.data;
  } catch (error) {
    console.error("Unable to load businesses", error);
    return fallbackResponse;
  }
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: PageSearchParams;
}) {
  const query = typeof searchParams.q === "string" ? searchParams.q : "";
  const sort =
    typeof searchParams.sort === "string" ? searchParams.sort : "rating";
  const page =
    typeof searchParams.page === "string" &&
    !Number.isNaN(Number(searchParams.page))
      ? Math.max(1, Number(searchParams.page))
      : 1;

  const data = await fetchSearchResults({ q: query, page, sort });
  const orderedItems = sortResults(data.items ?? [], sort);
  const categories = buildCategories(data.items ?? []);
  const stats = buildQuickStats(data, data.items ?? []);

  return (
    <>
      <Header />
      <main className="bg-gray-50 min-h-screen">
        <section className="mx-auto max-w-6xl px-4 py-10 space-y-8">
          <div className="space-y-4">
            <div>
              <SearchBar initialQuery={query} />
            </div>
          </div>

          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900">
                Browse Businesses
              </h2>
              <p className="text-sm text-gray-500">
                Discover trusted Nigerian small businesses
              </p>
            </div>

            <Suspense
              fallback={
                <div className="h-10 w-32 bg-gray-100 rounded-lg animate-pulse" />
              }
            >
              <SortMenu currentSort={sort} />
            </Suspense>
          </div>

          <div className="grid gap-6 lg:grid-cols-[minmax(0,2fr)_320px]">
            <div className="space-y-4">
              {orderedItems.length === 0 ? (
                <EmptyState query={query} />
              ) : (
                orderedItems.map((business) => (
                  <ResultCard key={business.id} business={business} />
                ))
              )}
            </div>

            <aside className="space-y-6">
              <CategoriesPanel categories={categories} />
              <QuickStatsPanel stats={stats} />
            </aside>
          </div>
        </section>
      </main>
      <FooterCTA />
      <Footer />
    </>
  );
}

const EmptyState = ({ query }: { query?: string }) => (
  <div className="rounded-2xl border border-dashed border-gray-200 bg-white p-10 text-center">
    <p className="text-lg font-semibold text-gray-900">No businesses yet</p>
    <p className="mt-2 text-sm text-gray-500">
      {query
        ? `We couldn’t find any vendors matching “${query}”.`
        : "Try a different search term or check back soon for new vendors."}
    </p>
  </div>
);

const CategoriesPanel = ({ categories }: { categories: CategoryStat[] }) => (
  <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
    <div className="flex items-center justify-between">
      <p className="font-semibold text-gray-900">Related Categories</p>
      <Link
        href="/categories"
        className="text-xs font-semibold text-indigo-600 hover:text-indigo-800"
      >
        View all
      </Link>
    </div>
    <ul className="mt-4 space-y-3 text-sm text-gray-600">
      {categories.length === 0 ? (
        <li className="text-gray-400">
          Categories will appear as businesses publish data.
        </li>
      ) : (
        categories.map((category) => (
          <li
            key={category.label}
            className="flex items-center justify-between"
          >
            <span>{category.label}</span>
            <span className="font-semibold text-gray-900">
              {category.count}
            </span>
          </li>
        ))
      )}
    </ul>
  </div>
);

const QuickStatsPanel = ({ stats }: { stats: QuickStats }) => (
  <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
    <p className="font-semibold text-gray-900">Quick stats</p>
    <dl className="mt-4 space-y-4 text-sm">
      <div className="flex items-center justify-between">
        <dt className="text-gray-500">Total Businesses</dt>
        <dd className="font-semibold text-gray-900">
          {stats.totalBusinesses.toLocaleString()}
        </dd>
      </div>
      <div className="flex items-center justify-between">
        <dt className="text-gray-500">Total Reviews</dt>
        <dd className="font-semibold text-gray-900">
          {stats.totalReviews.toLocaleString()}
        </dd>
      </div>
      <div className="flex items-center justify-between">
        <dt className="text-gray-500">Average Rating</dt>
        <dd className="font-semibold text-gray-900">{stats.avgRating}</dd>
      </div>
      <div className="flex items-center justify-between">
        <dt className="text-gray-500">New This Month</dt>
        <dd className="font-semibold text-emerald-600">
          +{stats.newThisMonth.toLocaleString()}
        </dd>
      </div>
    </dl>
  </div>
);

const ResultCard = ({ business }: { business: BusinessProfile }) => {
  const verification = business.verification;
  const businessInfo = verification?.businessVerification;
  const address =
    verification?.addressVerification?.address ||
    verification?.personalVerification?.address ||
    "Address not provided";
  const reviewCount = business._count?.reviews ?? 0;
  const rating = getDefaultRating();
  const socialLinks = buildSocialLinks(business);

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-base font-semibold text-gray-600">
              {businessInfo?.name?.charAt(0)?.toUpperCase() ?? "B"}
            </div>
            <div>
              <Link
                href={`/business/${business.id}`}
                className="text-lg font-semibold text-gray-900 hover:text-indigo-600"
              >
                {businessInfo?.name || "Unnamed Business"}
              </Link>
              <p className="text-sm text-gray-500">
                {businessInfo?.description ||
                  formatBusinessType(business.businessType)}
              </p>
            </div>
          </div>
          <p className="mt-3 flex items-center gap-2 text-sm text-gray-600">
            <MapPin className="h-4 w-4 text-gray-400" />
            {address}
          </p>
          <div className="mt-3 flex flex-wrap items-center gap-3 text-xs">
            {business.verified && (
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1 font-semibold text-emerald-700">
                <ShieldCheck className="h-4 w-4" />
                Verified
              </span>
            )}
            <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-3 py-1 font-medium text-gray-700">
              {rating.toFixed(1)} • {formatReviewLabel(reviewCount)}
            </span>
            {businessInfo?.website && (
              <a
                href={
                  businessInfo.website.startsWith("http")
                    ? businessInfo.website
                    : `https://${businessInfo.website}`
                }
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-3 py-1 font-medium text-gray-700 hover:text-indigo-600"
              >
                <Globe className="h-4 w-4" />
                Website
              </a>
            )}
          </div>
        </div>

        <div className="flex flex-col items-end gap-3 text-right">
          <div>
            <p className="text-xs uppercase tracking-wide text-gray-400">
              Trust Score
            </p>
            <p className="text-3xl font-semibold text-gray-900">N/A</p>
          </div>
          <div className="flex flex-wrap justify-end gap-2">
            {socialLinks.length === 0 ? (
              <span className="text-xs text-gray-400">No socials yet</span>
            ) : (
              socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-gray-200 p-2 text-gray-500 hover:text-indigo-600"
                >
                  <link.icon className="h-4 w-4" />
                </a>
              ))
            )}
          </div>
          <Link
            href={`/business/${business.id}`}
            className="text-sm font-semibold text-indigo-600 hover:text-indigo-800"
          >
            View profile →
          </Link>
        </div>
      </div>
    </div>
  );
};
