import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  X, 
  ShieldCheck, 
  Truck, 
  CreditCard, 
  Wallet, 
  Banknote, 
  MapPin, 
  User, 
  Phone, 
  FileText,
  CheckCircle2 
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function CheckoutModal() {
  const { 
    isCheckoutOpen, 
    setIsCheckoutOpen, 
    cart, 
    formatPrice, 
    lang, 
    t, 
    placeOrder 
  } = useApp();

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    city: 'القاهرة',
    address: '',
    notes: '',
    paymentMethod: 'cod' // cod, vodafone_cash, card
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isCheckoutOpen) return null;

  const subtotal = cart.reduce((acc, item) => {
    const price = item.product.discountPriceEGP || item.product.priceEGP;
    return acc + price * item.quantity;
  }, 0);

  const shippingFee = subtotal >= 1000 ? 0 : 40;
  const total = subtotal + shippingFee;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.fullName.trim()) {
      setErrorMsg(lang === 'ar' ? 'يرجى إدخال الاسم بالكامل' : 'Please enter your full name');
      return;
    }
    if (!formData.phone.trim() || formData.phone.length < 8) {
      setErrorMsg(lang === 'ar' ? 'يرجى إدخال رقم هاتف صحيح للتواصل' : 'Please enter a valid phone number');
      return;
    }
    if (!formData.address.trim()) {
      setErrorMsg(lang === 'ar' ? 'يرجى إدخال عنوان التوصيل بالتفصيل' : 'Please provide detailed delivery address');
      return;
    }

    setErrorMsg('');
    setIsSubmitting(true);

    // Simulate small network delay for realism
    setTimeout(() => {
      placeOrder({
        customerName: formData.fullName,
        customerPhone: formData.phone,
        customerAddress: formData.address,
        city: formData.city,
        notes: formData.notes,
        paymentMethod: formData.paymentMethod,
      });

      // Confetti celebration
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (err) {
        // graceful fallback if canvas-confetti is not loaded
      }

      setIsSubmitting(false);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-white w-full max-w-2xl max-h-[90vh] rounded-3xl shadow-2xl overflow-y-auto border border-slate-100 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-slate-200 flex items-center justify-between sticky top-0 bg-white/95 backdrop-blur-md z-10">
          <div className="flex items-center gap-2">
            <Truck className="w-5 h-5 text-indigo-600" />
            <h3 className="font-black text-lg text-slate-900">{t('checkoutTitle')}</h3>
          </div>
          <button
            onClick={() => setIsCheckoutOpen(false)}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {errorMsg && (
            <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl font-bold">
              {errorMsg}
            </div>
          )}

          {/* Customer Details */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <User className="w-3.5 h-3.5" />
              <span>{t('customerInfo')}</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {t('fullName')} <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder={lang === 'ar' ? 'مثال: أحمد محمد مصطفى' : 'e.g. John Smith'}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:bg-white focus:border-indigo-500 outline-hidden transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {t('phoneNumber')} <span className="text-rose-500">*</span>
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder={lang === 'ar' ? 'مثال: 01012345678' : 'e.g. +20 1012345678'}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:bg-white focus:border-indigo-500 outline-hidden transition-all"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {t('cityGovernorate')} <span className="text-rose-500">*</span>
                </label>
                <select
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-800 focus:bg-white focus:border-indigo-500 outline-hidden transition-all"
                >
                  <option value="القاهرة">القاهرة (Cairo)</option>
                  <option value="الجيزة">الجيزة (Giza)</option>
                  <option value="الإسكندرية">الإسكندرية (Alexandria)</option>
                  <option value="الدقهلية / المنصورة">الدقهلية / المنصورة (Mansoura)</option>
                  <option value="الغربية / طنطا">الغربية / طنطا (Tanta)</option>
                  <option value="الشرقية / الزقازيق">الشرقية / الزقازيق</option>
                  <option value="أسيوط">أسيوط (Assiut)</option>
                  <option value="باقي المحافظات">باقي المحافظات (Other Cities)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {t('deliveryAddress')} <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder={lang === 'ar' ? 'الشارع، رقم العمارة، الشقة، علامة مميزة' : 'Street name, building, apartment'}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:bg-white focus:border-indigo-500 outline-hidden transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                {t('orderNotes')}
              </label>
              <input
                type="text"
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                placeholder={lang === 'ar' ? 'أي تعليمات خاصة للمندوب أو مقاسات محددة...' : 'Any special notes for delivery...'}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-800 focus:bg-white focus:border-indigo-500 outline-hidden transition-all"
              />
            </div>
          </div>

          {/* Payment Method Selector */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <Banknote className="w-3.5 h-3.5" />
              <span>{t('paymentMethod')}</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* COD */}
              <label 
                className={`flex flex-col p-3.5 rounded-2xl border-2 cursor-pointer transition-all ${
                  formData.paymentMethod === 'cod' 
                    ? 'border-indigo-600 bg-indigo-50/50' 
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="cod"
                  checked={formData.paymentMethod === 'cod'}
                  onChange={() => setFormData({ ...formData, paymentMethod: 'cod' })}
                  className="sr-only"
                />
                <Banknote className={`w-5 h-5 mb-2 ${formData.paymentMethod === 'cod' ? 'text-indigo-600' : 'text-slate-500'}`} />
                <span className="text-xs font-bold text-slate-900">{t('cod')}</span>
                <span className="text-[11px] text-slate-500 mt-0.5">{lang === 'ar' ? 'ادفع عند وصول المندوب' : 'Pay when received'}</span>
              </label>

              {/* Vodafone Cash / InstaPay */}
              <label 
                className={`flex flex-col p-3.5 rounded-2xl border-2 cursor-pointer transition-all ${
                  formData.paymentMethod === 'vodafone_cash' 
                    ? 'border-indigo-600 bg-indigo-50/50' 
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="vodafone_cash"
                  checked={formData.paymentMethod === 'vodafone_cash'}
                  onChange={() => setFormData({ ...formData, paymentMethod: 'vodafone_cash' })}
                  className="sr-only"
                />
                <Wallet className={`w-5 h-5 mb-2 ${formData.paymentMethod === 'vodafone_cash' ? 'text-indigo-600' : 'text-slate-500'}`} />
                <span className="text-xs font-bold text-slate-900">فودافون كاش / انستاباي</span>
                <span className="text-[11px] text-slate-500 mt-0.5">{lang === 'ar' ? 'تحويل للمحفظة الإلكترونية' : 'Instant mobile transfer'}</span>
              </label>

              {/* Card */}
              <label 
                className={`flex flex-col p-3.5 rounded-2xl border-2 cursor-pointer transition-all ${
                  formData.paymentMethod === 'card' 
                    ? 'border-indigo-600 bg-indigo-50/50' 
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="card"
                  checked={formData.paymentMethod === 'card'}
                  onChange={() => setFormData({ ...formData, paymentMethod: 'card' })}
                  className="sr-only"
                />
                <CreditCard className={`w-5 h-5 mb-2 ${formData.paymentMethod === 'card' ? 'text-indigo-600' : 'text-slate-500'}`} />
                <span className="text-xs font-bold text-slate-900">{t('creditCard')}</span>
                <span className="text-[11px] text-slate-500 mt-0.5">{lang === 'ar' ? 'دفع إلكتروني آمن' : 'Visa / Mastercard'}</span>
              </label>
            </div>

            {formData.paymentMethod === 'vodafone_cash' && (
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs text-amber-800 space-y-1">
                <p className="font-bold">📱 {lang === 'ar' ? 'رقم محفظة فودافون كاش / انستاباي الخاص بالبراند:' : 'Mobile wallet transfer details:'}</p>
                <p className="font-mono font-bold text-sm text-slate-900">010 2345 6789</p>
                <p className="text-[11px] text-amber-700">
                  {lang === 'ar' ? 'بعد إتمام الطلب، سيتم إرسال رسالة واتساب لتأكيد الاستلام فوراً.' : 'WhatsApp confirmation will be triggered upon checkout.'}
                </p>
              </div>
            )}
          </div>

          {/* Order Items Preview */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-3">
            <h4 className="text-xs font-bold text-slate-700">
              {t('orderItems')} ({cart.reduce((a, b) => a + b.quantity, 0)})
            </h4>
            <div className="space-y-2 max-h-36 overflow-y-auto">
              {cart.map((item) => (
                <div key={item.productId} className="flex justify-between items-center text-xs">
                  <span className="truncate max-w-[200px] text-slate-700 font-medium">
                    {item.quantity}x {lang === 'ar' ? item.product.titleAr : item.product.titleEn}
                  </span>
                  <span className="font-bold text-slate-900">
                    {formatPrice((item.product.discountPriceEGP || item.product.priceEGP) * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-slate-200 text-xs space-y-1">
              <div className="flex justify-between text-slate-600">
                <span>{t('subtotal')}</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>{t('shipping')}</span>
                <span>{shippingFee === 0 ? t('freeShipping') : formatPrice(shippingFee)}</span>
              </div>
              <div className="flex justify-between text-sm font-black text-slate-900 pt-1">
                <span>{t('total')}</span>
                <span className="text-indigo-600">{formatPrice(total)}</span>
              </div>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 disabled:opacity-50 text-white font-extrabold py-3.5 px-4 rounded-2xl text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-indigo-200"
          >
            {isSubmitting ? (
              <span className="animate-pulse">{lang === 'ar' ? 'جاري تجهيز الطلب...' : 'Processing Order...'}</span>
            ) : (
              <>
                <CheckCircle2 className="w-4 h-4" />
                <span>{t('placeOrder')} ({formatPrice(total)})</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
