import { Button } from "@/components/ui/button";
import { SaveAll } from "lucide-react";
import useDesigner from "./hooks/useDesigner";
import { updateFormContent } from "@/lib/actions/form";
import { toast } from "sonner";
import { useTransition } from "react";
import Spinner from "@/components/common/Spinner";

const SaveFormBtn = ({ id }: { id: number }) => {
  const { elements } = useDesigner();
  const [isLoading, startTransition] = useTransition();

  const onUpdateFormContent = async () => {
    try {
      const jsonElements =  JSON.stringify(elements);
      await updateFormContent(id, jsonElements);
      toast.success("Success", {
        description: "Your form has been saved"
      });
    } catch (error) {
      toast.error("Error", {
        description: "Unable to save form, try again later"
      })
    }
  }
  return (
    <Button variant={"outline"} className="gap-2" disabled={isLoading} onClick={() => {
      startTransition(onUpdateFormContent);
    }}>
      {isLoading ? (<Spinner />) : (
        <>
          <SaveAll className="size-5"/>
          Save
        </>
      )}
    </Button>
  )
}

export default SaveFormBtn;