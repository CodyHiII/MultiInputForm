import { useState } from 'react';
import MultiInputForm from 'components/MultiInputForm';

import styles from './styles.module.css';

const Display = () => {
  const [cardNumber, setCardNumber] = useState('');
  const [cvv, setCvv] = useState('');
  const [twoFACode, setTwoFACode] = useState('');

  const months = [
    {
      value: '01',
      option: '01',
    },
    {
      value: '02',
      option: '02',
    },
    {
      value: '03',
      option: '03',
    },
    {
      value: '04',
      option: '04',
    },
    {
      value: '05',
      option: '05',
    },
    {
      value: '06',
      option: '06',
    },
    {
      value: '07',
      option: '07',
    },
    {
      value: '08',
      option: '08',
    },
    {
      value: '09',
      option: '09',
    },
    {
      value: '11',
      option: '11',
    },
    {
      value: '12',
      option: '12',
    },
  ];

  const getExpirationYears = () => {
    const currentYear = new Date().getFullYear();
    const expirationYears = [];

    for (let i = 0; i <= 10; i++) {
      const year = currentYear + i;
      expirationYears.push(
        <option key={year} value={year}>
          {year}
        </option>
      );
    }

    return expirationYears;
  };

  return (
    <div className={styles.container}>
      <div className={styles.creditCardContainer}>
        <div className={styles.creditCard}>
          <div className={styles.shapesContainer}>
            <div className={styles.cardShape1} />
            <div className={styles.cardShape2} />
            <div className={styles.cardShape3} />
          </div>
          <div className={styles.creditCardHeader}>
            <h1 className={styles.bank}>Bank</h1>
          </div>
          <div className={styles.cardNumberInputContainer}>
            <MultiInputForm
              title='Card Number'
              titleColor='#e7f2f3'
              numberOfInputs='4'
              value={cardNumber}
              onChange={setCardNumber}
              inputCharLimit={3}
              fontSize='25px'
              placeholder='123'
            />
          </div>
          <div className={styles.creditCardFooter}>
            <div className={styles.dateContainer}>
              <div className={styles.expirationDate}>
                <p className={styles.expirationDateTitle}>Expiration Date</p>
                <select className={styles.select}>
                  {months.map((month, index) => (
                    <option key={index} value={month.value}>
                      {month.option}
                    </option>
                  ))}
                </select>
                <select className={styles.select}>
                  {getExpirationYears()}
                </select>
              </div>
            </div>
            <div className={styles.cvv}>
              <MultiInputForm
                title='CVV'
                titleColor='#e7f2f3'
                numberOfInputs='1'
                value={cvv}
                onChange={setCvv}
                inputCharLimit={3}
                fontSize='20px'
                titleFontSize='16px'
                placeholder='899'
              />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.twoFAContainer}>
        <div className={styles.twoFACard}>
          <h1 className={styles.twoFATitle}>Two-step authentication</h1>
          <p className={styles.twoFASubtitle}>
            Enter the two-step authentication code below
          </p>
          <MultiInputForm
            numberOfInputs='6'
            value={twoFACode}
            onChange={setTwoFACode}
            inputCharLimit={1}
            fontSize='30px'
            placeholder='123'
          />
          <button className={styles.loginBtn}>Login</button>
        </div>
      </div>
    </div>
  );
};

export default Display;
