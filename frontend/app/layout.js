import "./globals.css";

export const metadata = {
  title: "TIKTOK",
  description: "clone tiktok",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
