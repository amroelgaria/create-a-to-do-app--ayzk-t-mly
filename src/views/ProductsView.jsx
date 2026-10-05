import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CATEGORIES } from '../data/mockData';
import ProductCard from '../components/ProductCard';
import { 
  Package, 
  Search, 
  Filter, 
  SlidersHorizontal, 
  ArrowUpDown, 
  Sparkles,
  Check
} from 'lucide-react';

export default function ProductsView() {
  const { 
    products, 
    vendors, 
    lang, 
    t, 
    searchQuery, 
    setSearchQuery, 
    selectedCategory, 
    setSelectedCategory 
  } = useApp();

  const [selectedVendorFilter, setSelectedVendorFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest'); // newest, priceAsc, priceDesc, rating
  const [onlyDiscounted, setOnlyDiscounted] = useState(false);
  const [onlyInStock, setOnlyInStock] = useState(false);

  const filteredProducts = products
    .filter((p) => {
      const matchSearch =
        p.titleAr.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.titleEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.descriptionAr.toLowerCase().includes(searchQuery.toLowerCase());

      const matchCategory = selectedCategory === 'all' || p.category === selectedCategory;
      const matchVendor = selectedVendorFilter === 'all' || p.vendorId === selectedVendorFilter;
      const matchDiscount = !onlyDiscounted || Boolean(p.discountPriceEGP);
      const matchStock = !onlyInStock || p.stock > 0;

      return matchSearch && matchCategory && matchVendor && matchDiscount && matchStock;
    })
    .sort((a, b) => {
      const priceA = a.discountPriceEGP || a.priceEGP;
      const priceB = b.discountPriceEGP || b.priceEGP;
      if (sortBy === 'priceAsc') return priceA - priceB;
      if (sortBy === 'priceDesc') return priceB - priceA;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0; // default order
    });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Title & Stats */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
            {lang === 'ar' ? 'سوق المنتجات والتسوق' : 'Browse All Products'}
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            {lang === 'ar' 
              ? `عرض ${filteredProducts.length} منتج متوفر من مختلف البراندات والمتاجر المسجلة`
              : `Showing ${filteredProducts.length} items from registered brands`}
          </p>
        </div>

        {/* Search input in catalog */}
        <div className="relative w-full md:w-80">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t('searchPlaceholder')}
            className="w-full bg-white border border-slate-200 focus:border-indigo-500 rounded-xl py-2.5 px-9 text-xs outline-hidden shadow-xs"
          />
          <Search className="w-4 h-4 text-slate-400 absolute start-3 top-3" />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute end-3 top-2.5 text-xs text-slate-400 hover:text-slate-600"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Filter Control Bar */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs space-y-4">
        
        {/* Row 1: Categories */}
        <div className="flex gap-2 overflow-x-auto pb-1 text-xs">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3.5 py-2 rounded-xl font-bold transition-colors cursor-pointer shrink-0 ${
              selectedCategory === 'all' ? 'bg-indigo-600 text-white shadow-xs' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {t('allCategories')}
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-2 rounded-xl font-bold transition-colors cursor-pointer shrink-0 ${
                selectedCategory === cat.id ? 'bg-indigo-600 text-white shadow-xs' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {lang === 'ar' ? cat.nameAr : cat.nameEn}
            </button>
          ))}
        </div>

        {/* Row 2: Secondary Filters (Brand, Sort, Checkboxes) */}
        <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
          
          <div className="flex flex-wrap items-center gap-3">
            {/* Brand Filter Dropdown */}
            <div className="flex items-center gap-1.5">
              <span className="text-slate-400 font-bold">{lang === 'ar' ? 'البراند:' : 'Brand:'}</span>
              <select
                value={selectedVendorFilter}
                onChange={(e) => setSelectedVendorFilter(e.target.value)}
                className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-700 outline-hidden"
              >
                <option value="all">{lang === 'ar' ? 'جميع المتاجر والبراندات' : 'All Stores'}</option>
                {vendors.map((v) => (
                  <option key={v.id} value={v.id}>
                    {lang === 'ar' ? v.nameAr : v.nameEn}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort by */}
            <div className="flex items-center gap-1.5">
              <span className="text-slate-400 font-bold">{lang === 'ar' ? 'الترتيب:' : 'Sort:'}</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-700 outline-hidden"
              >
                <option value="newest">{lang === 'ar' ? 'الأحدث أولاً' : 'Newest'}</option>
                <option value="priceAsc">{lang === 'ar' ? 'السعر: من الأقل للأعلى' : 'Price: Low to High'}</option>
                <option value="priceDesc">{lang === 'ar' ? 'السعر: من الأعلى للأقل' : 'Price: High to Low'}</option>
                <option value="rating">{lang === 'ar' ? 'الأعلى تقييماً' : 'Highest Rated'}</option>
              </select>
            </div>
          </div>

          {/* Checkboxes */}
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-1.5 cursor-pointer text-slate-700 font-semibold select-none">
              <input
                type="checkbox"
                checked={onlyDiscounted}
                onChange={(e) => setOnlyDiscounted(e.target.checked)}
                className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
              />
              <span>{lang === 'ar' ? 'عروض وخصومات فقط' : 'Discounts Only'}</span>
            </label>

            <label className="flex items-center gap-1.5 cursor-pointer text-slate-700 font-semibold select-none">
              <input
                type="checkbox"
                checked={onlyInStock}
                onChange={(e) => setOnlyInStock(e.target.checked)}
                className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
              />
              <span>{lang === 'ar' ? 'متوفر بالمخزن فقط' : 'In Stock Only'}</span>
            </label>
          </div>

        </div>

      </div>

      {/* Product Grid */}
      {filteredProducts.length === 0 ? (
        <div className="bg-white rounded-3xl p-16 text-center border border-slate-200 space-y-3">
          <Package className="w-12 h-12 text-slate-300 mx-auto" />
          <h3 className="text-base font-bold text-slate-700">
            {lang === 'ar' ? 'لم يتم العثور على أي منتج يطابق معاييرك' : 'No matching products found'}
          </h3>
          <p className="text-xs text-slate-400">
            {lang === 'ar' ? 'يرجى مراجعة خيارات التصفية أو البحث عن كلمة أخرى' : 'Try clearing filters or adjusting your search'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

    </div>
  );
}
