import { useParams } from "react-router-dom";
//% useParams is a cutom hook developed by the React Router team

const ProductDetail = () => {
  //% use the useParams hook to get a params object (keys == dynamic segments leading to a page, in our case is "/:productId" cfr App.js)
  const params = useParams();

  return (
    <section>
      <h1>Product Detail</h1>
      <p>{params.productId}</p>
    </section>
  );
};

export default ProductDetail;
