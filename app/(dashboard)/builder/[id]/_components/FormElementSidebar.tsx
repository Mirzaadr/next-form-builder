import { FormElements } from "./FormElements";
import SidebarBtnElement from "./SidebarBtnElement";

const FormElementSidebar = () => {
  return (
    <div className=''>
      Elements
      <SidebarBtnElement formElement={FormElements.TextField} />
    </div>
  );
}

export default FormElementSidebar;