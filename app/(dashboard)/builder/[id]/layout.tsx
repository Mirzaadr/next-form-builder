import { ReactNode } from "react";
import DesignerContextProvider from "./_components/contexts/DesignerContext";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <DesignerContextProvider>
      <div className='flex w-full flex-grow mx-auto'>
        {children}
      </div>
    </DesignerContextProvider>
  )
}

export default Layout;