import { LucideIcon } from "lucide-react";
import { TextFieldFormElement } from "./fields/TextField";
import { TitleFieldFormElement } from "./fields/TitleField";
import { SubtitleFieldFormElement } from "./fields/SubtitleField";
import { ParagraphFieldFormElement } from "./fields/ParagraphField";
import { SeparatorFormElement } from "./fields/SeparatorField";
import { SpacerFormElement } from "./fields/SpacerField";
import { NumberFieldFormElement } from "./fields/NumberField";
import { TextAreaFieldFormElement } from "./fields/TextAreaField";
import { DateFieldFormElement } from "./fields/DateField";

export type ElementsType =
  | "TextField"
  | "TitleField"
  | "SubtitleField"
  | "ParagraphField"
  | "Separator"
  | "Spacer"
  | "NumberField"
  | "TextAreaField"
  | "DateField";

export type SubmitFunction = (key:string, value:string) => void;

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
    submitValue?: (key:string, value:string) => void;
    isInvalid?: boolean;
    defaultValue?: string;
  }>;
  propertiesComponent: React.FC<{
    elementInstance: FormElementInstance,
  }>;
  validate: (formElement: FormElementInstance, currentValue: string) => boolean;
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
  TextField: TextFieldFormElement,
  TitleField: TitleFieldFormElement,
  SubtitleField: SubtitleFieldFormElement,
  ParagraphField: ParagraphFieldFormElement,
  Separator: SeparatorFormElement,
  Spacer: SpacerFormElement,
  NumberField: NumberFieldFormElement,
  TextAreaField: TextAreaFieldFormElement,
  DateField: DateFieldFormElement,
};