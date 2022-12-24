import classes from "./Card.module.css";

const Card = (props) => {
  const classesCard = `${classes.card} ${classes[props.className]}`;
  return <div className={classesCard}>{props.children}</div>;
};

export default Card;
