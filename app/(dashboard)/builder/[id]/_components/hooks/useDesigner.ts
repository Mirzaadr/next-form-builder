import { useContext } from "react";
import { DesignerContext } from "../contexts/DesignerContext";

export default function useDesigner() {
  const context = useContext(DesignerContext);

  if (!context) {
    throw new Error("useDesigner must be used inside a DesignerProvider");
  }

  return context;
}