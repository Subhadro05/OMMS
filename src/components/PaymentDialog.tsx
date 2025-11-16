import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CreditCard, Smartphone, Banknote, Loader2, Wallet } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";

const addMoneySchema = z.object({
  amount: z.number().min(1, "Amount must be at least ₹1").max(100000, "Amount cannot exceed ₹1,00,000"),
});

// Validation schemas
const cardSchema = z.object({
  cardNumber: z.string().regex(/^\d{16}$/, "Card number must be 16 digits"),
  expiry: z.string().regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "Format: MM/YY"),
  cvv: z.string().regex(/^\d{3,4}$/, "CVV must be 3 or 4 digits"),
});

const upiSchema = z.object({
  upiId: z.string().regex(/^[\w.-]+@[\w.-]+$/, "Invalid UPI ID format"),
});

interface PaymentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  amount: number;
  onSuccess: () => void;
}

export default function PaymentDialog({ open, onOpenChange, amount, onSuccess }: PaymentDialogProps) {
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [processing, setProcessing] = useState(false);
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [upiId, setUpiId] = useState("");
  const [walletBalance, setWalletBalance] = useState(0);
  const [showAddMoney, setShowAddMoney] = useState(false);
  const [addAmount, setAddAmount] = useState("");

  useEffect(() => {
    // Get wallet balance from localStorage
    const balance = parseFloat(localStorage.getItem("walletBalance") || "0");
    setWalletBalance(balance);
    
    // Listen for storage changes to update balance in real-time
    const handleStorageChange = () => {
      const newBalance = parseFloat(localStorage.getItem("walletBalance") || "0");
      setWalletBalance(newBalance);
    };
    
    window.addEventListener("storage", handleStorageChange);
    
    // Also check balance periodically while dialog is open
    const interval = setInterval(handleStorageChange, 500);
    
    return () => {
      window.removeEventListener("storage", handleStorageChange);
      clearInterval(interval);
    };
  }, [open]);

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation using zod
    try {
      if (paymentMethod === "card") {
        cardSchema.parse({
          cardNumber: cardNumber.replace(/\s/g, ""),
          expiry,
          cvv,
        });
      } else if (paymentMethod === "upi") {
        upiSchema.parse({ upiId });
      } else if (paymentMethod === "wallet") {
        if (walletBalance < amount) {
          toast.error("Insufficient wallet balance. Please add money to your wallet.");
          return;
        }
      }

      setProcessing(true);
      
      // Simulate payment processing
      setTimeout(() => {
        // Deduct from wallet if wallet payment
        if (paymentMethod === "wallet") {
          const newBalance = walletBalance - amount;
          localStorage.setItem("walletBalance", newBalance.toString());
          setWalletBalance(newBalance);
        }
        
        setProcessing(false);
        toast.success("Payment successful! Order confirmation sent to your email.");
        onOpenChange(false);
        onSuccess();
      }, 2000);
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast.error(error.issues[0].message);
      }
    }
  };

  const handleAddMoney = () => {
    setShowAddMoney(true);
  };

  const handleConfirmAddMoney = () => {
    try {
      const amountNum = parseFloat(addAmount);
      addMoneySchema.parse({ amount: amountNum });
      
      const newBalance = walletBalance + amountNum;
      localStorage.setItem("walletBalance", newBalance.toString());
      setWalletBalance(newBalance);
      
      toast.success(`₹${amountNum.toFixed(2)} added to your wallet successfully!`);
      setShowAddMoney(false);
      setAddAmount("");
      
      // If balance is now sufficient, enable wallet payment
      if (newBalance >= amount) {
        setPaymentMethod("wallet");
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast.error(error.issues[0].message);
      } else {
        toast.error("Please enter a valid amount");
      }
    }
  };

  const hasSufficientBalance = walletBalance >= amount;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Complete Payment</DialogTitle>
          <DialogDescription>
            Secure in-app payment for ₹{amount.toFixed(2)}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handlePayment} className="space-y-6">
          <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-3">
            <div className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-secondary transition-colors">
              <RadioGroupItem value="card" id="dialog-card" />
              <Label htmlFor="dialog-card" className="flex items-center gap-3 cursor-pointer flex-1">
                <CreditCard className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium">Card Payment</p>
                  <p className="text-xs text-muted-foreground">Debit / Credit Card</p>
                </div>
              </Label>
            </div>

            <div className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-secondary transition-colors">
              <RadioGroupItem value="upi" id="dialog-upi" />
              <Label htmlFor="dialog-upi" className="flex items-center gap-3 cursor-pointer flex-1">
                <Smartphone className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium">UPI Payment</p>
                  <p className="text-xs text-muted-foreground">PhonePe, Google Pay, Paytm</p>
                </div>
              </Label>
            </div>

            <div className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-secondary transition-colors">
              <RadioGroupItem value="cod" id="dialog-cod" />
              <Label htmlFor="dialog-cod" className="flex items-center gap-3 cursor-pointer flex-1">
                <Banknote className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium">Cash on Delivery</p>
                  <p className="text-xs text-muted-foreground">Pay when you receive</p>
                </div>
              </Label>
            </div>

            <div className={`flex items-center space-x-3 p-3 border rounded-lg transition-colors ${
              hasSufficientBalance ? 'hover:bg-secondary' : 'opacity-50 cursor-not-allowed'
            }`}>
              <RadioGroupItem value="wallet" id="dialog-wallet" disabled={!hasSufficientBalance} />
              <Label htmlFor="dialog-wallet" className={`flex items-center gap-3 flex-1 ${
                hasSufficientBalance ? 'cursor-pointer' : 'cursor-not-allowed'
              }`}>
                <Wallet className="h-5 w-5 text-primary" />
                <div className="flex-1">
                  <p className="font-medium">Digital Wallet</p>
                  <p className="text-xs text-muted-foreground">
                    Balance: ₹{walletBalance.toFixed(2)}
                  </p>
                </div>
              </Label>
            </div>
          </RadioGroup>

          {paymentMethod === "card" && (
            <div className="space-y-4 animate-fade-in">
              <div className="space-y-2">
                <Label htmlFor="dialog-cardNumber">Card Number</Label>
                <Input
                  id="dialog-cardNumber"
                  placeholder="1234 5678 9012 3456"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  maxLength={19}
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="dialog-expiry">Expiry</Label>
                  <Input
                    id="dialog-expiry"
                    placeholder="MM/YY"
                    value={expiry}
                    onChange={(e) => setExpiry(e.target.value)}
                    maxLength={5}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dialog-cvv">CVV</Label>
                  <Input
                    id="dialog-cvv"
                    type="password"
                    placeholder="123"
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value)}
                    maxLength={3}
                    required
                  />
                </div>
              </div>
            </div>
          )}

          {paymentMethod === "upi" && (
            <div className="space-y-2 animate-fade-in">
              <Label htmlFor="dialog-upiId">UPI ID</Label>
              <Input
                id="dialog-upiId"
                placeholder="yourname@upi"
                value={upiId}
                onChange={(e) => setUpiId(e.target.value)}
                required
              />
            </div>
          )}

          {paymentMethod === "cod" && (
            <div className="p-4 bg-accent/10 border border-accent/20 rounded-lg animate-fade-in">
              <p className="text-sm text-muted-foreground">
                You will pay ₹{amount.toFixed(2)} in cash when your order is delivered.
              </p>
            </div>
          )}

          {paymentMethod === "wallet" && (
            <div className="space-y-3 animate-fade-in">
              {showAddMoney ? (
                <div className="p-4 bg-accent/10 border border-accent/20 rounded-lg space-y-3">
                  <p className="text-sm font-medium">Add Money to Wallet</p>
                  <div className="space-y-2">
                    <Label htmlFor="add-money-amount">Amount (₹)</Label>
                    <Input
                      id="add-money-amount"
                      type="number"
                      placeholder="Enter amount"
                      value={addAmount}
                      onChange={(e) => setAddAmount(e.target.value)}
                      min="1"
                      max="100000"
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      type="button"
                      variant="outline" 
                      className="flex-1"
                      onClick={() => {
                        setShowAddMoney(false);
                        setAddAmount("");
                      }}
                    >
                      Cancel
                    </Button>
                    <Button 
                      type="button"
                      className="flex-1"
                      onClick={handleConfirmAddMoney}
                    >
                      Add Money
                    </Button>
                  </div>
                </div>
              ) : hasSufficientBalance ? (
                <div className="p-4 bg-accent/10 border border-accent/20 rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    ₹{amount.toFixed(2)} will be deducted from your wallet balance.
                  </p>
                  <p className="text-sm font-medium mt-2">
                    Remaining balance: ₹{(walletBalance - amount).toFixed(2)}
                  </p>
                </div>
              ) : (
                <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg space-y-3">
                  <p className="text-sm text-destructive font-medium">
                    Insufficient wallet balance!
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Required: ₹{amount.toFixed(2)} | Available: ₹{walletBalance.toFixed(2)}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Please add ₹{(amount - walletBalance).toFixed(2)} or more to your wallet.
                  </p>
                  <Button 
                    type="button"
                    variant="outline" 
                    className="w-full"
                    onClick={handleAddMoney}
                  >
                    Add Money to Wallet
                  </Button>
                </div>
              )}
            </div>
          )}

          <Button 
            type="submit" 
            className="w-full gradient-primary" 
            size="lg"
            disabled={processing}
          >
            {processing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              `Pay ₹${amount.toFixed(2)}`
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
