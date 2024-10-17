"use client";
import { SideBar, LineLoading, Navbar } from "@/components";
import { RootState } from "@/store/store";
import React, { useState, ReactNode } from "react";
import { useSelector } from "react-redux";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const isLoading = useSelector((state: RootState) => state.loading.isLoading);
  return (
    <section className="w-screen h-screen flex">
      <aside>
        <SideBar className="w-[20vw] h-screen" />
      </aside>
      <section className="w-full h-screen">
        <Navbar className="w-full px-24 py-3 justify-between flex h-[10%]" />
        {isLoading && <LineLoading />}
        <section className="w-full h-[85%] pt-3">{children}</section>
      </section>
    </section>
  );
}
