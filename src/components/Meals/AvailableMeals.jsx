import React, { useEffect, useState } from "react";

import classes from "./AvailableMeals.module.css";
import MealItem from "./MealItem/MealItem";
import Card from "../UI/Card";

const AvailableMeals = () => {
  const [dummyMeals, setDummyMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMeals = async () => {
    const response = await fetch('https://foodnstuff-1aa70-default-rtdb.firebaseio.com/DUMMY_DATA.json');

    if (!response.ok) {
      throw new Error('Something went wrong!');
    }

    const data = await response.json();

    const LOADED_DATA = [];
  
    for (const key in data) {
      LOADED_DATA.push({
        id: key,
        name: data[key].Name,
        description: data[key].Description,
        price: data[key].Price,
      });
    }
    
    setDummyMeals(LOADED_DATA);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchMeals().catch(error => {
      setIsLoading(false);
    setError(error.message);
    });
  }, []);

  if (isLoading === true) {
    return <h2 className={classes.meals_loading}>Loading...</h2>
  }

  if (error) {
    return <section className={classes.meals_error}>
      <p>{error}</p>
    </section>
  }

  const mealsList = dummyMeals.map((meal) => (
    <li key={meal.id}>
      <MealItem
        id={meal.id}
        name={meal.name}
        description={meal.description}
        price={meal.price}
      />
    </li>
  ));

  return (
    <Card className={classes.meals}>
      <ul>{mealsList}</ul>
    </Card>
  );
};

export default AvailableMeals;
