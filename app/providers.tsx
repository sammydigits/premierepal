"use client";

import * as React from "react";
import { NextUIProvider } from "@nextui-org/system";
import { CookiesProvider } from "react-cookie";

export interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <NextUIProvider>
      <CookiesProvider defaultSetOptions={{ path: "/" }}>
        {children}{" "}
      </CookiesProvider>
    </NextUIProvider>
  );
}
