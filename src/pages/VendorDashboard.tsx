import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Package, ShoppingBag, TrendingUp, Users, Plus, BarChart3, Star } from "lucide-react";

export default function VendorDashboard() {
  const stats = [
    { title: "Total Sales", value: "₹1,24,500", icon: TrendingUp, change: "+12.5%", positive: true },
    { title: "Total Orders", value: "156", icon: ShoppingBag, change: "+8.2%", positive: true },
    { title: "Products Listed", value: "42", icon: Package, change: "+3", positive: true },
    { title: "Customer Reviews", value: "4.7", icon: Star, change: "+0.3", positive: true },
  ];

  const recentOrders = [
    { id: "#ORD-1234", customer: "John Doe", product: "Wireless Earbuds", amount: 1999, status: "Processing" },
    { id: "#ORD-1235", customer: "Jane Smith", product: "Smart Watch", amount: 4999, status: "Shipped" },
    { id: "#ORD-1236", customer: "Bob Wilson", product: "Gaming Mouse", amount: 1499, status: "Delivered" },
    { id: "#ORD-1237", customer: "Alice Brown", product: "Keyboard RGB", amount: 2499, status: "Processing" },
  ];

  const products = [
    { id: 1, name: "Wireless Earbuds Pro", price: 1999, stock: 25, sales: 120, rating: 4.5 },
    { id: 2, name: "Gaming Mouse RGB", price: 1499, stock: 15, sales: 85, rating: 4.7 },
    { id: 3, name: "Mechanical Keyboard", price: 2499, stock: 10, sales: 60, rating: 4.6 },
    { id: 4, name: "Wireless Charger", price: 899, stock: 5, sales: 45, rating: 4.2 },
  ];

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="container mx-auto">
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">Vendor Dashboard</h1>
            <p className="text-muted-foreground">Manage your store and track performance</p>
          </div>
          <Button className="gradient-primary hover:opacity-90">
            <Plus className="mr-2 h-4 w-4" />
            Add Product
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <stat.icon className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className={`text-xs mt-1 ${stat.positive ? 'text-green-500' : 'text-destructive'}`}>
                  {stat.change} from last month
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="orders" className="space-y-6">
          <TabsList>
            <TabsTrigger value="orders">Recent Orders</TabsTrigger>
            <TabsTrigger value="products">My Products</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="orders" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Recent Orders</CardTitle>
                <CardDescription>Manage and track your customer orders</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentOrders.map((order, index) => (
                    <div
                      key={order.id}
                      className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-secondary/50 transition-colors animate-fade-in"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className="flex-1">
                        <p className="font-semibold">{order.id}</p>
                        <p className="text-sm text-muted-foreground">{order.customer} • {order.product}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <p className="font-bold text-primary">₹{order.amount}</p>
                        <Badge variant={
                          order.status === "Delivered" ? "default" :
                          order.status === "Shipped" ? "secondary" : "outline"
                        }>
                          {order.status}
                        </Badge>
                        <Button variant="outline" size="sm">View</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="products" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Product Inventory</CardTitle>
                <CardDescription>Manage your product listings and stock levels</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {products.map((product, index) => (
                    <div
                      key={product.id}
                      className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-secondary/50 transition-colors animate-fade-in"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className="flex-1">
                        <p className="font-semibold">{product.name}</p>
                        <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                          <span>Price: ₹{product.price}</span>
                          <span>Stock: {product.stock} units</span>
                          <span className="flex items-center">
                            <Star className="h-3 w-3 fill-accent text-accent mr-1" />
                            {product.rating}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="text-sm text-muted-foreground">Total Sales</p>
                          <p className="font-bold">{product.sales} units</p>
                        </div>
                        <Badge variant={product.stock < 10 ? "destructive" : "secondary"}>
                          {product.stock < 10 ? "Low Stock" : "In Stock"}
                        </Badge>
                        <Button variant="outline" size="sm">Edit</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <Card>
              <CardHeader>
                <CardTitle>Performance Analytics</CardTitle>
                <CardDescription>Track your store's performance over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80 flex items-center justify-center border-2 border-dashed border-border rounded-lg">
                  <div className="text-center space-y-4">
                    <BarChart3 className="h-16 w-16 text-muted-foreground mx-auto" />
                    <div>
                      <p className="text-xl font-semibold">Analytics Coming Soon</p>
                      <p className="text-muted-foreground">Track sales, revenue, and customer insights</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
