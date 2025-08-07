import type { Metadata } from "next";

import { MainNav } from "@/components/main-nav";



export const metadata: Metadata = {
  title: "South Ethiopia Tax Authority",
  description: "South Ethiopia Tax Authority",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <MainNav />
      {children}
    </>
  );
}
