import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { Link } from "react-router-dom";

export default function Cart() {
  const [cartItems, setCartItems] = useState([
    { id: 1, name: "Wireless Earbuds Pro", price: 1999, quantity: 2, image: "🎧", vendor: "TechStore" },
    { id: 2, name: "Smart Watch Series 5", price: 4999, quantity: 1, image: "⌚", vendor: "WatchHub" },
    { id: 3, name: "Gaming Keyboard RGB", price: 2499, quantity: 1, image: "⌨️", vendor: "GamerZone" },
  ]);

  const [promoCode, setPromoCode] = useState("");

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    setCartItems(items =>
      items.map(item => (item.id === id ? { ...item, quantity: newQuantity } : item))
    );
    toast.success("Cart updated");
  };

  const removeItem = (id: number) => {
    setCartItems(items => items.filter(item => item.id !== id));
    toast.success("Item removed from cart");
  };

  const applyPromo = () => {
    if (promoCode.toUpperCase() === "SAVE10") {
      toast.success("Promo code applied! 10% discount");
    } else {
      toast.error("Invalid promo code");
    }
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 5000 ? 0 : 99;
  const discount = promoCode.toUpperCase() === "SAVE10" ? subtotal * 0.1 : 0;
  const tax = (subtotal - discount) * 0.18;
  const total = subtotal + shipping - discount + tax;

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center py-12 px-4">
        <div className="text-center space-y-6 animate-fade-in">
          <div className="text-8xl">🛒</div>
          <h2 className="text-3xl font-bold">Your Cart is Empty</h2>
          <p className="text-muted-foreground">Start adding some products to your cart!</p>
          <Link to="/products">
            <Button size="lg" className="gradient-primary">
              <ShoppingBag className="mr-2 h-5 w-5" />
              Browse Products
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold mb-8">Shopping Cart</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item, index) => (
              <Card key={item.id} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardContent className="p-6">
                  <div className="flex gap-4">
                    <div className="w-24 h-24 bg-secondary rounded-lg flex items-center justify-center text-4xl">
                      {item.image}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-semibold text-lg">{item.name}</h3>
                          <p className="text-sm text-muted-foreground">by {item.vendor}</p>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeItem(item.id)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center gap-3">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="w-12 text-center font-semibold">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                        <p className="text-xl font-bold text-primary">₹{item.price * item.quantity}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24 animate-fade-in">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>₹{subtotal}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span>{shipping === 0 ? <Badge variant="secondary">FREE</Badge> : `₹${shipping}`}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-green-500">
                      <span>Discount</span>
                      <span>-₹{discount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tax (18%)</span>
                    <span>₹{tax.toFixed(2)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="text-primary">₹{total.toFixed(2)}</span>
                  </div>
                </div>

                {shipping > 0 && (
                  <div className="bg-accent/10 border border-accent/20 rounded-lg p-3 text-sm">
                    <p className="text-accent">Add ₹{5000 - subtotal} more to get FREE shipping!</p>
                  </div>
                )}

                <div className="space-y-2">
                  <label className="text-sm font-medium">Promo Code</label>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Enter code"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                    />
                    <Button variant="outline" onClick={applyPromo}>
                      Apply
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">Try "SAVE10" for 10% off</p>
                </div>
              </CardContent>
              <CardFooter className="flex-col gap-2">
                <div className="w-full bg-secondary/50 rounded-lg p-3 text-xs text-center mb-2">
                  <p className="text-muted-foreground">Payment Options: Card, UPI, Cash on Delivery</p>
                </div>
                <Link to="/checkout" className="w-full">
                  <Button className="w-full gradient-primary hover:opacity-90">
                    Proceed to Checkout
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link to="/products" className="w-full">
                  <Button variant="outline" className="w-full">
                    Continue Shopping
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
