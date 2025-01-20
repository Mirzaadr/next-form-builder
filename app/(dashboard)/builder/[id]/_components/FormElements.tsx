import { LucideIcon } from "lucide-react";
import { TextFieldFormElement } from "./fields/TextField";

export type ElementsType = "TextField";

export type FormElement = {
  type: ElementsType;

  designerBtnElement: {
    icon: React.ElementType | LucideIcon;
    label: string;
  };

  construct: (id: string)  => FormElementInstance;

  designerComponent: React.FC<{
    elementInstance: FormElementInstance,
  }>;
  formComponent: React.FC<{
    elementInstance: FormElementInstance,
  }>;
  propertiesComponent: React.FC<{
    elementInstance: FormElementInstance,
  }>;
};

export type FormElementInstance = {
  id: string;
  type: ElementsType;
  extraAttributes?: Record<string, any>;
};

type FormElementsType = {
  [key in ElementsType]: FormElement
};
export const FormElements: FormElementsType = {
  TextField: TextFieldFormElement
};