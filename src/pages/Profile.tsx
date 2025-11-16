import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Mail, Phone, MapPin, Wallet, Gift, Star, Package, LogOut, IndianRupee } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

// Validation schemas
const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Invalid email address"),
  phone: z.string().regex(/^\+?[1-9]\d{9,14}$/, "Invalid phone number"),
  address: z.string().min(5, "Address must be at least 5 characters").max(200),
});

const addMoneySchema = z.object({
  accountNumber: z.string().regex(/^\d{9,18}$/, "Invalid account number"),
  amount: z.number().min(100, "Minimum amount is ₹100").max(50000, "Maximum amount is ₹50,000"),
});

export default function Profile() {
  const navigate = useNavigate();
  const [walletPoints, setWalletPoints] = useState(450);
  const [walletBalance, setWalletBalance] = useState(0);
  const [redeemCode, setRedeemCode] = useState("");
  const [addMoneyData, setAddMoneyData] = useState({ accountNumber: "", amount: "" });
  const [isAddingMoney, setIsAddingMoney] = useState(false);
  const pointsToDiscount = 1000; // Points needed for discount
  const progressPercentage = (walletPoints / pointsToDiscount) * 100;

  const [availableOffers] = useState([
    { code: "SAVE10", discount: "10% off", minPurchase: 500, used: false },
    { code: "FIRST50", discount: "₹50 off", minPurchase: 299, used: false },
    { code: "WELCOME20", discount: "20% off", minPurchase: 1000, used: true },
  ]);

  const [purchaseHistory] = useState([
    { date: "May 10, 2024", amount: 6997, points: 70 },
    { date: "May 5, 2024", amount: 2499, points: 25 },
    { date: "Apr 28, 2024", amount: 4999, points: 50 },
  ]);

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      address: formData.get("address") as string,
    };

    try {
      profileSchema.parse(data);
      // Store in localStorage
      localStorage.setItem("userProfile", JSON.stringify(data));
      toast.success("Profile updated successfully!");
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast.error(error.issues[0].message);
      }
    }
  };

  const handleAddMoney = () => {
    if (!addMoneyData.accountNumber || !addMoneyData.amount) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      const amountNum = parseFloat(addMoneyData.amount);
      addMoneySchema.parse({
        accountNumber: addMoneyData.accountNumber,
        amount: amountNum,
      });

      setIsAddingMoney(true);
      // Simulate bank transfer
      setTimeout(() => {
        setWalletBalance(prev => prev + amountNum);
        toast.success(`₹${amountNum} added to your wallet successfully!`);
        setAddMoneyData({ accountNumber: "", amount: "" });
        setIsAddingMoney(false);
      }, 2000);
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast.error(error.issues[0].message);
      }
      setIsAddingMoney(false);
    }
  };

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    toast.success("Offer code copied!");
  };

  const handleRedeemCode = () => {
    if (!redeemCode.trim()) {
      toast.error("Please enter a code");
      return;
    }
    // Simulate code redemption
    toast.success(`Code "${redeemCode}" redeemed successfully! Check your offers.`);
    setRedeemCode("");
  };

  const handleLogout = () => {
    sessionStorage.clear();
    localStorage.removeItem("userRole");
    localStorage.removeItem("userEmail");
    toast.success("Logged out successfully!");
    navigate("/auth");
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold mb-2">My Profile</h1>
            <p className="text-muted-foreground">Manage your account and view your rewards</p>
          </div>
          <Button variant="destructive" onClick={handleLogout} className="flex items-center gap-2">
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Profile Info */}
          <div className="lg:col-span-2 space-y-6">
            <Tabs defaultValue="profile" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="profile">Profile Details</TabsTrigger>
                <TabsTrigger value="wallet">Digital Wallet</TabsTrigger>
              </TabsList>

              <TabsContent value="profile" className="space-y-4 mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                    <CardDescription>Update your account details</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleUpdateProfile} className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name</Label>
                          <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input id="name" name="name" placeholder="Enter your full name" className="pl-10" required />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input id="email" name="email" type="email" placeholder="your.email@example.com" className="pl-10" required />
                          </div>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone</Label>
                          <div className="relative">
                            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input id="phone" name="phone" placeholder="+91 9876543210" className="pl-10" required />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="address">Address</Label>
                          <div className="relative">
                            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input id="address" name="address" placeholder="Your address" className="pl-10" required />
                          </div>
                        </div>
                      </div>

                      <Button type="submit" className="gradient-primary hover:opacity-90">
                        Save Changes
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="wallet" className="space-y-4 mt-6">
                <Card className="bg-gradient-primary text-primary-foreground">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Wallet className="h-5 w-5" />
                      Digital Wallet
                    </CardTitle>
                    <CardDescription className="text-primary-foreground/80">
                      Use wallet balance and points for purchases
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="text-sm opacity-80 mb-1">Wallet Balance</p>
                      <div className="text-4xl font-bold">₹{walletBalance.toFixed(2)}</div>
                    </div>
                    <div className="border-t border-primary-foreground/20 pt-4">
                      <p className="text-sm opacity-80 mb-1">Loyalty Points</p>
                      <div className="text-2xl font-bold mb-2">{walletPoints} Points</div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Progress to next reward</span>
                          <span>{pointsToDiscount - walletPoints} points left</span>
                        </div>
                        <div className="w-full bg-primary-foreground/20 rounded-full h-2">
                          <div
                            className="bg-primary-foreground h-2 rounded-full transition-all"
                            style={{ width: `${progressPercentage}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <IndianRupee className="h-5 w-5 text-primary" />
                      Add Money to Wallet
                    </CardTitle>
                    <CardDescription>Transfer money from your bank account</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="accountNumber">Bank Account Number</Label>
                      <Input
                        id="accountNumber"
                        placeholder="Enter your account number"
                        value={addMoneyData.accountNumber}
                        onChange={(e) => setAddMoneyData({ ...addMoneyData, accountNumber: e.target.value })}
                        disabled={isAddingMoney}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="amount">Amount (₹)</Label>
                      <Input
                        id="amount"
                        type="number"
                        placeholder="Min: ₹100, Max: ₹50,000"
                        value={addMoneyData.amount}
                        onChange={(e) => setAddMoneyData({ ...addMoneyData, amount: e.target.value })}
                        disabled={isAddingMoney}
                      />
                    </div>
                    <Button 
                      onClick={handleAddMoney} 
                      className="w-full gradient-primary"
                      disabled={isAddingMoney}
                    >
                      {isAddingMoney ? "Processing..." : "Add Money"}
                    </Button>
                    <p className="text-xs text-muted-foreground text-center">
                      Money will be instantly added to your wallet and can be used for purchases
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>How It Works</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 text-sm">
                    <div className="flex items-start gap-2">
                      <Package className="h-4 w-4 text-primary mt-0.5" />
                      <p>Earn 1 point for every ₹10 spent</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <Star className="h-4 w-4 text-primary mt-0.5" />
                      <p>Collect 1000 points to unlock special discounts</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <Gift className="h-4 w-4 text-primary mt-0.5" />
                      <p>Redeem offer codes for instant savings</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Points History</CardTitle>
                    <CardDescription>Recent points earned</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {purchaseHistory.map((purchase, idx) => (
                        <div key={idx} className="flex justify-between items-center p-3 bg-secondary rounded-lg">
                          <div>
                            <p className="font-medium">{purchase.date}</p>
                            <p className="text-sm text-muted-foreground">Purchase: ₹{purchase.amount}</p>
                          </div>
                          <Badge variant="secondary">+{purchase.points} pts</Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Offers Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Gift className="h-5 w-5 text-primary" />
                  Available Offers
                </CardTitle>
                <CardDescription>Redeem codes for discounts</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {availableOffers.map((offer, idx) => (
                  <div
                    key={idx}
                    className={`p-3 border rounded-lg ${
                      offer.used ? "bg-secondary/50 opacity-60" : "bg-accent/10 border-accent/20"
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="font-bold text-accent">{offer.code}</p>
                        <p className="text-sm">{offer.discount}</p>
                      </div>
                      {offer.used && <Badge variant="outline">Used</Badge>}
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">
                      Min purchase: ₹{offer.minPurchase}
                    </p>
                    {!offer.used && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="w-full"
                        onClick={() => copyCode(offer.code)}
                      >
                        Copy Code
                      </Button>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Gift className="h-5 w-5 text-primary" />
                  Redeem Code
                </CardTitle>
                <CardDescription>Enter your offer code to redeem</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Input
                  placeholder="Enter offer code"
                  value={redeemCode}
                  onChange={(e) => setRedeemCode(e.target.value.toUpperCase())}
                />
                <Button onClick={handleRedeemCode} className="w-full gradient-primary">
                  Redeem Code
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="pt-6 text-center">
                <Star className="h-8 w-8 text-primary mx-auto mb-2" />
                <p className="text-sm font-semibold mb-1">Loyalty Reward</p>
                <p className="text-xs text-muted-foreground">
                  Reach 1000 points to unlock exclusive discounts!
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
