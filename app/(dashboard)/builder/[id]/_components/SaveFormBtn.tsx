import { Button } from "@/components/ui/button";
import { SaveAll } from "lucide-react";

const SaveFormBtn = () => {
  return (
    <Button variant={"outline"} className="gap-2">
      <SaveAll className="size-5"/>
      Save
    </Button>
  )
}

export default SaveFormBtn;