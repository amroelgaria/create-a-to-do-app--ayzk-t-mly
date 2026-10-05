import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  X, 
  Star, 
  ShoppingBag, 
  MessageCircle, 
  ShieldCheck, 
  Store, 
  Check, 
  Truck, 
  RotateCcw,
  Sparkles 
} from 'lucide-react';

export default function ProductModal() {
  const { 
    selectedProduct, 
    setSelectedProduct, 
    lang, 
    t, 
    formatPrice, 
    addToCart, 
    vendors, 
    setSelectedBrandId, 
    setActiveView 
  } = useApp();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  if (!selectedProduct) return null;

  const vendor = vendors.find((v) => v.id === selectedProduct.vendorId) || {
    nameAr: 'متجر رسمي معتمد',
    nameEn: 'Verified Store',
    rating: 5.0,
    whatsapp: '201000000000',
    verified: true
  };

  const discountPercentage = selectedProduct.discountPriceEGP 
    ? Math.round(((selectedProduct.priceEGP - selectedProduct.discountPriceEGP) / selectedProduct.priceEGP) * 100)
    : 0;

  const handleVisitStore = () => {
    setSelectedBrandId(selectedProduct.vendorId);
    setSelectedProduct(null);
    setActiveView('storefront');
  };

  const handleWhatsAppOrder = () => {
    const title = lang === 'ar' ? selectedProduct.titleAr : selectedProduct.titleEn;
    const finalPrice = selectedProduct.discountPriceEGP || selectedProduct.priceEGP;
    const total = finalPrice * quantity;
    const msg = lang === 'ar'
      ? `مرحباً متجر ${vendor.nameAr}، أود طلب المنتج التالي من سوق البراندات:\n- اسم المنتج: ${title}\n- الكمية: ${quantity}\n- السعر الإجمالي: ${total} ج.م\n- رابط المنتج: ${selectedProduct.images[0]}`
      : `Hello ${vendor.nameEn}, I would like to order ${quantity}x "${title}" for ${total} EGP from Souq Brands.`;

    window.open(`https://wa.me/${vendor.whatsapp}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-white w-full max-w-4xl max-h-[90vh] rounded-3xl shadow-2xl overflow-y-auto border border-slate-100 flex flex-col relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => setSelectedProduct(null)}
          className="absolute top-4 end-4 z-10 bg-white/90 hover:bg-slate-100 text-slate-700 p-2 rounded-full shadow-md transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 sm:p-8">
          
          {/* Gallery Column */}
          <div className="space-y-4">
            <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-slate-100 border border-slate-200">
              <img
                src={selectedProduct.images[activeImageIndex] || selectedProduct.images[0]}
                alt={selectedProduct.titleAr}
                className="w-full h-full object-cover"
              />
              {discountPercentage > 0 && (
                <span className="absolute top-4 start-4 bg-rose-600 text-white font-extrabold text-xs px-3 py-1 rounded-full shadow-md">
                  {discountPercentage}% {lang === 'ar' ? 'خصم متاح' : 'OFF'}
                </span>
              )}
            </div>

            {/* Thumbnails */}
            {selectedProduct.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-1">
                {selectedProduct.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-16 h-16 rounded-xl overflow-hidden border-2 transition-all cursor-pointer shrink-0 ${
                      activeImageIndex === idx ? 'border-indigo-600 ring-2 ring-indigo-200' : 'border-slate-200 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="thumbnail" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Buyer Protection Perks */}
            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 space-y-2.5 text-xs text-slate-600">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-indigo-600 shrink-0" />
                <span>{lang === 'ar' ? 'شحن سريع لجميع محافظات مصر والوطن العربي' : 'Fast delivery to all regions'}</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{lang === 'ar' ? 'منتج أصلي 100% مباشرة من البراند المعتمد' : '100% Genuine from verified brand'}</span>
              </div>
              <div className="flex items-center gap-2">
                <RotateCcw className="w-4 h-4 text-amber-600 shrink-0" />
                <span>{lang === 'ar' ? 'إمكانية المعاينة عند الاستلام قبل الدفع' : 'Inspect upon delivery before payment'}</span>
              </div>
            </div>
          </div>

          {/* Details Column */}
          <div className="flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              
              {/* Vendor Card Pill */}
              <div 
                onClick={handleVisitStore}
                className="bg-indigo-50/70 hover:bg-indigo-100/70 border border-indigo-100 rounded-2xl p-3 flex items-center justify-between cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={vendor.logo}
                    alt={vendor.nameAr}
                    className="w-10 h-10 rounded-xl object-cover border border-white shadow-xs"
                  />
                  <div>
                    <div className="flex items-center gap-1.5 font-bold text-xs sm:text-sm text-slate-900">
                      <span>{lang === 'ar' ? vendor.nameAr : vendor.nameEn}</span>
                      {vendor.verified && (
                        <ShieldCheck className="w-4 h-4 text-indigo-600" />
                      )}
                    </div>
                    <span className="text-[11px] text-slate-500">
                      {lang === 'ar' ? 'بائع موثق على سوق البراندات' : 'Verified Vendor on Souq Brands'}
                    </span>
                  </div>
                </div>

                <span className="text-xs font-bold text-indigo-600 underline">
                  {lang === 'ar' ? 'زيارة المتجر' : 'Visit'}
                </span>
              </div>

              {/* Title */}
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 leading-snug">
                {lang === 'ar' ? selectedProduct.titleAr : selectedProduct.titleEn}
              </h2>

              {/* Rating & Stock */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1 bg-amber-50 text-amber-800 px-2.5 py-1 rounded-xl text-xs font-bold border border-amber-200">
                    <Star className="w-4 h-4 text-amber-500 fill-amber-400" />
                    <span>{selectedProduct.rating}</span>
                  </div>
                  <span className="text-xs text-slate-500">
                    ({selectedProduct.reviewsCount} {t('reviews')})
                  </span>
                </div>

                <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-xl border border-emerald-200">
                  <Check className="w-3.5 h-3.5" />
                  <span>{t('inStock')} ({selectedProduct.stock} {t('itemsLeft')})</span>
                </div>
              </div>

              {/* Pricing */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex items-baseline gap-3">
                <span className="text-2xl sm:text-3xl font-black text-indigo-600">
                  {formatPrice(selectedProduct.discountPriceEGP || selectedProduct.priceEGP)}
                </span>
                {selectedProduct.discountPriceEGP && (
                  <span className="text-sm sm:text-base text-slate-400 line-through">
                    {formatPrice(selectedProduct.priceEGP)}
                  </span>
                )}
                {discountPercentage > 0 && (
                  <span className="text-xs font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-md">
                    {lang === 'ar' ? `وفرت ${formatPrice(selectedProduct.priceEGP - selectedProduct.discountPriceEGP)}` : `Save ${discountPercentage}%`}
                  </span>
                )}
              </div>

              {/* Description */}
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                  {lang === 'ar' ? 'الوصف والتفاصيل' : 'Product Description'}
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {lang === 'ar' ? selectedProduct.descriptionAr : selectedProduct.descriptionEn}
                </p>
              </div>

              {/* Specifications table */}
              {selectedProduct.specs && Object.keys(selectedProduct.specs).length > 0 && (
                <div className="border border-slate-200 rounded-xl overflow-hidden text-xs">
                  <div className="bg-slate-100 px-3 py-1.5 font-bold text-slate-700">
                    {lang === 'ar' ? 'المواصفات الفنية' : 'Specifications'}
                  </div>
                  <div className="divide-y divide-slate-100">
                    {Object.entries(selectedProduct.specs).map(([key, val]) => (
                      <div key={key} className="px-3 py-2 flex justify-between">
                        <span className="text-slate-500 font-medium">{key}</span>
                        <span className="text-slate-900 font-bold">{val}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Actions: Quantity & Purchase Buttons */}
            <div className="space-y-3 pt-4 border-t border-slate-200">
              <div className="flex items-center gap-3">
                {/* Quantity */}
                <div className="flex items-center border border-slate-300 rounded-xl bg-slate-50">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 text-slate-600 hover:text-slate-900 font-bold text-sm cursor-pointer"
                  >
                    -
                  </button>
                  <span className="px-3 py-2 font-bold text-sm text-slate-900 min-w-8 text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(Math.min(selectedProduct.stock, quantity + 1))}
                    className="px-3 py-2 text-slate-600 hover:text-slate-900 font-bold text-sm cursor-pointer"
                  >
                    +
                  </button>
                </div>

                {/* Add to Cart button */}
                <button
                  onClick={() => {
                    addToCart(selectedProduct, quantity);
                    setSelectedProduct(null);
                  }}
                  className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-xl text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-indigo-200"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>{t('addToCart')}</span>
                </button>
              </div>

              {/* Direct WhatsApp Order Button */}
              {vendor.whatsapp && (
                <button
                  onClick={handleWhatsAppOrder}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-4 rounded-xl text-xs sm:text-sm transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs shadow-emerald-200"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>{lang === 'ar' ? 'طلب فوري ومباشر عبر واتساب المتجر' : 'Direct Order via Brand WhatsApp'}</span>
                </button>
              )}
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
