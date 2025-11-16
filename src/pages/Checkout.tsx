import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { MapPin, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import PaymentDialog from "@/components/PaymentDialog";

export default function Checkout() {
  const navigate = useNavigate();
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  const [email, setEmail] = useState("");

  const cartTotal = 10497; // Example total
  const finalAmount = cartTotal + cartTotal * 0.18;

  const handleProceedToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      alert("Please enter a valid email address for order confirmation");
      return;
    }
    
    setShowPaymentDialog(true);
  };

  const handlePaymentSuccess = () => {
    setOrderPlaced(true);
    setTimeout(() => {
      navigate("/orders");
    }, 2000);
  };

  if (orderPlaced) {
    return (
      <div className="min-h-screen flex items-center justify-center py-12 px-4">
        <Card className="max-w-md w-full text-center animate-fade-in">
          <CardContent className="pt-12 pb-8 space-y-6">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="h-12 w-12 text-green-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-2">Order Placed!</h2>
              <p className="text-muted-foreground">
                Payment confirmation has been sent to your registered email.
              </p>
            </div>
            <div className="space-y-2">
              <Button onClick={() => navigate("/orders")} className="w-full gradient-primary">
                Track Your Order
              </Button>
              <Button onClick={() => navigate("/")} variant="outline" className="w-full">
                Continue Shopping
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen py-8 px-4">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-4xl font-bold mb-8">Checkout</h1>

          <form onSubmit={handleProceedToPayment} className="space-y-6">
          {/* Delivery Address */}
          <Card className="animate-fade-in">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary" />
                Delivery Address
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input id="fullName" placeholder="John Doe" required />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" type="tel" placeholder="+91 9876543210" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="john@example.com" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required 
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Street Address</Label>
                <Input id="address" placeholder="123 Main Street" required />
              </div>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input id="city" placeholder="Mumbai" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">State</Label>
                  <Input id="state" placeholder="Maharashtra" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="pincode">Pincode</Label>
                  <Input id="pincode" placeholder="400001" required />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Order Summary */}
          <Card className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>₹{cartTotal}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="text-green-600">FREE</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tax (18%)</span>
                  <span>₹{(cartTotal * 0.18).toFixed(2)}</span>
                </div>
                <Separator />
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span className="text-primary">₹{finalAmount.toFixed(2)}</span>
                </div>
              </div>

              <div className="bg-accent/10 border border-accent/20 rounded-lg p-3 text-sm">
                <p className="text-accent font-medium mb-1">Delivery Information</p>
                <p className="text-muted-foreground">
                  Expected delivery within 10 days. Late deliveries get 70% refund. Damaged items replaced within 2-3 days.
                </p>
              </div>

              <Button type="submit" className="w-full gradient-primary hover:opacity-90" size="lg">
                Proceed to Payment - ₹{finalAmount.toFixed(2)}
              </Button>

              <p className="text-xs text-center text-muted-foreground">
                A confirmation will be sent to your registered email
              </p>
            </CardContent>
          </Card>
        </form>
      </div>
    </div>

    <PaymentDialog
      open={showPaymentDialog}
      onOpenChange={setShowPaymentDialog}
      amount={finalAmount}
      onSuccess={handlePaymentSuccess}
    />
  </>
  );
}
