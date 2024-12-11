
/**
 * Project: study.sfit.com.vn
 * Author: zunohoang (https://github.com/zunohoang)
 * Email: nguyenvanhoang2005nt@gmail.com
 */

import type { Metadata } from "next";
import { Analytics } from '@vercel/analytics/next';
import localFont from "next/font/local";
import "./globals.css";
import Head from "next/head";
import FeedbackModal from "@/components/FeedbackModal";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: any = {
  title: "SFIT | Study",
  description: "Đây là trang web hỗ trợ các lớp học của SFIT-CLB Tin Học Trường Đại học Giao Thông Vận Tải",
  openGraph: {
    type: 'website',
    url: 'https://study.sfit.com.vn',
    title: "SFIT | Study",
    description: "Đây là trang web hỗ trợ các lớp học của SFIT-CLB Tin Học Trường Đại học Giao Thông Vận Tải",
    images: [
      {
        url: '/bgclb.jpg',
        alt: "SFIT-CLB Tin Học Trường Đại học Giao Thông Vận Tải",
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "SFIT-CLB Tin Học Trường Đại học Giao Thông Vận Tải",
    description: "Đây là trang web hỗ trợ các lớp học của SFIT-CLB Tin Học Trường Đại học Giao Thông Vận Tải",
    images: ["https://sfit.com.vn/sfit.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <meta charSet="utf-8" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href="https://sfit.com.vn" />
        <title>{metadata.title}</title>
      </Head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <div className="fixed z-50 right-5 bottom-5">
          <FeedbackModal />
        </div>
        <Analytics />
      </body>
    </html>
  );
}