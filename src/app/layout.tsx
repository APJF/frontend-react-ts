import React from "react";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/Footer"; // ⚠️ chú ý chữ thường

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="font-sans">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
