import { Separator } from "@/components/ui/separator";
import { FormElements } from "./FormElements";
import SidebarBtnElement from "./SidebarBtnElement";

const FormElementSidebar = () => {
  return (
    <div className=''>
      <p className="text-sm text-foreground/70">Drag and drop elements</p>
      <Separator className="my-2"/>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 place-items-center">
        <p className="text-sm text-muted-foreground col-span-1 md:col-span-2 my-2 place-self-start">Layout elements</p>
        <SidebarBtnElement formElement={FormElements.TitleField} />
        <SidebarBtnElement formElement={FormElements.SubtitleField} />
        <SidebarBtnElement formElement={FormElements.ParagraphField} />
        <SidebarBtnElement formElement={FormElements.Separator} />
        <SidebarBtnElement formElement={FormElements.Spacer} />
        <p className="text-sm text-muted-foreground col-span-1 md:col-span-2 my-2 place-self-start">Form elements</p>
        <SidebarBtnElement formElement={FormElements.TextField} />
      </div>
    </div>
  );
}

export default FormElementSidebar;