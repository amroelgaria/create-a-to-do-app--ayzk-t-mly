import React from 'react';
import { useApp } from '../context/AppContext';
import { Store, ShieldCheck, Sparkles, Heart, Phone, Mail, MapPin } from 'lucide-react';

export default function Footer() {
  const { lang, t, setActiveView, setSelectedCategory } = useApp();

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-10 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
          
          {/* Brand Intro */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-md">
                <Store className="w-5 h-5" />
              </div>
              <span className="text-xl font-black text-white">
                <span>{lang === 'ar' ? 'سوق' : 'Souq'}</span>
                <span className="text-indigo-400 font-black">{lang === 'ar' ? 'البراندات' : 'Brands'}</span>
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              {t('footerAbout')}
            </p>
            <div className="pt-2 flex items-center gap-3 text-xs text-slate-400">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                {lang === 'ar' ? 'دفع آمن 100%' : '100% Secure Checkout'}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Sparkles className="w-4 h-4 text-amber-400" />
                {lang === 'ar' ? 'براندات موثقة' : 'Verified Brands'}
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold text-sm mb-4 border-b border-slate-800 pb-2">
              {t('quickLinks')}
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <button 
                  onClick={() => setActiveView('home')} 
                  className="hover:text-indigo-400 transition-colors cursor-pointer"
                >
                  {t('home')}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveView('brands')} 
                  className="hover:text-indigo-400 transition-colors cursor-pointer"
                >
                  {t('brands')}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveView('products')} 
                  className="hover:text-indigo-400 transition-colors cursor-pointer"
                >
                  {t('products')}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveView('track-order')} 
                  className="hover:text-indigo-400 transition-colors cursor-pointer"
                >
                  {t('trackOrder')}
                </button>
              </li>
            </ul>
          </div>

          {/* Vendor Services */}
          <div>
            <h4 className="text-white font-bold text-sm mb-4 border-b border-slate-800 pb-2">
              {t('merchantServices')}
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <button 
                  onClick={() => setActiveView('onboarding')} 
                  className="text-amber-400 font-semibold hover:underline flex items-center gap-1.5 cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{t('joinAsSeller')} ({lang === 'ar' ? 'اشتراك رمزي' : 'Nominal Fee'})</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveView('onboarding')} 
                  className="hover:text-indigo-400 transition-colors cursor-pointer"
                >
                  {lang === 'ar' ? 'باقات الاشتراك الشهرية' : 'Monthly Subscription Plans'}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveView('vendor-dashboard')} 
                  className="hover:text-indigo-400 transition-colors cursor-pointer"
                >
                  {t('vendorDashboard')}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveView('admin')} 
                  className="hover:text-indigo-400 transition-colors cursor-pointer"
                >
                  {t('adminPanel')}
                </button>
              </li>
            </ul>
          </div>

          {/* Contact & Support */}
          <div>
            <h4 className="text-white font-bold text-sm mb-4 border-b border-slate-800 pb-2">
              {t('support')}
            </h4>
            <div className="space-y-3 text-xs sm:text-sm text-slate-400">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-indigo-400" />
                <span dir="ltr">+20 100 123 4567</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-indigo-400" />
                <span>support@souqbrand.com</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-indigo-400" />
                <span>{lang === 'ar' ? 'القاهرة - مصر | خدمة عملاء 24/7' : 'Cairo, Egypt | 24/7 Support'}</span>
              </div>
            </div>

            {/* Payment methods simulation badges */}
            <div className="mt-4 pt-4 border-t border-slate-800/80">
              <p className="text-[11px] text-slate-500 mb-2">{lang === 'ar' ? 'طرق الدفع المدعومة:' : 'Accepted Payments:'}</p>
              <div className="flex flex-wrap gap-2 text-[10px] font-bold text-slate-300">
                <span className="bg-slate-800 px-2 py-1 rounded border border-slate-700">Visa / Mastercard</span>
                <span className="bg-slate-800 px-2 py-1 rounded border border-slate-700 text-rose-400">Vodafone Cash</span>
                <span className="bg-slate-800 px-2 py-1 rounded border border-slate-700 text-emerald-400">InstaPay</span>
                <span className="bg-slate-800 px-2 py-1 rounded border border-slate-700 text-amber-400">الدفع عند الاستلام</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>{t('allRightsReserved')} {new Date().getFullYear()}</p>
          <div className="flex items-center gap-1 text-slate-400">
            <span>{lang === 'ar' ? 'صُممت المنصة لدعم أصحاب المشاريع والبراندات' : 'Built to empower independent brands & creators'}</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
          </div>
        </div>
      </div>
    </footer>
  );
}
