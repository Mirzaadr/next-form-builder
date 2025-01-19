import { LucideIcon } from "lucide-react";
import { TextFieldFormElement } from "./fields/TextField";

export type ElementsType = "TextField";

export type FormElement = {
  type: ElementsType;

  designerBtnElement: {
    icon: React.ReactElement | LucideIcon;
    label: string;
  };

  construct: (id: string)  => FormElementInstance;

  designerComponent: React.FC;
  formComponent: React.FC;
  propertiesComponent: React.FC;
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