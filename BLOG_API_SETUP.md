# Strapi Blog API Integration - Setup Guide

## ✅ What We've Done

1. **Created Strapi Blog API Integration**: `/lib/strapi-blog-api.ts`
2. **Updated Blog Page**: `/app/(main)/blog/page.tsx` now uses API calls instead of mock data
3. **Environment Variables**: Added Strapi configuration to `.env.local`
4. **API Token**: Your Strapi API token is already configured

## 📋 Next Steps to Complete Setup

### 1. Create Content Types in Strapi Admin

Visit `http://localhost:1337/admin` and create these content types:

#### Article Collection Type
- **title** (Text - Short text) - Required
- **slug** (Text - Short text) - Required, Unique  
- **content** (Rich text) - Required
- **excerpt** (Text - Long text) - Optional
- **featuredImage** (Media - Single media) - Optional
- **featured** (Boolean) - Default: false
- **author** (Relation - Many to one with Author)
- **category** (Relation - Many to one with Category) 
- **tags** (Relation - Many to many with Tag)

#### Author Collection Type
- **name** (Text - Short text) - Required
- **bio** (Text - Long text) - Optional
- **avatar** (Media - Single media) - Optional
- **email** (Email) - Optional

#### Category Collection Type
- **name** (Text - Short text) - Required
- **slug** (Text - Short text) - Required, Unique
- **description** (Text - Long text) - Optional

#### Tag Collection Type
- **name** (Text - Short text) - Required
- **slug** (Text - Short text) - Required, Unique

### 2. Set API Permissions

1. Go to **Settings** → **Users & Permissions Plugin** → **Roles** → **Public**
2. Enable these permissions for Article, Author, Category, and Tag:
   - ✅ `find` (to list items)
   - ✅ `findOne` (to get individual items)

### 3. Add Sample Content

Create some sample articles with:
- Title and slug
- Content (rich text)
- Excerpt
- Featured image
- Author
- Category
- Tags
- Set some articles as "featured"

### 4. Test Your API

Once content is created, test these endpoints:
- Articles: `http://localhost:1337/api/articles?populate=*`
- Categories: `http://localhost:1337/api/categories`
- Tags: `http://localhost:1337/api/tags`

## 🔧 Key Changes Made

### Blog Page (`/app/(main)/blog/page.tsx`)
- ✅ Replaced mock data with Strapi API calls
- ✅ Added real-time loading states
- ✅ Added error handling for API failures
- ✅ Added search and category filtering
- ✅ Added pagination support
- ✅ Responsive grid layout with proper image optimization

### API Integration (`/lib/strapi-blog-api.ts`)
- ✅ `getBlogArticles()` - Fetch articles with filtering
- ✅ `getFeaturedArticles()` - Fetch featured articles
- ✅ `getBlogCategories()` - Fetch categories for filters
- ✅ `getBlogArticleBySlug()` - Fetch single article
- ✅ `transformStrapiArticle()` - Convert Strapi format to app format
- ✅ Proper error handling and TypeScript types

### Environment Setup
```bash
NEXT_PUBLIC_STRAPI_API_URL=http://localhost:1337
STRAPI_API_TOKEN=your_token_here
```

## 🚀 How It Works

1. **Page Load**: Fetches featured articles, categories, and regular articles from Strapi
2. **Search**: Filters articles by title/excerpt on frontend
3. **Category Filter**: API call with category filter
4. **Pagination**: API calls with page parameters
5. **Individual Articles**: Dynamic routes `/blog/[slug]` fetch from Strapi

## 🎯 Benefits of This Setup

- **Dynamic Content**: Content managed through Strapi CMS
- **SEO Friendly**: Proper meta tags and structured data
- **Performance**: Image optimization with Next.js Image component
- **User Experience**: Loading states, error handling, search & filters
- **Scalable**: Pagination and API-based architecture
- **Type Safe**: Full TypeScript integration

## 🔍 Testing

1. Start Strapi: `cd my-strapi-blog && npx strapi develop`
2. Visit: `http://localhost:1337/admin`
3. Create content types and add sample articles
4. Start Next.js: `npm run dev` 
5. Visit: `http://localhost:3000/blog`

Your blog is now powered by Strapi API calls! 🎉