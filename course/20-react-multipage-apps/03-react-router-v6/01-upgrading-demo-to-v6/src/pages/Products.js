import { Link, useNavigate } from "react-router-dom";

// Please note:
// <Link to="/products/p1" ... could also be written as
// <Link to="p1" ... with React Router v6

const Products = () => {
  //% programmatic navigation with react router v6
  const navigate = useNavigate();
  //| if you want to programmatically navigate to /welcome:
  //| NB you should not do this inside a component like this, but in a useEffect or when an HTTP request has finished
  //# navigate("/welcome")
  //| if you want to redirect:
  //# navigate("/welcome", {replace: true})
  //| NB to go back to the previous page
  //# navigate(-1)
  //| NB to go back to the previous previous page
  //# navigate(-2)
  //| NB to go forward again
  //# navigate(1)

  return (
    <section>
      <h1>The Products Page</h1>
      <ul>
        <li>
          <Link to="/products/p1">A Book</Link>
        </li>
        <li>
          <Link to="/products/p2">A Carpet</Link>
        </li>
        <li>
          <Link to="/products/p3">An Online Course</Link>
        </li>
      </ul>
    </section>
  );
};

export default Products;
