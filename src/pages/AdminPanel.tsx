import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Users, Store, Package, ShoppingBag, Search, Ban, CheckCircle, AlertCircle, RotateCcw } from "lucide-react";
import { toast } from "sonner";
import { useState, useEffect } from "react";

export default function AdminPanel() {
  const [returnRequests, setReturnRequests] = useState<any[]>([]);

  useEffect(() => {
    // Load return requests from localStorage
    const requests = JSON.parse(localStorage.getItem("returnRequests") || "[]");
    setReturnRequests(requests);
  }, []);

  const stats = [
    { title: "Total Users", value: "2,543", icon: Users, change: "+12.5%" },
    { title: "Active Vendors", value: "87", icon: Store, change: "+5.2%" },
    { title: "Total Products", value: "1,234", icon: Package, change: "+18.3%" },
    { title: "Total Orders", value: "5,678", icon: ShoppingBag, change: "+23.1%" },
  ];

  const users = [
    { id: 1, name: "John Doe", email: "john@example.com", role: "Customer", status: "Active", joined: "Jan 2024" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "Vendor", status: "Active", joined: "Feb 2024" },
    { id: 3, name: "Bob Wilson", email: "bob@example.com", role: "Customer", status: "Suspended", joined: "Mar 2024" },
    { id: 4, name: "Alice Brown", email: "alice@example.com", role: "Vendor", status: "Active", joined: "Apr 2024" },
  ];

  const vendors = [
    { id: 1, name: "TechStore", products: 45, sales: "₹2,45,000", rating: 4.7, status: "Approved" },
    { id: 2, name: "FashionHub", products: 120, sales: "₹5,67,000", rating: 4.5, status: "Approved" },
    { id: 3, name: "GamerZone", products: 32, sales: "₹1,89,000", rating: 4.8, status: "Pending" },
    { id: 4, name: "HomeDecor", products: 78, sales: "₹3,21,000", rating: 4.2, status: "Approved" },
  ];

  const handleReturnAction = (index: number, action: string) => {
    const updatedRequests = [...returnRequests];
    updatedRequests[index].status = action === "approve" ? "Approved" : "Rejected";
    setReturnRequests(updatedRequests);
    localStorage.setItem("returnRequests", JSON.stringify(updatedRequests));
    toast.success(`Return request ${action === "approve" ? "approved" : "rejected"} successfully`);
  };

  const handleUserAction = (action: string, userName: string) => {
    toast.success(`${action} action performed for ${userName}`);
  };

  const handleVendorApproval = (vendorName: string, approved: boolean) => {
    toast.success(`Vendor ${vendorName} ${approved ? 'approved' : 'rejected'}`);
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="container mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage users, vendors, and system settings</p>
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
                <p className="text-xs text-green-500 mt-1">{stat.change} from last month</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="users" className="space-y-6">
          <TabsList>
            <TabsTrigger value="users">User Management</TabsTrigger>
            <TabsTrigger value="vendors">Vendor Management</TabsTrigger>
            <TabsTrigger value="returns">Return Requests</TabsTrigger>
            <TabsTrigger value="products">Product Categories</TabsTrigger>
          </TabsList>

          <TabsContent value="users" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Registered Users</CardTitle>
                    <CardDescription>Manage user accounts and permissions</CardDescription>
                  </div>
                  <div className="relative w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search users..." className="pl-10" />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {users.map((user, index) => (
                    <div
                      key={user.id}
                      className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-secondary/50 transition-colors animate-fade-in"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className="flex-1">
                        <p className="font-semibold">{user.name}</p>
                        <p className="text-sm text-muted-foreground">{user.email}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <Badge variant="outline">{user.role}</Badge>
                        <Badge variant={user.status === "Active" ? "default" : "destructive"}>
                          {user.status}
                        </Badge>
                        <p className="text-sm text-muted-foreground w-24">Joined {user.joined}</p>
                        <div className="flex gap-2">
                          {user.status === "Active" ? (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleUserAction("Suspend", user.name)}
                            >
                              <Ban className="h-4 w-4 mr-1" />
                              Suspend
                            </Button>
                          ) : (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleUserAction("Activate", user.name)}
                            >
                              <CheckCircle className="h-4 w-4 mr-1" />
                              Activate
                            </Button>
                          )}
                          <Button variant="outline" size="sm">
                            View
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="vendors" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Vendor Management</CardTitle>
                    <CardDescription>Approve vendors and monitor their performance</CardDescription>
                  </div>
                  <div className="relative w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search vendors..." className="pl-10" />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {vendors.map((vendor, index) => (
                    <div
                      key={vendor.id}
                      className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-secondary/50 transition-colors animate-fade-in"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className="flex-1">
                        <p className="font-semibold">{vendor.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {vendor.products} products • Rating: {vendor.rating}
                        </p>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="text-sm text-muted-foreground">Total Sales</p>
                          <p className="font-bold text-primary">{vendor.sales}</p>
                        </div>
                        <Badge variant={vendor.status === "Approved" ? "default" : "secondary"}>
                          {vendor.status}
                        </Badge>
                        <div className="flex gap-2">
                          {vendor.status === "Pending" ? (
                            <>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleVendorApproval(vendor.name, true)}
                              >
                                <CheckCircle className="h-4 w-4 mr-1" />
                                Approve
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleVendorApproval(vendor.name, false)}
                              >
                                <Ban className="h-4 w-4 mr-1" />
                                Reject
                              </Button>
                            </>
                          ) : (
                            <Button variant="outline" size="sm">
                              View Details
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="returns" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Return & Refund Requests</CardTitle>
                    <CardDescription>Review and manage customer return requests</CardDescription>
                  </div>
                  <Badge variant="secondary">
                    {returnRequests.filter(r => r.status === "Pending").length} Pending
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                {returnRequests.length === 0 ? (
                  <div className="h-64 flex flex-col items-center justify-center text-center">
                    <RotateCcw className="h-12 w-12 text-muted-foreground mb-4" />
                    <p className="text-lg font-semibold">No Return Requests</p>
                    <p className="text-sm text-muted-foreground">Customer return requests will appear here</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {returnRequests.map((request, index) => (
                      <div
                        key={index}
                        className="flex items-start justify-between p-4 border border-border rounded-lg hover:bg-secondary/50 transition-colors animate-fade-in"
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        <div className="flex-1 space-y-2">
                          <div className="flex items-center gap-3">
                            <p className="font-semibold">{request.orderId}</p>
                            <Badge 
                              variant={
                                request.status === "Approved" ? "default" : 
                                request.status === "Rejected" ? "destructive" : 
                                "secondary"
                              }
                            >
                              {request.status}
                            </Badge>
                          </div>
                          <div className="space-y-1">
                            <p className="text-sm">
                              <span className="font-medium">Reason:</span> {request.reason.split('_').map((word: string) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              <span className="font-medium">Description:</span> {request.description}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              Requested on: {request.requestDate}
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-2 ml-4">
                          {request.status === "Pending" ? (
                            <>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleReturnAction(index, "approve")}
                                className="text-green-600 hover:text-green-700"
                              >
                                <CheckCircle className="h-4 w-4 mr-1" />
                                Approve
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleReturnAction(index, "reject")}
                                className="text-red-600 hover:text-red-700"
                              >
                                <Ban className="h-4 w-4 mr-1" />
                                Reject
                              </Button>
                            </>
                          ) : (
                            <Button variant="outline" size="sm" disabled>
                              {request.status}
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="products">
            <Card>
              <CardHeader>
                <CardTitle>Product Categories</CardTitle>
                <CardDescription>Manage product categories and classifications</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80 flex items-center justify-center border-2 border-dashed border-border rounded-lg">
                  <div className="text-center space-y-4">
                    <AlertCircle className="h-16 w-16 text-muted-foreground mx-auto" />
                    <div>
                      <p className="text-xl font-semibold">Category Management</p>
                      <p className="text-muted-foreground">Manage product categories and tags</p>
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
