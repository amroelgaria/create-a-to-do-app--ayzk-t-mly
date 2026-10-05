import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Views
import HomeView from './views/HomeView';
import BrandsView from './views/BrandsView';
import StorefrontView from './views/StorefrontView';
import ProductsView from './views/ProductsView';
import VendorOnboardingView from './views/VendorOnboardingView';
import VendorDashboardView from './views/VendorDashboardView';
import TrackOrderView from './views/TrackOrderView';
import AdminView from './views/AdminView';

// Modals
import ProductModal from './components/ProductModal';
import CartDrawer from './components/CartDrawer';
import CheckoutModal from './components/CheckoutModal';
import OrderSuccessModal from './components/OrderSuccessModal';
import VendorSubscriptionModal from './components/VendorSubscriptionModal';

function MainLayout() {
  const { activeView } = useApp();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <Navbar />

      <main className="flex-1">
        {activeView === 'home' && <HomeView />}
        {activeView === 'brands' && <BrandsView />}
        {activeView === 'storefront' && <StorefrontView />}
        {activeView === 'products' && <ProductsView />}
        {activeView === 'onboarding' && <VendorOnboardingView />}
        {activeView === 'vendor-dashboard' && <VendorDashboardView />}
        {activeView === 'track-order' && <TrackOrderView />}
        {activeView === 'admin' && <AdminView />}
      </main>

      <Footer />

      {/* Global Modals & Drawers */}
      <ProductModal />
      <CartDrawer />
      <CheckoutModal />
      <OrderSuccessModal />
      <VendorSubscriptionModal />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}
