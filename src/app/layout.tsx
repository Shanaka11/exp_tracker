import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import Providers from '@/providers/Providers';
import SideNav from '@/components/common/SideNav';
import AppBar from '@/components/common/AppBar';

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
});

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
});

export const metadata: Metadata = {
	title: 'Expense Tracker',
	description: 'Record and monitor your finances',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased h-dvh grid grid-rows-[40px_1fr] grid-cols-[50px_1fr]`}
			>
				<Providers>
					<AppBar />
					<SideNav />
					<main className='py-4 px-4 bg-slate-200 h-full overflow-auto md:overflow-hidden col-span-2 md:col-span-1'>
						{children}
					</main>
					<Toaster />
				</Providers>
			</body>
		</html>
	);
}
