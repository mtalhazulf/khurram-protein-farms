import type { Metadata } from "next";
import { LoginForm } from "@/components/admin/LoginForm";

export const metadata: Metadata = {
  title: "Admin Login",
  robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen bg-kp-green-900 text-white flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-kp-gold-500 text-kp-green-900 font-serif font-bold text-xl mb-4">
            KP
          </div>
          <h1 className="font-serif text-3xl mb-2">Khurram Proteins</h1>
          <p className="text-white/60 text-sm">Admin panel</p>
        </div>
        <div className="bg-white text-kp-black rounded-2xl p-8 shadow-2xl">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
