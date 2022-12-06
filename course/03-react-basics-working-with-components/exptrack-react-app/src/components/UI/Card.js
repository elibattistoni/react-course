import "./Card.css";

function Card(props) {
  const classes = "card " + props.className; //NB you need to do this if you want to be able to add a className attribute to the custom component when you call it
  return <div className={classes}>{props.children}</div>;
}

export default Card;

// NB children is a reserved name. you must not write it as an attribute of a component
// IMPORTANT the value of this special children props will always be the content between the opening and closing tags of your custom component
// so in Card.js the content between the opening and closing tag of our Card custom component will be available on props.children inside of this card here
