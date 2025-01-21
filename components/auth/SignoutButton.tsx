import { cn } from "@/lib/utils";
import { signOut } from "next-auth/react";

type SignoutButtonProps = {
  children?: React.ReactNode;
  className?: React.HTMLProps<HTMLSpanElement>["className"]
}

const SignoutButton = ({
  children,
  className,
}: SignoutButtonProps) => {
  const onClick = () => {
    // console.log("signout")
    signOut({
      redirectTo: "/auth/signin"
    });
  }
  return (
    <span onClick={onClick} className={cn('cursor-pointer', className)}>
      {children}
    </span>
  )
}

export default SignoutButton;