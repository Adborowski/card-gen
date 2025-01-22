import Nav from "@/components/Nav";

export const metadata = {
  title: "card-gen",
  description: "it gens cards",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
