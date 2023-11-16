// src/app/components/CustomAlert/CustomAlert.js
import React, { useState, useEffect } from 'react';
import styles from './CustomAlert.module.css';

const CustomAlert = ({ message, type, onClose }) => {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => Math.max(0, prev - (100 / 6000) * 100));
    }, 100);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const getAlertStyle = () => {
    switch (type) {
      case 'success':
        return styles.success;
      case 'error':
        return styles.error;
      case 'announcement':
        return styles.announcement;
      default:
        return styles.default;
    }
  };

  return (
    <div className={`${getAlertStyle()} ${visible ? styles.alert : styles.hidden}`}>
      <p>{message}</p>
      <div className={styles.progressBarContainer}>
        <div className={styles.progressBar} style={{ width: `${progress}%` }} />
      </div>
      <button className={styles.closeButton} onClick={() => { setVisible(false); onClose(); }}>Close</button>
    </div>
  );
};

export default CustomAlert;
