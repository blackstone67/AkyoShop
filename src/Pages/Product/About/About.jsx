import React, { useState } from 'react';
import classes from './About.module.css';
import { AiFillHeart } from 'react-icons/ai';
import { FiHeart } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { actionsProduct } from '../../../store/productSlice';
import { actionsCart } from '../../../store/cartSlice';
import DialogBuy from '../../../Components/DialogBuy/DialogBuy';
import SelectSize from '../../../Components/UI/Select/SelectSize';
import { useTranslation } from 'react-i18next';

const About = (props) => {
  const [dialogBuy, setDialogBuy] = useState(false);
  const dispatch = useDispatch();
  const image1 = useSelector((state) => state.product.image1);
  const image2 = useSelector((state) => state.product.image2);
  const image3 = useSelector((state) => state.product.image3);
  const image4 = useSelector((state) => state.product.image4);
  const image5 = useSelector((state) => state.product.image5);
  const imageScaled = useSelector((state) => state.product.imageScaled);
  const liked = useSelector((state) => state.product.liked);
  const amount = useSelector((state) => state.product.amount);
  const size = useSelector((state) => state.size.value);
  const { t } = useTranslation();

  const addToCartHandler = async (item) => {
    const newProduct = {
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.images[0].url,
      quality: +amount,
    };

    if (size === '' || size === 'M') newProduct.sizeM = 'M';

    if (size === 'S') newProduct.sizeS = 'S';

    // if (size === 'L') newProduct.sizeL = 'L';

    dispatch(actionsCart.openCart());
    dispatch(actionsCart.addToCartWithQuantity(newProduct));
  };

  return (
    <>
      {dialogBuy && <DialogBuy setDialogBuy={setDialogBuy} />}
      <div className={classes.about}>
        <div className={classes.img}>
          {props.product.length > 0 && (
            <ul>
              <li>
                <img
                  onClick={() => {
                    dispatch(
                      actionsProduct.imageScaledChanged(
                        props.product[0].images[0].url
                      )
                    );
                    dispatch(actionsProduct.image1Changed());
                  }}
                  className={image1 ? classes.opacity : ''}
                  src={`${
                    props.product[0].images[0].url.indexOf('image') !== -1
                      ? `https://backendfashionstore.azurewebsites.net/api/ImageUploads/${props.product[0].images[0].url}`
                      : `https:${props.product[0].images[0].url}`
                  }`}
                  alt="#"
                />
              </li>
              <li>
                <img
                  onClick={() => {
                    dispatch(
                      actionsProduct.imageScaledChanged(
                        props.product[0].images[1].url
                      )
                    );
                    dispatch(actionsProduct.image2Changed());
                  }}
                  className={image2 ? classes.opacity : ''}
                  src={`${
                    props.product[0].images[1].url.indexOf('image') !== -1
                      ? `https://backendfashionstore.azurewebsites.net/api/ImageUploads/${props.product[0].images[1].url}`
                      : `https:${props.product[0].images[1].url}`
                  }`}
                  alt="#"
                />
              </li>
              <li>
                <img
                  onClick={() => {
                    dispatch(
                      actionsProduct.imageScaledChanged(
                        props.product[0].images[2].url
                      )
                    );
                    dispatch(actionsProduct.image3Changed());
                  }}
                  className={image3 ? classes.opacity : ''}
                  src={`${
                    props.product[0].images[2].url.indexOf('image') !== -1
                      ? `https://backendfashionstore.azurewebsites.net/api/ImageUploads/${props.product[0].images[2].url}`
                      : `https:${props.product[0].images[2].url}`
                  }`}
                  alt="#"
                />
              </li>
              <li>
                <img
                  onClick={() => {
                    dispatch(
                      actionsProduct.imageScaledChanged(
                        props.product[0].images[3].url
                      )
                    );
                    dispatch(actionsProduct.image4Changed());
                  }}
                  className={image4 ? classes.opacity : ''}
                  src={`${
                    props.product[0].images[3].url.indexOf('image') !== -1
                      ? `https://backendfashionstore.azurewebsites.net/api/ImageUploads/${props.product[0].images[3].url}`
                      : `https:${props.product[0].images[3].url}`
                  }`}
                  alt="#"
                />
              </li>
              <li>
                <img
                  onClick={() => {
                    dispatch(
                      actionsProduct.imageScaledChanged(
                        props.product[0].images[4].url
                      )
                    );
                    dispatch(actionsProduct.image5Changed());
                  }}
                  className={image5 ? classes.opacity : ''}
                  src={`${
                    props.product[0].images[4].url.indexOf('image') !== -1
                      ? `https://backendfashionstore.azurewebsites.net/api/ImageUploads/${props.product[0].images[4].url}`
                      : `https:${props.product[0].images[4].url}`
                  }`}
                  alt="#"
                />
              </li>
            </ul>
          )}
          {props.product.length > 0 && (
            <div className={classes.imgMain}>
              <img
                src={`${
                  imageScaled.indexOf('image_') !== -1
                    ? `https://backendfashionstore.azurewebsites.net/api/ImageUploads/${imageScaled}`
                    : `https:${imageScaled}`
                }`}
                alt="#"
              />
            </div>
          )}
        </div>
        <div className={classes.info}>
          <h6>{props.product[0].name}</h6>
          {props.product.length > 0 && (
            <p className={classes.price}>
              {props.product[0].price / 1000}.000₫
            </p>
          )}
          <div className={classes.size}>
            <SelectSize />
          </div>
          <div className={classes.groupActions}>
            <div className={classes.amount}>
              <button
                className={classes.decrease}
                onClick={() => dispatch(actionsProduct.amountToDecrement())}
              >
                -
              </button>
              <input
                type="text"
                value={amount}
                onChange={(e) =>
                  dispatch(actionsProduct.amountChanged(e.target.value))
                }
              />
              <button
                className={classes.increase}
                onClick={() => dispatch(actionsProduct.amountToIncrement())}
              >
                +
              </button>
            </div>
            <button
              className={classes.add}
              onClick={() => addToCartHandler(props.product[0])}
            >
              {t('addButtonCart')}
            </button>
            <div className={classes.icon}>
              {liked ? (
                <AiFillHeart
                  onClick={() => dispatch(actionsProduct.changedLiked())}
                />
              ) : (
                <FiHeart
                  onClick={() => dispatch(actionsProduct.changedLiked())}
                />
              )}
            </div>
          </div>
          <div className={classes.description}>
            <span style={{ marginRight: '1rem' }}>{t('descSize')}</span>
            <span onClick={() => setDialogBuy(true)}>{t('titleBuy')}</span>
          </div>
          <div>
            <p>
              {t('category')}: <span>ÁO</span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
