"use client";
import React from "react";
import { signOut, useSession } from "next-auth/react";
import { User } from "next-auth";
import { Button } from "./ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useDispatch } from "react-redux";
import { setIsLoading } from "@/store/features/loading.slice";
import { toast } from "@/hooks/use-toast";

const Navbar = ({ className }: { className: string }) => {
  const { data: session } = useSession();
  const user: User = session?.user as User;
  const dispatch = useDispatch();
  return (
    <nav className={cn("p-4 md:py-4 md:px-24 text-black", className)}>
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <a href="#" className="text-xl font-bold mb-4 md:mb-0">
          Chart
        </a>
        {session && (
          <>
            <span className="mr-4">Welcome, {user.username || user.email}</span>
            <Button
              onClick={async () => {
                dispatch(setIsLoading(true));
                await signOut();
                dispatch(setIsLoading(false));
                toast({
                  title: "Logout successfully",
                });
              }}
              className=" bg-zinc-200/70 hover:bg-zinc-300/70 border border-zinc-600 font-bold"
              variant="outline"
            >
              Logout
            </Button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
