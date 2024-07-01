import "./globals.css";

export const metadata = {
  title: "TIKTOK",
  description: "clone tiktok",
  icons: {
    icon: "./image/main_logo/favicon-16x16.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
