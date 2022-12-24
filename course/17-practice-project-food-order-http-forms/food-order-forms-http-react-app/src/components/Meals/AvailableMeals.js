import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import Spinner from "../UI/Spinner";
import classes from "./AvailableMeals.module.css";
import { useCallback, useEffect, useState } from "react";

const AvailableMeals = () => {
  //| set states
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  //| set request url
  const firebaseAPIurlDB = `${process.env.REACT_APP_URL_FIREBASE_API}${process.env.REACT_APP_FIREBASE_TABLE}`;

  //| function for loading the meals
  const fetchMealsHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null); // to make sure that previous error is cleaned
    try {
      const response = await fetch(firebaseAPIurlDB);
      if (!response.ok)
        throw new Error(`${response.status} Error during fetch`);

      const data = await response.json();

      const results = [];
      for (const [mealId, mealData] of Object.entries(data)) {
        results.push({
          id: mealId,
          name: mealData.name,
          description: mealData.description,
          price: mealData.price,
        });
      }
      setMeals(results);
    } catch (err) {
      setError(`💥💥 ${err.message}`);
    }

    setIsLoading(false);
  }, []);

  //| send request and load meals immediately when page is loaded and component is rendered for the first time
  useEffect(() => {
    fetchMealsHandler();
  }, []);

  //| define content
  let classesCard = "card--center-items";
  let content;
  if (isLoading) {
    content = <Spinner />;
  } else {
    if (error) {
      content = <p>{error}</p>;
    } else {
      if (meals.length === 0) {
        content = <p>No meals found.</p>;
      } else {
        classesCard = "";
        const mealsList = meals.map((meal) => (
          <MealItem
            key={meal.id}
            id={meal.id}
            name={meal.name}
            description={meal.description}
            price={meal.price}
          />
        ));
        content = <ul>{mealsList}</ul>;
      }
    }
  }

  return (
    <section className={classes.meals}>
      <Card className={classesCard}>{content}</Card>
    </section>
  );
};

export default AvailableMeals;
