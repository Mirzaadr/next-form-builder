import Spinner from "@/components/common/Spinner";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { publishForm } from "@/lib/actions/form";
import { Globe } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";

const PublishFormBtn = ({ id }: { id: number }) => {
  const [loading, startTransition] = useTransition();
  const router = useRouter();

  const onPublishForm = async () => {
    try {
      await publishForm(id);
      toast.success("Success", {
        description: "Your form is now available to the public.",
      });
      router.refresh();
    } catch (error) {
      console.error(JSON.stringify(error));
      toast.error("Error", {
        description: "Unable to publish your form, try again later.",
      });
    }
  }
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant={"outline"} className="gap-2 text-white bg-gradient-to-r from-indigo-400 to-cyan-400">
          <Globe className="size-5"/>
          Publish
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This Action cannot be undone. After publishing you will not be able to edit this form. <br />
            <br />
            <span className="font-medium">
              By publishing this form you will make it available to the public and you will be able to collect submission. 
            </span>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction disabled={loading} onClick={(e) => {
            e.preventDefault();
            startTransition(onPublishForm)
          }}>
            Proceed {loading && <Spinner size={"sm"}/>}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default PublishFormBtn;