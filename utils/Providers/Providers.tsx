"use client";
import { store } from "@/lib/store/store";
import React, { ReactNode } from "react";
import { Provider } from "react-redux";

type Props = {
  children: ReactNode;
};

export default function Providers({ children }: Props) {
  return <Provider store={store}> {children}</Provider>;
}
