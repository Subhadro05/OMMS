import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Star, Heart, ShoppingCart, Search, SlidersHorizontal } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import { toast } from "sonner";

export default function Products() {
  const [searchParams] = useSearchParams();
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("featured");

  useEffect(() => {
    const urlSearch = searchParams.get("search");
    if (urlSearch) {
      setSearchQuery(urlSearch);
    }
  }, [searchParams]);

  const products = [
    { id: 1, name: "Wireless Earbuds Pro", price: 1999, rating: 4.5, category: "Electronics", image: "🎧", inStock: true },
    { id: 2, name: "Smart Watch Series 5", price: 4999, rating: 4.8, category: "Wearables", image: "⌚", inStock: true },
    { id: 3, name: "Leather Wallet", price: 799, rating: 4.2, category: "Fashion", image: "👛", inStock: true },
    { id: 4, name: "Gaming Keyboard RGB", price: 2499, rating: 4.6, category: "Gaming", image: "⌨️", inStock: true },
    { id: 5, name: "Portable Speaker", price: 1499, rating: 4.4, category: "Electronics", image: "🔊", inStock: true },
    { id: 6, name: "Fitness Band", price: 999, rating: 4.1, category: "Wearables", image: "📱", inStock: false },
    { id: 7, name: "Designer Sunglasses", price: 1299, rating: 4.7, category: "Fashion", image: "🕶️", inStock: true },
    { id: 8, name: "Gaming Headset", price: 3299, rating: 4.9, category: "Gaming", image: "🎮", inStock: true },
    { id: 9, name: "Mechanical Mouse", price: 1799, rating: 4.3, category: "Gaming", image: "🖱️", inStock: true },
    { id: 10, name: "Smart Home Hub", price: 3999, rating: 4.6, category: "Electronics", image: "🏠", inStock: true },
    { id: 11, name: "Running Shoes", price: 2999, rating: 4.5, category: "Fashion", image: "👟", inStock: true },
    { id: 12, name: "Wireless Charger", price: 899, rating: 4.0, category: "Electronics", image: "🔌", inStock: true },
  ];

  const categories = ["all", "Electronics", "Wearables", "Fashion", "Gaming"];

  const handleAddToCart = (productName: string) => {
    toast.success(`${productName} added to cart!`);
  };

  const handleAddToWishlist = (productName: string) => {
    toast.success(`${productName} added to wishlist!`);
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
    return matchesSearch && matchesCategory && matchesPrice;
  });

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="container mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Explore Products</h1>
          <p className="text-muted-foreground">Discover amazing deals from our vendors</p>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Filters Sidebar */}
          <aside className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <SlidersHorizontal className="h-5 w-5 mr-2" />
                  Filters
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Search */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Search</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search products..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                {/* Category Filter */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Category</label>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(cat => (
                        <SelectItem key={cat} value={cat}>
                          {cat.charAt(0).toUpperCase() + cat.slice(1)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Price Range */}
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Price Range: ₹{priceRange[0]} - ₹{priceRange[1]}
                  </label>
                  <Slider
                    min={0}
                    max={10000}
                    step={100}
                    value={priceRange}
                    onValueChange={setPriceRange}
                    className="mt-4"
                  />
                </div>

                {/* Sort By */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Sort By</label>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="featured">Featured</SelectItem>
                      <SelectItem value="price-low">Price: Low to High</SelectItem>
                      <SelectItem value="price-high">Price: High to Low</SelectItem>
                      <SelectItem value="rating">Top Rated</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button variant="outline" className="w-full" onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("all");
                  setPriceRange([0, 10000]);
                  setSortBy("featured");
                }}>
                  Clear Filters
                </Button>
              </CardContent>
            </Card>
          </aside>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            <div className="mb-6 flex justify-between items-center">
              <p className="text-muted-foreground">
                Showing {filteredProducts.length} products
              </p>
            </div>

            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProducts.map((product, index) => (
                <Card
                  key={product.id}
                  className="card-hover overflow-hidden animate-fade-in"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <CardHeader>
                    <div className="flex justify-between items-start mb-4">
                      <Badge variant="secondary">{product.category}</Badge>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => handleAddToWishlist(product.name)}
                      >
                        <Heart className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="text-6xl text-center py-8 bg-secondary rounded-lg">
                      {product.image}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <CardTitle className="text-lg">{product.name}</CardTitle>
                    <CardDescription className="flex items-center">
                      <Star className="h-4 w-4 fill-accent text-accent mr-1" />
                      <span className="text-accent font-semibold">{product.rating}</span>
                    </CardDescription>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-primary">₹{product.price}</span>
                      {!product.inStock && (
                        <Badge variant="destructive">Out of Stock</Badge>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter className="flex gap-2">
                    <Link to={`/product/${product.id}`} className="flex-1">
                      <Button variant="outline" className="w-full">
                        View Details
                      </Button>
                    </Link>
                    <Button
                      className="flex-1"
                      disabled={!product.inStock}
                      onClick={() => handleAddToCart(product.name)}
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Add
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-16">
                <p className="text-2xl text-muted-foreground">No products found</p>
                <p className="text-muted-foreground mt-2">Try adjusting your filters</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
