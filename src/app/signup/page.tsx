"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { z } from "zod";
import "react-toastify/dist/ReactToastify.css";

// Zod schema
const schema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export default function Page() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<any>({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
    setErrors({ ...errors, [e.target.id]: "" }); // Clear error on change
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      schema.parse(formData);
      setErrors({});
    } catch (err: any) {
      const fieldErrors: any = {};
      err.errors.forEach((error: any) => {
        fieldErrors[error.path[0]] = error.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post("/api/signup", formData);
      console.log("Signup Success", response);
      toast.success("Account created successfully!");
    } catch (error: any) {
      console.log("Error while sign up user", error);
      toast.error(
        error.response?.data?.message || "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-xl shadow-sm bg-[#171717]">
      <h2 className="text-2xl font-semibold text-white mb-4">
        Create Account
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4 text-white">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            placeholder="John Doe"
            className={`mt-1 ${errors.name ? "border-red-500" : ""}`}
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && (
            <p className="text-sm text-red-500 mt-1">{errors.name}</p>
          )}
        </div>

        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="johndoe@example.com"
            className={`mt-1 ${errors.email ? "border-red-500" : ""}`}
          />
          {errors.email && (
            <p className="text-sm text-red-500 mt-1">{errors.email}</p>
          )}
        </div>

        <div>
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            value={formData.password}
            onChange={handleChange}
            type="password"
            placeholder="******"
            className={`mt-1 ${errors.password ? "border-red-500" : ""}`}
          />
          {errors.password && (
            <p className="text-sm text-red-500 mt-1">{errors.password}</p>
          )}
        </div>

        <Button
          type="submit"
          className="w-full bg-white text-black hover:text-white"
          disabled={loading}
        >
          {loading ? "Creating Account..." : "Sign Up"}
        </Button>
      </form>

      <ToastContainer />
    </div>
  );
}
