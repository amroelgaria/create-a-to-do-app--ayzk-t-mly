import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CATEGORIES } from '../data/mockData';
import BrandCard from '../components/BrandCard';
import { Store, Search, Filter, Sparkles, ShieldCheck } from 'lucide-react';

export default function BrandsView() {
  const { lang, t, vendors, setActiveView, setIsSubscriptionModalOpen } = useApp();

  const [search, setSearch] = useState('');
  const [selectedCat, setSelectedCat] = useState('all');
  const [filterTier, setFilterTier] = useState('all'); // all, vip, gold, starter

  const filteredVendors = vendors.filter((v) => {
    const matchesSearch = 
      v.nameAr.toLowerCase().includes(search.toLowerCase()) ||
      v.nameEn.toLowerCase().includes(search.toLowerCase()) ||
      v.bioAr.toLowerCase().includes(search.toLowerCase());

    const matchesCat = selectedCat === 'all' || v.category === selectedCat;
    const matchesTier = filterTier === 'all' || v.badgeTier === filterTier;

    return matchesSearch && matchesCat && matchesTier;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-indigo-900 via-indigo-800 to-purple-900 rounded-3xl p-8 sm:p-10 text-white relative overflow-hidden shadow-xl">
        <div className="max-w-2xl space-y-3 relative z-10">
          <div className="inline-flex items-center gap-1.5 bg-white/10 px-3 py-1 rounded-full text-xs font-bold text-amber-300 backdrop-blur-md">
            <Store className="w-3.5 h-3.5" />
            <span>{lang === 'ar' ? 'دليل المتاجر والبراندات المسجلة' : 'Registered Brands Directory'}</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black">
            {lang === 'ar' ? 'تصفح البراندات وتسوق مباشرة' : 'Explore Brands & Shop Directly'}
          </h1>

          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
            {lang === 'ar' 
              ? 'كل براند هنا يمتلك متجره المستقل، معتمد ومرخص لعرض منتجاته والتواصل الفوري مع الزبائن.'
              : 'Discover independent brands, inspect their collections, and place orders directly with genuine sellers.'}
          </p>
        </div>

        {/* Join CTA inside banner */}
        <div className="mt-6 sm:mt-0 sm:absolute sm:top-1/2 sm:-translate-y-1/2 sm:end-8 z-10">
          <button
            onClick={() => setActiveView('onboarding')}
            className="bg-amber-400 hover:bg-amber-500 text-slate-950 font-black px-6 py-3 rounded-2xl text-xs sm:text-sm shadow-lg transition-transform hover:scale-105 cursor-pointer flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            <span>{lang === 'ar' ? 'سجّل براندك معنا' : 'Register Your Brand'}</span>
          </button>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row gap-3 items-center justify-between">
          
          {/* Search */}
          <div className="relative w-full md:max-w-md">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={lang === 'ar' ? 'ابحث باسم البراند أو التخصص...' : 'Search brand name or specialty...'}
              className="w-full bg-slate-50 border border-slate-200 focus:bg-white focus:border-indigo-500 rounded-xl py-2.5 px-9 text-xs sm:text-sm outline-hidden transition-all text-slate-800"
            />
            <Search className="w-4 h-4 text-slate-400 absolute start-3 top-3" />
            {search && (
              <button 
                onClick={() => setSearch('')}
                className="absolute end-3 top-3 text-slate-400 text-xs hover:text-slate-600"
              >
                ✕
              </button>
            )}
          </div>

          {/* Tier Selector */}
          <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0 text-xs">
            <span className="text-slate-400 font-bold text-[11px] shrink-0">{lang === 'ar' ? 'التصنيف:' : 'Tier:'}</span>
            <button
              onClick={() => setFilterTier('all')}
              className={`px-3 py-1.5 rounded-xl font-bold transition-colors cursor-pointer shrink-0 ${filterTier === 'all' ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
            >
              {lang === 'ar' ? 'جميع الرتب' : 'All Tiers'}
            </button>
            <button
              onClick={() => setFilterTier('vip')}
              className={`px-3 py-1.5 rounded-xl font-bold transition-colors cursor-pointer shrink-0 ${filterTier === 'vip' ? 'bg-amber-500 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
            >
              VIP ماسي
            </button>
            <button
              onClick={() => setFilterTier('gold')}
              className={`px-3 py-1.5 rounded-xl font-bold transition-colors cursor-pointer shrink-0 ${filterTier === 'gold' ? 'bg-indigo-500 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
            >
              براند ذهبي
            </button>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex gap-2 overflow-x-auto pb-1 text-xs">
          <button
            onClick={() => setSelectedCat('all')}
            className={`px-3.5 py-1.5 rounded-xl font-bold transition-colors cursor-pointer shrink-0 ${selectedCat === 'all' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
          >
            {t('allCategories')}
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCat(cat.id)}
              className={`px-3.5 py-1.5 rounded-xl font-bold transition-colors cursor-pointer shrink-0 ${selectedCat === cat.id ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
            >
              {lang === 'ar' ? cat.nameAr : cat.nameEn}
            </button>
          ))}
        </div>
      </div>

      {/* Brands Grid */}
      {filteredVendors.length === 0 ? (
        <div className="bg-white rounded-3xl p-16 text-center border border-slate-200 space-y-3">
          <Store className="w-12 h-12 text-slate-300 mx-auto" />
          <h3 className="text-base font-bold text-slate-700">
            {lang === 'ar' ? 'لم يتم العثور على براندات مطابقة' : 'No matching brands found'}
          </h3>
          <p className="text-xs text-slate-400">
            {lang === 'ar' ? 'جرّب البحث باسم آخر أو إزالة التصفية' : 'Try adjusting your search criteria'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVendors.map((vendor) => (
            <BrandCard key={vendor.id} vendor={vendor} />
          ))}
        </div>
      )}

    </div>
  );
}
