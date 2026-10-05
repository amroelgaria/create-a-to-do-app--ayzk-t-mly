import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { SUBSCRIPTION_PLANS, CATEGORIES } from '../data/mockData';
import { 
  X, 
  Sparkles, 
  CheckCircle2, 
  Store, 
  CreditCard, 
  Wallet, 
  ShieldCheck, 
  ArrowRight, 
  ArrowLeft,
  Image as ImageIcon,
  Rocket
} from 'lucide-react';
import confetti from 'canvas-confetti';

const PRESET_LOGOS = [
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
  'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=300&q=80',
  'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=300&q=80',
  'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=300&q=80',
  'https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=300&q=80',
  'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=300&q=80',
];

const PRESET_COVERS = [
  'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1556906781-9a412961c28c?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&w=1200&q=80',
];

export default function VendorSubscriptionModal() {
  const { 
    isSubscriptionModalOpen, 
    setIsSubscriptionModalOpen, 
    subscriptionTargetPlan, 
    lang, 
    formatPrice, 
    registerNewVendor 
  } = useApp();

  const [step, setStep] = useState(1); // 1: Plan Confirm & Payment, 2: Store Details Setup, 3: Success
  const [selectedPlanId, setSelectedPlanId] = useState(subscriptionTargetPlan?.id || 'pro');
  
  // Payment state
  const [paymentMethod, setPaymentMethod] = useState('card'); // card, vodafone_cash
  const [cardHolder, setCardHolder] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  // Store Setup state
  const [brandNameAr, setBrandNameAr] = useState('');
  const [brandNameEn, setBrandNameEn] = useState('');
  const [category, setCategory] = useState('fashion');
  const [cityAr, setCityAr] = useState('القاهرة، مصر');
  const [phone, setPhone] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [bioAr, setBioAr] = useState('');
  const [selectedLogo, setSelectedLogo] = useState(PRESET_LOGOS[0]);
  const [selectedCover, setSelectedCover] = useState(PRESET_COVERS[0]);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isSubscriptionModalOpen) return null;

  const currentPlan = SUBSCRIPTION_PLANS.find((p) => p.id === selectedPlanId) || SUBSCRIPTION_PLANS[1];

  const handleNextToStoreSetup = (e) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      setStep(2);
    }, 600);
  };

  const handleCompleteRegistration = (e) => {
    e.preventDefault();
    if (!brandNameAr.trim()) {
      setErrorMsg(lang === 'ar' ? 'يرجى إدخال اسم المتجر أو البراند بالعربية' : 'Please provide store name');
      return;
    }
    if (!phone.trim()) {
      setErrorMsg(lang === 'ar' ? 'يرجى إدخال رقم الهاتف للتواصل' : 'Please provide contact phone');
      return;
    }

    setErrorMsg('');
    setIsProcessing(true);

    setTimeout(() => {
      registerNewVendor(
        {
          nameAr: brandNameAr,
          nameEn: brandNameEn || brandNameAr,
          category,
          cityAr,
          cityEn: 'Cairo, Egypt',
          phone,
          whatsapp: whatsapp || phone,
          bioAr: bioAr || 'متجر متخصص بتقديم منتجات عالية الجودة وخدمة متميزة.',
          bioEn: 'Store offering top-tier products.',
          logo: selectedLogo,
          cover: selectedCover,
        },
        currentPlan.id
      );

      try {
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.5 }
        });
      } catch (err) {}

      setIsProcessing(false);
      setIsSubscriptionModalOpen(false);
      // Reset form
      setStep(1);
      setBrandNameAr('');
      setPhone('');
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-white w-full max-w-2xl max-h-[92vh] rounded-3xl shadow-2xl overflow-y-auto border border-slate-100 flex flex-col relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-6 border-b border-slate-200 flex items-center justify-between sticky top-0 bg-white/95 backdrop-blur-md z-10">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 text-white flex items-center justify-center shadow-md">
              <Store className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-black text-lg text-slate-900 flex items-center gap-1.5">
                <span>{lang === 'ar' ? 'انضم كبراند على سوق البراندات' : 'Register Your Brand'}</span>
                <Sparkles className="w-4 h-4 text-amber-500 fill-amber-400" />
              </h3>
              <p className="text-[11px] text-slate-500 font-medium">
                {step === 1 ? (lang === 'ar' ? 'الخطوة 1: دفع رسوم الاشتراك الرمزية' : 'Step 1: Nominal Fee Payment') : (lang === 'ar' ? 'الخطوة 2: إعداد هوية متجرك' : 'Step 2: Setup Store Profile')}
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsSubscriptionModalOpen(false)}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* STEP 1: Plan Selection & Nominal Subscription Payment */}
        {step === 1 && (
          <form onSubmit={handleNextToStoreSetup} className="p-6 space-y-6">
            
            {/* Plan Card Banner */}
            <div className="space-y-3">
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">
                {lang === 'ar' ? 'اختر باقة الاشتراك الرمزية الشهرية:' : 'Select Subscription Plan:'}
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {SUBSCRIPTION_PLANS.map((plan) => (
                  <div
                    key={plan.id}
                    onClick={() => setSelectedPlanId(plan.id)}
                    className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex flex-col justify-between ${
                      selectedPlanId === plan.id
                        ? 'border-indigo-600 bg-indigo-50/50 shadow-md ring-2 ring-indigo-200'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-extrabold text-slate-900">
                          {lang === 'ar' ? plan.nameAr.split('(')[0] : plan.nameEn}
                        </span>
                        {plan.popular && (
                          <span className="text-[9px] bg-amber-400 text-slate-950 font-bold px-1.5 py-0.5 rounded-full">
                            ★
                          </span>
                        )}
                      </div>
                      <div className="text-lg font-black text-indigo-600">
                        {formatPrice(plan.priceEGP)}
                        <span className="text-[10px] text-slate-500 font-normal"> / شهر</span>
                      </div>
                    </div>

                    <div className="mt-3 pt-2 border-t border-slate-200/60 text-[11px] text-slate-600">
                      <span>{lang === 'ar' ? `حتى ${plan.maxProducts} منتج` : `Up to ${plan.maxProducts} items`}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Selected Plan Details Snapshot */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700">
                  {lang === 'ar' ? 'المبلغ الرمزي المطلوب سداده لتفعيل المتجر:' : 'Nominal Fee to Activate Store:'}
                </span>
                <span className="text-lg font-black text-emerald-600">
                  {formatPrice(currentPlan.priceEGP)}
                </span>
              </div>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                {lang === 'ar' ? currentPlan.descriptionAr : currentPlan.descriptionEn}
              </p>
            </div>

            {/* Payment Method Selector */}
            <div className="space-y-3">
              <label className="block text-xs font-bold text-slate-700">
                {lang === 'ar' ? 'طريقة سداد الاشتراك الرمزي:' : 'Payment Method for Nominal Subscription:'}
              </label>

              <div className="grid grid-cols-2 gap-3">
                <label 
                  className={`flex items-center gap-2.5 p-3 rounded-2xl border-2 cursor-pointer transition-all ${
                    paymentMethod === 'card' ? 'border-indigo-600 bg-indigo-50/40' : 'border-slate-200'
                  }`}
                >
                  <input
                    type="radio"
                    name="vendorPayMethod"
                    value="card"
                    checked={paymentMethod === 'card'}
                    onChange={() => setPaymentMethod('card')}
                    className="sr-only"
                  />
                  <CreditCard className="w-5 h-5 text-indigo-600 shrink-0" />
                  <div className="text-start">
                    <span className="text-xs font-bold text-slate-900 block">بطاقة بنكية</span>
                    <span className="text-[10px] text-slate-500">فيزا / ماستركارد</span>
                  </div>
                </label>

                <label 
                  className={`flex items-center gap-2.5 p-3 rounded-2xl border-2 cursor-pointer transition-all ${
                    paymentMethod === 'vodafone_cash' ? 'border-indigo-600 bg-indigo-50/40' : 'border-slate-200'
                  }`}
                >
                  <input
                    type="radio"
                    name="vendorPayMethod"
                    value="vodafone_cash"
                    checked={paymentMethod === 'vodafone_cash'}
                    onChange={() => setPaymentMethod('vodafone_cash')}
                    className="sr-only"
                  />
                  <Wallet className="w-5 h-5 text-indigo-600 shrink-0" />
                  <div className="text-start">
                    <span className="text-xs font-bold text-slate-900 block">فودافون كاش / انستاباي</span>
                    <span className="text-[10px] text-slate-500">تحويل محفظة إلكترونية</span>
                  </div>
                </label>
              </div>

              {paymentMethod === 'card' ? (
                <div className="space-y-3 bg-slate-50 p-4 rounded-2xl border border-slate-200">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">
                      {lang === 'ar' ? 'الاسم على البطاقة' : 'Cardholder Name'}
                    </label>
                    <input
                      type="text"
                      defaultValue="محمد عبد العزيز"
                      className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 mb-1">
                        {lang === 'ar' ? 'رقم البطاقة التجريبي' : 'Demo Card Number'}
                      </label>
                      <input
                        type="text"
                        defaultValue="4242 •••• •••• 4242"
                        className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-mono"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 mb-1">
                        CVV / Expiry
                      </label>
                      <input
                        type="text"
                        defaultValue="12/28 - 789"
                        className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-mono"
                        required
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-2xl text-xs text-emerald-900 space-y-1">
                  <p className="font-bold">📱 {lang === 'ar' ? 'رقم محفظة التحويل للمنصة:' : 'Platform Wallet:'}</p>
                  <p className="font-mono font-bold text-sm text-slate-900">010 9999 8888</p>
                  <p className="text-[11px] text-emerald-700">
                    {lang === 'ar' ? 'سيتم تفعيل الاشتراك فوري ومباشر بعد استكمال بيانات متجرك.' : 'Instant activation once store details are confirmed.'}
                  </p>
                </div>
              )}
            </div>

            {/* Next Step Button */}
            <button
              type="submit"
              disabled={isProcessing}
              className="w-full bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 disabled:opacity-50 text-white font-extrabold py-3.5 px-4 rounded-2xl text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-indigo-200"
            >
              {isProcessing ? (
                <span className="animate-pulse">{lang === 'ar' ? 'جاري التحقق وسداد الرسوم الرمزية...' : 'Processing Payment...'}</span>
              ) : (
                <>
                  <span>{lang === 'ar' ? `سداد ${formatPrice(currentPlan.priceEGP)} والمتابعة لإعداد المتجر` : `Pay ${formatPrice(currentPlan.priceEGP)} & Setup Store`}</span>
                  {lang === 'ar' ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                </>
              )}
            </button>
          </form>
        )}

        {/* STEP 2: Brand / Store Setup Wizard */}
        {step === 2 && (
          <form onSubmit={handleCompleteRegistration} className="p-6 space-y-5">
            {errorMsg && (
              <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl font-bold">
                {errorMsg}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {lang === 'ar' ? 'اسم المتجر أو البراند (بالعربية)' : 'Brand Name (Arabic)'} <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={brandNameAr}
                  onChange={(e) => setBrandNameAr(e.target.value)}
                  placeholder={lang === 'ar' ? 'مثال: ريماس للأزياء' : 'e.g. Remas Fashion'}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:bg-white focus:border-indigo-500 outline-hidden transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {lang === 'ar' ? 'اسم المتجر بالإنجليزية' : 'Brand Name (English)'}
                </label>
                <input
                  type="text"
                  value={brandNameEn}
                  onChange={(e) => setBrandNameEn(e.target.value)}
                  placeholder={lang === 'ar' ? 'مثال: Remas Fashion' : 'e.g. Remas Fashion'}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:bg-white focus:border-indigo-500 outline-hidden transition-all"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {lang === 'ar' ? 'تصنيف المتجر' : 'Store Category'}
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-800 focus:bg-white focus:border-indigo-500 outline-hidden transition-all"
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {lang === 'ar' ? cat.nameAr : cat.nameEn}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {lang === 'ar' ? 'المدينة / المقر' : 'City / Location'}
                </label>
                <input
                  type="text"
                  value={cityAr}
                  onChange={(e) => setCityAr(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:bg-white focus:border-indigo-500 outline-hidden transition-all"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {lang === 'ar' ? 'رقم الهاتف' : 'Contact Phone'} <span className="text-rose-500">*</span>
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="01012345678"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:bg-white focus:border-indigo-500 outline-hidden transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {lang === 'ar' ? 'رقم الواتساب لاستقبال طلبات الزبائن' : 'WhatsApp for Customer Orders'}
                </label>
                <input
                  type="tel"
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value)}
                  placeholder="01012345678"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:bg-white focus:border-indigo-500 outline-hidden transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                {lang === 'ar' ? 'نبذة عن البراند أو المنتجات' : 'Brand Bio / Description'}
              </label>
              <textarea
                rows={2}
                value={bioAr}
                onChange={(e) => setBioAr(e.target.value)}
                placeholder={lang === 'ar' ? 'اكتب نبذة مختصرة تجذب العملاء لمتجرك...' : 'Short bio for your store...'}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-800 focus:bg-white focus:border-indigo-500 outline-hidden transition-all"
              />
            </div>

            {/* Preset Logo Picker */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2">
                {lang === 'ar' ? 'شعار المتجر (اختر صورة رمزية):' : 'Store Logo:'}
              </label>
              <div className="flex gap-2 overflow-x-auto pb-1">
                {PRESET_LOGOS.map((logoUrl, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setSelectedLogo(logoUrl)}
                    className={`relative w-12 h-12 rounded-xl overflow-hidden border-2 transition-all cursor-pointer shrink-0 ${
                      selectedLogo === logoUrl ? 'border-indigo-600 ring-2 ring-indigo-200' : 'border-slate-200 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={logoUrl} alt="preset logo" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Complete Setup */}
            <div className="pt-3 border-t border-slate-200 flex gap-3">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs cursor-pointer"
              >
                {lang === 'ar' ? 'رجوع' : 'Back'}
              </button>

              <button
                type="submit"
                disabled={isProcessing}
                className="flex-1 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-extrabold py-3 px-4 rounded-xl text-xs sm:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-emerald-200"
              >
                {isProcessing ? (
                  <span className="animate-pulse">{lang === 'ar' ? 'جاري إطلاق متجرك...' : 'Launching Store...'}</span>
                ) : (
                  <>
                    <Rocket className="w-4 h-4" />
                    <span>{lang === 'ar' ? 'تفعيل متجري والبدء برفع المنتجات فوراً 🚀' : 'Activate Store & Add Products Now 🚀'}</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
}
