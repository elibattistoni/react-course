import { useCallback, useState } from "react";

import Section from "../UI/Section";
import TaskForm from "./TaskForm";

import useHttp from "../../hooks/use-http";

const NewTask = (props) => {
  //- refactoring with useHttp hook
  /*
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const enterTaskHandler = async (taskText) => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(
          'https://tasks-react-app-8d171-default-rtdb.europe-west1.firebasedatabase.app/tasks.json',
          {
            method: 'POST',
            body: JSON.stringify({ text: taskText }),
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        if (!response.ok) {
          throw new Error('Request failed!');
        }

        const data = await response.json();

        const generatedId = data.name; // firebase-specific => "name" contains generated id
        const createdTask = { id: generatedId, text: taskText };

        props.onAddTask(createdTask);
      } catch (err) {
        setError(err.message || 'Something went wrong!');
      }
      setIsLoading(false);
    };
    */
  const { isLoading, error, sendRequest: sendTaskRequest } = useHttp();

  const createTask = (taskText, data) => {
    const generatedId = data.name; // firebase-specific => "name" contains generated id
    const createdTask = { id: generatedId, text: taskText };
    props.onAddTask(createdTask);
  };

  const enterTaskHandler = async (taskText) => {
    sendTaskRequest(
      {
        url: "https://tasks-react-app-8d171-default-rtdb.europe-west1.firebasedatabase.app/tasks.json",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: { text: taskText },
      },
      createTask.bind(null, taskText)
    );
  };

  return (
    <Section>
      <TaskForm onEnterTask={enterTaskHandler} loading={isLoading} />
      {error && <p>{error}</p>}
    </Section>
  );
};

export default NewTask;

//NB more about bind event execution https://academind.com/tutorials/function-bind-event-execution
