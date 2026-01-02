import { useAuth } from "@/lib/auth-context";
import { setProducts, setSliding_products } from "@/store/product.slice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const ContextRedux = () => {
  const { products, sliding_products } = useAuth();
  const dispatch = useDispatch();

  useEffect(() => {
    if (products?.length) dispatch(setProducts(products));
    if (sliding_products?.length)
      dispatch(setSliding_products(sliding_products));
  }, [products, dispatch, sliding_products]);

  return null;
};

export default ContextRedux;
