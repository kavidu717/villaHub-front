import { useContext } from "react";
import { CartContext } from "./CardContext.jsx";

export const useCart = () => useContext(CartContext);
