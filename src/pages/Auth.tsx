import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { User, Mail, Lock, Phone, MapPin } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

// Validation schemas
const emailSchema = z.string().email("Invalid email address");
const passwordSchema = z.string().min(6, "Password must be at least 6 characters");

export default function Auth() {
  const navigate = useNavigate();
  const [role, setRole] = useState("customer");
  const [email, setEmail] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const loginEmail = (form.elements.namedItem("login-email") as HTMLInputElement).value;
    const loginPassword = (form.elements.namedItem("login-password") as HTMLInputElement).value;
    
    try {
      // Email and password validation
      emailSchema.parse(loginEmail);
      passwordSchema.parse(loginPassword);
      
      // Admin credentials check (PROTOTYPE ONLY - NOT SECURE FOR PRODUCTION)
      const ADMIN_EMAIL = "admin@mallazone.com";
      const ADMIN_PASSWORD = "admin123";
      
      if (role === "admin") {
        if (loginEmail === ADMIN_EMAIL && loginPassword === ADMIN_PASSWORD) {
          sessionStorage.setItem("isLoggedIn", "true");
          localStorage.setItem("userRole", "admin");
          localStorage.setItem("userEmail", loginEmail);
          toast.success("Admin login successful!");
          setTimeout(() => navigate("/admin"), 1000);
          return;
        } else {
          toast.error("Invalid admin credentials.");
          return;
        }
      }
      
      // Check if user is registered (for customer/vendor)
      const registeredUsers = JSON.parse(localStorage.getItem("registeredUsers") || "[]");
      if (registeredUsers.length > 0 && !registeredUsers.includes(loginEmail)) {
        toast.error("Account not found. Please register first.");
        return;
      }
      
      // Store in sessionStorage (clears on tab/window close)
      sessionStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userRole", role);
      localStorage.setItem("userEmail", loginEmail);
      
      toast.success("Login successful!");
      setTimeout(() => {
        if (role === "vendor") {
          navigate("/vendor");
        } else {
          navigate("/");
        }
      }, 1000);
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast.error(error.issues[0].message);
      }
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const registerEmail = (form.elements.namedItem("register-email") as HTMLInputElement).value;
    const registerPassword = (form.elements.namedItem("register-password") as HTMLInputElement).value;
    const registerRole = (form.elements.namedItem("register-role") as HTMLInputElement).value || "customer";
    
    try {
      // Email and password validation
      emailSchema.parse(registerEmail);
      passwordSchema.parse(registerPassword);
      
      // Check if user already registered
      const registeredUsers = JSON.parse(localStorage.getItem("registeredUsers") || "[]");
      if (registeredUsers.includes(registerEmail)) {
        toast.error("This email is already registered. Please login instead.");
        return;
      }
      
      // Register the user
      registeredUsers.push(registerEmail);
      localStorage.setItem("registeredUsers", JSON.stringify(registeredUsers));
      
      // Store in sessionStorage
      sessionStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userRole", registerRole);
      localStorage.setItem("userEmail", registerEmail);
      
      toast.success("Registration successful! A confirmation email has been sent.");
      setTimeout(() => {
        if (registerRole === "vendor") {
          navigate("/vendor");
        } else {
          navigate("/");
        }
      }, 1000);
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast.error(error.issues[0].message);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 bg-gradient-hero">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <Card className="w-full max-w-md relative z-10 animate-fade-in shadow-glow">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold gradient-text">Welcome Back</CardTitle>
          <CardDescription>Sign in to your account or create a new one</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="register" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="register">Register</TabsTrigger>
              <TabsTrigger value="login">Login</TabsTrigger>
            </TabsList>

            <TabsContent value="login" className="space-y-4">
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label>User Role</Label>
                  <Select value={role} onValueChange={setRole}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="customer">Customer</SelectItem>
                      <SelectItem value="vendor">Vendor</SelectItem>
                      <SelectItem value="admin">Administrator</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="login-email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="login-email"
                      type="email"
                      placeholder="you@example.com"
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="login-password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="login-password"
                      type="password"
                      placeholder="••••••••"
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="remember" />
                    <label htmlFor="remember" className="text-sm cursor-pointer">
                      Remember me
                    </label>
                  </div>
                  <Button variant="link" className="text-primary p-0 h-auto">
                    Forgot password?
                  </Button>
                </div>

                <Button type="submit" className="w-full gradient-primary hover:opacity-90">
                  Sign In
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="register" className="space-y-4">
              <form onSubmit={handleRegister} className="space-y-4">
                <div className="space-y-2">
                  <Label>Register As</Label>
                  <Select name="register-role" defaultValue="customer">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="customer">Customer</SelectItem>
                      <SelectItem value="vendor">Vendor</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="register-name">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="register-name"
                      type="text"
                      placeholder="Enter your full name"
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="register-email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="register-email"
                      type="email"
                      placeholder="you@example.com"
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="register-phone">Phone Number</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="register-phone"
                      type="tel"
                      placeholder="Enter your phone number"
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="register-address">Address</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="register-address"
                      type="text"
                      placeholder="Your address"
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="register-password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="register-password"
                      type="password"
                      placeholder="••••••••"
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox id="terms" required />
                  <label htmlFor="terms" className="text-sm cursor-pointer">
                    I agree to the terms and conditions
                  </label>
                </div>

                <Button type="submit" className="w-full gradient-primary hover:opacity-90">
                  Create Account
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="text-center text-sm text-muted-foreground">
          Secure authentication for your account
        </CardFooter>
      </Card>
    </div>
  );
}
