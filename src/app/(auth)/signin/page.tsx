"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {signIn} from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import { z } from 'zod'

// Zod schema
const schema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export default function page() {
    const router=useRouter()
    const [formData, setFormData] = useState({
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
        setErrors({ ...errors, [e.target.id]: "" }); 
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
          const response = await signIn("credentials",{
            email: formData.email,
            password: formData.password,
            redirect: false
          })
          console.log("Login Success", response);
          if(response?.ok){
          toast.success("Login successfully!");
            router.push('/home')
            }
        } catch (error: any) {
          console.log("Error while sign in user", error);
          toast.error(
            error.response?.data?.message || "Something went wrong"
          );
        } finally {
          setLoading(false);
        }
      };
  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-xl border-[#f5deb3] shadow-sm bg-[#0c1117] text-[#f5deb3]">
    <h2 className="text-2xl font-semibold mb-4">
        SIGN IN
    </h2>

    <form onSubmit={handleSubmit} className="space-y-4 ">

      <div>
        <Label htmlFor="email">EMAIL</Label>
        <Input
          id="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="johndoe@example.com"
          className={`mt-1 border-[#f5deb3] ${errors.email ? "border-red-500" : ""}`}
        />
        {errors.email && (
          <p className="text-sm text-red-500 mt-1">{errors.email}</p>
        )}
      </div>

      <div>
        <Label htmlFor="password">PASSWORD</Label>
        <Input
          id="password"
          value={formData.password}
          onChange={handleChange}
          type="password"
          placeholder="******"
          className={`mt-1 border-[#f5deb3] ${errors.password ? "border-red-500" : ""}`}
        />
        {errors.password && (
          <p className="text-sm text-red-500 mt-1">{errors.password}</p>
        )}
      </div>

      <Button
        type="submit"
        className="mt-6 w-full border border-[#f5deb3] text-[#f5deb3] hover:bg-[#f5deb3] hover:text-[#0c1117] transition cursor-pointer"
        disabled={loading}
      >
        {loading ? "Loading..." : "SIGN IN"}
      </Button>
      <div className='flex justify-center'><p>Create Your Account <Link className='text-blue-500 hover:underline' href="/signup">Click Here</Link></p></div>
    </form>

    <ToastContainer 
    position="top-right"
    autoClose={5000}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick={false}
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
    theme="dark"
    />
  </div>
  )
}
