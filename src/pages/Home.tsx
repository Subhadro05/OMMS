import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShoppingBag, Star, TrendingUp, Shield, Truck, HeadphonesIcon } from "lucide-react";
import { Link } from "react-router-dom";

export default function Home() {
  const featuredProducts = [
    {
      id: 1,
      name: "Premium Wireless Headphones",
      price: 2999,
      rating: 4.5,
      image: "🎧",
      category: "Electronics",
      discount: 20,
    },
    {
      id: 2,
      name: "Smart Fitness Watch",
      price: 4999,
      rating: 4.8,
      image: "⌚",
      category: "Wearables",
      discount: 15,
    },
    {
      id: 3,
      name: "Designer Backpack",
      price: 1999,
      rating: 4.3,
      image: "🎒",
      category: "Fashion",
      discount: 30,
    },
    {
      id: 4,
      name: "Gaming Mouse Pro",
      price: 1499,
      rating: 4.7,
      image: "🖱️",
      category: "Gaming",
      discount: 25,
    },
  ];

  const features = [
    {
      icon: Shield,
      title: "Secure Payments",
      description: "100% secure transactions with encrypted payment gateway",
    },
    {
      icon: Truck,
      title: "Fast Delivery",
      description: "Express delivery within 7-8 business days",
    },
    {
      icon: HeadphonesIcon,
      title: "24/7 Support",
      description: "Round-the-clock customer support for your queries",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-hero py-20 px-4">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>
        
        <div className="container mx-auto relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-6 animate-fade-in">
            <Badge className="bg-primary/20 text-primary border-primary mb-4">
              <TrendingUp className="h-3 w-3 mr-1" />
              Trending Now
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold leading-tight">
              Welcome to
              <span className="gradient-text block mt-2">Mallazone</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Discover amazing products from multiple vendors, all in one place. Shop with confidence and convenience.
            </p>
            <div className="flex flex-wrap gap-4 justify-center pt-4">
              <Link to="/products">
                <Button size="lg" className="gradient-primary hover:opacity-90 transition-opacity">
                  <ShoppingBag className="mr-2 h-5 w-5" />
                  Start Shopping
                </Button>
              </Link>
              <Link to="/vendor">
                <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/10">
                  Become a Vendor
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-card">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="text-center space-y-4 p-6 rounded-lg hover:bg-secondary transition-colors animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10">
                  <feature.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Products</h2>
            <p className="text-muted-foreground">Check out our handpicked products just for you</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product, index) => (
              <Card
                key={product.id}
                className="card-hover overflow-hidden animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader>
                  <div className="flex justify-between items-start mb-4">
                    <Badge variant="secondary">{product.category}</Badge>
                    {product.discount > 0 && (
                      <Badge className="bg-destructive text-destructive-foreground">
                        {product.discount}% OFF
                      </Badge>
                    )}
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
                    <span className="text-muted-foreground ml-1">(125 reviews)</span>
                  </CardDescription>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-primary">₹{product.price}</span>
                    {product.discount > 0 && (
                      <span className="text-sm text-muted-foreground line-through">
                        ₹{Math.round(product.price / (1 - product.discount / 100))}
                      </span>
                    )}
                  </div>
                </CardContent>
                <CardFooter>
                  <Link to={`/product/${product.id}`} className="w-full">
                    <Button className="w-full gradient-primary hover:opacity-90">
                      View Details
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/products">
              <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/10">
                View All Products
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-primary">
        <div className="container mx-auto text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground">
            Join Our Growing Community
          </h2>
          <p className="text-primary-foreground/90 max-w-2xl mx-auto">
            Whether you're a customer looking for the best deals or a vendor wanting to reach more buyers, we've got you covered.
          </p>
          <div className="flex flex-wrap gap-4 justify-center pt-4">
            <Link to="/auth">
              <Button size="lg" variant="secondary" className="bg-background text-foreground hover:bg-background/90">
                Sign Up Now
              </Button>
            </Link>
            <Link to="/vendor">
              <Button size="lg" variant="outline" className="border-background text-background hover:bg-background/20">
                Start Selling
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
