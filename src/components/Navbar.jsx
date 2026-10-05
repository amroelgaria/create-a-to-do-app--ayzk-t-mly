import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  ShoppingBag, 
  Store, 
  Search, 
  Menu, 
  X, 
  ShieldCheck, 
  Compass, 
  Package, 
  Sparkles, 
  UserCheck, 
  ChevronDown,
  Globe,
  Truck,
  RotateCcw
} from 'lucide-react';

export default function Navbar() {
  const { 
    lang, 
    setLang, 
    currency, 
    setCurrency, 
    t, 
    cart, 
    setIsCartOpen,
    activeView, 
    setActiveView, 
    searchQuery, 
    setSearchQuery,
    role,
    setRole,
    vendors,
    currentVendorId,
    setCurrentVendorId,
    currentVendor,
    resetDemoData
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);

  const cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (activeView !== 'products') {
      setActiveView('products');
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      {/* Top Banner: Nominal Subscription Promotion */}
      <div className="bg-gradient-to-r from-indigo-700 via-purple-700 to-indigo-800 text-white text-xs md:text-sm py-2 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 flex-wrap">
          <div className="flex items-center gap-2">
            <span className="bg-amber-400 text-slate-900 font-bold px-2 py-0.5 rounded text-xs animate-pulse">
              {lang === 'ar' ? 'عرض خاص' : 'Special Offer'}
            </span>
            <span>
              {lang === 'ar' 
                ? '📢 عندك براند أو مشروع؟ اعرض منتجاتك الآن برسوم اشتراك رمزية تبدأ من 149 ج.م شهرياً فقط!'
                : '📢 Have a brand or product? List your store with a nominal subscription starting at $5/mo!'}
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <button 
              onClick={() => setActiveView('onboarding')}
              className="underline font-semibold hover:text-amber-300 transition-colors cursor-pointer"
            >
              {lang === 'ar' ? 'تعرف على الباقات واشترك 👈' : 'Explore Plans & Join 👈'}
            </button>
            <div className="hidden sm:flex items-center gap-2 border-s border-indigo-500/50 ps-3">
              <button 
                onClick={resetDemoData}
                title={lang === 'ar' ? 'إعادة ضبط البيانات التجريبية' : 'Reset Demo Data'}
                className="opacity-75 hover:opacity-100 flex items-center gap-1 cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                <span>{lang === 'ar' ? 'إعادة ضبط' : 'Reset'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* Logo & Brand Identity */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setActiveView('home')} 
              className="flex items-center gap-2.5 text-left rtl:text-right group cursor-pointer focus:outline-hidden"
            >
              <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-700 to-purple-600 flex items-center justify-center text-white shadow-md shadow-indigo-200 group-hover:scale-105 transition-transform">
                <Store className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xl font-extrabold tracking-tight text-slate-900 flex items-center gap-1">
                  <span>{lang === 'ar' ? 'سوق' : 'Souq'}</span>
                  <span className="text-indigo-600 font-black">{lang === 'ar' ? 'البراندات' : 'Brands'}</span>
                  <Sparkles className="w-4 h-4 text-amber-500 fill-amber-400" />
                </span>
                <p className="text-[11px] text-slate-500 font-medium hidden sm:block">
                  {lang === 'ar' ? 'منصة المتاجر والتسوق الإلكتروني' : 'The Multi-Vendor Brand Platform'}
                </p>
              </div>
            </button>
          </div>

          {/* Search bar (Center Desktop) */}
          <div className="hidden md:flex flex-1 max-w-md mx-4">
            <form onSubmit={handleSearchSubmit} className="relative w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t('searchPlaceholder')}
                className="w-full bg-slate-100/90 hover:bg-slate-100 focus:bg-white border border-slate-200 focus:border-indigo-500 rounded-full py-2.5 px-10 text-sm outline-hidden transition-all focus:ring-4 focus:ring-indigo-100 text-slate-800"
              />
              <Search className="w-4 h-4 text-slate-400 absolute start-3.5 top-3.5" />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute end-3.5 top-3 text-slate-400 hover:text-slate-600 text-xs"
                >
                  ✕
                </button>
              )}
            </form>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            <button
              onClick={() => setActiveView('home')}
              className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors cursor-pointer ${
                activeView === 'home' 
                  ? 'text-indigo-600 bg-indigo-50/80 font-bold' 
                  : 'text-slate-700 hover:text-indigo-600 hover:bg-slate-50'
              }`}
            >
              {t('home')}
            </button>

            <button
              onClick={() => setActiveView('brands')}
              className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors cursor-pointer ${
                activeView === 'brands' || activeView === 'storefront'
                  ? 'text-indigo-600 bg-indigo-50/80 font-bold' 
                  : 'text-slate-700 hover:text-indigo-600 hover:bg-slate-50'
              }`}
            >
              {t('brands')}
            </button>

            <button
              onClick={() => setActiveView('products')}
              className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors cursor-pointer ${
                activeView === 'products' 
                  ? 'text-indigo-600 bg-indigo-50/80 font-bold' 
                  : 'text-slate-700 hover:text-indigo-600 hover:bg-slate-50'
              }`}
            >
              {t('products')}
            </button>

            <button
              onClick={() => setActiveView('track-order')}
              className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center gap-1.5 cursor-pointer ${
                activeView === 'track-order' 
                  ? 'text-indigo-600 bg-indigo-50/80 font-bold' 
                  : 'text-slate-700 hover:text-indigo-600 hover:bg-slate-50'
              }`}
            >
              <Truck className="w-4 h-4 text-emerald-600" />
              <span>{t('trackOrder')}</span>
            </button>
          </nav>

          {/* Action CTAs & Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Quick Vendor Register CTA */}
            <button
              onClick={() => setActiveView('onboarding')}
              className="hidden sm:inline-flex items-center gap-1.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white text-xs font-bold py-2.5 px-3.5 rounded-xl shadow-xs shadow-emerald-200 transition-all cursor-pointer hover:shadow-md"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{lang === 'ar' ? 'سجّل براندك' : 'Sell With Us'}</span>
            </button>

            {/* Role Switcher (Customer / Vendor / Admin) */}
            <div className="relative">
              <button
                onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
                className="flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold py-2 px-3 rounded-xl transition-colors cursor-pointer border border-slate-200"
                title="تبديل وضع الاستخدام (مشتري / بائع / أدمن)"
              >
                {role === 'customer' && <ShoppingBag className="w-3.5 h-3.5 text-indigo-600" />}
                {role === 'vendor' && <Store className="w-3.5 h-3.5 text-amber-600" />}
                {role === 'admin' && <ShieldCheck className="w-3.5 h-3.5 text-rose-600" />}
                <span className="hidden xl:inline">
                  {role === 'customer' ? t('customerMode') : role === 'vendor' ? t('vendorMode') : t('adminMode')}
                </span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {roleDropdownOpen && (
                <div 
                  className="absolute end-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-50 text-xs animate-in fade-in zoom-in-95 duration-100"
                  onClick={() => setRoleDropdownOpen(false)}
                >
                  <div className="px-3 py-1.5 text-slate-400 font-bold uppercase tracking-wider text-[10px] border-b border-slate-100 mb-1">
                    {lang === 'ar' ? 'تبديل تجربة المستخدم' : 'Select Experience'}
                  </div>
                  
                  <button
                    onClick={() => {
                      setRole('customer');
                      setActiveView('home');
                    }}
                    className={`w-full text-start px-3 py-2 flex items-center justify-between hover:bg-slate-50 ${role === 'customer' ? 'text-indigo-600 font-bold bg-indigo-50/50' : 'text-slate-700'}`}
                  >
                    <div className="flex items-center gap-2">
                      <ShoppingBag className="w-4 h-4 text-indigo-500" />
                      <span>{t('customerMode')}</span>
                    </div>
                    {role === 'customer' && <span className="w-1.5 h-1.5 rounded-full bg-indigo-600"></span>}
                  </button>

                  <button
                    onClick={() => {
                      setRole('vendor');
                      setActiveView('vendor-dashboard');
                    }}
                    className={`w-full text-start px-3 py-2 flex items-center justify-between hover:bg-slate-50 ${role === 'vendor' ? 'text-amber-600 font-bold bg-amber-50/50' : 'text-slate-700'}`}
                  >
                    <div className="flex items-center gap-2">
                      <Store className="w-4 h-4 text-amber-500" />
                      <span>{t('vendorMode')} (لوحة التاجر)</span>
                    </div>
                    {role === 'vendor' && <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>}
                  </button>

                  {role === 'vendor' && (
                    <div className="px-3 py-1.5 bg-slate-50 text-[11px] text-slate-600 border-t border-b border-slate-100 my-1">
                      <p className="font-semibold text-slate-700 mb-1">{lang === 'ar' ? 'المتجر النشط حالياً:' : 'Active Brand:'}</p>
                      <select 
                        value={currentVendorId}
                        onChange={(e) => setCurrentVendorId(e.target.value)}
                        className="w-full bg-white border border-slate-200 rounded p-1 text-xs"
                      >
                        {vendors.map(v => (
                          <option key={v.id} value={v.id}>
                            {lang === 'ar' ? v.nameAr : v.nameEn}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  <button
                    onClick={() => {
                      setRole('admin');
                      setActiveView('admin');
                    }}
                    className={`w-full text-start px-3 py-2 flex items-center justify-between hover:bg-slate-50 ${role === 'admin' ? 'text-rose-600 font-bold bg-rose-50/50' : 'text-slate-700'}`}
                  >
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-rose-500" />
                      <span>{t('adminPanel')} (إدارة المنصة)</span>
                    </div>
                    {role === 'admin' && <span className="w-1.5 h-1.5 rounded-full bg-rose-600"></span>}
                  </button>
                </div>
              )}
            </div>

            {/* Currency selector */}
            <div className="hidden sm:flex items-center bg-slate-100 rounded-xl p-1 text-xs font-semibold text-slate-600 border border-slate-200">
              <button
                onClick={() => setCurrency('EGP')}
                className={`px-2 py-1 rounded-lg transition-all cursor-pointer ${currency === 'EGP' ? 'bg-white text-indigo-600 shadow-xs font-bold' : 'hover:text-slate-900'}`}
              >
                ج.م
              </button>
              <button
                onClick={() => setCurrency('USD')}
                className={`px-2 py-1 rounded-lg transition-all cursor-pointer ${currency === 'USD' ? 'bg-white text-indigo-600 shadow-xs font-bold' : 'hover:text-slate-900'}`}
              >
                $
              </button>
              <button
                onClick={() => setCurrency('SAR')}
                className={`px-2 py-1 rounded-lg transition-all cursor-pointer ${currency === 'SAR' ? 'bg-white text-indigo-600 shadow-xs font-bold' : 'hover:text-slate-900'}`}
              >
                ر.س
              </button>
            </div>

            {/* Language switch */}
            <button
              onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')}
              className="p-2 text-slate-600 hover:text-indigo-600 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer text-xs font-bold flex items-center gap-1"
              title="تغيير اللغة / Change Language"
            >
              <Globe className="w-4 h-4" />
              <span>{lang === 'ar' ? 'EN' : 'عربي'}</span>
            </button>

            {/* Cart Button with Counter */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-xl transition-all cursor-pointer flex items-center gap-2 group"
              title={t('cart')}
            >
              <ShoppingBag className="w-5 h-5 group-hover:scale-110 transition-transform" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1.5 -end-1.5 bg-indigo-600 text-white font-bold text-xs w-5 h-5 rounded-full flex items-center justify-center shadow-md animate-pulse">
                  {cartItemsCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-700 hover:text-indigo-600 rounded-xl cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Search input */}
        <div className="md:hidden pb-3">
          <form onSubmit={handleSearchSubmit} className="relative w-full">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('searchPlaceholder')}
              className="w-full bg-slate-100 border border-slate-200 focus:border-indigo-500 rounded-xl py-2 px-9 text-xs outline-hidden text-slate-800"
            />
            <Search className="w-3.5 h-3.5 text-slate-400 absolute start-3 top-2.5" />
          </form>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-2 animate-in slide-in-from-top-4 duration-200">
          <button
            onClick={() => { setActiveView('home'); setMobileMenuOpen(false); }}
            className={`w-full text-start py-2.5 px-3 rounded-xl text-sm font-semibold flex items-center gap-2 ${activeView === 'home' ? 'bg-indigo-50 text-indigo-600' : 'text-slate-700'}`}
          >
            <Compass className="w-4 h-4" />
            <span>{t('home')}</span>
          </button>

          <button
            onClick={() => { setActiveView('brands'); setMobileMenuOpen(false); }}
            className={`w-full text-start py-2.5 px-3 rounded-xl text-sm font-semibold flex items-center gap-2 ${activeView === 'brands' ? 'bg-indigo-50 text-indigo-600' : 'text-slate-700'}`}
          >
            <Store className="w-4 h-4" />
            <span>{t('brands')}</span>
          </button>

          <button
            onClick={() => { setActiveView('products'); setMobileMenuOpen(false); }}
            className={`w-full text-start py-2.5 px-3 rounded-xl text-sm font-semibold flex items-center gap-2 ${activeView === 'products' ? 'bg-indigo-50 text-indigo-600' : 'text-slate-700'}`}
          >
            <Package className="w-4 h-4" />
            <span>{t('products')}</span>
          </button>

          <button
            onClick={() => { setActiveView('track-order'); setMobileMenuOpen(false); }}
            className={`w-full text-start py-2.5 px-3 rounded-xl text-sm font-semibold flex items-center gap-2 ${activeView === 'track-order' ? 'bg-indigo-50 text-indigo-600' : 'text-slate-700'}`}
          >
            <Truck className="w-4 h-4 text-emerald-600" />
            <span>{t('trackOrder')}</span>
          </button>

          <button
            onClick={() => { setActiveView('onboarding'); setMobileMenuOpen(false); }}
            className="w-full text-start py-2.5 px-3 rounded-xl text-sm font-bold bg-gradient-to-r from-emerald-600 to-teal-600 text-white flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            <span>{t('sellWithUs')} (الاشتراك الرمزي)</span>
          </button>

          {role === 'vendor' && (
            <button
              onClick={() => { setActiveView('vendor-dashboard'); setMobileMenuOpen(false); }}
              className="w-full text-start py-2.5 px-3 rounded-xl text-sm font-bold bg-amber-50 text-amber-700 flex items-center gap-2"
            >
              <Store className="w-4 h-4" />
              <span>{t('vendorDashboard')}</span>
            </button>
          )}

          {role === 'admin' && (
            <button
              onClick={() => { setActiveView('admin'); setMobileMenuOpen(false); }}
              className="w-full text-start py-2.5 px-3 rounded-xl text-sm font-bold bg-rose-50 text-rose-700 flex items-center gap-2"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>{t('adminPanel')}</span>
            </button>
          )}

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>{lang === 'ar' ? 'العملة:' : 'Currency:'}</span>
            <div className="flex gap-2">
              {['EGP', 'USD', 'SAR'].map((curr) => (
                <button
                  key={curr}
                  onClick={() => setCurrency(curr)}
                  className={`px-2 py-1 rounded ${currency === curr ? 'bg-indigo-600 text-white font-bold' : 'bg-slate-100'}`}
                >
                  {curr}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
