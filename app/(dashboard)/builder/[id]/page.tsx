import FormBuilder from "@/app/(dashboard)/builder/[id]/_components/FormBuilder";
import { getFormById } from "@/lib/actions/form";

interface BuilderPageProps {
  params: Promise<{ id: string | number }>
}

const BuilderPage = async ({ params }: BuilderPageProps) => {
  const { id } = await params; 
  const form = await getFormById(Number(id));

  if (!form) {
    throw new Error("Form not found")
  }
  
  return (
    <FormBuilder form={form}/>
  )
}

export default BuilderPage;