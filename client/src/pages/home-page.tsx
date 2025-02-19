import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import Navbar from "@/components/layout/navbar";
import { ArrowRight, BarChart3, Laptop, Mail } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main>
        {/* Hero Section */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center">
              <h1 className="text-5xl font-bold leading-tight mb-6">
                Empower Your SME with AI-Driven Growth
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Build your online presence, automate marketing, and get insights—all in one platform.
              </p>
              <div className="flex gap-4 justify-center">
                <Button size="lg" asChild>
                  <Link href="/auth">Get Started Free</Link>
                </Button>
                <Button size="lg" variant="outline">
                  Schedule a Demo
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-slate-50">
          <div className="container mx-auto max-w-6xl px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <Laptop className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">AI Website Builder</h3>
                <p className="text-muted-foreground">
                  Create professional websites in minutes with AI-powered templates and content suggestions.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <Mail className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">Marketing Automation</h3>
                <p className="text-muted-foreground">
                  Automate your social media, email campaigns, and ad generation with AI assistance.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <BarChart3 className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">Analytics & Insights</h3>
                <p className="text-muted-foreground">
                  Track performance and get AI-powered recommendations to improve your results.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20">
          <div className="container mx-auto max-w-6xl px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Success Stories</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <blockquote key={i} className="p-6 border rounded-lg">
                  <p className="text-muted-foreground mb-4">
                    "AI-SME Hub has transformed how we manage our online presence. The AI suggestions are incredibly helpful!"
                  </p>
                  <footer>
                    <p className="font-semibold">Sarah Johnson</p>
                    <p className="text-sm text-muted-foreground">CEO, TechStart</p>
                  </footer>
                </blockquote>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-primary text-white">
          <div className="container mx-auto max-w-6xl px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to grow your business?</h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of SMEs using AI-SME Hub to scale their online presence.
            </p>
            <Button size="lg" variant="secondary" asChild>
              <Link href="/auth">
                Get Started Now <ArrowRight className="ml-2" />
              </Link>
            </Button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-12 bg-slate-900 text-white mt-auto">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li><Link href="/about">About Us</Link></li>
                <li><Link href="/contact">Contact</Link></li>
                <li><Link href="/careers">Careers</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2">
                <li><Link href="/features">Features</Link></li>
                <li><Link href="/pricing">Pricing</Link></li>
                <li><Link href="/roadmap">Roadmap</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><Link href="/blog">Blog</Link></li>
                <li><Link href="/guides">Guides</Link></li>
                <li><Link href="/help">Help Center</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><Link href="/privacy">Privacy Policy</Link></li>
                <li><Link href="/terms">Terms of Service</Link></li>
                <li><Link href="/security">Security</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-slate-800 text-center text-sm text-slate-400">
            &copy; {new Date().getFullYear()} AI-SME Hub. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
