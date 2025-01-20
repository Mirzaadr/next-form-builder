"use client"

import { FormElementInstance, FormElements } from "@/app/(dashboard)/builder/[id]/_components/FormElements";
import Spinner from "@/components/common/Spinner";
import { Button } from "@/components/ui/button";
import { submitFormByUrl } from "@/lib/actions/form";
import { MousePointerClick } from "lucide-react";
import { useCallback, useRef, useState, useTransition } from "react";
import { toast } from "sonner";

interface FormSubmitComponentProps {
  formUrl: string,
  content: FormElementInstance[],
}
const FormSubmitComponent = ({
  formUrl,
  content,
}: FormSubmitComponentProps) => {
  const formValues = useRef<{ [key: string]: string }>({});
  const formErrors = useRef<{ [key: string]: boolean }>({});
  const [renderKey, setRenderKey] = useState(Math.random());
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, startTransition] = useTransition();

  const validateForm = useCallback(() => {
    for (const field of content) {
      const actualValue = formValues.current[field.id] || "";
      const valid = FormElements[field.type].validate(field, actualValue);

      if (!valid) {
        formErrors.current[field.id] = true;
      }
    }

    if (Object.keys(formErrors.current).length > 0) {
      return false;
    }

    return true;
  },[content])

  const submitValue = useCallback((key: string, value: string) => {
    formValues.current[key] = value;
  }, []);

  const onSubmitForm = async () => {
    formErrors.current = {};
    const validForm = validateForm();
    if (!validForm) {
      setRenderKey(Math.random());
      toast.error("Error", {
        description: "Please check your form for error"
      });
      return;
    }
    
    try {
      const jsonContent = JSON.stringify(formValues.current);
      await submitFormByUrl(formUrl, jsonContent);
      setSubmitted(true);
    } catch (error) {
      toast.error("Error", {
        description: "Something went wrong"
      });  
    }
    console.log("FORM VALUES", formValues.current);
  }

  if (submitted) {
    return (
      <div className="flex justify-center w-full h-full items-center p-8">
        <div className="max-w-[620px] flex flex-col gap-4 flex-grow bg-background w-full p-8 overflow-y-auto border shadow-xl shadow-blue-700 rounded">
          <h1 className="text-2xl font-bold">Form Submitted</h1>
          <p className="text-muted-foreground">
            Thank you for submitting the form, you can close this page now.
          </p>
        </div>
      </div>
    )
  }
  return (
    <div className="flex justify-center w-full h-full items-center p-8">
      <div key={renderKey} className="max-w-[620px] flex flex-col gap-4 flex-grow bg-background w-full p-8 overflow-y-auto border shadow-xl shadow-blue-700 rounded">
        {content.map((element) => {
          const FormElement = FormElements[element.type].formComponent;
          return (
            <FormElement
              key={element.id}
              elementInstance={element}
              submitValue={submitValue}
              isInvalid={formErrors.current[element.id]}
              defaultValue={formValues.current[element.id]}
            />
          );
        })}
        <Button
          className="mt-8 gap-2"
          onClick={() => {
            startTransition(onSubmitForm);
          }}
          disabled={isLoading}
        >
          {isLoading ? (
            <Spinner size={"sm"}/>
          ) : (
            <>
              <MousePointerClick className="size-4" />
              Submit
            </>
          )}
        </Button>
      </div>
    </div>
  );
}

export default FormSubmitComponent;