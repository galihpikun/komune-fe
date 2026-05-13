"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { API_URL } from "@/lib/api";

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  function resetForm() {
    setFormData({
      username: "",
      email: "",
      password: "",
    });
  }

  function handleInputChanges({
    name,
    value,
  }: {
    name: string;
    value: string;
  }) {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  async function handleSubmit() {
    if (!formData.username || !formData.email || !formData.password) {
      toast.error("Please Fill in All The FIelds", {
        position: "top-center",
      });
      return;
    }
    try {
      const response = await fetch(`${API_URL}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message, {
          position: "top-center",
        });
        return;
      }

      toast.success("Berhasil Register Akun, silahkan Login!", {
        position: "top-center",
      });
      resetForm();
      router.push("/login");
    } catch (error) {
      toast.error("Failed to add Create an Account, Please try again!", {
        position: "top-center",
      });
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
  <Card className="overflow-hidden p-0 bg-[#1E293B] border border-gray-700">
    <CardContent className="grid p-0 md:grid-cols-2">
      <form
        className="p-6 md:p-8 text-white"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <FieldGroup>
          <div className="flex flex-col items-center gap-2 text-center">
            <h1 className="text-2xl font-bold text-white">
              Create your account
            </h1>

            <p className="text-sm text-balance text-gray-400">
              Enter your email below to create your{" "}
              <Link
                href="/"
                className="text-blue-500 hover:text-blue-400 hover:underline"
              >
                Komune
              </Link>{" "}
              account
            </p>
          </div>

          <Field>
            <FieldLabel htmlFor="email" className="text-gray-300">
              Username
            </FieldLabel>

            <Input
              name="username"
              type="text"
              placeholder="Your Username"
              required
              className="bg-[#0F172A] border-gray-700 text-white placeholder:text-gray-500"
              onChange={(e) => {
                handleInputChanges(e.target);
              }}
              value={formData.username}
            />
          </Field>

          <Field>
            <FieldLabel htmlFor="email" className="text-gray-300">
              Email
            </FieldLabel>

            <Input
              name="email"
              type="email"
              placeholder="m@example.com"
              required
              className="bg-[#0F172A] border-gray-700 text-white placeholder:text-gray-500"
              onChange={(e) => {
                handleInputChanges(e.target);
              }}
              value={formData.email}
            />

            <FieldDescription className="text-gray-400">
              We&apos;ll use this to contact you. We will not share your
              email with anyone else.
            </FieldDescription>
          </Field>

          <Field>
            <Field>
              <FieldLabel htmlFor="password" className="text-gray-300">
                Password
              </FieldLabel>

              <Input
                name="password"
                type="password"
                required
                className="bg-[#0F172A] border-gray-700 text-white placeholder:text-gray-500"
                onChange={(e) => {
                  handleInputChanges(e.target);
                }}
                value={formData.password}
              />
            </Field>

            <FieldDescription className="text-gray-400">
              Must be at least 8 characters long.
            </FieldDescription>
          </Field>

          <Field>
            <Button type="submit">
              Create Account
            </Button>
          </Field>

          <FieldDescription className="text-center text-gray-400">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-blue-500 hover:text-blue-400"
            >
              Sign in
            </Link>
          </FieldDescription>
        </FieldGroup>
      </form>

      <div className="relative hidden bg-muted md:block">
        <img
          src="/images/sign/online-commune.jpg"
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>
    </CardContent>
  </Card>

  <FieldDescription className="px-6 text-center text-gray-500">
    By clicking continue, you agree to our{" "}
    <a href="#" className="hover:text-white">
      Terms of Service
    </a>{" "}
    and{" "}
    <a href="#" className="hover:text-white">
      Privacy Policy
    </a>
    .
  </FieldDescription>
</div>
  );
}
