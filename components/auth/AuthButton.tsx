// import { signOut } from 'next-auth/react';

import { cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { redirect } from "next/navigation";
import SigninForm from "@/components/auth/SigninForm";
import SignupForm from "@/components/auth/SignupForm";

type AuthButtonProps = {
  children: React.ReactNode;
  mode?: "modal" | "redirect";
  type?: "signin" | "signup";
  asChild?: boolean;
  className?: React.HTMLProps<HTMLDivElement>["className"];
  signInHref?: string;
}

const AuthButton = ({
  children,
  mode="modal",
  type="signin",
  asChild,
  className,
  signInHref="/auth/signin"
}: AuthButtonProps) => {
  const onClick = () => {
    redirect(signInHref || "/")
  }

  if (mode === "modal") {
    return (
      <Dialog>
        <DialogTrigger asChild={asChild}>
          {children}
        </DialogTrigger>
        <DialogHeader className="hidden">
          <DialogTitle />
        </DialogHeader>
        <DialogContent className="p-0 w-auto bg-transparent border-none">
          {type === "signin" ? (
            <SigninForm />
          ) : (
            <SignupForm />
          )}
        </DialogContent>
      </Dialog>
    )
  }
  return (
    <div onClick={onClick} className={cn('cursor-pointer', className)}>
      {children}
    </div>
  )
}

export default AuthButton;