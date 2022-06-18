import React from 'react';
import About from './About/About';
import Description from './Description/Description';
import Footer from '../../Components/Footer/Footer';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { actionsProduct } from '../../store/productSlice';
import { actionsSize } from '../../store/sizeSlice';
import { actionsHome } from '../../store/homeSlice';

const Product = () => {
  const params = useParams();
  const dispatch = useDispatch();

  const { productId } = params;

  const productHome = useSelector((state) => state.home.productHome);

  const product = productHome.filter((item) => item.id === +productId);

  useEffect(() => {
    dispatch(actionsHome.setIsLogin());
    if (product.length > 0) {
      dispatch(actionsProduct.imageScaledChanged(product[0].images[0].url));
    }
    dispatch(actionsProduct.defaultProduct());
    dispatch(actionsSize.clearSize());
  }, [productId, dispatch, product]);

  return (
    <>
      {product.length > 0 && <About product={product} />}
      <Description />
      <Footer />
    </>
  );
};

export default Product;
