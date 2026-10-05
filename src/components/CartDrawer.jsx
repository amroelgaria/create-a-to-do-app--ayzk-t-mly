import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  X, 
  Trash2, 
  ShoppingBag, 
  ArrowRight, 
  ArrowLeft, 
  ShieldCheck, 
  Truck,
  Plus,
  Minus 
} from 'lucide-react';

export default function CartDrawer() {
  const { 
    isCartOpen, 
    setIsCartOpen, 
    cart, 
    removeFromCart, 
    updateCartQuantity, 
    clearCart,
    formatPrice, 
    lang, 
    t, 
    setIsCheckoutOpen,
    setActiveView 
  } = useApp();

  if (!isCartOpen) return null;

  const subtotal = cart.reduce((acc, item) => {
    const price = item.product.discountPriceEGP || item.product.priceEGP;
    return acc + price * item.quantity;
  }, 0);

  const freeShippingThreshold = 1000;
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const freeShippingProgress = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-in fade-in duration-200">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 end-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between">
          
          {/* Header */}
          <div className="p-5 border-b border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-indigo-600" />
              <h2 className="font-extrabold text-base sm:text-lg text-slate-900">
                {t('cart')} ({cart.reduce((n, i) => n + i.quantity, 0)})
              </h2>
            </div>
            
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Meter */}
          <div className="bg-indigo-50/70 px-5 py-3 border-b border-indigo-100 text-xs">
            {remainingForFreeShipping > 0 ? (
              <div>
                <p className="text-indigo-900 font-semibold mb-1 flex items-center gap-1.5">
                  <Truck className="w-4 h-4 text-indigo-600" />
                  <span>
                    {lang === 'ar' 
                      ? `أضف بـ ${formatPrice(remainingForFreeShipping)} إضافية للحصول على شحن مجاني!` 
                      : `Add ${formatPrice(remainingForFreeShipping)} more for FREE shipping!`}
                  </span>
                </p>
                <div className="w-full bg-indigo-200/80 rounded-full h-1.5 overflow-hidden">
                  <div 
                    className="bg-indigo-600 h-1.5 rounded-full transition-all duration-300"
                    style={{ width: `${freeShippingProgress}%` }}
                  />
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-1.5 text-emerald-700 font-bold">
                <Truck className="w-4 h-4" />
                <span>{lang === 'ar' ? '🎉 تهانينا! مؤهل لشحن مجاني بالكامل' : '🎉 You unlocked FREE Shipping!'}</span>
              </div>
            )}
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="text-center py-16 px-4 space-y-4">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-400">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-800">{t('cartEmpty')}</h3>
                  <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">{t('cartEmptySub')}</p>
                </div>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    setActiveView('products');
                  }}
                  className="bg-indigo-600 text-white font-bold text-xs py-2.5 px-6 rounded-xl hover:bg-indigo-700 transition-colors cursor-pointer"
                >
                  {t('startShopping')}
                </button>
              </div>
            ) : (
              cart.map((item) => {
                const itemPrice = item.product.discountPriceEGP || item.product.priceEGP;
                return (
                  <div 
                    key={item.productId}
                    className="flex gap-3 bg-slate-50 p-3 rounded-2xl border border-slate-100"
                  >
                    <img
                      src={item.product.images[0]}
                      alt={item.product.titleAr}
                      className="w-20 h-20 rounded-xl object-cover border border-slate-200 bg-white shrink-0"
                    />

                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-1">
                          <h4 className="text-xs sm:text-sm font-bold text-slate-900 truncate">
                            {lang === 'ar' ? item.product.titleAr : item.product.titleEn}
                          </h4>
                          <button
                            onClick={() => removeFromCart(item.productId)}
                            className="text-slate-400 hover:text-rose-600 transition-colors cursor-pointer p-1"
                            title="حذف من السلة"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        <p className="text-xs font-black text-indigo-600 mt-0.5">
                          {formatPrice(itemPrice)}
                        </p>
                      </div>

                      {/* Quantity Stepper */}
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center border border-slate-200 rounded-lg bg-white">
                          <button
                            onClick={() => updateCartQuantity(item.productId, item.quantity - 1)}
                            className="p-1 text-slate-500 hover:text-slate-900 cursor-pointer"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="px-2.5 text-xs font-bold text-slate-800">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateCartQuantity(item.productId, item.quantity + 1)}
                            className="p-1 text-slate-500 hover:text-slate-900 cursor-pointer"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <span className="text-xs font-bold text-slate-700">
                          {formatPrice(itemPrice * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer Summary */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-slate-200 bg-slate-50 space-y-3">
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>{t('subtotal')}</span>
                  <span className="font-bold text-slate-900">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>{t('shipping')}</span>
                  <span className="font-bold text-slate-900">
                    {subtotal >= 1000 ? (
                      <span className="text-emerald-600 font-bold">{t('freeShipping')}</span>
                    ) : (
                      formatPrice(40)
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-black text-slate-900 pt-2 border-t border-slate-200">
                  <span>{t('total')}</span>
                  <span className="text-indigo-600 text-base">
                    {formatPrice(subtotal + (subtotal >= 1000 ? 0 : 40))}
                  </span>
                </div>
              </div>

              <button
                onClick={handleProceedToCheckout}
                className="w-full bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-extrabold py-3.5 px-4 rounded-xl text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-indigo-200"
              >
                <span>{t('proceedToCheckout')}</span>
                {lang === 'ar' ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-500 pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>{lang === 'ar' ? 'طلبك محمي ومضمون عبر منصة سوق البراندات' : 'Protected checkout via Souq Brands'}</span>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
