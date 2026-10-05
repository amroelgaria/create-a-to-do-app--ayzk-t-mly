import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import ProductCard from '../components/ProductCard';
import { 
  ShieldCheck, 
  Star, 
  MapPin, 
  Phone, 
  MessageCircle, 
  Package, 
  Calendar, 
  Search, 
  ArrowRight, 
  ArrowLeft,
  Share2,
  Sparkles,
  Check
} from 'lucide-react';

export default function StorefrontView() {
  const { 
    selectedBrandId, 
    vendors, 
    products, 
    lang, 
    t, 
    setActiveView 
  } = useApp();

  const [search, setSearch] = useState('');
  const [copiedLink, setCopiedLink] = useState(false);

  const vendor = vendors.find((v) => v.id === selectedBrandId) || vendors[0];
  const vendorProducts = products.filter((p) => p.vendorId === vendor.id);

  const filteredProducts = vendorProducts.filter((p) => {
    const titleMatch = 
      p.titleAr.toLowerCase().includes(search.toLowerCase()) ||
      p.titleEn.toLowerCase().includes(search.toLowerCase());
    return titleMatch;
  });

  const handleShareStore = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const getBadgeDetails = (tier) => {
    if (tier === 'vip') return { text: 'براند VIP ماسي', color: 'bg-amber-100 text-amber-900 border-amber-300' };
    if (tier === 'gold') return { text: 'براند ذهبي موثق', color: 'bg-indigo-100 text-indigo-900 border-indigo-300' };
    return { text: 'بائع معتمد', color: 'bg-emerald-100 text-emerald-900 border-emerald-300' };
  };

  const badgeInfo = getBadgeDetails(vendor.badgeTier);

  return (
    <div className="pb-20 space-y-8">
      
      {/* Store Header & Cover */}
      <div className="relative">
        <div className="h-60 sm:h-80 w-full overflow-hidden bg-slate-900 relative">
          <img
            src={vendor.cover}
            alt={vendor.nameAr}
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
          
          {/* Back button */}
          <button
            onClick={() => setActiveView('brands')}
            className="absolute top-6 start-6 z-10 bg-white/90 hover:bg-white text-slate-800 text-xs font-bold py-2 px-3.5 rounded-xl shadow-md backdrop-blur-xs flex items-center gap-1.5 transition-all cursor-pointer"
          >
            {lang === 'ar' ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
            <span>{lang === 'ar' ? 'الرجوع لدليل البراندات' : 'Back to Brands'}</span>
          </button>
        </div>

        {/* Store Profile Container */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24 sm:-mt-28 relative z-10">
          <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xl">
            <div className="flex flex-col md:flex-row gap-6 items-start md:items-end justify-between">
              
              <div className="flex flex-col sm:flex-row gap-5 items-start sm:items-center">
                <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-3xl overflow-hidden border-4 border-white shadow-xl bg-white shrink-0">
                  <img
                    src={vendor.logo}
                    alt={vendor.nameAr}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
                      {lang === 'ar' ? vendor.nameAr : vendor.nameEn}
                    </h1>
                    <span className={`inline-flex items-center gap-1 text-xs font-bold px-3 py-1 rounded-full border shadow-xs ${badgeInfo.color}`}>
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>{badgeInfo.text}</span>
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 max-w-xl leading-relaxed">
                    {lang === 'ar' ? vendor.bioAr : vendor.bioEn}
                  </p>

                  {/* Meta items */}
                  <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pt-1">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      <span>{lang === 'ar' ? vendor.cityAr : vendor.cityEn}</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      <span>{lang === 'ar' ? `انضم في ${vendor.joinedDate}` : `Joined ${vendor.joinedDate}`}</span>
                    </span>
                    <span className="flex items-center gap-1 font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-lg border border-amber-200">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                      <span>{vendor.rating} ({vendor.reviewsCount} تقييم)</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons for Vendor Store */}
              <div className="flex flex-wrap gap-2.5 w-full md:w-auto">
                {vendor.whatsapp && (
                  <a
                    href={`https://wa.me/${vendor.whatsapp}?text=${encodeURIComponent(
                      lang === 'ar' 
                        ? `مرحباً متجر ${vendor.nameAr}، أود الاستفسار عن منتجاتكم في سوق البراندات` 
                        : `Hello ${vendor.nameEn}, inquiring about products`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 md:flex-initial bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-5 rounded-2xl text-xs sm:text-sm transition-all flex items-center justify-center gap-2 shadow-md shadow-emerald-200 cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>{lang === 'ar' ? 'مراسلة المتجر عبر واتساب' : 'Chat on WhatsApp'}</span>
                  </a>
                )}

                <button
                  onClick={handleShareStore}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-3 px-4 rounded-2xl text-xs sm:text-sm transition-colors flex items-center gap-2 cursor-pointer"
                  title="مشاركة رابط المتجر"
                >
                  {copiedLink ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
                  <span>{copiedLink ? (lang === 'ar' ? 'تم نسخ الرابط' : 'Copied') : (lang === 'ar' ? 'مشاركة' : 'Share')}</span>
                </button>
              </div>

            </div>

            {/* Subscription active trust banner */}
            <div className="mt-6 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between text-xs text-slate-500 gap-2">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                <span>{lang === 'ar' ? 'متجر معتمد باشتراك رسمي نشط على منصة سوق البراندات' : 'Verified store with active merchant subscription'}</span>
              </div>
              <span className="font-bold text-indigo-600">
                {vendorProducts.length} {lang === 'ar' ? 'منتجات معروضة للبيع' : 'Products for sale'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Catalog & Search within Store */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Inner Search Bar */}
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <h2 className="text-xl sm:text-2xl font-black text-slate-900">
            {lang === 'ar' ? `منتجات ${vendor.nameAr}` : `${vendor.nameEn} Products`}
          </h2>

          <div className="relative w-full sm:w-72">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={lang === 'ar' ? 'ابحث في منتجات هذا المتجر...' : 'Search this store...'}
              className="w-full bg-white border border-slate-200 focus:border-indigo-500 rounded-xl py-2 px-9 text-xs outline-hidden shadow-xs"
            />
            <Search className="w-4 h-4 text-slate-400 absolute start-3 top-2.5" />
          </div>
        </div>

        {/* Store Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="bg-white rounded-3xl p-16 text-center border border-slate-200 space-y-3">
            <Package className="w-12 h-12 text-slate-300 mx-auto" />
            <h3 className="text-base font-bold text-slate-700">
              {lang === 'ar' ? 'لا توجد منتجات مطابقة في هذا المتجر' : 'No matching products in this store'}
            </h3>
            <p className="text-xs text-slate-400">
              {lang === 'ar' ? 'جرّب البحث بكلمة أخرى' : 'Try searching with different keywords'}
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

    </div>
  );
}
