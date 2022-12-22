import React, { useCallback, useEffect, useState } from "react";

import Tasks from "./components/Tasks/Tasks";
import NewTask from "./components/NewTask/NewTask";
import useHttp from "./hooks/use-http";

function App() {
  const [tasks, setTasks] = useState([]);

  //- refactoring with useHttp hook
  /*
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const fetchTasks = async (taskText) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
          "https://tasks-react-app-8d171-default-rtdb.europe-west1.firebasedatabase.app/tasks.json"
      );

      if (!response.ok) {
        throw new Error('Request failed!');
      }

      const data = await response.json();

      const loadedTasks = [];

      for (const taskKey in data) {
        loadedTasks.push({ id: taskKey, text: data[taskKey].text });
      }

      setTasks(loadedTasks);
    } catch (err) {
      setError(err.message || 'Something went wrong!');
    }
    setIsLoading(false);
  };
  useEffect(() => {
    fetchTasks();
  }, []);
  */

  const transformTasks = useCallback((data) => {
    const loadedTasks = [];
    for (const taskKey in data) {
      loadedTasks.push({ id: taskKey, text: data[taskKey].text });
    }
    setTasks(loadedTasks);
  }, []);

  // call custom hook
  const { isLoading, error, sendRequest: fetchTasks } = useHttp(transformTasks);

  useEffect(() => {
    fetchTasks({
      url: "https://tasks-react-app-8d171-default-rtdb.europe-west1.firebasedatabase.app/tasks.json",
    });
  }, [fetchTasks]);

  const taskAddHandler = (task) => {
    setTasks((prevTasks) => prevTasks.concat(task));
  };

  return (
    <React.Fragment>
      {/*<NewTask onAddTask={taskAddHandler} />*/}
      <Tasks
        items={tasks}
        loading={isLoading}
        error={error}
        onFetch={fetchTasks}
      />
    </React.Fragment>
  );
}

export default App;
