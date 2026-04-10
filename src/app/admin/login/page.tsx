import type { Metadata } from "next";
import { Suspense } from "react";
import { LoginForm } from "@/components/admin/LoginForm";

export const metadata: Metadata = {
  title: "Admin Login",
  robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen bg-kp-green-900 text-white flex items-center justify-center p-6 relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-kp-gold-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-kp-green-700/20 rounded-full blur-[100px] pointer-events-none" />

      <div className="w-full max-w-md relative">
        <div className="text-center mb-10 kp-animate-fade-up">
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-kp-gold-500 text-kp-green-900 font-serif font-bold text-xl mb-5 shadow-lg shadow-kp-gold-500/25">
            KP
          </div>
          <h1 className="font-serif text-3xl mb-2">Khurram Proteins</h1>
          <p className="text-white/50 text-sm">Admin panel</p>
        </div>
        <div className="bg-white text-kp-black rounded-2xl p-8 shadow-2xl shadow-black/20 kp-animate-fade-up kp-stagger-2">
          <Suspense>
            <LoginForm />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
