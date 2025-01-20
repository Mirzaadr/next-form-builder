"use client"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";

const VisitBtn = ({ shareUrl }: { shareUrl: string }) => {
  const [mounted, setMounted] = useState(false);
  const shareLink = `${window.location.origin}/submit/${shareUrl}`;

  useEffect(() => {
    setMounted(true);
  }, []);

  if(!mounted) return null;
  return (
    <Button
      className="w-[200px]"
      onClick={() => {
        // navigator.clipboard.writeText(shareUrl);
        window.open(shareLink, "_blank");
      }}
    >
      Visit
    </Button>
  );
}

export default VisitBtn;