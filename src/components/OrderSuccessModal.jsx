import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  CheckCircle, 
  Truck, 
  ShoppingBag, 
  MessageCircle, 
  Copy, 
  Check, 
  X,
  FileCheck 
} from 'lucide-react';

export default function OrderSuccessModal() {
  const { 
    isOrderSuccessOpen, 
    setIsOrderSuccessOpen, 
    lastPlacedOrder, 
    formatPrice, 
    lang, 
    t, 
    setActiveView 
  } = useApp();

  const [copied, setCopied] = React.useState(false);

  if (!isOrderSuccessOpen || !lastPlacedOrder) return null;

  const handleCopyOrderId = () => {
    navigator.clipboard.writeText(lastPlacedOrder.id);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleGoToTracking = () => {
    setIsOrderSuccessOpen(false);
    setActiveView('track-order');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden border border-slate-100 text-center relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => setIsOrderSuccessOpen(false)}
          className="absolute top-4 end-4 p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-8 space-y-6">
          {/* Animated Success Badge */}
          <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner animate-bounce">
            <CheckCircle className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <h3 className="text-2xl font-black text-slate-900">{t('orderSuccessTitle')}</h3>
            <p className="text-xs sm:text-sm text-slate-500 max-w-sm mx-auto leading-relaxed">
              {t('orderSuccessSub')}
            </p>
          </div>

          {/* Order ID Pill */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 flex items-center justify-between">
            <div className="text-start">
              <span className="text-[11px] text-slate-500 font-bold block">{t('orderNumber')}</span>
              <span className="text-base font-black text-indigo-600 tracking-wider">
                #{lastPlacedOrder.id}
              </span>
            </div>

            <button
              onClick={handleCopyOrderId}
              className="flex items-center gap-1 text-xs font-bold text-slate-700 bg-white border border-slate-200 px-3 py-1.5 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer shadow-xs"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
              <span>{copied ? (lang === 'ar' ? 'تم النسخ' : 'Copied') : (lang === 'ar' ? 'نسخ الرقم' : 'Copy')}</span>
            </button>
          </div>

          {/* Order Snapshot */}
          <div className="text-start bg-indigo-50/50 p-4 rounded-2xl border border-indigo-100/60 text-xs space-y-2">
            <div className="flex justify-between">
              <span className="text-slate-500">{lang === 'ar' ? 'المستلم:' : 'Customer:'}</span>
              <span className="font-bold text-slate-800">{lastPlacedOrder.customerName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">{lang === 'ar' ? 'العنوان:' : 'Delivery to:'}</span>
              <span className="font-bold text-slate-800">{lastPlacedOrder.city}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">{lang === 'ar' ? 'الإجمالي المطلوب:' : 'Amount to pay:'}</span>
              <span className="font-black text-indigo-700">{formatPrice(lastPlacedOrder.total)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">{lang === 'ar' ? 'طريقة الدفع:' : 'Payment:'}</span>
              <span className="font-bold text-emerald-700">
                {lastPlacedOrder.paymentMethod === 'cod' 
                  ? (lang === 'ar' ? 'الدفع نقداً عند الاستلام' : 'Cash on Delivery') 
                  : lastPlacedOrder.paymentMethod === 'vodafone_cash' 
                  ? 'فودافون كاش / محفظة هاتف' 
                  : (lang === 'ar' ? 'بطاقة بنكية' : 'Card')}
              </span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="space-y-2.5">
            <button
              onClick={handleGoToTracking}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold py-3.5 px-4 rounded-2xl text-xs sm:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-indigo-200"
            >
              <Truck className="w-4 h-4" />
              <span>{t('trackOrderBtn')}</span>
            </button>

            <button
              onClick={() => {
                setIsOrderSuccessOpen(false);
                setActiveView('products');
              }}
              className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-3 px-4 rounded-2xl text-xs transition-colors cursor-pointer"
            >
              {t('continueShopping')}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
