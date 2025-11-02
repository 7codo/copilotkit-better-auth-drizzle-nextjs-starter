"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { signIn, signUp } from "@/lib/auth/auth-client";
import { HOME_PAGE } from "@/lib/constants";
import { log } from "@/lib/utils/log";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "../ui/button";

const loginSchema = z.object({
  email: z.email({ message: "Please enter a valid email address." }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters." }),
});

const signupSchema = z.object({
  name: z.string().min(1, { message: "Name is required." }),
  email: z.email({ message: "Please enter a valid email address." }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters." }),
});

type EmailPasswordFieldsProps = {
  isSignup?: boolean;
};

export function EmailPasswordFields({
  isSignup = false,
}: EmailPasswordFieldsProps) {
  const form = useForm<
    z.infer<typeof loginSchema> | z.infer<typeof signupSchema>
  >({
    resolver: zodResolver(isSignup ? signupSchema : loginSchema),
    defaultValues: isSignup
      ? { name: "", email: "", password: "" }
      : { email: "", password: "" },
  });

  async function onSubmit(
    values: z.infer<typeof loginSchema> | z.infer<typeof signupSchema>
  ) {
    try {
      if (isSignup) {
        const { name, email, password } = values as z.infer<
          typeof signupSchema
        >;
        const { error } = await signUp.email({
          name,
          email,
          password,
          callbackURL: HOME_PAGE,
        });
        if (error) {
          toast.error(error.message || "Signup failed");
        } else {
          toast.success(
            "Signup successful! Please check your email for verification."
          );
        }
      } else {
        const { email, password } = values as z.infer<typeof loginSchema>;
        const { error } = await signIn.email({
          email,
          password,
          rememberMe: true,
          callbackURL: HOME_PAGE,
        });
        if (error) {
          toast.error(error.message || "Login failed");
        }
      }
    } catch (e) {
      toast.error("An unexpected error occurred");
      log.error(e instanceof Error ? e.message : String(e), {
        stack: e instanceof Error ? e.stack : undefined,
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {isSignup && (
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="name">Name</FormLabel>
                <FormControl>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Your Name"
                    autoComplete="name"
                    required
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="email">Email</FormLabel>
              <FormControl>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  autoComplete="email"
                  required
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center">
                <FormLabel htmlFor="password">Password</FormLabel>
                {!isSignup && (
                  <a
                    href="#"
                    className="ml-auto text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                )}
              </div>
              <FormControl>
                <Input
                  id="password"
                  type="password"
                  autoComplete={isSignup ? "new-password" : "current-password"}
                  required
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          {isSignup ? "Sign Up" : "Login"}
        </Button>
      </form>
    </Form>
  );
}
