"use client";
import { SideBar, LineLoading, Navbar } from "@/components";
import { RootState } from "@/store/store";
import React, { useState, Suspense, ReactNode, useEffect } from "react";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";

function SearchParamsWrapper({
  setSearchParams,
}: {
  setSearchParams: (params: URLSearchParams) => void;
}) {
  const searchParams = useSearchParams();
  useEffect(() => {
    setSearchParams(searchParams);
  }, [searchParams]);

  return null; // This component does not render anything visible.
}

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const [preferences, setPreferences] = useState<boolean>(true);
  const [hamburger, setHamburger] = useState<boolean>(false);
  const [screenWindow, setScreenWindow] = useState<boolean>(false);
  const [searchParams, setSearchParams] = useState<URLSearchParams | null>(
    null
  );
  const isLoading = useSelector((state: RootState) => state.loading.isLoading);
  const pathname = usePathname();
  const router = useRouter();

  // applying the filter preferences or last visit url when left
  const applyPreferences = () => {
    const lastFilter = Cookies.get("lastFilter");
    router.push(`${lastFilter}`);
    setPreferences(false);
  };

  // reseting the filter preferences in cookie
  const resetPreferences = () => {
    Cookies.remove("filters");
    setPreferences(false);
  };

  // updating the cookie when user apply filter or change the url
  useEffect(() => {
    if (window.innerWidth > 720) {
      setScreenWindow(true);
    } else {
      setScreenWindow(false);
    }
    if (searchParams) {
      const currentUrl = `${pathname}?${searchParams.toString()}`;
      if (!preferences) {
        Cookies.set("lastFilter", currentUrl);
      }
    }
  }, [searchParams, pathname, preferences]);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SearchParamsWrapper setSearchParams={setSearchParams} />
      <section className="w-screen h-screen flex relative bg-[#344C64]">
        {hamburger && !screenWindow && (
          <SideBar
            hamburger={hamburger}
            setHamburger={setHamburger}
            screenWindow={screenWindow}
            className="w-1/2 h-screen fixed top-0 left-0 z-10 bg-[#577B8D]"
          />
        )}
        {screenWindow && (
          <SideBar
            hamburger={hamburger}
            setHamburger={setHamburger}
            screenWindow={screenWindow}
            className="w-[20vw] h-screen bg-[#577B8D]"
          />
        )}
        <section className="w-full h-screen">
          <Navbar
            setHamburger={setHamburger}
            screenWindow={screenWindow}
            className="w-full md:h-[10%] bg-[#577B8D]"
          />
          {isLoading && <LineLoading />}
          <section className="w-full h-[85%] pt-3">{children}</section>
        </section>

        {preferences && (
          <section className="absolute bottom-0 right-0 w-full flex justify-around md:block md:w-fit md:bottom-6 md:right-6 bg-[#577B8D] py-3 px-5 space-x-3 ">
            <Button
              className="text-xs bg-[#344C64] hover:bg-[#233548] border border-[#172637] font-bold text-[#57A6A1]"
              variant="outline"
              onClick={applyPreferences}
            >
              Apply Preferences
            </Button>
            <Button
              className="text-xs bg-[#344C64] hover:bg-[#233548] border border-[#172637] font-bold text-[#57A6A1]"
              variant="outline"
              onClick={resetPreferences}
            >
              Reset Preferences
            </Button>
          </section>
        )}
      </section>
    </Suspense>
  );
}
