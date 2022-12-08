import classes from "./Card.module.css";

const Card = (props) => {
  // NB I want to apply 2 css classes: one coming from the Card.module.css (i.e. classes.card) and one coming from outside, when you call the Card component coming via props
  // NB why does it come via props? because custom components are only able to work via props
  // NB all the built in HTML components (div, label, form,...) are all pre-configured by React to work with the className prop (and to then apply a fitting CSS class to the underlying rendered HTML node)
  // NB props.className: we use "className" and not another name so that we are able to use our own custom components like with regular HTML components

  return (
    <div className={`${classes.card} ${props.className}`}>{props.children}</div>
  );
};

export default Card;
