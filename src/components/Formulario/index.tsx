import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { ITarefa } from "../../types/tarefa";
import Botao from "../Botao";
import style from "./Formulario.module.scss";

interface Props {
  setTarefas: React.Dispatch<React.SetStateAction<ITarefa[]>>;
}

function Formulario({ setTarefas }: Props) {
  const [tarefa, setTarefa] = useState("");
  const [tempo, setTempo] = useState("00:00");

  function adicionarTarefa(evento: React.FormEvent<HTMLFormElement>) {
    evento.preventDefault();
    setTarefas((tarefasAntigas) => [
      ...tarefasAntigas,
      {
        tarefa,
        tempo,
        selecionado: false,
        completado: false,
        id: uuidv4(),
      },
    ]);

    setTarefa("");
    setTempo("00:00");
  }

  return (
    <form className={style.novaTarefa} onSubmit={adicionarTarefa}>
      <div className={style.inputContainer}>
        <label htmlFor="tarefa">Add new task</label>
        <input
          type="text"
          name="tarefa"
          id="tarefa"
          value={tarefa}
          onChange={(evento) => setTarefa(evento.target.value)}
          placeholder="What task?"
          required
        />
      </div>

      <div className={style.inputContainer}>
        <label htmlFor="tempo">Time</label>
        <input
          type="time"
          step="1"
          name="tempo"
          value={tempo}
          onChange={(evento) => setTempo(evento.target.value)}
          id="tempo"
          min="00:00:00"
          max="01:30:00"
          required
        />
      </div>
      <div className={style.inputContainer}>
        <Botao type="submit" small>
          Add
        </Botao>
      </div>
    </form>
  );
}

export default Formulario;
