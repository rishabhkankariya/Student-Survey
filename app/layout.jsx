import { Space_Grotesk, Inter } from 'next/font/google';
import '@/styles/globals.css';
import ThreeBackground from '@/components/ThreeBackground';
import StartupEffect from '@/components/StartupEffect';

const spaceGrotesk = Space_Grotesk({
    subsets: ['latin'],
    weight: ['300', '400', '500', '600', '700'],
    variable: '--font-space-grotesk',
    display: 'swap',
});

const inter = Inter({
    subsets: ['latin'],
    variable: '--font-inter',
    display: 'swap',
});

export const metadata = {
    title: 'ProfHere | Professional Presence Platform',
    description: 'The intelligent way to track faculty presence and optimize classroom resources.',
};

export default function RootLayout({ children }) {
    return (
        <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable} scroll-smooth`}>
            <body className="font-sans antialiased selection:bg-emerald-500 selection:text-white bg-transparent">
                <ThreeBackground />
                <StartupEffect />
                {children}
            </body>
        </html>
    );
}
