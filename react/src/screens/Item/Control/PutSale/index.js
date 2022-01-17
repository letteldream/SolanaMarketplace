import React, { useState } from "react";
import cn from "classnames";
import styles from "./PutSale.module.sass";
import Icon from "../../../../components/Icon";
import Switch from "../../../../components/Switch";
import Modal from "../../../../components/Modal";

const items = [
  {
    title: "Service fee",
    value: 1.5,
    symbol: '%'
  },
  {
    title: "Total bid amount",
    value: 0,
    symbol:"ETH"
  },
];

const PutSale = ({ className }) => {
  const [price, setPrice] = useState(false);
  const [visibleModalSale, setVisibleModalSale] = useState(false);
  const [visibleModalConfirm, setVisibleModalConfirm] = useState(false);
  const [saleValue, setBidSale] = useState(0);

  return (
    <div className={cn(className, styles.sale)}>
      <div className={cn("h4", styles.title)}>Put on sale</div>
      <div className={styles.line}>
        <div className={styles.icon}>
          <Icon name="coin" size="24" />
        </div>
        <div className={styles.details}>
          <div className={styles.info}>Instant sale price</div>
          <div className={styles.text}>
            Enter the price for which the item will be instanly sold
          </div>
        </div>
        <Switch className={styles.switch} value={price} setValue={setPrice} />
      </div>
      <div className={styles.row}>
        <input className={styles.inputSale}
          placeholder="Enter your price"
          value = {saleValue}
          onChange={(e) => setBidSale(e.target.value)}/>
        <div className={styles.col}></div>
      </div>
      <div className={styles.table}>
        {items.map((x, index) => (
          <div className={styles.row} key={index}>
            <div className={styles.col}>{x.title}</div>
            <div className={styles.col}>{index == 1 ? parseFloat(x.value) + parseFloat(saleValue) : x.value}</div>
            <div className={styles.col}>{x.symbol}</div>
          </div>
        ))}
      </div>
      <div className={styles.btns}>
        <button className={cn("button", styles.button)} onClick={() => setVisibleModalConfirm(true)}>Continue</button>
        <button className={cn("button-stroke", styles.button)} onClick={() => setVisibleModalSale(true)}>Cancel</button>
      </div>
      <Modal 
        visible={visibleModalSale}
      />
       <Modal
        visible={visibleModalConfirm}
        onClose={() => setVisibleModalConfirm(false)}
      >Successfully be sold!</Modal> 
    </div>
  );
};

export default PutSale;
