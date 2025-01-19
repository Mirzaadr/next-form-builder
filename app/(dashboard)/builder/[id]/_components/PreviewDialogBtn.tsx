import { Button } from "@/components/ui/button"
import { View } from "lucide-react";

const PreviewDialogBtn = () => {
  return (
    <Button variant={"outline"} className="gap-2">
      <View className="size-5"/>
      Preview
    </Button>
  )
}

export default PreviewDialogBtn;