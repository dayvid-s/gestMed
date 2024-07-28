"use client";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { Manrope } from "next/font/google";
import { CustomProvider } from "rsuite";
import "rsuite/dist/rsuite-no-reset.min.css";
import pt_BR from "rsuite/locales/pt_BR";
import "./globals.css";

import { searchUser } from "@/features/authSlice";
import { ReactElement, useEffect } from "react";
import { Provider } from "react-redux";
import { Alert } from "../components/Alert";
import { dispatch, store } from "../store";


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
            <Alert />
            <AppRouterCacheProvider>{children}</AppRouterCacheProvider>
          </body>
        </html>
      </CustomProvider>
    </Provider>
  );
}

