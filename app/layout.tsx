import { ConvexClientProvider } from '@/components/providers/convex-provider';
import { ModalProvider } from '@/components/providers/modal-provider';
import { ThemeProvider } from '@/components/providers/theme-provider';
import { Toaster } from '@/components/ui/sonner';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { EdgeStoreProvider } from '@/lib/edgestore';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Notion App',
	description: 'The connected workpace where better faster work happens.',
	icons: {
		icon: [
			{
				media: '(prefers-color-scheme:light)',
				url: '/logo.svg',
				href: '/logo.svg'
			},
			{
				media: '(prefers-color-scheme:dark)',
				url: '/logo-dark.svg',
				href: '/logo-dark.svg'
			}
		]
	}
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className={inter.className}>
				<ConvexClientProvider>
					<EdgeStoreProvider>
						<ThemeProvider attribute="class" defaultTheme="system" disableTransitionOnChange storageKey="jotion-theme-2">
							<Toaster position="bottom-right" />
							<ModalProvider />
							{children}
						</ThemeProvider>
					</EdgeStoreProvider>
				</ConvexClientProvider>
			</body>
		</html>
	);
}
