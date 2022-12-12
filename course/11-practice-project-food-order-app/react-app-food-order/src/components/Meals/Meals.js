/*
the Meals component is responsible for rendering the list of meals + a summary text above it.
therefore we create 2 other components: the MealsSummary and the AvailableMeals

the MealsSummary component renders the text above the list of meals
the AvailableMeals component renders the actual list of meals
*/

import { Fragment } from "react";
import AvailableMeals from "./AvailableMeals";
import MealsSummary from "./MealsSummary";

const Meals = (props) => {
  return (
    <Fragment>
      <MealsSummary />
      <AvailableMeals />
    </Fragment>
  );
};

export default Meals;
