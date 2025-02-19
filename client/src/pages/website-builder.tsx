import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { insertWebsiteSchema, InsertWebsite } from "@shared/schema"; // Assuming InsertWebsite type is exported here
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
  { id: "modern", name: "Modern Business" },
  { id: "ecommerce", name: "E-Commerce" },
  { id: "portfolio", name: "Portfolio" },
  { id: "blog", name: "Blog" },
];

const colorSchemes = [
  { id: "blue", colors: ["#1E40AF", "#60A5FA", "#EFF6FF"] },
  { id: "green", colors: ["#065F46", "#34D399", "#ECFDF5"] },
  { id: "purple", colors: ["#5B21B6", "#A78BFA", "#F5F3FF"] },
];

export default function WebsiteBuilder() {
  const [step, setStep] = useState(1);
  const { toast } = useToast();
  const form = useForm<InsertWebsite>({ // Type added here
    resolver: zodResolver(insertWebsiteSchema),
    defaultValues: {
      name: "",
      template: "",
      settings: {
        colors: [],
        fonts: ["Inter"],
      },
      userId: 0, // Added userId
    },
  });

  const createWebsiteMutation = useMutation({
    mutationFn: async (data) => {
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

  const onSubmit = (data) => {
    createWebsiteMutation.mutate(data);
  };

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
                {[1, 2, 3].map((s) => (
                  <div
                    key={s}
                    className={`flex items-center ${
                      s < 3 ? "flex-1" : ""
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
                    {s < 3 && (
                      <div
                        className={`flex-1 h-1 mx-2 ${
                          step > s ? "bg-primary" : "bg-muted"
                        }`}
                      />
                    )}
                  </div>
                ))}
              </div>
              <div className="flex justify-between mt-2">
                <span className="text-sm">Basic Info</span>
                <span className="text-sm">Styling</span>
                <span className="text-sm">Preview</span>
              </div>
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {step === 1 && (
                  <Card>
                    <CardContent className="p-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem className="mb-4">
                            <FormLabel>Website Name</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="template"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Template</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              value={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select a template" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {templates.map((template) => (
                                  <SelectItem
                                    key={template.id}
                                    value={template.id}
                                  >
                                    {template.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </CardContent>
                  </Card>
                )}

                {step === 2 && (
                  <Card>
                    <CardContent className="p-6">
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-lg font-medium mb-4">
                            Color Scheme
                          </h3>
                          <div className="grid grid-cols-3 gap-4">
                            {colorSchemes.map((scheme) => (
                              <button
                                key={scheme.id}
                                type="button"
                                className="p-4 border rounded-lg hover:border-primary focus:outline-none focus:ring-2 focus:ring-primary"
                                onClick={() => {
                                  const currentSettings = form.getValues('settings') || {};
                                  form.setValue('settings', {
                                    ...currentSettings,
                                    colors: scheme.colors
                                  });
                                }} //Updated onClick handler
                              >
                                <div className="flex gap-2">
                                  {scheme.colors.map((color) => (
                                    <div
                                      key={color}
                                      className="w-8 h-8 rounded"
                                      style={{ backgroundColor: color }}
                                    />
                                  ))}
                                </div>
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {step === 3 && (
                  <Card>
                    <CardContent className="p-6">
                      <div className="aspect-video bg-muted rounded-lg flex items-center justify-center mb-6">
                        <p className="text-muted-foreground">
                          Website Preview (Mockup)
                        </p>
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
                  {step < 3 ? (
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