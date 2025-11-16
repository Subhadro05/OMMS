import { ShoppingCart, Heart, User, Menu, Search } from "lucide-react";
import mallazoneLogoImg from "@/assets/mallazone-logo.png";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const [cartCount] = useState(3);
  const [wishlistCount] = useState(5);

  const isActive = (path: string) => location.pathname === path;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-card border-b border-border shadow-lg backdrop-blur-sm bg-opacity-95">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <img src={mallazoneLogoImg} alt="Mallazone" className="h-8 w-8 group-hover:scale-110 transition-transform" />
            <span className="text-2xl font-bold gradient-text">Mallazone</span>
          </Link>

          {/* Search Bar - Desktop */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-xl mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search products, stores..."
                className="pl-10 bg-secondary border-border"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </form>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/products">
              <Button variant={isActive("/products") ? "default" : "ghost"}>
                Products
              </Button>
            </Link>

            <Link to="/orders">
              <Button variant={isActive("/orders") ? "default" : "ghost"}>
                Orders
              </Button>
            </Link>
            
            <Link to="/cart" className="relative">
              <Button variant="ghost" size="icon">
                <ShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-primary text-primary-foreground">
                    {cartCount}
                  </Badge>
                )}
              </Button>
            </Link>

            <Link to="/wishlist" className="relative">
              <Button variant="ghost" size="icon">
                <Heart className="h-5 w-5" />
                {wishlistCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-accent text-accent-foreground">
                    {wishlistCount}
                  </Badge>
                )}
              </Button>
            </Link>

            <Link to="/profile">
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="h-6 w-6" />
          </Button>
        </div>

        {/* Mobile Search */}
        <form onSubmit={handleSearch} className="md:hidden pb-4">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search products, stores..."
              className="pl-10 bg-secondary border-border"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </form>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden pb-4 space-y-2 animate-fade-in">
            <Link to="/products" className="block">
              <Button variant={isActive("/products") ? "default" : "ghost"} className="w-full justify-start">
                Products
              </Button>
            </Link>
            <Link to="/orders" className="block">
              <Button variant={isActive("/orders") ? "default" : "ghost"} className="w-full justify-start">
                Orders
              </Button>
            </Link>
            <Link to="/cart" className="block">
              <Button variant="ghost" className="w-full justify-start">
                <ShoppingCart className="h-5 w-5 mr-2" />
                Cart ({cartCount})
              </Button>
            </Link>
            <Link to="/wishlist" className="block">
              <Button variant="ghost" className="w-full justify-start">
                <Heart className="h-5 w-5 mr-2" />
                Wishlist ({wishlistCount})
              </Button>
            </Link>
            <Link to="/profile" className="block">
              <Button variant="ghost" className="w-full justify-start">
                <User className="h-5 w-5 mr-2" />
                My Profile
              </Button>
            </Link>
            <Link to="/auth" className="block">
              <Button variant="outline" className="w-full justify-start">
                Login / Register
              </Button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};
