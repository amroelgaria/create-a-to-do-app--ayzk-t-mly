import React from 'react';
import { useApp } from '../context/AppContext';
import { ShieldCheck, Star, Package, MessageCircle, ExternalLink, Award } from 'lucide-react';

export default function BrandCard({ vendor }) {
  const { lang, t, setActiveView, setSelectedBrandId, products } = useApp();

  const vendorProducts = products.filter((p) => p.vendorId === vendor.id);

  const handleVisitStore = () => {
    setSelectedBrandId(vendor.id);
    setActiveView('storefront');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getBadgeInfo = (tier) => {
    if (tier === 'vip') {
      return {
        text: lang === 'ar' ? 'براند VIP ماسي' : 'VIP Diamond Brand',
        classes: 'bg-amber-100 text-amber-800 border-amber-300'
      };
    }
    if (tier === 'gold') {
      return {
        text: lang === 'ar' ? 'براند ذهبي موثق' : 'Gold Verified Brand',
        classes: 'bg-indigo-100 text-indigo-800 border-indigo-300'
      };
    }
    return {
      text: lang === 'ar' ? 'بائع معتمد' : 'Verified Seller',
      classes: 'bg-emerald-100 text-emerald-800 border-emerald-300'
    };
  };

  const badge = getBadgeInfo(vendor.badgeTier);

  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-slate-200/90 shadow-xs hover:shadow-xl transition-all duration-300 group flex flex-col justify-between">
      <div>
        {/* Cover Photo */}
        <div className="relative h-36 sm:h-44 w-full overflow-hidden bg-slate-100">
          <img
            src={vendor.cover}
            alt={vendor.nameAr}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-black/20" />
          
          {/* Badge Top Left */}
          <div className="absolute top-3 start-3">
            <span className={`inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full border shadow-xs backdrop-blur-xs ${badge.classes}`}>
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{badge.text}</span>
            </span>
          </div>

          {/* City / Location */}
          <div className="absolute top-3 end-3 text-[11px] text-white/90 bg-black/40 backdrop-blur-xs px-2.5 py-0.5 rounded-full font-medium">
            {lang === 'ar' ? vendor.cityAr : vendor.cityEn}
          </div>
        </div>

        {/* Brand Profile Row */}
        <div className="px-5 pt-0 pb-4 relative">
          {/* Logo overlapping cover */}
          <div className="relative -mt-12 mb-3 flex items-end justify-between">
            <div className="w-20 h-20 rounded-2xl border-4 border-white overflow-hidden shadow-md bg-white">
              <img
                src={vendor.logo}
                alt={vendor.nameAr}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Rating badge */}
            <div className="flex items-center gap-1 bg-amber-50 border border-amber-200 text-amber-800 px-2 py-1 rounded-xl text-xs font-bold shadow-xs">
              <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
              <span>{vendor.rating}</span>
              <span className="text-[10px] text-amber-600 font-normal">({vendor.reviewsCount})</span>
            </div>
          </div>

          {/* Name & Bio */}
          <div>
            <h3 
              onClick={handleVisitStore}
              className="text-base sm:text-lg font-extrabold text-slate-900 group-hover:text-indigo-600 transition-colors cursor-pointer"
            >
              {lang === 'ar' ? vendor.nameAr : vendor.nameEn}
            </h3>
            <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
              {lang === 'ar' ? vendor.bioAr : vendor.bioEn}
            </p>
          </div>

          {/* Info stats pill */}
          <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-100 text-xs text-slate-600">
            <span className="flex items-center gap-1.5 font-medium">
              <Package className="w-4 h-4 text-indigo-500" />
              <span>{vendorProducts.length} {t('productsCount')}</span>
            </span>

            <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-semibold text-[11px]">
              {vendor.ordersCount}+ {lang === 'ar' ? 'طلب ناجح' : 'Orders'}
            </span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="px-5 pb-5 pt-2 flex items-center gap-2">
        <button
          onClick={handleVisitStore}
          className="flex-1 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-bold py-2.5 px-4 rounded-xl text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs shadow-indigo-200"
        >
          <span>{t('visitStore')}</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </button>

        {vendor.whatsapp && (
          <a
            href={`https://wa.me/${vendor.whatsapp}?text=${encodeURIComponent(
              lang === 'ar' 
                ? `مرحباً متجر ${vendor.nameAr}، أود الاستفسار عن منتجاتكم في سوق البراندات` 
                : `Hello ${vendor.nameEn}, inquiring about your products on Souq Brands`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            title={lang === 'ar' ? 'مراسلة المتجر عبر واتساب' : 'Chat on WhatsApp'}
            className="p-2.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-600 rounded-xl transition-colors cursor-pointer border border-emerald-200"
          >
            <MessageCircle className="w-4 h-4" />
          </a>
        )}
      </div>
    </div>
  );
}
