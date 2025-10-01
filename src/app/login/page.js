"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const formSchema = z.object({
  email: z
    .string()
    .email("Please enter a valid email address")
    .min(1, "Email is required"),
  password: z.string().min(1, "Password is required"),
});

export default function SignIn() {
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(data) {
    console.log(data);
    // Handle form submission
    router.push("/dashboard");
  }

  return (
    <div className="min-h-screen bg-black/95 flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <Card className="border-none bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden relative shadow-2xl shadow-black/50 drop-shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-black/20 pointer-events-none shadow-inner" />
          <div className="absolute inset-0 rounded-3xl shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)] pointer-events-none" />
          <div className="relative z-10">
            <CardHeader className="space-y-1 text-center pb-8">
              <CardTitle className="text-3xl font-light text-white">
                Welcome back
              </CardTitle>
              <CardDescription className="text-gray-400">
                Sign in to your account
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full bg-white/5 hover:bg-white/10 text-white hover:text-white/80 border-white/10 hover:border-white/20 rounded-xl h-12 font-medium backdrop-blur-sm transition-all duration-200 shadow-lg shadow-black/20 hover:shadow-xl hover:shadow-black/30"
                  onClick={() => console.log("Sign in with Google")}
                >
                  {/* Google Icon */}
                  Continue with Google
                </Button>
                <Button
                  variant="outline"
                  className="w-full bg-white/5 hover:bg-white/10 text-white hover:text-white/80 border-white/10 hover:border-white/20 rounded-xl h-12 font-medium backdrop-blur-sm transition-all duration-200 shadow-lg shadow-black/20 hover:shadow-xl hover:shadow-black/30"
                  onClick={() => console.log("Sign in with GitHub")}
                >
                  {/* GitHub Icon */}
                  Continue with GitHub
                </Button>
              </div>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-white/10" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-black px-2 text-gray-400">
                    Or continue with
                  </span>
                </div>
              </div>

              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-300 text-sm font-medium">
                          Email
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="you@example.com"
                            {...field}
                            className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 rounded-xl h-12 focus:border-white/20 focus:ring-white/20"
                          />
                        </FormControl>
                        <FormMessage className="text-red-400" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex items-center justify-between">
                          <FormLabel className="text-gray-300 text-sm font-medium">
                            Password
                          </FormLabel>
                          <Link
                            href="/forgot-password"
                            className="text-sm text-white/70 hover:text-white transition-colors"
                          >
                            Forgot Password?
                          </Link>
                        </div>
                        <FormControl>
                          <Input
                            type="password"
                            {...field}
                            className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 rounded-xl h-12 focus:border-white/20 focus:ring-white/20"
                          />
                        </FormControl>
                        <FormMessage className="text-red-400" />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="submit"
                    className="w-full bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-xl h-12 font-medium backdrop-blur-sm transition-all duration-200 shadow-lg shadow-black/25 hover:shadow-xl hover:shadow-black/40"
                  >
                    Sign In
                  </Button>
                </form>
              </Form>

              <div className="text-center text-sm">
                <span className="text-gray-400">
                  {"Don't have an account? "}
                </span>
                <Link
                  href="/signup"
                  className="text-white font-medium hover:text-white/80 transition-colors"
                >
                  Sign Up Now
                </Link>
              </div>
            </CardContent>
          </div>
        </Card>
      </div>
    </div>
  );
}
