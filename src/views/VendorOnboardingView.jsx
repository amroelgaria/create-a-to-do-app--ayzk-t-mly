import React from 'react';
import { useApp } from '../context/AppContext';
import { SUBSCRIPTION_PLANS } from '../data/mockData';
import { 
  Sparkles, 
  Check, 
  ShieldCheck, 
  Store, 
  Zap, 
  ArrowLeft, 
  ArrowRight, 
  HelpCircle,
  TrendingUp,
  DollarSign,
  Users
} from 'lucide-react';

export default function VendorOnboardingView() {
  const { 
    lang, 
    formatPrice, 
    setIsSubscriptionModalOpen, 
    setSubscriptionTargetPlan 
  } = useApp();

  const handleSelectPlan = (plan) => {
    setSubscriptionTargetPlan(plan);
    setIsSubscriptionModalOpen(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Top Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="inline-flex items-center gap-1.5 bg-indigo-50 border border-indigo-200 text-indigo-700 px-4 py-1.5 rounded-full text-xs font-bold">
          <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
          <span>{lang === 'ar' ? 'انضم كبراند أو بائع مستقل' : 'Join as a Brand or Seller'}</span>
        </span>

        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 leading-tight">
          {lang === 'ar' ? (
            <>
              ابدأ متجرك الإلكتروني الآن <br />
              <span className="text-indigo-600">برسوم اشتراك رمزية ميسرة</span>
            </>
          ) : (
            <>
              Launch Your Branded Store Today <br />
              <span className="text-indigo-600">With Low Nominal Monthly Fees</span>
            </>
          )}
        </h1>

        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          {lang === 'ar' 
            ? 'بدلاً من إنفاق الآلاف على الاستضافة وبرمجة المتاجر المنفصلة وتكاليف التسويق، سوق البراندات يمنحك متجراً متكاملاً جاهزاً لعرض منتجاتك واستقبال طلبات الزبائن مباشرة مقابل اشتراك رمزي بسيط.'
            : 'Stop spending thousands on custom development, servers and ads. Get a turnkey e-commerce presence and showcase your catalog directly to ready buyers.'}
        </p>
      </div>

      {/* Pricing Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
        {SUBSCRIPTION_PLANS.map((plan) => {
          return (
            <div
              key={plan.id}
              className={`bg-white rounded-3xl p-8 border-2 transition-all flex flex-col justify-between relative shadow-lg ${
                plan.popular 
                  ? 'border-indigo-600 shadow-2xl shadow-indigo-100 ring-4 ring-indigo-50 md:-translate-y-2' 
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 start-1/2 -translate-x-1/2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-extrabold text-xs px-4 py-1 rounded-full shadow-md uppercase tracking-wider">
                  {lang === 'ar' ? 'الباقة الأكثر طلباً للبراندات' : 'Most Popular Plan'}
                </div>
              )}

              <div>
                {/* Plan Header */}
                <div className="mb-6">
                  <h3 className="text-xl font-extrabold text-slate-900 mb-1">
                    {lang === 'ar' ? plan.nameAr : plan.nameEn}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed min-h-[2.5rem]">
                    {lang === 'ar' ? plan.descriptionAr : plan.descriptionEn}
                  </p>
                </div>

                {/* Price Display */}
                <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 mb-6">
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl sm:text-4xl font-black text-slate-900">
                      {formatPrice(plan.priceEGP)}
                    </span>
                    <span className="text-xs text-slate-500 font-semibold">
                      {lang === 'ar' ? plan.periodAr : plan.periodEn}
                    </span>
                  </div>
                  <span className="text-[11px] text-emerald-700 font-bold block mt-1">
                    {lang === 'ar' ? `عمولة مبيعات: ${plan.commissionRate} فقط` : `Platform Commission: ${plan.commissionRate}`}
                  </span>
                </div>

                {/* Feature Checklist */}
                <div className="space-y-3 mb-8">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                    {lang === 'ar' ? 'مميزات الباقة:' : 'Included Features:'}
                  </span>
                  {(lang === 'ar' ? plan.featuresAr : plan.featuresEn).map((feature, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs text-slate-700">
                      <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3 h-3" />
                      </div>
                      <span className="leading-tight">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() => handleSelectPlan(plan)}
                className={`w-full py-3.5 px-4 rounded-2xl font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md ${
                  plan.popular
                    ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-200'
                    : 'bg-slate-900 hover:bg-slate-800 text-white'
                }`}
              >
                <span>{lang === 'ar' ? 'اشترك في هذه الباقة وابدأ البيع' : 'Choose This Plan'}</span>
                {lang === 'ar' ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
              </button>
            </div>
          );
        })}
      </div>

      {/* Why sell with Souq Brands comparison */}
      <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden">
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-10">
          <h2 className="text-2xl sm:text-3xl font-black">
            {lang === 'ar' ? 'مقارنة: سوق البراندات مقابل بناء متجر خاص بمفردك' : 'Comparison: Souq Brands vs. Building Alone'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            {lang === 'ar' ? 'لماذا تختار الاشتراك الرمزي الميسر؟' : 'Why choose our nominal subscription model?'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto text-xs sm:text-sm">
          <div className="bg-slate-800/80 p-6 rounded-2xl border border-slate-700 space-y-4">
            <h4 className="font-bold text-rose-400 text-base flex items-center gap-2">
              <span>✕</span> {lang === 'ar' ? 'إنشاء متجر مستقل منفصل' : 'Building a Separate Website'}
            </h4>
            <ul className="space-y-2 text-slate-300">
              <li>• تكاليف برمجة واستضافة تبدأ من 5,000 إلى 15,000 ج.م</li>
              <li>• اشتراكات بوابات دفع شهرية ورسوم إعداد مرتفعة</li>
              <li>• صفر زيارات في البداية بدون ميزانيات إعلانية باهظة</li>
              <li>• تعقيدات تقنية وصيانة مستمرة ومسؤولية كاملة</li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-indigo-900/90 to-purple-900/90 p-6 rounded-2xl border border-indigo-500/50 space-y-4">
            <h4 className="font-bold text-emerald-400 text-base flex items-center gap-2">
              <Check className="w-4 h-4" /> {lang === 'ar' ? 'الاشتراك على سوق البراندات' : 'With Souq Brands'}
            </h4>
            <ul className="space-y-2 text-slate-200">
              <li>• رسوم اشتراك رمزية ميسرة تبدأ من 149 ج.م فقط شهرياً</li>
              <li>• متجر جاهز فورياً مع رابط وشعار وغلاف مخصص لبراندك</li>
              <li>• ظهور مباشر أمام زوار المنصة والمشترين المتفاعلين</li>
              <li>• تواصل فوري ومباشر مع زبائنك عبر الواتساب وخيارات دفع متعددة</li>
            </ul>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="max-w-3xl mx-auto space-y-6">
        <h3 className="text-xl sm:text-2xl font-black text-slate-900 text-center flex items-center justify-center gap-2">
          <HelpCircle className="w-5 h-5 text-indigo-600" />
          <span>{lang === 'ar' ? 'الأسئلة الشائعة حول اشتراك البائعين' : 'Frequently Asked Questions'}</span>
        </h3>

        <div className="space-y-3 text-xs sm:text-sm">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-1.5">
            <h4 className="font-bold text-slate-900">
              {lang === 'ar' ? 'كيف يعمل الاشتراك الرمزي؟' : 'How does the nominal subscription work?'}
            </h4>
            <p className="text-slate-600 leading-relaxed">
              {lang === 'ar' 
                ? 'تقوم باختيار الباقة المناسبة وسداد رسومها الرمزية (مثلاً 149 ج.م شهرياً)، ليتم تفعيل متجرك فوراً ورفع منتجاتك. يتجدد الاشتراك شهرياً ويمكنك الترقية أو الإلغاء في أي وقت بدون أي التزامات.'
                : 'You select a plan and pay a small fee (e.g. 149 EGP/mo). Your storefront activates immediately, allowing you to list products and start selling.'}
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-1.5">
            <h4 className="font-bold text-slate-900">
              {lang === 'ar' ? 'كيف أستلم قيمة طلبات المنتجات من المشترين؟' : 'How do I receive payments for my products?'}
            </h4>
            <p className="text-slate-600 leading-relaxed">
              {lang === 'ar' 
                ? 'الزبائن يطلبون إما عبر الدفع عند الاستلام (COD) فتقوم بتحصيل المبلغ عند تسليم الشحنة عبر المندوب، أو عبر التحويل المباشر لمحفظتك (فودافون كاش / انستاباي).'
                : 'Shoppers pay via Cash on Delivery or mobile wallet transfer, giving you direct cash flow.'}
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-1.5">
            <h4 className="font-bold text-slate-900">
              {lang === 'ar' ? 'هل يمكنني التواصل المباشر مع المشتري عبر الواتساب؟' : 'Can I communicate directly with customers via WhatsApp?'}
            </h4>
            <p className="text-slate-600 leading-relaxed">
              {lang === 'ar' 
                ? 'نعم! كل منتج وصفحة متجر مزودة بزر مباشر لربط المشتري برقم واتساب الخاص بك لإتمام الطلب أو الإجابة على أي استفسارات تخص المقاسات والألوان.'
                : 'Yes! Every product and storefront has a 1-click WhatsApp order button connecting shoppers directly to your phone.'}
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}
