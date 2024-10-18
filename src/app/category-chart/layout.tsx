"use client";
import { SideBar, LineLoading, Navbar } from "@/components";
import { RootState } from "@/store/store";
import React, { useState, ReactNode, useEffect } from "react";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const [preferences, setPreferences] = useState<boolean>(true);
  const isLoading = useSelector((state: RootState) => state.loading.isLoading);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const applyPreferences = () => {
    const lastFilter = Cookies.get("lastFilter");
    router.push(`${lastFilter}`);
    setPreferences(false);
  };

  const resetPreferences = () => {
    Cookies.remove("filters");
    setPreferences(false);
  };

  useEffect(() => {
    const currentUrl = `${pathname}?${searchParams.toString()}`;
    if (!preferences) {
      Cookies.set("lastFilter", currentUrl);
    }
  }, [searchParams]);

  return (
    <section className="w-screen h-screen flex relative">
      <aside>
        <SideBar className="w-[20vw] h-screen" />
      </aside>
      <section className="w-full h-screen">
        <Navbar className="w-full px-24 py-3 justify-between flex h-[10%]" />
        {isLoading && <LineLoading />}
        <section className="w-full h-[85%] pt-3">{children}</section>
      </section>

      {preferences && (
        <section className="absolute bottom-8 right-8 bg-white py-3 px-5 space-x-3">
          <Button
            className="text-xs bg-zinc-200/70 hover:bg-zinc-300/70 border border-zinc-600 font-bold"
            variant="outline"
            onClick={applyPreferences}
          >
            Apply Preferences
          </Button>
          <Button
            className="text-xs bg-zinc-200/70 hover:bg-zinc-300/70 border border-zinc-600 font-bold"
            variant="outline"
            onClick={resetPreferences}
          >
            Reset Preferences
          </Button>
        </section>
      )}
    </section>
  );
}
