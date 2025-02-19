import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import Navbar from "@/components/layout/navbar";
import { ArrowRight, BarChart3, Brain, Target, Users } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main>
        {/* Hero Section */}
        <section className="relative py-24 px-4 overflow-hidden">
          <div className="container mx-auto max-w-6xl">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-5xl font-bold leading-tight mb-6">
                  With AI-SME Hub, you <span className="text-primary">can</span> have it all
                </h1>
                <p className="text-xl text-muted-foreground mb-8 max-w-2xl">
                  Unify your growing business on one AI-powered platform that's easy to use, delivers ROI in no time, and transforms customer happiness into your competitive edge.
                </p>
                <div className="flex gap-4">
                  <Button size="lg" asChild>
                    <Link href="/auth">Get Started Free</Link>
                  </Button>
                  <Button size="lg" variant="outline">
                    Get a Demo
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground mt-4">
                  Get a demo of our premium software, or get started with free tools.
                </p>
              </div>
              <div className="relative">
                <div className="bg-gradient-to-tr from-primary/20 to-primary/5 rounded-2xl p-8">
                  <div className="bg-card rounded-lg shadow-lg p-6">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <Brain className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold">AI-Powered Insights</h3>
                        <p className="text-sm text-muted-foreground">Real-time business analytics</p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="h-2 bg-primary/10 rounded-full w-3/4" />
                      <div className="h-2 bg-primary/10 rounded-full w-1/2" />
                      <div className="h-2 bg-primary/10 rounded-full w-5/6" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-20 bg-slate-50">
          <div className="container mx-auto max-w-6xl px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Everything you need to grow your business</h2>
              <p className="text-lg text-muted-foreground">
                Powerful tools and insights, all in one platform
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: Brain,
                  title: "AI-Powered Automation",
                  description: "Automate repetitive tasks and get AI-generated insights for better decision making."
                },
                {
                  icon: Target,
                  title: "Marketing Suite",
                  description: "Create, manage, and optimize your marketing campaigns with ease."
                },
                {
                  icon: BarChart3,
                  title: "Analytics Dashboard",
                  description: "Get real-time insights into your business performance and customer behavior."
                }
              ].map((feature, index) => (
                <div key={index} className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                  <feature.icon className="h-12 w-12 text-primary mb-4" />
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Social Proof */}
        <section className="py-20">
          <div className="container mx-auto max-w-6xl px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Trusted by Growing Businesses</h2>
              <p className="text-lg text-muted-foreground">
                Join thousands of SMEs using AI-SME Hub to scale their operations
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white p-6 rounded-lg shadow-sm">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Users className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold">Tech Company {i}</p>
                      <p className="text-sm text-muted-foreground">Technology</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground">
                    "AI-SME Hub has transformed how we manage our business operations. The AI-powered insights have been game-changing for our growth."
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-primary text-primary-foreground">
          <div className="container mx-auto max-w-6xl px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to grow your business?</h2>
            <p className="text-xl mb-8 opacity-90">
              Get started with AI-SME Hub today and transform your business operations.
            </p>
            <Button size="lg" variant="secondary" className="gap-2" asChild>
              <Link href="/auth">
                Get Started Now <ArrowRight className="h-5 w-5" />
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
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2">
                <li><Link href="/features">Features</Link></li>
                <li><Link href="/pricing">Pricing</Link></li>
                <li><Link href="/resources">Resources</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li><Link href="/about">About Us</Link></li>
                <li><Link href="/careers">Careers</Link></li>
                <li><Link href="/contact">Contact</Link></li>
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