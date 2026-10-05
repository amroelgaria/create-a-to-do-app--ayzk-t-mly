import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  ShoppingBag, 
  Eye, 
  Star, 
  MessageCircle, 
  Store, 
  ShieldCheck, 
  Check, 
  AlertCircle 
} from 'lucide-react';

export default function ProductCard({ product }) {
  const { 
    lang, 
    formatPrice, 
    addToCart, 
    setSelectedProduct, 
    vendors, 
    setSelectedBrandId, 
    setActiveView 
  } = useApp();

  const vendor = vendors.find((v) => v.id === product.vendorId) || {
    nameAr: 'متجر معتمد',
    nameEn: 'Verified Store',
    whatsapp: '201000000000',
    verified: true
  };

  const discountPercentage = product.discountPriceEGP 
    ? Math.round(((product.priceEGP - product.discountPriceEGP) / product.priceEGP) * 100)
    : 0;

  const handleOpenBrand = (e) => {
    e.stopPropagation();
    setSelectedBrandId(product.vendorId);
    setActiveView('storefront');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDirectWhatsApp = (e) => {
    e.stopPropagation();
    const productTitle = lang === 'ar' ? product.titleAr : product.titleEn;
    const finalPrice = product.discountPriceEGP || product.priceEGP;
    const msg = lang === 'ar'
      ? `مرحباً متجر ${vendor.nameAr}، أود طلب المنتج التالي من سوق البراندات:\n- اسم المنتج: ${productTitle}\n- السعر: ${finalPrice} ج.م\n- رابط الصورة: ${product.images[0]}`
      : `Hello ${vendor.nameEn}, I would like to order: ${productTitle} for ${finalPrice} EGP from Souq Brands.`;
    
    window.open(`https://wa.me/${vendor.whatsapp}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div 
      onClick={() => setSelectedProduct(product)}
      className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 group flex flex-col justify-between cursor-pointer"
    >
      <div>
        {/* Product Image Section */}
        <div className="relative aspect-square w-full overflow-hidden bg-slate-100">
          <img
            src={product.images[0]}
            alt={lang === 'ar' ? product.titleAr : product.titleEn}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />

          {/* Discount Pill */}
          {discountPercentage > 0 && (
            <span className="absolute top-3 start-3 bg-rose-600 text-white font-extrabold text-[11px] px-2.5 py-1 rounded-full shadow-md">
              {discountPercentage}% {lang === 'ar' ? 'خصم' : 'OFF'}
            </span>
          )}

          {/* Stock Warning Badge */}
          {product.stock <= 5 && product.stock > 0 && (
            <span className="absolute top-3 end-3 bg-amber-500/90 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
              <AlertCircle className="w-3 h-3" />
              <span>{lang === 'ar' ? `متبقي ${product.stock}` : `${product.stock} left`}</span>
            </span>
          )}

          {/* Quick View Button on Hover */}
          <div className="absolute inset-0 bg-slate-900/30 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedProduct(product);
              }}
              className="bg-white text-slate-800 hover:text-indigo-600 p-2.5 rounded-full shadow-lg transition-transform hover:scale-110 cursor-pointer"
              title="معاينة تفاصيل المنتج"
            >
              <Eye className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-4">
          
          {/* Brand Link */}
          <button
            onClick={handleOpenBrand}
            className="inline-flex items-center gap-1.5 text-xs text-indigo-600 font-bold hover:underline mb-1.5 cursor-pointer max-w-full truncate"
          >
            <Store className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
            <span className="truncate">{lang === 'ar' ? vendor.nameAr : vendor.nameEn}</span>
            {vendor.verified && (
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
            )}
          </button>

          {/* Title */}
          <h4 className="font-bold text-slate-900 text-sm line-clamp-2 min-h-[2.5rem] group-hover:text-indigo-600 transition-colors">
            {lang === 'ar' ? product.titleAr : product.titleEn}
          </h4>

          {/* Rating */}
          <div className="flex items-center gap-1.5 mt-2">
            <div className="flex items-center text-amber-500">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
            </div>
            <span className="text-xs font-bold text-slate-700">{product.rating}</span>
            <span className="text-[11px] text-slate-400">({product.reviewsCount})</span>
          </div>

          {/* Pricing */}
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-base sm:text-lg font-black text-slate-900">
              {formatPrice(product.discountPriceEGP || product.priceEGP)}
            </span>
            {product.discountPriceEGP && (
              <span className="text-xs text-slate-400 line-through">
                {formatPrice(product.priceEGP)}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="p-4 pt-0 flex items-center gap-2">
        <button
          onClick={(e) => {
            e.stopPropagation();
            addToCart(product, 1);
          }}
          className="flex-1 bg-slate-900 hover:bg-indigo-600 text-white font-bold py-2.5 px-3 rounded-xl text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
        >
          <ShoppingBag className="w-3.5 h-3.5" />
          <span>{lang === 'ar' ? 'أضف للسلة' : 'Add to Cart'}</span>
        </button>

        {vendor.whatsapp && (
          <button
            onClick={handleDirectWhatsApp}
            title={lang === 'ar' ? 'طلب فوري من التاجر عبر واتساب' : 'Direct WhatsApp Order'}
            className="p-2.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-600 border border-emerald-200 rounded-xl transition-colors cursor-pointer"
          >
            <MessageCircle className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}
