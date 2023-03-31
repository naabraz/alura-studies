import { useEffect, useState } from "react";

import Cronometro from "../components/Cronometro";
import Formulario from "../components/Formulario";
import Lista from "../components/Lista";
import { ITarefa } from "../types/tarefa";
import style from "./App.module.scss";

function requestPermission() {
  const notificationPermission = Notification.permission;

  if (notificationPermission === "default") {
    Notification.requestPermission();
  }
}

function createNotification(tarefa: string) {
  return new Notification(`Task ${tarefa} finished!`);
}

function App() {
  const [tarefas, setTarefas] = useState<ITarefa[] | []>([]);
  const [selecionado, setSelecionado] = useState<ITarefa>();

  useEffect(() => {
    requestPermission();
  }, []);

  function selecionaTarefa(tarefaSelecionada: ITarefa) {
    setSelecionado(tarefaSelecionada);
    setTarefas((tarefasAnteriores) =>
      tarefasAnteriores.map((tarefa) => ({
        ...tarefa,
        selecionado: tarefa.id === tarefaSelecionada.id ? true : false,
      }))
    );
  }

  function finalizarTarefa() {
    if (selecionado) {
      setSelecionado(undefined);
      setTarefas((tarefasAnteriores) =>
        tarefasAnteriores.map((tarefa) => {
          if (tarefa.id === selecionado.id) {
            return {
              ...tarefa,
              selecionado: false,
              completado: true,
            };
          }

          return tarefa;
        })
      );
      createNotification(selecionado.tarefa);
    }
  }

  return (
    <div className={style.AppStyle}>
      <Formulario setTarefas={setTarefas} />
      <Lista tarefas={tarefas} selecionaTarefa={selecionaTarefa} />
      <Cronometro selecionado={selecionado} finalizarTarefa={finalizarTarefa} />
    </div>
  );
}

export default App;
