import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reserve — REHAB Beach Club",
  description: "Secure your luxury experience at REHAB Beach Club. Choose from poolside daybeds, VVIP cabanas, beach lounges, and private dining.",
};

export default function ReserveLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
