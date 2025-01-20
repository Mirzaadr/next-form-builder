"use client"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ExternalLink } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const FormLinkShare = ({ shareUrl }: { shareUrl: string }) => {
  const [mounted, setMounted] = useState(false);
  const shareLink = `${window.location.origin}/submit/${shareUrl}`;

  useEffect(() => {
    setMounted(true);
  }, []);

  if(!mounted) return null;
  return (
    <div className="flex flex-grow gap-4 items-center">
      <Input className="w-full" readOnly value={shareLink} />
      <Button
        className="w-[250px]"
        onClick={() => {
          navigator.clipboard.writeText(shareUrl);
          toast.success("Copied", {
            description: "Link copied to clipboard",
          })
        }}
      >
        <ExternalLink className="mr-2 size-4"/>
        Share Link
      </Button>
    </div>
  );
}

export default FormLinkShare;
