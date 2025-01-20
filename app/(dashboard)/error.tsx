"use client"
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const ErrorPage = ({ error }: { error: Error }) => {
  const router = useRouter();
  useEffect(() => {
    console.log(error)
  }, [error]);

  const onReload = () => {
    router.refresh();
  }

  return (
    <div className='flex w-full h-full flex-col items-center justify-center'>
      <h2 className="text-destructive text-4xl">Something went wrong</h2>

      <Button className="mt-4" variant={"outline"} onClick={onReload}>
        Reload
      </Button>
    </div>
  )
}

export default ErrorPage;