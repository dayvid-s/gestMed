"use client";
import "./globals.css";
import "rsuite/dist/rsuite-no-reset.min.css";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { CustomProvider } from "rsuite";
import pt_BR from "rsuite/locales/pt_BR";
import { Manrope } from "next/font/google";

import { ReactElement, useEffect } from "react";
import { Provider } from "react-redux";
import { dispatch, store } from "../store";
import { searchUser } from "@/features/authSlice";


const manrope = Manrope({ subsets: ["latin"] });
interface RootLayoutProps {
  children: ReactElement;
}




export default function RootLayout({ children }: RootLayoutProps) {
  useEffect(() => {
    dispatch(searchUser());
  }, []);
  return (
    <Provider store={store}>
      <CustomProvider locale={pt_BR}>
        <html lang="pt_BR" className={manrope.className}>
          <body>
            <AppRouterCacheProvider>{children}</AppRouterCacheProvider>
          </body>
        </html>
      </CustomProvider>
    </Provider>
  );
}

