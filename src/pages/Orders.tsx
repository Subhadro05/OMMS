import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Package, Truck, CheckCircle, Clock, MapPin, RotateCcw, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useState } from "react";

export default function Orders() {
  const [returnDialogOpen, setReturnDialogOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);
  const [returnReason, setReturnReason] = useState("");
  const [returnDescription, setReturnDescription] = useState("");
  const [reviewDialogOpen, setReviewDialogOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");

  const orders = [
    {
      id: "#ORD-1234",
      date: "May 10, 2024",
      total: 6997,
      status: "Delivered",
      items: [
        { name: "Wireless Earbuds Pro", quantity: 2, price: 1999, image: "🎧" },
        { name: "Gaming Mouse", quantity: 1, price: 2999, image: "🖱️" }
      ],
      tracking: {
        ordered: true,
        processing: true,
        shipped: true,
        delivered: true
      },
      deliveryAddress: "123 Main Street, Mumbai, Maharashtra - 400001"
    },
    {
      id: "#ORD-1235",
      date: "May 12, 2024",
      total: 4999,
      status: "Shipped",
      items: [
        { name: "Smart Watch Series 5", quantity: 1, price: 4999, image: "⌚" }
      ],
      tracking: {
        ordered: true,
        processing: true,
        shipped: true,
        delivered: false
      },
      deliveryAddress: "456 Park Avenue, Bangalore, Karnataka - 560001",
      expectedDelivery: "May 15, 2024"
    },
    {
      id: "#ORD-1236",
      date: "May 13, 2024",
      total: 2499,
      status: "Processing",
      items: [
        { name: "Gaming Keyboard RGB", quantity: 1, price: 2499, image: "⌨️" }
      ],
      tracking: {
        ordered: true,
        processing: true,
        shipped: false,
        delivered: false
      },
      deliveryAddress: "789 Lake Road, Delhi - 110001",
      expectedDelivery: "May 18, 2024"
    }
  ];

  const handleReturnRequest = () => {
    if (!returnReason) {
      toast.error("Please select a reason for return");
      return;
    }
    if (!returnDescription.trim()) {
      toast.error("Please provide a description");
      return;
    }

    // Store return request
    const returnRequests = JSON.parse(localStorage.getItem("returnRequests") || "[]");
    const newReturn = {
      orderId: selectedOrder,
      reason: returnReason,
      description: returnDescription,
      status: "Pending",
      requestDate: new Date().toLocaleDateString(),
    };
    returnRequests.push(newReturn);
    localStorage.setItem("returnRequests", JSON.stringify(returnRequests));

    toast.success("Return request submitted successfully! Admin will review your request.");
    setReturnDialogOpen(false);
    setReturnReason("");
    setReturnDescription("");
    setSelectedOrder(null);
  };

  const handleReviewSubmit = () => {
    if (rating === 0) {
      toast.error("Please select a rating");
      return;
    }
    if (!reviewText.trim()) {
      toast.error("Please write a review");
      return;
    }

    // Store review
    const reviews = JSON.parse(localStorage.getItem("productReviews") || "[]");
    const newReview = {
      orderId: selectedOrder,
      rating,
      review: reviewText,
      date: new Date().toLocaleDateString(),
      userEmail: localStorage.getItem("userEmail") || "Anonymous",
    };
    reviews.push(newReview);
    localStorage.setItem("productReviews", JSON.stringify(reviews));

    toast.success("Thank you for your review!");
    setReviewDialogOpen(false);
    setRating(0);
    setReviewText("");
    setSelectedOrder(null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Delivered":
        return "default";
      case "Shipped":
        return "secondary";
      case "Processing":
        return "outline";
      default:
        return "outline";
    }
  };

  const trackingSteps = [
    { icon: Package, label: "Ordered", key: "ordered" },
    { icon: Clock, label: "Processing", key: "processing" },
    { icon: Truck, label: "Shipped", key: "shipped" },
    { icon: CheckCircle, label: "Delivered", key: "delivered" }
  ];

  if (orders.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center py-12 px-4">
        <div className="text-center space-y-6 animate-fade-in">
          <div className="text-8xl">📦</div>
          <h2 className="text-3xl font-bold">No Orders Yet</h2>
          <p className="text-muted-foreground">Start shopping to see your orders here!</p>
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
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">My Orders</h1>
          <p className="text-muted-foreground">Track and manage your orders</p>
        </div>

        <div className="space-y-6">
          {orders.map((order, index) => (
            <Card key={order.id} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="flex items-center gap-3">
                      {order.id}
                      <Badge variant={getStatusColor(order.status)}>{order.status}</Badge>
                    </CardTitle>
                    <CardDescription className="mt-1">
                      Ordered on {order.date} • Total: ₹{order.total}
                    </CardDescription>
                  </div>
                  <Button variant="outline">View Invoice</Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Order Items */}
                <div className="space-y-4">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-4 p-3 bg-secondary/30 rounded-lg">
                      <div className="w-16 h-16 bg-secondary rounded-lg flex items-center justify-center text-3xl">
                        {item.image}
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold">{item.name}</p>
                        <p className="text-sm text-muted-foreground">Quantity: {item.quantity}</p>
                      </div>
                      <p className="font-bold text-primary">₹{item.price}</p>
                    </div>
                  ))}
                </div>

                {/* Tracking Timeline */}
                <div className="border-t border-border pt-6">
                  <h3 className="font-semibold mb-4">Order Tracking</h3>
                  <div className="relative">
                    <div className="absolute top-6 left-6 right-6 h-0.5 bg-border"></div>
                    <div
                      className="absolute top-6 left-6 h-0.5 bg-primary transition-all duration-500"
                      style={{
                        width: `${(Object.values(order.tracking).filter(Boolean).length - 1) * 33.33}%`
                      }}
                    ></div>
                    <div className="relative flex justify-between">
                      {trackingSteps.map((step, idx) => {
                        const isCompleted = order.tracking[step.key as keyof typeof order.tracking];
                        return (
                          <div key={idx} className="flex flex-col items-center">
                            <div
                              className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                                isCompleted
                                  ? "bg-primary text-primary-foreground"
                                  : "bg-secondary text-muted-foreground"
                              }`}
                            >
                              <step.icon className="h-5 w-5" />
                            </div>
                            <p className="text-xs mt-2 text-center">{step.label}</p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Delivery Info */}
                <div className="border-t border-border pt-6 space-y-3">
                  <div className="flex items-start gap-2">
                    <MapPin className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="text-sm text-muted-foreground">Delivery Address</p>
                      <p className="font-medium">{order.deliveryAddress}</p>
                    </div>
                  </div>
                  {order.expectedDelivery && order.status !== "Delivered" && (
                    <div className="bg-accent/10 border border-accent/20 rounded-lg p-3 text-sm">
                      <p className="text-accent">Expected delivery by {order.expectedDelivery}</p>
                    </div>
                  )}
                </div>

                {/* Return Policy Notice */}
                {order.status === "Delivered" && (
                  <div className="bg-secondary/50 border border-border rounded-lg p-3 text-sm">
                    <p className="font-semibold mb-1">7-Day Return Policy</p>
                    <p className="text-muted-foreground">You can return this item within 7 days of delivery. Items must be unused and in original packaging.</p>
                  </div>
                )}

                {/* Actions */}
                <div className="flex gap-3 pt-4">
                  {order.status === "Delivered" && (
                    <>
                      <Dialog open={returnDialogOpen && selectedOrder === order.id} onOpenChange={(open) => {
                        setReturnDialogOpen(open);
                        if (open) setSelectedOrder(order.id);
                        else {
                          setSelectedOrder(null);
                          setReturnReason("");
                          setReturnDescription("");
                        }
                      }}>
                        <DialogTrigger asChild>
                          <Button variant="outline" className="flex-1">
                            <RotateCcw className="mr-2 h-4 w-4" />
                            Return Item (7 Days)
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[500px]">
                          <DialogHeader>
                            <DialogTitle>Request Return & Refund</DialogTitle>
                            <DialogDescription>
                              Please provide details about why you want to return this item. Our admin will review your request within 24-48 hours.
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4 py-4">
                            <div className="space-y-2">
                              <Label htmlFor="reason">Reason for Return</Label>
                              <Select value={returnReason} onValueChange={setReturnReason}>
                                <SelectTrigger id="reason">
                                  <SelectValue placeholder="Select a reason" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="defective">Defective/Damaged Product</SelectItem>
                                  <SelectItem value="wrong_item">Wrong Item Delivered</SelectItem>
                                  <SelectItem value="not_as_described">Not as Described</SelectItem>
                                  <SelectItem value="quality">Quality Issues</SelectItem>
                                  <SelectItem value="changed_mind">Changed Mind</SelectItem>
                                  <SelectItem value="other">Other</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="description">Description</Label>
                              <Textarea
                                id="description"
                                placeholder="Please provide details about your return request..."
                                value={returnDescription}
                                onChange={(e) => setReturnDescription(e.target.value)}
                                rows={4}
                              />
                            </div>
                            <div className="bg-secondary/50 border border-border rounded-lg p-3 text-sm">
                              <p className="font-semibold mb-1">Return Policy</p>
                              <ul className="text-muted-foreground space-y-1 list-disc list-inside">
                                <li>Items must be unused and in original packaging</li>
                                <li>Return within 7 days of delivery</li>
                                <li>Refund will be processed within 5-7 business days after approval</li>
                              </ul>
                            </div>
                          </div>
                          <DialogFooter>
                            <Button variant="outline" onClick={() => setReturnDialogOpen(false)}>
                              Cancel
                            </Button>
                            <Button onClick={handleReturnRequest} className="gradient-primary">
                              Submit Return Request
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                      <Dialog open={reviewDialogOpen && selectedOrder === order.id} onOpenChange={(open) => {
                        setReviewDialogOpen(open);
                        if (open) setSelectedOrder(order.id);
                        else {
                          setSelectedOrder(null);
                          setRating(0);
                          setReviewText("");
                        }
                      }}>
                        <DialogTrigger asChild>
                          <Button variant="outline" className="flex-1">
                            <Star className="mr-2 h-4 w-4" />
                            Write Review
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[500px]">
                          <DialogHeader>
                            <DialogTitle>Write a Review</DialogTitle>
                            <DialogDescription>
                              Share your experience with this product to help other customers.
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4 py-4">
                            <div className="space-y-2">
                              <Label>Rating</Label>
                              <div className="flex gap-2">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <button
                                    key={star}
                                    type="button"
                                    onClick={() => setRating(star)}
                                    className="transition-all hover:scale-110"
                                  >
                                    <Star
                                      className={`h-8 w-8 ${
                                        star <= rating
                                          ? "fill-yellow-400 text-yellow-400"
                                          : "text-muted-foreground"
                                      }`}
                                    />
                                  </button>
                                ))}
                              </div>
                              {rating > 0 && (
                                <p className="text-sm text-muted-foreground">
                                  You rated: {rating} star{rating > 1 ? 's' : ''}
                                </p>
                              )}
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="review">Your Review</Label>
                              <Textarea
                                id="review"
                                placeholder="Share details about your experience with this product..."
                                value={reviewText}
                                onChange={(e) => setReviewText(e.target.value)}
                                rows={5}
                              />
                            </div>
                            <div className="bg-secondary/50 border border-border rounded-lg p-3 text-sm">
                              <p className="font-semibold mb-1">Review Guidelines</p>
                              <ul className="text-muted-foreground space-y-1 list-disc list-inside">
                                <li>Be honest and specific about your experience</li>
                                <li>Focus on the product's features and performance</li>
                                <li>Your review helps other customers make informed decisions</li>
                              </ul>
                            </div>
                          </div>
                          <DialogFooter>
                            <Button variant="outline" onClick={() => setReviewDialogOpen(false)}>
                              Cancel
                            </Button>
                            <Button onClick={handleReviewSubmit} className="gradient-primary">
                              Submit Review
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </>
                  )}
                  {order.status === "Processing" && (
                    <Button variant="destructive" className="flex-1">
                      Cancel Order
                    </Button>
                  )}
                  <Link to="/support" className="flex-1">
                    <Button variant="outline" className="w-full">
                      Contact Admin
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
