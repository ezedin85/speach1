import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

export default function useThemeContext() {
    const context = useContext(ThemeContext)
    if(!context) {
        throw Error("useThemeContext should only be used in ThemeContext.Provider")
    }
  return context
}
