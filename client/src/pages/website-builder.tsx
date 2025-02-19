import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { insertWebsiteSchema, InsertWebsite } from "@shared/schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { apiRequest, queryClient } from "@/lib/queryClient";
import Sidebar from "@/components/layout/sidebar";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

const templates = [
  { 
    id: "professional",
    name: "Professional Business",
    description: "Clean and modern design perfect for service-based businesses",
    sections: ["About", "Services", "Team", "Contact"]
  },
  { 
    id: "retail",
    name: "Retail & Products",
    description: "Showcase your products with beautiful galleries and easy navigation",
    sections: ["Products", "About", "Locations", "Contact"]
  },
  { 
    id: "service",
    name: "Service Provider",
    description: "Highlight your expertise and services with testimonials",
    sections: ["Services", "Portfolio", "Testimonials", "Contact"]
  },
  { 
    id: "restaurant",
    name: "Restaurant & Café",
    description: "Perfect for menus, locations, and online ordering",
    sections: ["Menu", "About", "Locations", "Contact"]
  }
];

const colorSchemes = [
  { 
    id: "professional",
    name: "Professional",
    colors: ["#1E40AF", "#60A5FA", "#EFF6FF"],
    description: "Clean and trustworthy"
  },
  { 
    id: "modern",
    name: "Modern",
    colors: ["#065F46", "#34D399", "#ECFDF5"],
    description: "Fresh and innovative"
  },
  { 
    id: "elegant",
    name: "Elegant",
    colors: ["#5B21B6", "#A78BFA", "#F5F3FF"],
    description: "Sophisticated and premium"
  }
];

