import { FormElementInstance } from "@/app/(dashboard)/builder/[id]/_components/FormElements";
import { getFormContentByUrl } from "@/lib/actions/form";
import FormSubmitComponent from "./_components/FormSubmitComponent";

interface SubmitPageProps {
  params: Promise<{
    formUrl: string;
  }>
}

const SubmitPage = async ({ params }: SubmitPageProps) => {
  const { formUrl } = await params;
  const form = await getFormContentByUrl(formUrl);

  if(!form) throw new Error("Form not found");

  const formContent = JSON.parse(form.content) as FormElementInstance[];
  return (
    <FormSubmitComponent formUrl={formUrl} content={formContent}/>
  );
}

export default SubmitPage;