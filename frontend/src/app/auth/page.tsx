"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Shield, Loader2, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useLogin, useRegister } from "@/hooks/useAuth";

const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password too short"),
});

const registerSchema = z.object({
  name: z.string().min(2, "Name required"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password too short"),
  confirmPassword: z.string(),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"]
});

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  
  const loginMutation = useLogin();
  const registerMutation = useRegister();

  const { register: registerLogin, handleSubmit: handleLoginSubmit, formState: { errors: loginErrors } } = useForm({
    resolver: zodResolver(loginSchema)
  });

  const { register: registerSignup, handleSubmit: handleSignupSubmit, formState: { errors: signupErrors } } = useForm({
    resolver: zodResolver(registerSchema)
  });

  const onSubmitLogin = (data: any) => {
    loginMutation.mutate(data, {
      onSuccess: () => {
        toast.success("Welcome back!");
        router.push("/dashboard");
      },
      onError: () => toast.error("Failed to login")
    });
  };

  const onSubmitSignup = (data: any) => {
    registerMutation.mutate(data, {
      onSuccess: () => {
        toast.success("Account created successfully!");
        router.push("/dashboard");
      },
      onError: () => toast.error("Failed to register")
    });
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background noise/gradient fake */}
      <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, #333 0%, #000 100%)' }} />
      
      <div className="w-full max-w-md bg-surface-50 border border-border rounded-card p-8 relative z-10 shadow-2xl">
        <div className="flex flex-col items-center mb-8">
          <Link href="/" className="flex items-center gap-2 mb-2">
            <Shield className="w-10 h-10 text-white" />
          </Link>
          <h2 className="text-2xl font-bold tracking-tight">{isLogin ? 'Sign in to TruthLens' : 'Create an account'}</h2>
          <p className="text-muted text-sm mt-2">{isLogin ? 'Enter your details below to login.' : 'Fill out the form to get started.'}</p>
        </div>

        {isLogin ? (
          <form onSubmit={handleLoginSubmit(onSubmitLogin)} className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-1 block">Email</label>
              <input 
                {...registerLogin("email")}
                className="w-full bg-surface-100 border border-border rounded-btn px-4 py-2 focus:outline-none focus:border-white transition-colors"
                placeholder="name@example.com"
              />
              {loginErrors.email && <span className="text-xs text-rose-500 mt-1 block">{loginErrors.email.message as string}</span>}
            </div>
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-sm font-medium">Password</label>
                <a href="#" className="text-xs text-muted hover:text-white transition-colors">Forgot password?</a>
              </div>
              <div className="relative">
                <input 
                  {...registerLogin("password")}
                  type={showPassword ? "text" : "password"}
                  className="w-full bg-surface-100 border border-border rounded-btn px-4 py-2 pr-10 focus:outline-none focus:border-white transition-colors"
                  placeholder="••••••••"
                />
                <button 
                  type="button" 
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-white"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {loginErrors.password && <span className="text-xs text-rose-500 mt-1 block">{loginErrors.password.message as string}</span>}
            </div>
            <button 
              type="submit" 
              disabled={loginMutation.isPending}
              className="w-full bg-white text-black font-medium py-2 rounded-btn mt-6 hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
            >
              {loginMutation.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Sign In'}
            </button>
          </form>
        ) : (
          <form onSubmit={handleSignupSubmit(onSubmitSignup)} className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-1 block">Name</label>
              <input 
                {...registerSignup("name")}
                className="w-full bg-surface-100 border border-border rounded-btn px-4 py-2 focus:outline-none focus:border-white transition-colors"
                placeholder="John Doe"
              />
              {signupErrors.name && <span className="text-xs text-rose-500 mt-1 block">{signupErrors.name.message as string}</span>}
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Email</label>
              <input 
                {...registerSignup("email")}
                className="w-full bg-surface-100 border border-border rounded-btn px-4 py-2 focus:outline-none focus:border-white transition-colors"
                placeholder="name@example.com"
              />
              {signupErrors.email && <span className="text-xs text-rose-500 mt-1 block">{signupErrors.email.message as string}</span>}
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Password</label>
              <input 
                {...registerSignup("password")}
                type="password"
                className="w-full bg-surface-100 border border-border rounded-btn px-4 py-2 focus:outline-none focus:border-white transition-colors"
                placeholder="••••••••"
              />
              {signupErrors.password && <span className="text-xs text-rose-500 mt-1 block">{signupErrors.password.message as string}</span>}
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Confirm Password</label>
              <input 
                {...registerSignup("confirmPassword")}
                type="password"
                className="w-full bg-surface-100 border border-border rounded-btn px-4 py-2 focus:outline-none focus:border-white transition-colors"
                placeholder="••••••••"
              />
              {signupErrors.confirmPassword && <span className="text-xs text-rose-500 mt-1 block">{signupErrors.confirmPassword.message as string}</span>}
            </div>
            <button 
              type="submit" 
              disabled={registerMutation.isPending}
              className="w-full bg-white text-black font-medium py-2 rounded-btn mt-6 hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
            >
              {registerMutation.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Create Account'}
            </button>
          </form>
        )}

        <div className="mt-6 text-center text-sm text-muted">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button 
            onClick={() => setIsLogin(!isLogin)} 
            className="text-white hover:underline font-medium"
          >
            {isLogin ? 'Sign up' : 'Sign in'}
          </button>
        </div>
      </div>
    </div>
  );
}