export default function WebsiteBuilder() {
  const [step, setStep] = useState(1);
  const { toast } = useToast();
  const form = useForm<InsertWebsite>({
    resolver: zodResolver(insertWebsiteSchema),
    defaultValues: {
      name: "",
      template: "",
      settings: {
        colors: [],
        fonts: ["Inter"],
        logo: "",
        businessInfo: {
          company: "",
          tagline: "",
          description: "",
          email: "",
          phone: "",
          facebook: "",
          instagram: ""
        }
      },
      userId: 0,
    },
  });

  const createWebsiteMutation = useMutation({
    mutationFn: async (data: InsertWebsite) => {
      const res = await apiRequest("POST", "/api/websites", data);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/websites"] });
      toast({
        title: "Website Created",
        description: "Your new website has been created successfully.",
      });
    },
  });

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-y-auto">
        <main className="flex-1 p-6">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Website Builder</h1>
            <p className="text-muted-foreground">
              Create your professional website in minutes with AI assistance.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="mb-8">
              <div className="flex justify-between items-center">
                {[1, 2, 3, 4].map((s) => (
                  <div
                    key={s}
                    className={`flex items-center ${
                      s < 4 ? "flex-1" : ""
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        step >= s
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {s}
                    </div>
                    {s < 4 && (
                      <div
                        className={`flex-1 h-1 mx-2 ${
                          step > s ? "bg-primary" : "bg-muted"
                        }`}
                      />
                    )}
                  </div>
                ))}
              </div>
              <div className="flex justify-between mt-2 text-sm">
                <span>Template</span>
                <span>Business Info</span>
                <span>Design</span>
                <span>Preview</span>
              </div>
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit((data) => createWebsiteMutation.mutate(data))} className="space-y-6">
                {step === 1 && (
                  <div className="space-y-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Website Name</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="My Business Website" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-2 gap-4">
                      {templates.map((template) => (
                        <Card
                          key={template.id}
                          className={`cursor-pointer transition-all ${
                            form.watch("template") === template.id
                              ? "border-primary"
                              : ""
                          }`}
                          onClick={() => form.setValue("template", template.id)}
                        >
                          <CardContent className="p-4">
                            <h3 className="font-semibold mb-2">{template.name}</h3>
                            <p className="text-sm text-muted-foreground mb-4">
                              {template.description}
                            </p>
                            <div className="text-sm text-muted-foreground">
                              <strong>Includes:</strong>
                              <div className="flex flex-wrap gap-2 mt-2">
                                {template.sections.map((section) => (
                                  <span
                                    key={section}
                                    className="bg-muted px-2 py-1 rounded-md text-xs"
                                  >
                                    {section}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <Card>
                    <CardContent className="p-6 space-y-6">
                      <FormField
                        control={form.control}
                        name="settings.businessInfo.company"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Company Name</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="Your Company Name" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="settings.businessInfo.tagline"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Tagline</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="Your business tagline" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="settings.businessInfo.description"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Business Description</FormLabel>
                            <FormControl>
                              <Textarea {...field} placeholder="Tell us about your business..." />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="settings.businessInfo.email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Business Email</FormLabel>
                              <FormControl>
                                <Input {...field} type="email" placeholder="contact@yourbusiness.com" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="settings.businessInfo.phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Phone Number</FormLabel>
                              <FormControl>
                                <Input {...field} placeholder="+1 (555) 123-4567" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="settings.businessInfo.facebook"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Facebook URL</FormLabel>
                              <FormControl>
                                <Input {...field} placeholder="facebook.com/yourbusiness" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="settings.businessInfo.instagram"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Instagram Handle</FormLabel>
                              <FormControl>
                                <Input {...field} placeholder="@yourbusiness" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </CardContent>
                  </Card>
                )}

                {step === 3 && (
                  <Card>
                    <CardContent className="p-6 space-y-6">
                      <div>
                        <h3 className="text-lg font-medium mb-4">Color Scheme</h3>
                        <div className="grid grid-cols-3 gap-4">
                          {colorSchemes.map((scheme) => (
                            <button
                              key={scheme.id}
                              type="button"
                              className={`p-4 border rounded-lg hover:border-primary focus:outline-none focus:ring-2 focus:ring-primary ${
                                form.watch("settings.colors")?.[0] === scheme.colors[0]
                                  ? "border-primary"
                                  : ""
                              }`}
                              onClick={() => {
                                form.setValue("settings", {
                                  ...form.getValues("settings"),
                                  colors: scheme.colors,
                                });
                              }}
                            >
                              <div className="space-y-2">
                                <div className="flex gap-2">
                                  {scheme.colors.map((color) => (
                                    <div
                                      key={color}
                                      className="w-8 h-8 rounded"
                                      style={{ backgroundColor: color }}
                                    />
                                  ))}
                                </div>
                                <div className="text-sm font-medium">{scheme.name}</div>
                                <div className="text-xs text-muted-foreground">
                                  {scheme.description}
                                </div>
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>

                      <FormField
                        control={form.control}
                        name="settings.logo"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Logo URL (Optional)</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="https://yourbusiness.com/logo.png" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </CardContent>
                  </Card>
                )}

                {step === 4 && (
                  <Card>
                    <CardContent className="p-6">
                      <div className="aspect-video bg-muted rounded-lg flex items-center justify-center mb-6 p-4">
                        <div className="max-w-2xl w-full">
                          <div 
                            className="h-16 mb-8 rounded"
                            style={{ 
                              backgroundColor: form.watch("settings.colors")?.[0] || '#1E40AF',
                              color: '#ffffff'
                            }}
                          >
                            <div className="container mx-auto h-full flex items-center justify-between px-4">
                              <div className="font-bold">
                                {form.watch("settings.businessInfo.company") || "Your Company"}
                              </div>
                              <div className="flex gap-4 text-sm">
                                {templates
                                  .find(t => t.id === form.watch("template"))
                                  ?.sections.map(section => (
                                    <div key={section} className="cursor-pointer hover:opacity-80">
                                      {section}
                                    </div>
                                  ))
                                }
                              </div>
                            </div>
                          </div>

                          <div className="text-center py-12 space-y-4">
                            <h1 className="text-3xl font-bold">
                              {form.watch("settings.businessInfo.tagline") || "Your Business Tagline"}
                            </h1>
                            <p className="text-muted-foreground max-w-lg mx-auto">
                              {form.watch("settings.businessInfo.description") || 
                               "Your business description will appear here, highlighting your unique value proposition and services."}
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                <div className="flex justify-between">
                  {step > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setStep(step - 1)}
                    >
                      Previous
                    </Button>
                  )}
                  {step < 4 ? (
                    <Button
                      type="button"
                      onClick={() => setStep(step + 1)}
                      className="ml-auto"
                    >
                      Next
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      className="ml-auto"
                      disabled={createWebsiteMutation.isPending}
                    >
                      {createWebsiteMutation.isPending && (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      )}
                      Create Website
                    </Button>
                  )}
                </div>
              </form>
            </Form>
          </div>
        </main>
      </div>
    </div>
  );
}