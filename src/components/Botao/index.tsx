import { ReactNode } from "react";
import style from "./Botao.module.scss";

interface Props {
  children?: ReactNode;
  type?: "button" | "submit" | "reset" | undefined;
  onClick?: () => void;
  small?: boolean;
}

function Botao({ onClick, type, small = false, children }: Props) {
  return (
    <button
      onClick={onClick}
      type={type}
      className={`
        ${style.botao} ${small ? style["botao-small"] : ""}
      `}
    >
      {children}
    </button>
  );
}

export default Botao;
