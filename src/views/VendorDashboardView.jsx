import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { SUBSCRIPTION_PLANS, CATEGORIES } from '../data/mockData';
import { 
  Store, 
  Package, 
  ShoppingBag, 
  CreditCard, 
  Plus, 
  Trash2, 
  Edit3, 
  ExternalLink, 
  ShieldCheck, 
  Clock, 
  TrendingUp, 
  CheckCircle2, 
  X, 
  MessageCircle, 
  AlertTriangle,
  RotateCcw,
  Sparkles,
  Settings,
  DollarSign
} from 'lucide-react';

export default function VendorDashboardView() {
  const { 
    currentVendor, 
    vendors, 
    setCurrentVendorId, 
    products, 
    orders, 
    lang, 
    formatPrice, 
    t, 
    addProduct, 
    updateProduct, 
    deleteProduct, 
    updateOrderStatus,
    renewVendorSubscription,
    setActiveView,
    setSelectedBrandId 
  } = useApp();

  const [activeTab, setActiveTab] = useState('products'); // products, orders, settings, subscription
  
  // Add Product Modal
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [editingProductId, setEditingProductId] = useState(null);
  const [productForm, setProductForm] = useState({
    titleAr: '',
    titleEn: '',
    category: 'fashion',
    priceEGP: '',
    discountPriceEGP: '',
    stock: '15',
    imageUrl: '',
    descriptionAr: '',
    featured: false
  });

  const vendorProducts = products.filter((p) => p.vendorId === currentVendor.id);
  const vendorOrders = orders.filter((o) => o.vendorId === currentVendor.id || o.items?.some(i => i.vendorId === currentVendor.id));
  
  const currentPlan = SUBSCRIPTION_PLANS.find((p) => p.id === currentVendor.planId) || SUBSCRIPTION_PLANS[0];

  // Calculate days remaining
  const renewalDate = new Date(currentVendor.subscriptionRenewalDate || '2026-11-20');
  const today = new Date();
  const diffTime = renewalDate - today;
  const daysRemaining = Math.max(0, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));

  const handleOpenAddProduct = () => {
    setEditingProductId(null);
    setProductForm({
      titleAr: '',
      titleEn: '',
      category: currentVendor.category || 'fashion',
      priceEGP: '',
      discountPriceEGP: '',
      stock: '15',
      imageUrl: '',
      descriptionAr: '',
      featured: false
    });
    setIsAddProductOpen(true);
  };

  const handleOpenEditProduct = (prod) => {
    setEditingProductId(prod.id);
    setProductForm({
      titleAr: prod.titleAr,
      titleEn: prod.titleEn,
      category: prod.category,
      priceEGP: String(prod.priceEGP),
      discountPriceEGP: prod.discountPriceEGP ? String(prod.discountPriceEGP) : '',
      stock: String(prod.stock),
      imageUrl: prod.images?.[0] || '',
      descriptionAr: prod.descriptionAr || '',
      featured: Boolean(prod.featured)
    });
    setIsAddProductOpen(true);
  };

  const handleSaveProduct = (e) => {
    e.preventDefault();
    if (!productForm.titleAr || !productForm.priceEGP) return;

    const payload = {
      titleAr: productForm.titleAr,
      titleEn: productForm.titleEn || productForm.titleAr,
      category: productForm.category,
      priceEGP: Number(productForm.priceEGP),
      discountPriceEGP: productForm.discountPriceEGP ? Number(productForm.discountPriceEGP) : null,
      stock: Number(productForm.stock) || 10,
      descriptionAr: productForm.descriptionAr,
      featured: productForm.featured,
      images: productForm.imageUrl 
        ? [productForm.imageUrl] 
        : ['https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=800&q=80'],
    };

    if (editingProductId) {
      updateProduct(editingProductId, payload);
    } else {
      addProduct(payload);
    }

    setIsAddProductOpen(false);
  };

  const handleViewLiveStore = () => {
    setSelectedBrandId(currentVendor.id);
    setActiveView('storefront');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pb-20">
      
      {/* Top Banner / Vendor Header */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          
          <div className="flex items-center gap-4">
            <img
              src={currentVendor.logo}
              alt={currentVendor.nameAr}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-slate-200 shadow-sm shrink-0"
            />
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black text-slate-900">
                  {lang === 'ar' ? currentVendor.nameAr : currentVendor.nameEn}
                </h1>
                <span className="bg-indigo-100 text-indigo-800 text-[11px] font-bold px-2.5 py-0.5 rounded-full border border-indigo-200 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-indigo-600" />
                  <span>{currentPlan.nameAr.split('(')[0]}</span>
                </span>
              </div>
              
              <p className="text-xs text-slate-500 mt-1">
                {lang === 'ar' ? 'لوحة تحكم المتجر وإدارة المنتجات والطلبات المستلمة' : 'Merchant portal for catalog and order management'}
              </p>

              {/* Vendor Switcher for testing */}
              <div className="flex items-center gap-2 mt-2 text-xs">
                <span className="text-slate-400 font-semibold">{lang === 'ar' ? 'تبديل متجر العرض التجريبي:' : 'Switch Demo Store:'}</span>
                <select
                  value={currentVendor.id}
                  onChange={(e) => setCurrentVendorId(e.target.value)}
                  className="bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 text-xs font-bold text-indigo-700 cursor-pointer"
                >
                  {vendors.map((v) => (
                    <option key={v.id} value={v.id}>
                      {lang === 'ar' ? v.nameAr : v.nameEn}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
            <button
              onClick={handleViewLiveStore}
              className="flex-1 md:flex-initial bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-2.5 px-4 rounded-xl text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>{lang === 'ar' ? 'معاينة متجري المباشر' : 'View Public Store'}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={handleOpenAddProduct}
              className="flex-1 md:flex-initial bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2.5 px-4 rounded-xl text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-md shadow-indigo-200"
            >
              <Plus className="w-4 h-4" />
              <span>{lang === 'ar' ? 'إضافة منتج جديد' : 'Add Product'}</span>
            </button>
          </div>

        </div>
      </div>

      {/* Metric Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Total Sales */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-500">{t('totalSales')}</span>
            <div className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
              {formatPrice(currentVendor.totalSales || 0)}
            </div>
            <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-0.5 mt-1">
              <TrendingUp className="w-3 h-3" />
              <span>{lang === 'ar' ? 'مبيعات مباشرة لمتجرك' : 'Direct merchant earnings'}</span>
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <DollarSign className="w-6 h-6" />
          </div>
        </div>

        {/* Total Orders */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-500">{t('totalOrders')}</span>
            <div className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
              {vendorOrders.length}
            </div>
            <span className="text-[10px] text-slate-500 mt-1 block">
              {vendorOrders.filter(o => o.status === 'pending').length} {lang === 'ar' ? 'طلب جديد قيد التجهيز' : 'pending orders'}
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
            <ShoppingBag className="w-6 h-6" />
          </div>
        </div>

        {/* Active Products Limit */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-500">{t('activeProducts')}</span>
            <div className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
              {vendorProducts.length} <span className="text-xs text-slate-400 font-normal">/ {currentPlan.maxProducts} مسموح</span>
            </div>
            <span className="text-[10px] text-indigo-600 font-bold mt-1 block">
              {currentPlan.maxProducts - vendorProducts.length} {lang === 'ar' ? 'أماكن متبقية بالباقة' : 'slots remaining'}
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <Package className="w-6 h-6" />
          </div>
        </div>

        {/* Subscription Card */}
        <div className="bg-gradient-to-br from-indigo-900 to-purple-900 text-white p-5 rounded-2xl shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-indigo-200">{lang === 'ar' ? 'الاشتراك الرمزي' : 'Nominal Subscription'}</span>
            <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" />
              <span>{lang === 'ar' ? 'نشط' : 'Active'}</span>
            </span>
          </div>

          <div className="my-2">
            <div className="text-lg font-black text-white">
              {currentPlan.nameAr.split('(')[0]}
            </div>
            <p className="text-[11px] text-indigo-200">
              {daysRemaining} {lang === 'ar' ? 'يوم متبقي على التجديد' : 'days until renewal'}
            </p>
          </div>

          <button
            onClick={() => {
              renewVendorSubscription(currentVendor.id, currentPlan.id);
              alert(lang === 'ar' ? 'تم تجديد الاشتراك الرمزي لمتجرك بنجاح لمدة 30 يوماً إضافية!' : 'Subscription renewed for 30 more days!');
            }}
            className="w-full bg-white/20 hover:bg-white/30 text-white font-bold py-1.5 px-3 rounded-lg text-xs transition-colors cursor-pointer text-center"
          >
            {lang === 'ar' ? 'تجديد الاشتراك (سداد رمزي)' : 'Renew Subscription'}
          </button>
        </div>

      </div>

      {/* Tabs Navigation */}
      <div className="border-b border-slate-200 flex gap-4 text-xs sm:text-sm font-bold">
        <button
          onClick={() => setActiveTab('products')}
          className={`pb-3 border-b-2 transition-all flex items-center gap-1.5 cursor-pointer ${
            activeTab === 'products' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Package className="w-4 h-4" />
          <span>{lang === 'ar' ? 'إدارة المنتجات' : 'Products'} ({vendorProducts.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('orders')}
          className={`pb-3 border-b-2 transition-all flex items-center gap-1.5 cursor-pointer ${
            activeTab === 'orders' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <ShoppingBag className="w-4 h-4" />
          <span>{lang === 'ar' ? 'الطلبات الواردة' : 'Incoming Orders'} ({vendorOrders.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('subscription')}
          className={`pb-3 border-b-2 transition-all flex items-center gap-1.5 cursor-pointer ${
            activeTab === 'subscription' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>{lang === 'ar' ? 'تفاصيل الاشتراك والباقة' : 'Subscription & Plan'}</span>
        </button>
      </div>

      {/* TAB 1: PRODUCTS MANAGEMENT */}
      {activeTab === 'products' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-base text-slate-900">
              {lang === 'ar' ? 'منتجات المتجر الحالية' : 'Current Store Products'}
            </h3>
            <button
              onClick={handleOpenAddProduct}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-3.5 rounded-xl text-xs transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>{lang === 'ar' ? 'إضافة منتج' : 'Add Item'}</span>
            </button>
          </div>

          {vendorProducts.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-4">
              <Package className="w-12 h-12 text-slate-300 mx-auto" />
              <div>
                <h4 className="font-bold text-slate-800">{lang === 'ar' ? 'لم تقم بإضافة منتجات بعد' : 'No products listed yet'}</h4>
                <p className="text-xs text-slate-500 mt-1">{lang === 'ar' ? 'ابدأ بإضافة أول منتج لمتجرك لتظهر للزبائن وتبدأ البيع فوراً.' : 'Add your first product to start accepting customer orders.'}</p>
              </div>
              <button
                onClick={handleOpenAddProduct}
                className="bg-indigo-600 text-white font-bold text-xs py-2.5 px-5 rounded-xl hover:bg-indigo-700 cursor-pointer"
              >
                {lang === 'ar' ? 'إضافة منتج الآن' : 'Add Product Now'}
              </button>
            </div>
          ) : (
            <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-start text-xs">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
                    <tr>
                      <th className="py-3.5 px-4 text-start">{lang === 'ar' ? 'المنتج' : 'Product'}</th>
                      <th className="py-3.5 px-4 text-start">{lang === 'ar' ? 'التصنيف' : 'Category'}</th>
                      <th className="py-3.5 px-4 text-start">{lang === 'ar' ? 'السعر' : 'Price'}</th>
                      <th className="py-3.5 px-4 text-start">{lang === 'ar' ? 'المخزون' : 'Stock'}</th>
                      <th className="py-3.5 px-4 text-center">{lang === 'ar' ? 'إجراءات' : 'Actions'}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {vendorProducts.map((prod) => (
                      <tr key={prod.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={prod.images?.[0]}
                              alt={prod.titleAr}
                              className="w-12 h-12 rounded-xl object-cover border border-slate-200 shrink-0"
                            />
                            <div>
                              <span className="font-bold text-slate-900 block max-w-xs truncate">
                                {lang === 'ar' ? prod.titleAr : prod.titleEn}
                              </span>
                              {prod.featured && (
                                <span className="text-[10px] text-amber-700 bg-amber-50 px-2 py-0.5 rounded font-bold">
                                  ★ {lang === 'ar' ? 'منتج مميز' : 'Featured'}
                                </span>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="py-3.5 px-4 text-slate-600 font-medium">
                          {prod.category}
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="font-black text-slate-900 block">
                            {formatPrice(prod.discountPriceEGP || prod.priceEGP)}
                          </span>
                          {prod.discountPriceEGP && (
                            <span className="text-[11px] text-slate-400 line-through">
                              {formatPrice(prod.priceEGP)}
                            </span>
                          )}
                        </td>
                        <td className="py-3.5 px-4">
                          <span className={`font-bold px-2 py-0.5 rounded text-[11px] ${
                            prod.stock > 5 ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'
                          }`}>
                            {prod.stock} {lang === 'ar' ? 'قطعة' : 'units'}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-center">
                          <div className="flex items-center justify-center gap-1.5">
                            <button
                              onClick={() => handleOpenEditProduct(prod)}
                              className="p-1.5 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors cursor-pointer"
                              title="تعديل المنتج"
                            >
                              <Edit3 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => {
                                if (confirm(lang === 'ar' ? 'هل أنت متأكد من حذف هذا المنتج؟' : 'Delete product?')) {
                                  deleteProduct(prod.id);
                                }
                              }}
                              className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                              title="حذف المنتج"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 2: INCOMING ORDERS */}
      {activeTab === 'orders' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-base text-slate-900">
              {lang === 'ar' ? 'الطلبات الواردة لمنتجاتك' : 'Orders for Your Store'}
            </h3>
            <span className="text-xs text-slate-500">
              {vendorOrders.length} {lang === 'ar' ? 'طلب مسجل' : 'orders found'}
            </span>
          </div>

          {vendorOrders.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-3">
              <ShoppingBag className="w-12 h-12 text-slate-300 mx-auto" />
              <h4 className="font-bold text-slate-800">{lang === 'ar' ? 'لا توجد طلبات جديدة حالياً' : 'No incoming orders yet'}</h4>
              <p className="text-xs text-slate-500">{lang === 'ar' ? 'ستظهر هنا طلبات الزبائن فور إتمام الشراء من متجرك.' : 'Customer orders will appear here automatically.'}</p>
            </div>
          ) : (
            <div className="space-y-4">
              {vendorOrders.map((ord) => (
                <div key={ord.id} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
                  
                  {/* Order Head */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 gap-2">
                    <div>
                      <span className="text-xs font-bold text-indigo-600">#{ord.id}</span>
                      <span className="text-[11px] text-slate-400 ms-3">
                        {new Date(ord.createdAt).toLocaleString(lang === 'ar' ? 'ar-EG' : 'en-US')}
                      </span>
                    </div>

                    {/* Status Dropdown */}
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-slate-500 font-bold">{lang === 'ar' ? 'تحديث الحالة:' : 'Status:'}</span>
                      <select
                        value={ord.status}
                        onChange={(e) => updateOrderStatus(ord.id, e.target.value)}
                        className="bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1 text-xs font-bold text-slate-800 outline-hidden"
                      >
                        <option value="pending">{t('orderStatusPending')}</option>
                        <option value="processing">{t('orderStatusProcessing')}</option>
                        <option value="shipped">{t('orderStatusShipped')}</option>
                        <option value="delivered">{t('orderStatusDelivered')}</option>
                        <option value="cancelled">{t('orderStatusCancelled')}</option>
                      </select>
                    </div>
                  </div>

                  {/* Customer and Items layout */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    {/* Customer */}
                    <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100 space-y-1.5">
                      <h5 className="font-bold text-slate-900">{lang === 'ar' ? 'بيانات المشتري والتوصيل:' : 'Customer Shipping Info:'}</h5>
                      <p><span className="text-slate-500">{lang === 'ar' ? 'الاسم:' : 'Name:'}</span> <strong className="text-slate-800">{ord.customerName}</strong></p>
                      <p><span className="text-slate-500">{lang === 'ar' ? 'الهاتف:' : 'Phone:'}</span> <strong className="text-slate-800" dir="ltr">{ord.customerPhone}</strong></p>
                      <p><span className="text-slate-500">{lang === 'ar' ? 'العنوان:' : 'Address:'}</span> <span className="text-slate-700">{ord.customerAddress} ({ord.city})</span></p>
                      {ord.notes && <p className="text-amber-700 font-medium">ملاحظات: {ord.notes}</p>}
                      
                      {/* WhatsApp contact customer */}
                      <a
                        href={`https://wa.me/${ord.customerPhone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                          lang === 'ar' 
                            ? `مرحباً أستاذ(ة) ${ord.customerName}، معكم متجر ${currentVendor.nameAr} بخصوص طلبكم #${ord.id}`
                            : `Hello ${ord.customerName}, this is ${currentVendor.nameEn} regarding your order #${ord.id}`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-emerald-700 font-bold hover:underline pt-1"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>{lang === 'ar' ? 'مراسلة العميل عبر واتساب' : 'Contact Customer'}</span>
                      </a>
                    </div>

                    {/* Ordered Items & Total */}
                    <div className="space-y-2">
                      <h5 className="font-bold text-slate-900">{lang === 'ar' ? 'الأصناف المطلوبة:' : 'Items:'}</h5>
                      <div className="space-y-1.5 max-h-28 overflow-y-auto">
                        {ord.items.map((it, idx) => (
                          <div key={idx} className="flex justify-between items-center text-slate-700">
                            <span>{it.quantity}x {lang === 'ar' ? it.titleAr : it.titleEn}</span>
                            <span className="font-bold">{formatPrice(it.price * it.quantity)}</span>
                          </div>
                        ))}
                      </div>

                      <div className="pt-2 border-t border-slate-100 flex justify-between font-black text-sm text-slate-900">
                        <span>{t('total')}</span>
                        <span className="text-indigo-600">{formatPrice(ord.total)}</span>
                      </div>
                    </div>
                  </div>

                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 3: SUBSCRIPTION & UPGRADE */}
      {activeTab === 'subscription' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-6">
          <div className="max-w-2xl space-y-2">
            <h3 className="font-black text-xl text-slate-900 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-indigo-600" />
              <span>{lang === 'ar' ? 'الاشتراك الشهري الرمزي لمتجرك' : 'Store Nominal Subscription Plan'}</span>
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              {lang === 'ar' 
                ? 'تدفع رسوماً رمزية بسيطة شهرياً لتشغيل متجرك على سوق البراندات وعرض منتجاتك للجمهور بدون تكاليف بناء مواقع باهظة.'
                : 'Your store is active under our nominal monthly fee model.'}
            </p>
          </div>

          {/* Current Plan Overview */}
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-indigo-600 block">{lang === 'ar' ? 'باقتك المفعلة حالياً' : 'Current Active Plan'}</span>
              <h4 className="text-2xl font-black text-slate-900 mt-1">{currentPlan.nameAr}</h4>
              <p className="text-xs text-slate-500 mt-1">
                {lang === 'ar' ? `الرسوم الرمزية المسددة: ${formatPrice(currentVendor.nominalFeePaid || currentPlan.priceEGP)} شهرياً` : `Fee: ${formatPrice(currentPlan.priceEGP)} / month`}
              </p>
              <div className="flex items-center gap-2 text-xs text-emerald-700 font-bold mt-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>{lang === 'ar' ? `الاشتراك نشط - متبقي ${daysRemaining} يوم على ميعاد التجديد (${currentVendor.subscriptionRenewalDate})` : `Active until ${currentVendor.subscriptionRenewalDate}`}</span>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => {
                  renewVendorSubscription(currentVendor.id, currentPlan.id);
                  alert(lang === 'ar' ? 'تم تمديد اشتراكك لمدة 30 يوماً إضافية!' : 'Subscription renewed!');
                }}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2.5 px-4 rounded-xl text-xs transition-colors cursor-pointer"
              >
                {lang === 'ar' ? 'تجديد الاشتراك الآن' : 'Renew Subscription'}
              </button>
            </div>
          </div>

          {/* Upgrade Options */}
          <div className="space-y-4 pt-4 border-t border-slate-200">
            <h4 className="font-extrabold text-sm text-slate-900">
              {lang === 'ar' ? 'الترقية لباقة اشتراك أعلى:' : 'Upgrade Options:'}
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {SUBSCRIPTION_PLANS.map((plan) => (
                <div 
                  key={plan.id}
                  className={`p-5 rounded-2xl border-2 transition-all flex flex-col justify-between ${
                    plan.id === currentVendor.planId ? 'border-indigo-600 bg-indigo-50/40' : 'border-slate-200 bg-white'
                  }`}
                >
                  <div>
                    <span className="font-black text-sm text-slate-900 block">{plan.nameAr.split('(')[0]}</span>
                    <span className="text-lg font-black text-indigo-600 mt-1 block">{formatPrice(plan.priceEGP)} / شهر</span>
                    <span className="text-[11px] text-slate-500 block mt-1">حتى {plan.maxProducts} منتج | عمولة {plan.commissionRate}</span>
                  </div>

                  <div className="mt-4">
                    {plan.id === currentVendor.planId ? (
                      <span className="text-xs font-bold text-indigo-700 bg-indigo-100 px-3 py-1.5 rounded-lg block text-center">
                        {lang === 'ar' ? 'باقتك الحالية' : 'Current'}
                      </span>
                    ) : (
                      <button
                        onClick={() => {
                          renewVendorSubscription(currentVendor.id, plan.id);
                          alert(lang === 'ar' ? `تهانينا! تم ترقية متجرك إلى ${plan.nameAr} بنجاح!` : `Upgraded to ${plan.nameEn}!`);
                        }}
                        className="w-full bg-slate-900 hover:bg-indigo-600 text-white font-bold py-2 px-3 rounded-lg text-xs transition-colors cursor-pointer"
                      >
                        {lang === 'ar' ? 'ترقية لهذه الباقة' : 'Upgrade'}
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* Add / Edit Product Modal */}
      {isAddProductOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div 
            className="bg-white w-full max-w-lg max-h-[90vh] rounded-3xl shadow-2xl overflow-y-auto border border-slate-100 p-6 space-y-5"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-extrabold text-base text-slate-900 flex items-center gap-2">
                <Package className="w-5 h-5 text-indigo-600" />
                <span>{editingProductId ? (lang === 'ar' ? 'تعديل المنتج' : 'Edit Product') : (lang === 'ar' ? 'إضافة منتج جديد لمتجرك' : 'Add New Product')}</span>
              </h3>
              <button
                onClick={() => setIsAddProductOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-full cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {lang === 'ar' ? 'اسم المنتج بالعربية' : 'Product Title (Arabic)'} <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={productForm.titleAr}
                  onChange={(e) => setProductForm({ ...productForm, titleAr: e.target.value })}
                  placeholder={lang === 'ar' ? 'مثال: فستان كاجوال حرير' : 'e.g. Silk Casual Dress'}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:bg-white focus:border-indigo-500 outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {lang === 'ar' ? 'اسم المنتج بالإنجليزية' : 'Product Title (English)'}
                </label>
                <input
                  type="text"
                  value={productForm.titleEn}
                  onChange={(e) => setProductForm({ ...productForm, titleEn: e.target.value })}
                  placeholder="e.g. Silk Casual Dress"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:bg-white focus:border-indigo-500 outline-hidden"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {lang === 'ar' ? 'السعر الأصلي (ج.م)' : 'Price (EGP)'} <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="number"
                    required
                    value={productForm.priceEGP}
                    onChange={(e) => setProductForm({ ...productForm, priceEGP: e.target.value })}
                    placeholder="500"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:bg-white focus:border-indigo-500 outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {lang === 'ar' ? 'سعر الخصم (اختياري)' : 'Discount Price (Optional)'}
                  </label>
                  <input
                    type="number"
                    value={productForm.discountPriceEGP}
                    onChange={(e) => setProductForm({ ...productForm, discountPriceEGP: e.target.value })}
                    placeholder="390"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:bg-white focus:border-indigo-500 outline-hidden"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {lang === 'ar' ? 'التصنيف' : 'Category'}
                  </label>
                  <select
                    value={productForm.category}
                    onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:bg-white focus:border-indigo-500 outline-hidden"
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c.id} value={c.id}>
                        {lang === 'ar' ? c.nameAr : c.nameEn}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {lang === 'ar' ? 'الكمية بالمخزن' : 'Stock Quantity'}
                  </label>
                  <input
                    type="number"
                    value={productForm.stock}
                    onChange={(e) => setProductForm({ ...productForm, stock: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:bg-white focus:border-indigo-500 outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {lang === 'ar' ? 'رابط صورة المنتج (URL)' : 'Product Image URL'}
                </label>
                <input
                  type="url"
                  value={productForm.imageUrl}
                  onChange={(e) => setProductForm({ ...productForm, imageUrl: e.target.value })}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:bg-white focus:border-indigo-500 outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {lang === 'ar' ? 'وصف المنتج' : 'Description'}
                </label>
                <textarea
                  rows={2}
                  value={productForm.descriptionAr}
                  onChange={(e) => setProductForm({ ...productForm, descriptionAr: e.target.value })}
                  placeholder={lang === 'ar' ? 'اكتب وصفاً جذاباً لمواصفات وخامة المنتج...' : 'Product description...'}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-800 focus:bg-white focus:border-indigo-500 outline-hidden"
                />
              </div>

              <label className="flex items-center gap-2 cursor-pointer pt-1">
                <input
                  type="checkbox"
                  checked={productForm.featured}
                  onChange={(e) => setProductForm({ ...productForm, featured: e.target.checked })}
                  className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                />
                <span className="text-xs font-bold text-slate-700">
                  {lang === 'ar' ? 'عرض كمنتج مميز في الصفحة الرئيسية لمتجرك' : 'Feature on store homepage'}
                </span>
              </label>

              <div className="pt-3 border-t border-slate-200 flex gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddProductOpen(false)}
                  className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs cursor-pointer"
                >
                  {lang === 'ar' ? 'إلغاء' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2.5 px-4 rounded-xl text-xs transition-colors cursor-pointer"
                >
                  {editingProductId ? (lang === 'ar' ? 'حفظ التعديلات' : 'Save Changes') : (lang === 'ar' ? 'إضافة المنتج للمتجر' : 'Add to Catalog')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
