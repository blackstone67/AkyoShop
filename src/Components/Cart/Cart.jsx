import { Avatar } from '@material-ui/core';
import React from 'react';
import { GrClose } from 'react-icons/gr';
import classes from './Cart.module.css';
import Drawer from '@material-ui/core/Drawer';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { actionsCart } from '../../store/cartSlice';
import { useTranslation } from 'react-i18next';

const Cart = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const productCart = useSelector((state) => state.cart.productCart);
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const { t } = useTranslation();

  let handleAmount = '';
  if (totalAmount / 1000 > 1000) {
    handleAmount = `${Math.floor(totalAmount / 1000 / 1000)}.${
      (totalAmount / 1000) % 1000
    }`;
  }

  const removeCartHandler = (id) => {
    dispatch(actionsCart.deleteCart(id));
  };

  return (
    <Drawer
      anchor={'right'}
      open={true}
      onClose={() => dispatch(actionsCart.closeCart())}
      role="presentation"
    >
      <div className={classes.cart}>
        <div className={classes.header_cart}>
          <div className={classes.close}>
            <GrClose onClick={() => dispatch(actionsCart.closeCart())} />
          </div>
          <div className={classes.card}>{t('cart')}</div>
        </div>
        {productCart.length === 0 && (
          <p className={classes.titleEmpty}>
            Không có sản phẩm nào trong giỏ hàng.
          </p>
        )}
        {productCart.length > 0 && (
          <>
            {productCart.map((item) => (
              <div className={classes.cart_info} key={item.id}>
                <div className={classes.product}>
                  <div className={classes.avatar}>
                    {item.image.indexOf('image') !== -1 ? (
                      <Avatar
                        alt="Remy Sharp"
                        variant="square"
                        style={{
                          width: '100%',
                          height: '100%',
                        }}
                        src={`https://backendfashionstore.azurewebsites.net/api/ImageUploads/${item.image}`}
                      />
                    ) : (
                      <Avatar
                        alt="Remy Sharp"
                        variant="square"
                        style={{
                          width: '100%',
                          height: '100%',
                        }}
                        src={`https:${item.image}`}
                      />
                    )}
                  </div>
                  <div className={classes.info}>
                    <div className={classes.name}>
                      {item.name} - Size : {item.sizeS || ''} {item.sizeM || ''}{' '}
                      {item.sizeL || ''}
                    </div>
                    <div className={classes.price}>
                      {item.quality} x {item.price / 1000}.000₫
                    </div>
                  </div>
                </div>
                <div
                  className={classes.closeProduct}
                  onClick={() => removeCartHandler(item.id)}
                >
                  <GrClose />
                </div>
              </div>
            ))}

            <div className={classes.amount}>
              <div>{t('totalAmount')}: </div>
              <div>
                {Math.floor(totalAmount / 1000000) > 0
                  ? handleAmount
                  : totalAmount / 1000}
                {totalAmount !== 0 && <span>.000đ</span>}
              </div>
            </div>
            <div className={classes.actions}>
              <button>{t('showCart')}</button>
              <button
                onClick={() => {
                  dispatch(actionsCart.closeCart());
                  history.push('/checkout');
                }}
              >
                {t('payment')}{' '}
              </button>
              <button onClick={() => dispatch(actionsCart.closeCart())}>
                {t('continueBuy')}
              </button>
            </div>
          </>
        )}
      </div>
    </Drawer>
  );
};

export default Cart;
