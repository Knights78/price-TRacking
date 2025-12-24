import Image from "next/image";
import AuthButton from "../components/AuthButton";
import AddProductForm from "../components/AddProductForm";
import { TrendingDown } from "lucide-react";
import { Rabbit, Shield, Bell } from "lucide-react";
import { createClient } from "@/utils/supabase/server";
import { getProducts } from "./action";
import ProductCard from "@/components/ProductCard";

export default async function HomePage() {
   const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const products = user ? await getProducts(): [];
  // const {data :{user},}=await supabase.auth.getUser()
  
  const FEATURES = [
    {
      icon: Rabbit,
      title: "Lightning Fast",
      description:
        "Deal Drop extracts prices in seconds, handling JavaScript and dynamic content",
    },
    {
      icon: Shield,
      title: "Always Reliable",
      description:
        "Works across all major e-commerce sites with built-in anti-bot protection",
    },
    {
      icon: Bell,
      title: "Smart Alerts",
      description: "Get notified instantly when prices drop below your target",
    },
  ];

  return (
    <main className="min-h-screen from-cyan-50 to-white">
      {/* Navbar */}
      <nav className="sticky top-0 z-10 flex items-center justify-between px-8 py-4 border-b bg-white/70 backdrop-blur">
        <Image
          src="/logo.jpeg"
          alt="Logo"
          width={80}
          height={50}
          className="rounded-full"
        />
        <AuthButton user={user} />
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center px-4 mt-28">
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800 max-w-3xl">
          Track Prices.{" "}
          <span className="text-cyan-600">Save Money.</span> Buy Smart.
        </h2>

        <p className="mt-4 text-gray-500 max-w-xl">
          Monitor product prices and get notified instantly when prices drop.
          Never overpay again.
        </p>

        {/* Search Bar */}
        <AddProductForm user={user} />
      </section>

      {/* Tracked products */}
      {user && products.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 pb-20">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-gray-900">
              Your Tracked Products
            </h3>
            <span className="text-sm text-gray-500">
              {products.length}{" "}
              {products.length === 1 ? "product" : "products"}
            </span>
          </div>

          <div className="grid gap-6 md:grid-cols-2 items-start">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}
      {/* If user is logged in */}
      {user ? (
        products.length === 0 && (
          <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
            <div className="bg-white rounded-xl border-2 border-dashed border-gray-300 p-12">
              <TrendingDown className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No products yet
              </h3>
              <p className="text-gray-600">
                Add your first product above to start tracking prices!
              </p>
            </div>
          </section>
        )
      ) : (
        /* If user is NOT logged in → show features */
        <section className="mt-20 px-4 max-w-6xl mx-auto">
          <h3 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Why Choose Deal Drop?
          </h3>

          <div className="grid md:grid-cols-3 gap-8">
            {FEATURES.map((feature, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center p-6 border rounded-lg hover:shadow-lg transition-shadow"
              >
                <feature.icon className="text-cyan-500 w-12 h-12 mb-4" />
                <h4 className="text-xl font-semibold mb-2">
                  {feature.title}
                </h4>
                <p className="text-gray-500">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}


      {/* Footer */}
      <footer className="mt-32 text-center text-sm text-gray-400">
        Built with Next.js, Tailwind CSS & ShadCN UI
      </footer>
    </main>
  );
}
