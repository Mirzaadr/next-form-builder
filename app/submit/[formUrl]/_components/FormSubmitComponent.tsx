"use client"

import { FormElementInstance, FormElements } from "@/app/(dashboard)/builder/[id]/_components/FormElements";
import { Button } from "@/components/ui/button";
import { MousePointerClick } from "lucide-react";
import { useCallback, useRef } from "react";

interface FormSubmitComponentProps {
  formUrl: string,
  content: FormElementInstance[],
}
const FormSubmitComponent = ({
  formUrl,
  content,
}: FormSubmitComponentProps) => {
  const formValues = useRef<{ [key: string]: string }>({});

  const submitValue = useCallback((key: string, value: string) => {
    formValues.current[key] = value;
  }, []);

  const submitForm = () => {
    console.log("FORM VALUES", formValues.current);
  }
  return (
    <div className='flex justify-center w-full h-full items-center p-8'>
      <div className="max-w-[620px] flex flex-col gap-4 flex-grow bg-background w-full p-8 overflow-y-auto border shadow-xl shadow-blue-700 rounded">
        {content.map((element) => {
          const FormElement = FormElements[element.type].formComponent;
          return <FormElement key={element.id} elementInstance={element} submitValue={submitValue}/>
        })}
        <Button className="mt-8 gap-2" onClick={() => {
          submitForm();
        }}>
          <MousePointerClick className="size-4"/>
          Submit
        </Button>
      </div>
    </div>
  );
}

export default FormSubmitComponent;