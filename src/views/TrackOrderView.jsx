import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Truck, 
  Search, 
  CheckCircle, 
  Clock, 
  Package, 
  MapPin, 
  Phone, 
  MessageCircle, 
  Store, 
  ShieldCheck,
  CheckCircle2,
  Calendar,
  AlertCircle
} from 'lucide-react';

export default function TrackOrderView() {
  const { orders, vendors, lang, formatPrice, t } = useApp();

  const [searchQuery, setSearchQuery] = useState('ORD-7821');
  const [matchedOrder, setMatchedOrder] = useState(() => orders.find((o) => o.id === 'ORD-7821') || orders[0] || null);
  const [searched, setSearched] = useState(true);

  const handleSearch = (e) => {
    e?.preventDefault();
    const query = searchQuery.trim().toLowerCase().replace('#', '');
    if (!query) return;

    const found = orders.find(
      (o) =>
        o.id.toLowerCase().replace('#', '') === query ||
        o.customerPhone.replace(/[^0-9]/g, '').includes(query.replace(/[^0-9]/g, ''))
    );

    setMatchedOrder(found || null);
    setSearched(true);
  };

  const vendor = matchedOrder ? vendors.find((v) => v.id === matchedOrder.vendorId) : null;

  const getStepStatus = (stepIndex, orderStatus) => {
    // 0: Placed/Pending, 1: Processing, 2: Shipped, 3: Delivered
    const orderLevels = {
      pending: 0,
      processing: 1,
      shipped: 2,
      delivered: 3,
      cancelled: -1
    };

    const currentLevel = orderLevels[orderStatus] ?? 0;
    if (orderStatus === 'cancelled') return 'cancelled';
    if (currentLevel > stepIndex) return 'completed';
    if (currentLevel === stepIndex) return 'current';
    return 'upcoming';
  };

  const steps = [
    {
      titleAr: 'تم استلام وتأكيد الطلب',
      titleEn: 'Order Received & Confirmed',
      descAr: 'تم إرسال الطلب وإشعار البراند فورياً',
      descEn: 'Order transmitted to merchant store'
    },
    {
      titleAr: 'قيد التجهيز والتغليف من البراند',
      titleEn: 'Preparing & Packaging by Brand',
      descAr: 'المتجر يجهز الأصناف ويراجع الجودة',
      descEn: 'Store inspecting items for packaging'
    },
    {
      titleAr: 'جاري الشحن والتوصيل مع المندوب',
      titleEn: 'Out for Delivery with Courier',
      descAr: 'الشحنة في طريقها لعنوان التوصيل',
      descEn: 'Package on the road to your address'
    },
    {
      titleAr: 'تم التسليم بنجاح للعميل',
      titleEn: 'Delivered Successfully',
      descAr: 'استلمت الشحنة وسددت المبلغ',
      descEn: 'Package received & confirmed'
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 pb-20">
      
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mx-auto">
          <Truck className="w-6 h-6" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
          {lang === 'ar' ? 'تتبع حالة طلبك وشحنتك' : 'Track Your Order & Shipment'}
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
          {lang === 'ar' 
            ? 'أدخل رقم الطلب أو رقم الهاتف المسجل لمعرفة خط سير شحنتك والتواصل مع المتجر'
            : 'Enter your order ID or phone number to view real-time shipping milestones'}
        </p>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs space-y-3">
        <form onSubmit={handleSearch} className="flex gap-2">
          <div className="relative flex-1">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={lang === 'ar' ? 'أدخل رقم الطلب (مثال: ORD-7821) أو رقم الهاتف...' : 'Enter Order ID (e.g. ORD-7821) or phone...'}
              className="w-full bg-slate-50 border border-slate-200 focus:bg-white focus:border-indigo-500 rounded-xl py-3 px-10 text-xs sm:text-sm outline-hidden text-slate-800"
            />
            <Search className="w-4 h-4 text-slate-400 absolute start-3.5 top-3.5" />
          </div>

          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-xl text-xs sm:text-sm transition-colors cursor-pointer"
          >
            {lang === 'ar' ? 'بحث وتتبع' : 'Track'}
          </button>
        </form>

        {/* Quick Demo Order Chips */}
        <div className="flex items-center gap-2 text-xs text-slate-500 pt-1">
          <span>{lang === 'ar' ? 'طلبات تجريبية سريعة:' : 'Quick test orders:'}</span>
          {orders.slice(0, 3).map((ord) => (
            <button
              key={ord.id}
              onClick={() => {
                setSearchQuery(ord.id);
                setMatchedOrder(ord);
                setSearched(true);
              }}
              className="font-mono bg-slate-100 hover:bg-indigo-50 hover:text-indigo-600 px-2 py-0.5 rounded text-[11px] font-bold cursor-pointer transition-colors"
            >
              #{ord.id}
            </button>
          ))}
        </div>
      </div>

      {/* Result Section */}
      {searched && (
        <>
          {!matchedOrder ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-3">
              <AlertCircle className="w-12 h-12 text-amber-500 mx-auto" />
              <h3 className="text-base font-bold text-slate-800">
                {lang === 'ar' ? 'لم يتم العثور على طلب بهذا الرقم' : 'No order found matching your search'}
              </h3>
              <p className="text-xs text-slate-400">
                {lang === 'ar' ? 'تأكد من كتابة رقم الطلب بشكل صحيح كالموجود في رسالة التأكيد' : 'Please check your order ID and try again'}
              </p>
            </div>
          ) : (
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-8 shadow-xs">
              
              {/* Order Info Head */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-200 gap-4">
                <div>
                  <span className="text-xs font-bold text-slate-400 block">{t('orderNumber')}</span>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xl font-black text-indigo-600">#{matchedOrder.id}</span>
                    <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                      matchedOrder.status === 'delivered' 
                        ? 'bg-emerald-100 text-emerald-800' 
                        : matchedOrder.status === 'shipped' 
                        ? 'bg-blue-100 text-blue-800' 
                        : 'bg-amber-100 text-amber-800'
                    }`}>
                      {t(`orderStatus${matchedOrder.status.charAt(0).toUpperCase() + matchedOrder.status.slice(1)}`)}
                    </span>
                  </div>
                </div>

                {vendor && (
                  <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-2xl border border-slate-200/80">
                    <img
                      src={vendor.logo}
                      alt={vendor.nameAr}
                      className="w-10 h-10 rounded-xl object-cover"
                    />
                    <div>
                      <span className="text-[11px] text-slate-400 block">{lang === 'ar' ? 'البراند البائع:' : 'Sold by Brand:'}</span>
                      <span className="text-xs font-bold text-slate-900">{lang === 'ar' ? vendor.nameAr : vendor.nameEn}</span>
                    </div>

                    {vendor.whatsapp && (
                      <a
                        href={`https://wa.me/${vendor.whatsapp}?text=${encodeURIComponent(`مرحباً أود الاستفسار عن حالة طلبي #${matchedOrder.id}`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-emerald-50 text-emerald-600 rounded-xl border border-emerald-200 hover:bg-emerald-100 transition-colors"
                        title="مراسلة المتجر عبر واتساب"
                      >
                        <MessageCircle className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                )}
              </div>

              {/* Visual Milestone Stepper */}
              <div className="space-y-6">
                <h3 className="font-extrabold text-sm text-slate-900">
                  {lang === 'ar' ? 'مراحل تجهيز وتوصيل الشحنة:' : 'Delivery Progress Milestones:'}
                </h3>

                <div className="relative">
                  {/* Vertical line connecting steps */}
                  <div className="absolute start-4 top-4 bottom-4 w-0.5 bg-slate-200 rtl:end-auto" />

                  <div className="space-y-6 relative">
                    {steps.map((st, idx) => {
                      const status = getStepStatus(idx, matchedOrder.status);
                      const isCompleted = status === 'completed';
                      const isCurrent = status === 'current';

                      return (
                        <div key={idx} className="flex items-start gap-4">
                          <div 
                            className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 z-10 transition-colors ${
                              isCompleted
                                ? 'bg-emerald-600 text-white ring-4 ring-emerald-100'
                                : isCurrent
                                ? 'bg-indigo-600 text-white ring-4 ring-indigo-100 animate-pulse'
                                : 'bg-slate-200 text-slate-500'
                            }`}
                          >
                            {isCompleted ? <CheckCircle className="w-4 h-4" /> : idx + 1}
                          </div>

                          <div className="pt-0.5 space-y-0.5">
                            <h4 className={`text-xs sm:text-sm font-bold ${
                              isCurrent ? 'text-indigo-600 font-black' : isCompleted ? 'text-slate-900' : 'text-slate-400'
                            }`}>
                              {lang === 'ar' ? st.titleAr : st.titleEn}
                            </h4>
                            <p className="text-[11px] text-slate-500">
                              {lang === 'ar' ? st.descAr : st.descEn}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Summary Details */}
              <div className="pt-6 border-t border-slate-200 grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
                {/* Shipping Details */}
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-2">
                  <h4 className="font-bold text-slate-900">{lang === 'ar' ? 'بيانات التوصيل والمستلم:' : 'Delivery Details:'}</h4>
                  <p><span className="text-slate-500">{lang === 'ar' ? 'المستلم:' : 'Recipient:'}</span> <strong>{matchedOrder.customerName}</strong></p>
                  <p><span className="text-slate-500">{lang === 'ar' ? 'الهاتف:' : 'Phone:'}</span> <span dir="ltr">{matchedOrder.customerPhone}</span></p>
                  <p><span className="text-slate-500">{lang === 'ar' ? 'العنوان:' : 'Address:'}</span> {matchedOrder.customerAddress} ({matchedOrder.city})</p>
                  <p><span className="text-slate-500">{lang === 'ar' ? 'طريقة الدفع:' : 'Payment:'}</span> <strong className="text-emerald-700">{matchedOrder.paymentMethod === 'cod' ? 'دفع عند الاستلام' : 'دفع إلكتروني'}</strong></p>
                </div>

                {/* Items & Subtotal */}
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-2">
                  <h4 className="font-bold text-slate-900">{lang === 'ar' ? 'المنتجات المطلوبة:' : 'Items in this order:'}</h4>
                  <div className="space-y-1.5 max-h-24 overflow-y-auto">
                    {matchedOrder.items.map((it, idx) => (
                      <div key={idx} className="flex justify-between items-center text-slate-700">
                        <span>{it.quantity}x {lang === 'ar' ? it.titleAr : it.titleEn}</span>
                        <span className="font-bold">{formatPrice(it.price * it.quantity)}</span>
                      </div>
                    ))}
                  </div>
                  <div className="pt-2 border-t border-slate-200 flex justify-between font-black text-sm text-slate-900">
                    <span>{t('total')}</span>
                    <span className="text-indigo-600">{formatPrice(matchedOrder.total)}</span>
                  </div>
                </div>
              </div>

            </div>
          )}
        </>
      )}

    </div>
  );
}
