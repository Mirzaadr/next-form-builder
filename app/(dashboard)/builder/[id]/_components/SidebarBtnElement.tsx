import { Button } from "@/components/ui/button";
import { FormElement } from "./FormElements";
import { useDraggable } from "@dnd-kit/core";
import { cn } from "@/lib/utils";

const SidebarBtnElement = ({ formElement }: { formElement: FormElement }) => {
  const { label, icon: Icon } = formElement.designerBtnElement;
  const draggable = useDraggable({
    id: `designer-btn-${formElement.type}`,
    data: {
      type: formElement.type,
      isDesignerBtnElement: true,
    }
  });
  return (
    <Button
      className={cn(
        "flex flex-col gap-2 h-[120px] w-[120px] cursor-grab",
        draggable.isDragging && "ring-2 ring-primary"
      )}
      ref={draggable.setNodeRef}
      variant={"outline"}
      {...draggable.listeners}
      {...draggable.attributes}
    >
      <Icon className="size-8 text-primary cursor-grab" />
      <p className="text-xs">{label}</p>
    </Button>
  );

}
export const SidebarBtnElementDragOverlay = ({ formElement }: { formElement: FormElement }) => {
  const { label, icon: Icon } = formElement.designerBtnElement;
  return (
    <Button
      className={cn(
        "flex flex-col gap-2 h-[120px] w-[120px] cursor-grab",
      )}
      variant={"outline"}
    >
      <Icon className="size-8 text-primary cursor-grab" />
      <p className="text-xs">{label}</p>
    </Button>
  );
}

export default SidebarBtnElement;