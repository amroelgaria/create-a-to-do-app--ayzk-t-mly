import React from 'react';
import { useApp } from '../context/AppContext';
import { CATEGORIES } from '../data/mockData';
import BrandCard from '../components/BrandCard';
import ProductCard from '../components/ProductCard';
import { 
  Sparkles, 
  Store, 
  ShoppingBag, 
  ShieldCheck, 
  Truck, 
  ArrowLeft, 
  ArrowRight, 
  TrendingUp, 
  CheckCircle2, 
  Rocket, 
  HeartHandshake,
  Star,
  Users
} from 'lucide-react';

export default function HomeView() {
  const { 
    lang, 
    t, 
    vendors, 
    products, 
    setActiveView, 
    setSelectedCategory, 
    setIsSubscriptionModalOpen,
    setSubscriptionTargetPlan 
  } = useApp();

  const featuredBrands = vendors.slice(0, 3);
  const featuredProducts = products.filter((p) => p.featured).slice(0, 8);

  const handleOpenSubscription = () => {
    setSubscriptionTargetPlan(null);
    setIsSubscriptionModalOpen(true);
  };

  return (
    <div className="space-y-16 pb-20">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-indigo-950 via-slate-900 to-slate-900 text-white pt-12 pb-20 px-4 sm:px-6 lg:px-8 rounded-b-3xl sm:rounded-b-[40px] shadow-2xl">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#818cf8_1px,transparent_1px)] [background-size:16px_16px]"></div>
        
        <div className="relative max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-7 space-y-6 text-center lg:text-start">
            
            <div className="inline-flex items-center gap-2 bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 px-4 py-1.5 rounded-full text-xs font-bold backdrop-blur-md">
              <Sparkles className="w-4 h-4 text-amber-400 fill-amber-400" />
              <span>{lang === 'ar' ? 'منصة البراندات والمتاجر المستقلة الأولى' : 'Premier Independent Brands Marketplace'}</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.15]">
              {lang === 'ar' ? (
                <>
                  اعرض منتجات براندك <br />
                  <span className="bg-gradient-to-r from-amber-300 via-amber-200 to-indigo-300 bg-clip-text text-transparent">
                    برسوم اشتراك رمزية
                  </span> <br />
                  واترك التسوق لجمهورك
                </>
              ) : (
                <>
                  Showcase Your Brand <br />
                  <span className="bg-gradient-to-r from-amber-300 via-amber-200 to-indigo-300 bg-clip-text text-transparent">
                    With Nominal Subscription
                  </span> <br />
                  Sell Directly to Shoppers
                </>
              )}
            </h1>

            <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              {lang === 'ar' 
                ? 'سوق البراندات يتيح لكل شخص أو صاحب مشروع فتح متجر متكامل، وعرض منتجاته بكل سهولة باشتراك شهري رمزي بسيط يبدأ من 149 ج.م، مع إمكانية تسوق المشترين والدفع عند الاستلام أو عبر المحافظ الإلكترونية.'
                : 'Empowering creators and brands to launch dedicated storefronts with a tiny nominal monthly subscription. Connect with thousands of shoppers and sell directly without friction.'}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
              <button
                onClick={handleOpenSubscription}
                className="w-full sm:w-auto bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-500 hover:to-amber-700 text-slate-950 font-black px-7 py-4 rounded-2xl text-sm sm:text-base shadow-xl shadow-amber-500/20 transition-all hover:scale-105 cursor-pointer flex items-center justify-center gap-2"
              >
                <Rocket className="w-5 h-5" />
                <span>{lang === 'ar' ? 'سجّل براندك الآن (اشتراك رمزي)' : 'Register Your Brand Now'}</span>
              </button>

              <button
                onClick={() => setActiveView('products')}
                className="w-full sm:w-auto bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold px-7 py-4 rounded-2xl text-sm sm:text-base backdrop-blur-md transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-5 h-5 text-indigo-300" />
                <span>{lang === 'ar' ? 'تصفح وتسوق من البراندات' : 'Explore All Products'}</span>
              </button>
            </div>

            {/* Quick trust metrics */}
            <div className="pt-6 grid grid-cols-3 gap-4 border-t border-slate-800 text-center lg:text-start">
              <div>
                <span className="text-2xl sm:text-3xl font-black text-white">50+</span>
                <p className="text-xs text-slate-400">{lang === 'ar' ? 'براند مسجل' : 'Registered Brands'}</p>
              </div>
              <div>
                <span className="text-2xl sm:text-3xl font-black text-amber-400">149 ج.م</span>
                <p className="text-xs text-slate-400">{lang === 'ar' ? 'رسوم اشتراك رمزية' : 'Nominal Monthly Fee'}</p>
              </div>
              <div>
                <span className="text-2xl sm:text-3xl font-black text-emerald-400">100%</span>
                <p className="text-xs text-slate-400">{lang === 'ar' ? 'تواصل وطلب مباشر' : 'Direct Orders'}</p>
              </div>
            </div>

          </div>

          {/* Visual Showcase Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-sm sm:max-w-md bg-gradient-to-b from-white/10 to-white/5 border border-white/20 p-5 rounded-3xl shadow-2xl backdrop-blur-xl">
              
              <div className="relative rounded-2xl overflow-hidden aspect-4/3 mb-4 shadow-lg">
                <img
                  src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80"
                  alt="Marketplace showcase"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent" />
                
                <div className="absolute bottom-3 start-3 end-3 flex items-center justify-between text-xs">
                  <span className="bg-indigo-600/90 backdrop-blur-xs text-white px-2.5 py-1 rounded-full font-bold">
                    {lang === 'ar' ? 'متجر براند نشط' : 'Active Brand Store'}
                  </span>
                  <span className="bg-emerald-500/90 text-white px-2.5 py-1 rounded-full font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    {lang === 'ar' ? 'اشتراك نشط' : 'Subscription Active'}
                  </span>
                </div>
              </div>

              {/* Floating feature pills */}
              <div className="space-y-2.5">
                <div className="flex items-center gap-3 bg-white/10 p-3 rounded-xl border border-white/10">
                  <div className="w-8 h-8 rounded-lg bg-amber-400/20 text-amber-300 flex items-center justify-center shrink-0">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div className="text-xs">
                    <span className="font-bold text-white block">{lang === 'ar' ? 'أقل تكلفة دخول للسوق' : 'Lowest Entry Barrier'}</span>
                    <span className="text-slate-300 text-[11px]">{lang === 'ar' ? 'رسوم رمزية بدل تكاليف إنشاء موقع باهظة' : 'Nominal fees instead of high setup fees'}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 bg-white/10 p-3 rounded-xl border border-white/10">
                  <div className="w-8 h-8 rounded-lg bg-emerald-400/20 text-emerald-300 flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div className="text-xs">
                    <span className="font-bold text-white block">{lang === 'ar' ? 'طلبات عبر الموقع والواتساب' : 'Direct Web & WhatsApp Orders'}</span>
                    <span className="text-slate-300 text-[11px]">{lang === 'ar' ? 'تحكم كامل بمنتجاتك ومخزونك وأسعارك' : 'Full control over products, prices & stock'}</span>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* Pillars / Value Props */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
              <Store className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-slate-900">{lang === 'ar' ? 'اشتراك رمزي ميسر' : 'Nominal Subscription'}</h4>
              <p className="text-xs text-slate-500 mt-0.5">{lang === 'ar' ? 'بدون شروط معقدة أو عمولات خيالية' : 'Simple fees with minimal commission'}</p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-slate-900">{lang === 'ar' ? 'براندات موثقة 100%' : '100% Verified Brands'}</h4>
              <p className="text-xs text-slate-500 mt-0.5">{lang === 'ar' ? 'منتجات أصلية مباشرة من المصنّع' : 'Genuine products directly from creators'}</p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-slate-900">{lang === 'ar' ? 'توصيل لجميع المحافظات' : 'Nationwide Shipping'}</h4>
              <p className="text-xs text-slate-500 mt-0.5">{lang === 'ar' ? 'شحن سريع وخيار دفع عند الاستلام' : 'Fast delivery & Cash on Delivery'}</p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-slate-900">{lang === 'ar' ? 'دعم مستمر للبراند' : 'Merchant Growth'}</h4>
              <p className="text-xs text-slate-500 mt-0.5">{lang === 'ar' ? 'لوحة تحكم ذكية وإحصاءات دقيقة' : 'Smart dashboard & real-time analytics'}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Category Navigation Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl sm:text-2xl font-black text-slate-900">
            {lang === 'ar' ? 'تسوق حسب التصنيف' : 'Shop by Category'}
          </h2>
          <button
            onClick={() => {
              setSelectedCategory('all');
              setActiveView('products');
            }}
            className="text-xs font-bold text-indigo-600 hover:underline cursor-pointer flex items-center gap-1"
          >
            <span>{t('viewAll')}</span>
            {lang === 'ar' ? <ArrowLeft className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setSelectedCategory(cat.id);
                setActiveView('products');
              }}
              className="bg-white hover:bg-indigo-50/50 border border-slate-200 hover:border-indigo-300 p-4 rounded-2xl text-center transition-all group cursor-pointer shadow-xs hover:shadow-md"
            >
              <div className="w-10 h-10 rounded-xl bg-slate-100 group-hover:bg-indigo-600 group-hover:text-white text-slate-700 flex items-center justify-center mx-auto transition-colors mb-2">
                <Store className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-slate-800 group-hover:text-indigo-600 transition-colors block">
                {lang === 'ar' ? cat.nameAr : cat.nameEn}
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* Featured Verified Brands */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-indigo-600 animate-pulse" />
              <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                {lang === 'ar' ? 'أبرز البراندات المشتركة بالمنصة' : 'Featured Verified Brands'}
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              {lang === 'ar' ? 'براندات ومتاجر مستقلة تعرض منتجاتها وتستقبل طلباتكم مباشرة' : 'Independent brands showcasing their catalog and fulfilling direct orders'}
            </p>
          </div>

          <button
            onClick={() => setActiveView('brands')}
            className="text-xs font-bold text-indigo-600 hover:underline cursor-pointer flex items-center gap-1"
          >
            <span>{lang === 'ar' ? 'جميع البراندات' : 'All Brands'}</span>
            {lang === 'ar' ? <ArrowLeft className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredBrands.map((vendor) => (
            <BrandCard key={vendor.id} vendor={vendor} />
          ))}
        </div>
      </section>

      {/* Trending Products Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-rose-500" />
              <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                {lang === 'ar' ? 'المنتجات الأكثر طلباً ومبيعاً' : 'Trending & Top Rated Products'}
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              {lang === 'ar' ? 'تسوق أفضل القطع المختارة من البراندات المشتركة' : 'Curated items loved by shoppers across all stores'}
            </p>
          </div>

          <button
            onClick={() => setActiveView('products')}
            className="text-xs font-bold text-indigo-600 hover:underline cursor-pointer flex items-center gap-1"
          >
            <span>{t('viewAll')}</span>
            {lang === 'ar' ? <ArrowLeft className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* How it works for Vendors (The Core Business Model) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-indigo-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden">
          <div className="relative max-w-3xl mx-auto text-center space-y-4">
            <span className="bg-amber-400 text-slate-900 text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider">
              {lang === 'ar' ? 'كيف تبدأ البيع كبراند؟' : 'How Selling Works'}
            </span>
            <h3 className="text-2xl sm:text-4xl font-black">
              {lang === 'ar' ? '3 خطوات بسيطة لعرض منتجاتك والبدء بالبيع' : '3 Simple Steps to Launch & Sell'}
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm">
              {lang === 'ar' 
                ? 'فكرة المنصة مبنية على تمكين أي براند أو شخص من الوصول للمشترين مقابل رسوم اشتراك رمزية شهرية دون أي تعقيد تقني.'
                : 'A frictionless ecosystem allowing brands to list products for a tiny subscription fee and sell directly.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
            {/* Step 1 */}
            <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/10 text-center space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-400 text-slate-900 font-black text-xl flex items-center justify-center mx-auto shadow-md">
                1
              </div>
              <h4 className="font-extrabold text-base text-white">
                {lang === 'ar' ? 'سدد الاشتراك الرمزي' : 'Pay Nominal Fee'}
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                {lang === 'ar' 
                  ? 'اختر باقة الاشتراك المناسبة لحجم متجرك (تبدأ من 149 ج.م شهرياً فقط) وسددها بأمان عبر البطاقة أو المحفظة الإلكترونية.'
                  : 'Select an affordable monthly tier starting at just $5/mo and activate with card or mobile wallet.'}
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/10 text-center space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-indigo-400 text-slate-900 font-black text-xl flex items-center justify-center mx-auto shadow-md">
                2
              </div>
              <h4 className="font-extrabold text-base text-white">
                {lang === 'ar' ? 'أنشئ متجرك وارفع منتجاتك' : 'Upload Your Products'}
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                {lang === 'ar' 
                  ? 'أضف اسم براندك، شعارك، صور المنتجات، الأسعار، والمواصفات من خلال لوحة تحكم التاجر السهلة والمجهزة بكل الأدوات.'
                  : 'Add your brand assets, product photos, prices, descriptions and stock via the merchant dashboard.'}
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/10 text-center space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-400 text-slate-900 font-black text-xl flex items-center justify-center mx-auto shadow-md">
                3
              </div>
              <h4 className="font-extrabold text-base text-white">
                {lang === 'ar' ? 'استقبل الطلبات وأرباحك' : 'Receive Orders & Grow'}
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                {lang === 'ar' 
                  ? 'يدخل الزبائن للتسوق من متجرك أونلاين، وتصلك الطلبات مباشرة مع إمكانية التواصل الفوري مع المشتري عبر الواتساب.'
                  : 'Shoppers browse your brand storefront, order items, and you receive real-time notifications.'}
              </p>
            </div>
          </div>

          <div className="text-center mt-10">
            <button
              onClick={() => setActiveView('onboarding')}
              className="bg-white text-indigo-900 hover:bg-slate-100 font-black text-sm px-8 py-3.5 rounded-2xl shadow-xl transition-all hover:scale-105 cursor-pointer inline-flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-amber-500 fill-amber-400" />
              <span>{lang === 'ar' ? 'استكشف باقات الاشتراك واشترك الآن' : 'Explore Nominal Plans & Join'}</span>
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
