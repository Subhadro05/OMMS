import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { MessageCircle, Mail, Phone, HelpCircle } from "lucide-react";
import { toast } from "sonner";

export default function Support() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Support ticket submitted! We'll get back to you soon.");
  };

  const faqs = [
    {
      question: "How do I track my order?",
      answer: "You can track your order by going to 'My Orders' section in your account dashboard. Click on any order to view real-time tracking information."
    },
    {
      question: "What is your return policy?",
      answer: "We offer a 7-day return policy from the date of delivery. Items must be unused and in original packaging. The admin will review and approve return requests. Refunds are processed within 5-7 business days after approval."
    },
    {
      question: "How long does delivery take?",
      answer: "Standard delivery takes 5-7 business days. Express delivery (2-3 days) is available for orders above ₹5000. Delivery times may vary based on your location."
    },
    {
      question: "Are payments secure?",
      answer: "Yes, we use industry-standard encryption and secure payment gateways. We support multiple payment methods including cards, UPI, and wallets."
    },
    {
      question: "How do I become a vendor?",
      answer: "Click on 'Become a Vendor' in the navigation menu and fill out the application form. Our team will review your application within 2-3 business days."
    },
    {
      question: "Can I cancel my order?",
      answer: "Yes, you can cancel orders before they are shipped. Once shipped, you'll need to use our return process. Visit 'My Orders' to cancel."
    }
  ];

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Help & Support</h1>
          <p className="text-muted-foreground">We're here to help with any questions or concerns</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12 max-w-3xl mx-auto">
          <Card className="text-center hover:shadow-glow transition-shadow animate-fade-in">
            <CardHeader>
              <Mail className="h-12 w-12 text-primary mx-auto mb-4" />
              <CardTitle>Email Support</CardTitle>
              <CardDescription>admin@mallazone.com</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="border-primary text-primary" asChild>
                <a href="mailto:admin@mallazone.com">Send Email</a>
              </Button>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-glow transition-shadow animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <CardHeader>
              <Phone className="h-12 w-12 text-primary mx-auto mb-4" />
              <CardTitle>Phone Support</CardTitle>
              <CardDescription>+91 1800-123-4567</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="border-primary text-primary" asChild>
                <a href="tel:+911800123456 7">Call Now</a>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* FAQ Section */}
        <Card className="mb-12 animate-fade-in">
          <CardHeader>
            <div className="flex items-center gap-2">
              <HelpCircle className="h-6 w-6 text-primary" />
              <CardTitle>Frequently Asked Questions</CardTitle>
            </div>
            <CardDescription>Find quick answers to common questions</CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>

        {/* Contact Form */}
        <Card className="animate-fade-in">
          <CardHeader>
            <CardTitle>Submit a Support Ticket</CardTitle>
            <CardDescription>Can't find what you're looking for? Send us a message</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" placeholder="John Doe" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="john@example.com" required />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input id="subject" placeholder="How can we help?" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  placeholder="Describe your issue in detail..."
                  rows={6}
                  required
                />
              </div>

              <Button type="submit" className="gradient-primary hover:opacity-90">
                Submit Ticket
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
