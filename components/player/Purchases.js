import React from 'react';
import { Spinner } from 'react-bootstrap';
import useTranslation from 'next-translate/useTranslation';

import Lock from './Lock';
import acSvg from '../../public/svgs/icons/ac-round.svg';
import styles from '../../styles/Player.module.css';

function PurchaseElement(props) {
  const {
    className, icon, img, title, description,
  } = props;

  return (
    <div className={`d-flex flex-column flex-sm-row align-items-center justify-content-between justify-content-md-start w-100 ${className}`}>
      <div className="mr-0 mr-sm-3 mb-1 mb-sm-0">
        {
          icon
            ? <i className={`fas fa-${icon} fa-3x ${styles['text-gr-primary']}`} />
            : <img width="54" src={img} alt="" />
        }
      </div>
      <div className="text-center text-sm-left">
        <div><b>{title}</b></div>
        <div>{description}</div>
      </div>
    </div>
  );
}

function Purchase({ date, price, product }) {
  const { t } = useTranslation();
  const matchVip = product.match(/VIP - \d*/);
  const matchAddedCoins = price.match(/-\d*/);
  const productDesciption = matchVip ? `${product} days` : `Skin - ${product}`;
  const printedPrice = `${matchAddedCoins ? `+ ${price.substring(1)}` : `- ${price}`} Armory Coins`;
  return (
    <div className="card bg-darker">
      <div className="d-flex flex-column flex-md-row align-items-center justify-content-between jus">
        <PurchaseElement title={t('player:purchases.date')} description={date} icon="calendar-alt" />
        <PurchaseElement className="mt-3 mt-md-0" title={t('player:purchases.ac')} description={printedPrice} img={acSvg} />
        <PurchaseElement className="mt-3 mt-md-0" title={t('player:purchases.item')} description={productDesciption} icon="tag" />
      </div>
    </div>
  );
}

function PurchasesContent({ purchases }) {
  const { t } = useTranslation();
  if (purchases.length === 0) {
    return (
      <div style={{ height: 270 }} className="d-flex text-white align-items-center justify-content-center">
        {t('player:purchases.noPurchase')}
      </div>
    );
  }
  return (
    <div className={styles['card-padding']} style={{ height: 270, overflow: 'auto' }}>
      {
        purchases.map((purchase) => (
          <Purchase
            key={+new Date(purchase.date)}
            date={new Date(purchase.date).toLocaleDateString()}
            price={purchase.price.toString()}
            product={purchase.product}
          />
        ))
      }
    </div>
  );
}

export default function Purchases({ profileInfo }) {
  const { t } = useTranslation();
  const Content = () => {
    if (!profileInfo) {
      return (
        <div className="d-flex h-100 align-items-center justify-content-center">
          <Spinner variant="white" animation="border" />
        </div>
      );
    }
    return <PurchasesContent purchases={profileInfo.purchases} />;
  };

  return (
    <div className="col-xl-8">
      <div className="card mt-4 shadow card-accent">
        <div className="d-flex align-items-center justify-content-between mb-3 text-white">
          <h3>{t('player:purchases.title')}</h3>
          <Lock id="purchases" />
        </div>
        <Content />
      </div>
    </div>
  );
}
