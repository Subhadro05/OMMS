import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Auth from "./pages/Auth";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import Orders from "./pages/Orders";
import VendorDashboard from "./pages/VendorDashboard";
import AdminPanel from "./pages/AdminPanel";
import Support from "./pages/Support";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";
import Checkout from "./pages/Checkout";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/vendor" element={<VendorDashboard />} />
              <Route path="/admin" element={<AdminPanel />} />
              <Route path="/support" element={<Support />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/checkout" element={<Checkout />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <footer className="bg-card border-t border-border py-8 px-4 mt-12">
            <div className="container mx-auto">
              <div className="grid md:grid-cols-4 gap-8 mb-6">
                <div>
                  <h3 className="font-bold text-lg mb-3 text-foreground">Mallazone</h3>
                  <p className="text-sm text-muted-foreground">Your trusted online mall for quality products from verified vendors.</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-3 text-foreground">Contact Us</h4>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <p>Email: admin@mallazone.com</p>
                    <p>Phone: +91 1800-123-4567</p>
                    <p>Customer Care: 24/7 Available</p>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-3 text-foreground">Quick Links</h4>
                  <div className="space-y-2 text-sm">
                    <a href="/support" className="block hover:text-primary transition-colors text-muted-foreground">Help & Support</a>
                    <a href="/orders" className="block hover:text-primary transition-colors text-muted-foreground">Track Order</a>
                    <a href="/vendor" className="block hover:text-primary transition-colors text-muted-foreground">Become a Vendor</a>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-3 text-foreground">Policies</h4>
                  <div className="space-y-2 text-sm">
                    <a href="#" className="block hover:text-primary transition-colors text-muted-foreground">Privacy Policy</a>
                    <a href="#" className="block hover:text-primary transition-colors text-muted-foreground">Terms of Service</a>
                    <a href="#" className="block hover:text-primary transition-colors text-muted-foreground">Return Policy (7 Days)</a>
                  </div>
                </div>
              </div>
              <div className="text-center text-sm text-muted-foreground border-t border-border pt-6">
                <p>&copy; 2025 Mallazone Prototype | Designed by Subhadro Banerjee</p>
              </div>
            </div>
          </footer>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
