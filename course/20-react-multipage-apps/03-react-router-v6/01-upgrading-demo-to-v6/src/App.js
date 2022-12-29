import { Route, Routes, Navigate } from "react-router-dom";

import Welcome from "./pages/Welcome";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import MainHeader from "./components/MainHeader";

function App() {
  return (
    <div>
      <MainHeader />
      <main>
        <Routes>
          {/*
            //| NB in v6 is Routes, in v5 is Switch
            //| NB in v6 you define the component that should be loaded on a specific route with the element prop, not with a child
            //| NB you can remove the exact prop because with v6 it is the default (if you want the old behavior you cane get that by adding /* after the path: path="/products/*" )
            //| NB redirecting: we can still redirect, but the component to be used is Navigate instead of Redirect (add replace prop to replace the current page, remove replace to push the current page)
          */}
          <Route path="/" element={<Navigate replace to="/welcome" />} />

          {/*
            //| NB NESTED ROUTES:
            //# OPTION 1
          */}
          {/* <Route path="/welcome/*" element={<Welcome />} /> */}

          {/*
            //| NB NESTED ROUTES:
            //# OPTION 2
          */}
          <Route path="/welcome" element={<Welcome />}>
            <Route path="new-user" element={<p>Welcome, new user!</p>}></Route>
          </Route>

          <Route path="/products" element={<Products />} />
          <Route path="/products/:productId" element={<ProductDetail />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;

// our-domain.com/welcome => Welcome Component
// our-domain.com/products => Products Component
// our-domain.com/product-detail/a-book
