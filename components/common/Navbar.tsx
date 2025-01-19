"use client"

import { cn } from "@/lib/utils";
// import Logo from "./Logo";
// import { ModeToggle } from "@/components/ModeToggle";
import Spinner from "@/components/common/Spinner";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import UserButton from "@/components/auth/UserButton";
import AuthButton from "@/components/auth/AuthButton";
import { useCurrentUser } from "@/lib/hooks/useCurrentUser";
import Logo from "./Logo";
import { DEFAULT_LOGIN_REDIRECT } from "@/lib/settings";

const Navbar = () => {
  const { isLoading, isAuthenticated: isLoggedIn } = useCurrentUser();

  return (
    <div
      className={cn(
        "z-50 bg-background dark:bg-[#1F1F1F] fixed flex items-center w-full p-6",
      )}
    >
      <Logo />
      <div className="md:ml-auto md:justify-end justify-between w-full flex items-center gap-x-3">
        {isLoading && (
          <Spinner />
        )}
        {!isLoggedIn && !isLoading && (
          <>
            <AuthButton asChild>
              <Button variant="ghost" size="sm">
                Log In
              </Button>
            </AuthButton>
            <AuthButton asChild type="signup">
              <Button size="sm">
                Sign Up
              </Button>
            </AuthButton>
          </>
        )}
        {isLoggedIn && !isLoading && (
          <>
            <Button size="sm" asChild>
              <Link href={DEFAULT_LOGIN_REDIRECT}>
                Enter Application
              </Link>
            </Button>
            <UserButton />
          </>
        )}
        {/* <ModeToggle /> */}
      </div>
    </div>
  );
}

export default Navbar;