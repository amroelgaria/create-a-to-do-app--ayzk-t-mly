import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  SUBSCRIPTION_PLANS, 
  CATEGORIES, 
  INITIAL_VENDORS, 
  INITIAL_PRODUCTS, 
  INITIAL_ORDERS 
} from '../data/mockData';
import { translations } from '../translations';

const AppContext = createContext();

const STORAGE_KEYS = {
  VENDORS: 'souq_vendors_v1',
  PRODUCTS: 'souq_products_v1',
  ORDERS: 'souq_orders_v1',
  CART: 'souq_cart_v1',
  WISHLIST: 'souq_wishlist_v1',
  LANG: 'souq_lang_v1',
  CURRENCY: 'souq_currency_v1',
  ROLE: 'souq_role_v1',
  CURRENT_VENDOR: 'souq_curr_vendor_v1',
};

export function AppProvider({ children }) {
  // Localization
  const [lang, setLang] = useState(() => localStorage.getItem(STORAGE_KEYS.LANG) || 'ar');
  const [currency, setCurrency] = useState(() => localStorage.getItem(STORAGE_KEYS.CURRENCY) || 'EGP');
  
  // Navigation & View state
  const [activeView, setActiveView] = useState('home'); // home, brands, storefront, products, onboarding, vendor-dashboard, track-order, admin
  const [selectedBrandId, setSelectedBrandId] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Role switching: customer, vendor, admin
  const [role, setRole] = useState(() => localStorage.getItem(STORAGE_KEYS.ROLE) || 'customer');
  const [currentVendorId, setCurrentVendorId] = useState(() => localStorage.getItem(STORAGE_KEYS.CURRENT_VENDOR) || 'vendor-1');

  // Core Data State
  const [vendors, setVendors] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.VENDORS);
      return saved ? JSON.parse(saved) : INITIAL_VENDORS;
    } catch {
      return INITIAL_VENDORS;
    }
  });

  const [products, setProducts] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
      return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
    } catch {
      return INITIAL_PRODUCTS;
    }
  });

  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ORDERS);
      return saved ? JSON.parse(saved) : INITIAL_ORDERS;
    } catch {
      return INITIAL_ORDERS;
    }
  });

  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CART);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.WISHLIST);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // UI Modals
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [lastPlacedOrder, setLastPlacedOrder] = useState(null);
  const [isOrderSuccessOpen, setIsOrderSuccessOpen] = useState(false);
  
  // Subscription Modal for Onboarding/Upgrades
  const [isSubscriptionModalOpen, setIsSubscriptionModalOpen] = useState(false);
  const [subscriptionTargetPlan, setSubscriptionTargetPlan] = useState(null);

  // Sync to LocalStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.VENDORS, JSON.stringify(vendors));
  }, [vendors]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.WISHLIST, JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.LANG, lang);
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [lang]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CURRENCY, currency);
  }, [currency]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ROLE, role);
  }, [role]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CURRENT_VENDOR, currentVendorId);
  }, [currentVendorId]);

  // Translation helper
  const t = (key) => {
    return translations[lang]?.[key] || translations['ar']?.[key] || key;
  };

  // Currency Converter & Formatter
  const formatPrice = (amountEGP) => {
    const val = Number(amountEGP) || 0;
    if (currency === 'USD') {
      return `$${(val / 30).toFixed(1)}`;
    }
    if (currency === 'SAR') {
      return `${(val / 8).toFixed(0)} ر.س`;
    }
    return `${val.toLocaleString()} ج.م`;
  };

  // Cart operations
  const addToCart = (product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.productId === product.id);
      if (existing) {
        return prev.map((item) =>
          item.productId === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { productId: product.id, quantity, product }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (productId) => {
    setCart((prev) => prev.filter((item) => item.productId !== productId));
  };

  const updateCartQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.productId === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => setCart([]);

  // Wishlist operations
  const toggleWishlist = (productId) => {
    setWishlist((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  // Place Order
  const placeOrder = (orderData) => {
    const newOrderId = `ORD-${Math.floor(10000 + Math.random() * 90000)}`;
    
    // Calculate subtotal
    const subtotal = cart.reduce((acc, item) => {
      const price = item.product.discountPriceEGP || item.product.priceEGP;
      return acc + price * item.quantity;
    }, 0);

    const shippingFee = subtotal >= 1000 ? 0 : 40;
    const total = subtotal + shippingFee;

    const items = cart.map((item) => ({
      productId: item.productId,
      titleAr: item.product.titleAr,
      titleEn: item.product.titleEn,
      price: item.product.discountPriceEGP || item.product.priceEGP,
      quantity: item.quantity,
      image: item.product.images?.[0] || '',
      vendorId: item.product.vendorId
    }));

    // Vendor associated with the primary item
    const primaryVendorId = items[0]?.vendorId || 'vendor-1';

    const newOrder = {
      id: newOrderId,
      vendorId: primaryVendorId,
      customerName: orderData.customerName,
      customerPhone: orderData.customerPhone,
      customerAddress: orderData.customerAddress,
      city: orderData.city,
      notes: orderData.notes || '',
      paymentMethod: orderData.paymentMethod || 'cod',
      items,
      subtotal,
      shippingFee,
      total,
      status: 'pending',
      createdAt: new Date().toISOString()
    };

    setOrders((prev) => [newOrder, ...prev]);
    
    // Update vendor total sales
    setVendors((prev) =>
      prev.map((v) =>
        v.id === primaryVendorId
          ? {
              ...v,
              totalSales: (v.totalSales || 0) + total,
              ordersCount: (v.ordersCount || 0) + 1,
            }
          : v
      )
    );

    clearCart();
    setLastPlacedOrder(newOrder);
    setIsCheckoutOpen(false);
    setIsOrderSuccessOpen(true);
    return newOrder;
  };

  // Vendor order status update
  const updateOrderStatus = (orderId, newStatus) => {
    setOrders((prev) =>
      prev.map((ord) => (ord.id === orderId ? { ...ord, status: newStatus } : ord))
    );
  };

  // Register New Vendor (Upon paying nominal subscription fee)
  const registerNewVendor = (vendorData, planId) => {
    const plan = SUBSCRIPTION_PLANS.find((p) => p.id === planId) || SUBSCRIPTION_PLANS[0];
    const newId = `vendor-${Date.now()}`;
    const renewalDate = new Date();
    renewalDate.setDate(renewalDate.getDate() + 30);

    const newVendor = {
      id: newId,
      nameAr: vendorData.nameAr || 'متجر جديد',
      nameEn: vendorData.nameEn || 'New Store',
      slug: (vendorData.nameEn || 'store').toLowerCase().replace(/\s+/g, '-'),
      category: vendorData.category || 'fashion',
      planId: plan.id,
      subscriptionStatus: 'active',
      subscriptionRenewalDate: renewalDate.toISOString().split('T')[0],
      nominalFeePaid: plan.priceEGP,
      verified: plan.id === 'vip' || plan.id === 'pro',
      badgeTier: plan.id === 'vip' ? 'vip' : plan.id === 'pro' ? 'gold' : 'starter',
      rating: 5.0,
      reviewsCount: 1,
      totalSales: 0,
      ordersCount: 0,
      cityAr: vendorData.cityAr || 'القاهرة، مصر',
      cityEn: vendorData.cityEn || 'Cairo, Egypt',
      phone: vendorData.phone || '+20 100 000 0000',
      whatsapp: (vendorData.whatsapp || '201000000000').replace(/[^0-9]/g, ''),
      email: vendorData.email || 'brand@example.com',
      logo: vendorData.logo || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80',
      cover: vendorData.cover || 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80',
      bioAr: vendorData.bioAr || 'متجر متخصص بتقديم منتجات عالية الجودة وخدمة متميزة.',
      bioEn: vendorData.bioEn || 'Specialized store offering top-tier products.',
      joinedDate: new Date().toISOString().split('T')[0],
    };

    setVendors((prev) => [newVendor, ...prev]);
    setCurrentVendorId(newId);
    setRole('vendor');
    setActiveView('vendor-dashboard');
    return newVendor;
  };

  // Vendor Renewal / Plan Upgrade
  const renewVendorSubscription = (vendorId, newPlanId) => {
    const plan = SUBSCRIPTION_PLANS.find((p) => p.id === newPlanId) || SUBSCRIPTION_PLANS[0];
    const renewalDate = new Date();
    renewalDate.setDate(renewalDate.getDate() + 30);

    setVendors((prev) =>
      prev.map((v) =>
        v.id === vendorId
          ? {
              ...v,
              planId: plan.id,
              subscriptionStatus: 'active',
              subscriptionRenewalDate: renewalDate.toISOString().split('T')[0],
              nominalFeePaid: (v.nominalFeePaid || 0) + plan.priceEGP,
              badgeTier: plan.id === 'vip' ? 'vip' : plan.id === 'pro' ? 'gold' : 'starter',
              verified: plan.id === 'vip' || plan.id === 'pro',
            }
          : v
      )
    );
  };

  // Product CRUD
  const addProduct = (productData) => {
    const newId = `p-${Date.now()}`;
    const newProduct = {
      id: newId,
      vendorId: currentVendorId,
      titleAr: productData.titleAr,
      titleEn: productData.titleEn || productData.titleAr,
      category: productData.category || 'fashion',
      priceEGP: Number(productData.priceEGP) || 100,
      discountPriceEGP: productData.discountPriceEGP ? Number(productData.discountPriceEGP) : null,
      stock: Number(productData.stock) || 10,
      rating: 5.0,
      reviewsCount: 0,
      featured: Boolean(productData.featured),
      images: productData.images && productData.images.length > 0 
        ? productData.images 
        : ['https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=800&q=80'],
      descriptionAr: productData.descriptionAr || '',
      descriptionEn: productData.descriptionEn || '',
      specs: productData.specs || {}
    };

    setProducts((prev) => [newProduct, ...prev]);
    return newProduct;
  };

  const updateProduct = (productId, updatedData) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === productId ? { ...p, ...updatedData } : p))
    );
  };

  const deleteProduct = (productId) => {
    setProducts((prev) => prev.filter((p) => p.id !== productId));
  };

  // Current active vendor object
  const currentVendor = vendors.find((v) => v.id === currentVendorId) || vendors[0];

  // Reset to initial demo data
  const resetDemoData = () => {
    setVendors(INITIAL_VENDORS);
    setProducts(INITIAL_PRODUCTS);
    setOrders(INITIAL_ORDERS);
    setCart([]);
    setWishlist([]);
    setCurrentVendorId('vendor-1');
    localStorage.clear();
  };

  return (
    <AppContext.Provider
      value={{
        // Localization
        lang,
        setLang,
        currency,
        setCurrency,
        formatPrice,
        t,

        // Routing & View
        activeView,
        setActiveView,
        selectedBrandId,
        setSelectedBrandId,
        selectedProduct,
        setSelectedProduct,
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,

        // Roles & Vendor Session
        role,
        setRole,
        currentVendorId,
        setCurrentVendorId,
        currentVendor,

        // Data State
        vendors,
        products,
        orders,
        cart,
        wishlist,

        // Actions
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        toggleWishlist,
        placeOrder,
        updateOrderStatus,
        registerNewVendor,
        renewVendorSubscription,
        addProduct,
        updateProduct,
        deleteProduct,
        resetDemoData,

        // Modals
        isCartOpen,
        setIsCartOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        lastPlacedOrder,
        setLastPlacedOrder,
        isOrderSuccessOpen,
        setIsOrderSuccessOpen,
        isSubscriptionModalOpen,
        setIsSubscriptionModalOpen,
        subscriptionTargetPlan,
        setSubscriptionTargetPlan,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
