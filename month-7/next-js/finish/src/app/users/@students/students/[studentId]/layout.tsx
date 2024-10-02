"use client";

import React from "react";
import { useRouter } from "next/navigation";

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  return (
    <div className="layout">
      <h2>Student layout</h2>
      <button onClick={() => router.back()}>&larr; &nbsp; Go back</button>
      {children}
    </div>
  );
}
