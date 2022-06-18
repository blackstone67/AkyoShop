import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classes from './Description.module.css';
import { AiOutlinePlus } from 'react-icons/ai';
import { actionsProduct } from '../../../store/productSlice';
import { useTranslation } from 'react-i18next';

const Description = () => {
  const description = useSelector((state) => state.product.description);
  const info = useSelector((state) => state.product.info);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  return (
    <div className={classes.description}>
      <div className={classes.description_info}>
        <div className={classes['description_info--container']}>
          <h3>{t('description')}</h3>
          <div
            className={classes.boxDecrease}
            onClick={() => dispatch(actionsProduct.changedDescription())}
          >
            {description ? (
              <AiOutlinePlus />
            ) : (
              <div className={classes.decrease}></div>
            )}
          </div>
        </div>
        {!description && (
          <div className={classes['description_info--list']}>
            {/* <div>
              <h4>{t('infoPro')}</h4>
              <ul>
                <li>{t('product')}: Playsuit</li>
                <li>{t('origin')}: Việt Nam</li>
                <li>{t('color')}: Hồng</li>
              </ul>
            </div> */}
            <div>
              <h4>{t('infoSize')}</h4>
              <ul>
                <li>{t('sizeS')}</li>
                <li>{t('sizeM')}</li>
              </ul>
              <p>{t('pleaseInfo')}</p>
            </div>
            <div>
              <h4>{t('storageInfo')}</h4>
              <ul>
                <li>{t('storage1')}</li>
                <li>{t('storage2')}</li>
                <li>{t('storage3')}</li>
              </ul>
            </div>
            <div>
              <h4>{t('commitment')}</h4>
              <ul>
                <li>{t('commit1')}</li>
                <li>{t('commit2')}</li>
              </ul>
            </div>
            <div>
              <h4>{t('purchase')}</h4>
              <ul>
                <li>{t('purchaseInfo')}</li>
              </ul>
            </div>
          </div>
        )}
      </div>
      <div className={classes.description_info}>
        <div className={classes['description_info--container']}>
          <h3>{t('addInfo')}</h3>
          {/* <div className={classes.increase}></div> */}
          <div
            className={classes.boxDecrease}
            onClick={() => dispatch(actionsProduct.changedInfo())}
          >
            {info ? (
              <AiOutlinePlus />
            ) : (
              <div className={classes.decrease}></div>
            )}
          </div>
        </div>
        {!info && (
          <div className={classes.table}>
            <div className={classes.size}>{t('size')}</div>
            <div className={classes.sizeResult}>S, M</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Description;
