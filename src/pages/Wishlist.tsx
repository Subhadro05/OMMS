import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, ShoppingCart, Trash2, Star } from "lucide-react";
import { toast } from "sonner";
import { Link } from "react-router-dom";

export default function Wishlist() {
  const [wishlistItems, setWishlistItems] = useState([
    { id: 1, name: "Wireless Earbuds Pro", price: 1999, image: "🎧", category: "Electronics", rating: 4.5, inStock: true },
    { id: 2, name: "Smart Watch Series 5", price: 4999, image: "⌚", category: "Wearables", rating: 4.8, inStock: true },
    { id: 3, name: "Designer Sunglasses", price: 1299, image: "🕶️", category: "Fashion", rating: 4.7, inStock: true },
    { id: 4, name: "Gaming Headset", price: 3299, image: "🎮", category: "Gaming", rating: 4.9, inStock: false },
    { id: 5, name: "Portable Speaker", price: 1499, image: "🔊", category: "Electronics", rating: 4.4, inStock: true },
  ]);

  const removeItem = (id: number) => {
    setWishlistItems(items => items.filter(item => item.id !== id));
    toast.success("Removed from wishlist");
  };

  const addToCart = (name: string) => {
    toast.success(`${name} added to cart!`);
  };

  if (wishlistItems.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center py-12 px-4">
        <div className="text-center space-y-6 animate-fade-in">
          <div className="text-8xl">💝</div>
          <h2 className="text-3xl font-bold">Your Wishlist is Empty</h2>
          <p className="text-muted-foreground">Save items you love for later!</p>
          <Link to="/products">
            <Button size="lg" className="gradient-primary">
              Browse Products
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">My Wishlist</h1>
            <p className="text-muted-foreground">{wishlistItems.length} items saved</p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlistItems.map((item, index) => (
            <Card
              key={item.id}
              className="card-hover overflow-hidden animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader>
                <div className="flex justify-between items-start mb-4">
                  <Badge variant="secondary">{item.category}</Badge>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-destructive hover:text-destructive"
                    onClick={() => removeItem(item.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <div className="text-6xl text-center py-8 bg-secondary rounded-lg">
                  {item.image}
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                <CardTitle className="text-lg">{item.name}</CardTitle>
                <div className="flex items-center">
                  <Star className="h-4 w-4 fill-accent text-accent mr-1" />
                  <span className="text-accent font-semibold">{item.rating}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-primary">₹{item.price}</span>
                  {!item.inStock && (
                    <Badge variant="destructive">Out of Stock</Badge>
                  )}
                </div>
              </CardContent>
              <CardFooter className="flex gap-2">
                <Link to={`/product/${item.id}`} className="flex-1">
                  <Button variant="outline" className="w-full">
                    View Details
                  </Button>
                </Link>
                <Button
                  className="flex-1"
                  disabled={!item.inStock}
                  onClick={() => addToCart(item.name)}
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Add
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
