import React from "react";
import { useState, useMemo } from "react";
import { uuid } from "uuidv4";

import "./styles.css";

//https://www.youtube.com/watch?v=CkjhqUbgvHo
//https://github.com/thebikashweb/react-drag-drop-without-library/blob/master/src/pages/ContainerSort.tsx

const initialTodos = [
  {
    id: uuid(),
    name: "t1",
    status: "incomplete"
  },
  {
    id: uuid(),
    name: "t2",
    status: "incomplete"
  },
  {
    id: uuid(),
    name: "t3",
    status: "incomplete"
  }
];

const totalColumns = {
  incomplete: "Incomplete",
  progress: "In progress",
  completed: "Completed ",
  onhold: "Cancelled",
  another: "Just another column"
};

export default function App() {
  const [newtodo, setNewtodo] = useState("");
  const [tasks, setTasks] = useState(initialTodos);
  const [dragIndex, setDragIndex] = useState(initialTodos);

  const columnMap = useMemo(() => {
    return Object.keys(totalColumns);
  }, []);

  function handleSubmit(event) {
    event.preventDefault();

    if (newtodo === undefined || newtodo?.length === 0) return;
    let newTask = { id: uuid(), name: newtodo, status: "incomplete" };
    setTasks([newTask, ...tasks]);
    setNewtodo("");
  }

  function dragStartHandler(i) {
    setDragIndex(i);
  }

  function dragDropHandler(column) {
    console.log("dragDropHandler", column);

    let newtasks = [...tasks];
    const filter = newtasks.find((t) => t.id === dragIndex);
    filter.status = column;
    setTasks(newtasks);
  }

  return (
    <div className="App">
      <main>
        <section>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="todo"
              value={newtodo}
              className="add-new-task"
              onChange={(event) => setNewtodo(event.target.value)}
            />
            <button type="submit">Add</button>
          </form>
        </section>

        <section>
          <div className="container">
            {columnMap.map((c, index) => {
              return (
                <>
                  <div
                    key={index}
                    className="kanban-single-columns"
                    onDrop={() => dragDropHandler(c)}
                    onDragOver={(e) => e.preventDefault()}
                  >
                    <p style={{ textTransform: "capitalize" }}>{c}</p>

                    {tasks.map((t) => {
                      return (
                        t.status === c && (
                          <div className="all-items-container" key={t.id}>
                            <div
                              className="item"
                              draggable
                              onDragStart={() => dragStartHandler(t.id)}
                              onDragOver={(e) => e.preventDefault()}
                            >
                              <i style={{ fontSize: 28 }}>&#9776;</i>
                              <span>{t.name} </span>
                              <button>X</button>
                            </div>
                          </div>
                        )
                      );
                    })}
                  </div>
                </>
              );
            })}
          </div>
        </section>
      </main>
    </div>
  );
}
