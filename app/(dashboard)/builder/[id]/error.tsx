"use client"
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect } from "react";

const ErrorPage = ({ error }: { error: Error }) => {
  useEffect(() => {
    console.log(error)
  }, [error]);

  return (
    <div className='flex w-full h-full flex-col items-center justify-center'>
      <h2 className="text-destructive text-4xl">Something went wrong</h2>

      <Button className="mt-4" asChild variant={"outline"}>
        <Link href={"/"}>Back to Home</Link>
      </Button>
    </div>
  )
}

export default ErrorPage;