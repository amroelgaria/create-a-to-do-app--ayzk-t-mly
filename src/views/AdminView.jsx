import React from 'react';
import { useApp } from '../context/AppContext';
import { SUBSCRIPTION_PLANS } from '../data/mockData';
import { 
  ShieldCheck, 
  Store, 
  Package, 
  ShoppingBag, 
  TrendingUp, 
  DollarSign, 
  CheckCircle, 
  Sparkles,
  ExternalLink,
  Users
} from 'lucide-react';

export default function AdminView() {
  const { 
    vendors, 
    products, 
    orders, 
    lang, 
    formatPrice, 
    t, 
    setSelectedBrandId, 
    setActiveView,
    setIsSubscriptionModalOpen 
  } = useApp();

  // Calculate platform nominal subscription revenue
  const totalNominalSubscriptionRevenue = vendors.reduce((acc, v) => acc + (v.nominalFeePaid || 299), 0);
  const totalGrossMarketplaceSales = orders.reduce((acc, o) => acc + (o.total || 0), 0);

  const handleInspectStore = (vendorId) => {
    setSelectedBrandId(vendorId);
    setActiveView('storefront');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 pb-20">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 bg-rose-50 text-rose-600 rounded-xl">
              <ShieldCheck className="w-5 h-5" />
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
              {lang === 'ar' ? 'لوحة الإشراف وإدارة المنصة (Platform Admin)' : 'Platform Management'}
            </h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            {lang === 'ar' 
              ? 'متابعة البراندات المشتركة، أرباح الاشتراكات الرمزية، ومبيعات الماركت بليس' 
              : 'Monitor registered brands, subscription earnings and platform-wide volume'}
          </p>
        </div>

        <button
          onClick={() => setIsSubscriptionModalOpen(true)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2.5 px-4 rounded-xl text-xs transition-colors flex items-center gap-1.5 cursor-pointer self-start md:self-auto"
        >
          <Sparkles className="w-4 h-4" />
          <span>{lang === 'ar' ? 'تسجيل براند جديد' : 'Register New Brand'}</span>
        </button>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Nominal Subscription Revenue (Direct Business Metric) */}
        <div className="bg-gradient-to-br from-indigo-900 to-purple-900 text-white p-5 rounded-2xl shadow-md space-y-1">
          <span className="text-xs font-bold text-indigo-200">
            {lang === 'ar' ? 'عائدات الاشتراكات الرمزية المحصلة' : 'Nominal Subscription Revenue'}
          </span>
          <div className="text-2xl sm:text-3xl font-black text-white">
            {formatPrice(totalNominalSubscriptionRevenue)}
          </div>
          <span className="text-[10px] text-amber-300 font-bold block pt-1">
            {lang === 'ar' ? 'رسوم شهرية من أصحاب البراندات' : 'Recurring monthly fees from vendors'}
          </span>
        </div>

        {/* Total Vendors */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-500">{lang === 'ar' ? 'البراندات والمتاجر المسجلة' : 'Registered Brands'}</span>
            <div className="text-2xl font-black text-slate-900 mt-1">{vendors.length}</div>
            <span className="text-[10px] text-emerald-600 font-bold mt-1 block">100% اشتراكات نشطة</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
            <Store className="w-6 h-6" />
          </div>
        </div>

        {/* Total Products */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-500">{lang === 'ar' ? 'المنتجات المعروضة للبيع' : 'Active Products'}</span>
            <div className="text-2xl font-black text-slate-900 mt-1">{products.length}</div>
            <span className="text-[10px] text-slate-400 mt-1 block">عبر جميع التصنيفات</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <Package className="w-6 h-6" />
          </div>
        </div>

        {/* Gross Volume */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-500">{lang === 'ar' ? 'حجم مبيعات المشترين' : 'Gross GMV Volume'}</span>
            <div className="text-2xl font-black text-slate-900 mt-1">{formatPrice(totalGrossMarketplaceSales)}</div>
            <span className="text-[10px] text-slate-400 mt-1 block">{orders.length} طلب منفذ</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <TrendingUp className="w-6 h-6" />
          </div>
        </div>

      </div>

      {/* Brands Table */}
      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs space-y-4 p-6">
        <h3 className="font-extrabold text-base text-slate-900">
          {lang === 'ar' ? 'قائمة البراندات المشتركة وحالة الاشتراكات' : 'Registered Brands & Subscriptions'}
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-start text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
              <tr>
                <th className="py-3 px-4 text-start">{lang === 'ar' ? 'البراند' : 'Brand'}</th>
                <th className="py-3 px-4 text-start">{lang === 'ar' ? 'باقة الاشتراك' : 'Plan'}</th>
                <th className="py-3 px-4 text-start">{lang === 'ar' ? 'الرسوم الرمزية المسددة' : 'Nominal Fee'}</th>
                <th className="py-3 px-4 text-start">{lang === 'ar' ? 'المنتجات' : 'Products'}</th>
                <th className="py-3 px-4 text-start">{lang === 'ar' ? 'حالة التوثيق' : 'Verified'}</th>
                <th className="py-3 px-4 text-center">{lang === 'ar' ? 'معاينة' : 'Action'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {vendors.map((v) => {
                const vendorProductsCount = products.filter((p) => p.vendorId === v.id).length;
                const plan = SUBSCRIPTION_PLANS.find((p) => p.id === v.planId) || SUBSCRIPTION_PLANS[0];

                return (
                  <tr key={v.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={v.logo}
                          alt={v.nameAr}
                          className="w-10 h-10 rounded-xl object-cover border border-slate-200 shrink-0"
                        />
                        <div>
                          <strong className="text-slate-900 block">{lang === 'ar' ? v.nameAr : v.nameEn}</strong>
                          <span className="text-[11px] text-slate-400">{v.cityAr}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="font-bold text-slate-800">{plan.nameAr.split('(')[0]}</span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="font-black text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded text-[11px]">
                        {formatPrice(v.nominalFeePaid || plan.priceEGP)} / شهر
                      </span>
                    </td>
                    <td className="py-3 px-4 font-bold text-slate-700">
                      {vendorProductsCount} منتج
                    </td>
                    <td className="py-3 px-4">
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-full">
                        <CheckCircle className="w-3.5 h-3.5 text-indigo-600" />
                        <span>موثق ونشط</span>
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <button
                        onClick={() => handleInspectStore(v.id)}
                        className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors cursor-pointer"
                        title="زيارة المتجر"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
