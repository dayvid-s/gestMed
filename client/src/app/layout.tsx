'use client'
import './globals.css'
import 'rsuite/dist/rsuite-no-reset.min.css';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { CustomProvider } from 'rsuite';
import pt_BR from 'rsuite/locales/pt_BR';
import { Manrope } from 'next/font/google'

// import { inter } from './fonts'
// import { GeistSans } from "geist/font/sans";
import { ReactElement } from 'react';
// import { Provider } from 'react-redux';
// import { store } from '../store';


const manrope = Manrope({ subsets: ['latin'] })
interface RootLayoutProps {
  children: ReactElement;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <CustomProvider locale={pt_BR}>
      <html lang="pt_BR" className={manrope.className}>
        <body>
          <AppRouterCacheProvider>{children}</AppRouterCacheProvider>
        </body>
      </html>
    </CustomProvider>
  );
}

