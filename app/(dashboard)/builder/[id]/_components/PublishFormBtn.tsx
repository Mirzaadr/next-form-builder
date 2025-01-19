import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";

const PublishFormBtn = () => {
  return (
    <Button variant={"outline"} className="gap-2 text-white bg-gradient-to-r from-indigo-400 to-cyan-400">
      <Globe className="size-5"/>
      Publish
    </Button>
  )
}

export default PublishFormBtn;