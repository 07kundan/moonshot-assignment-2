"use client";
import React from "react";
import { signOut, useSession } from "next-auth/react";
import { User } from "next-auth";
import { Button } from "./ui/button";
import Link from "next/link";

const Navbar = () => {
  const { data: session } = useSession();
  const user: User = session?.user as User;

  return (
    <nav className="p-4 md:py-4 md:px-24 shadow-md text-black">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <a href="#" className="text-xl font-bold mb-4 md:mb-0">
          Chart
        </a>
        {session ? (
          <>
            <span className="mr-4">Welcome, {user.username || user.email}</span>
            <Button
              onClick={() => signOut()}
              className="w-full md:w-auto bg-slate-100 text-black"
              variant="outline"
            >
              Logout
            </Button>
          </>
        ) : (
          <Link href="/sign-in">
            <Button
              className="w-full md:w-auto bg-slate-100 text-black"
              variant={"outline"}
            >
              Login
            </Button>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
