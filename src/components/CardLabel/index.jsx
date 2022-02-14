import React from 'react';
import styles from "./CardLabel.module.css";

const CardLabel = ({ item }) => {
  
  return (
    <div className={styles.card_label} style={{ backgroundColor: `${item.color}` }}>
      {item.value}
    </div>
  )
}

export { CardLabel };