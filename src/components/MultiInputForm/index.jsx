import { useState, useRef, useEffect } from 'react';

import styles from './styles.module.css';

const MultiInputForm = ({
  numberOfInputs = 4,
  value,
  onChange,
  inputCharLimit = 1,
  title,
  fontSize = '20px',
  titleColor,
  titleFontSize = '20px',
  placeholder,
}) => {
  const inputArray = Array.from({ length: numberOfInputs });
  const [inputValues, setInputValues] = useState(
    value.split('').map((digit) => Number(digit))
  );

  const inputRef = useRef([]);

  const setInputRef = (index, input) => {
    inputRef.current[index] = input;
  };

  const handleInputChange = (index, event) => {
    const newValue = event.target.value;
    const currentInput = inputRef.current[index];
    const nextInput = inputRef.current[index + 1];

    setInputValues((prevValues) => {
      const newValues = [...prevValues];
      newValues[index] = newValue;
      return newValues;
    });

    if (currentInput.value.length === currentInput.maxLength) {
      if (nextInput) {
        nextInput.focus();
        nextInput.value = newValue;
      }
    }
  };

  const handlePaste = (event, index) => {
    event.preventDefault();

    const pastedText = event.clipboardData.getData('text');
    const newValues = Array.from({ length: numberOfInputs }).map((_, i) => {
      if (i < index) {
        return inputValues[i];
      } else if (i === index) {
        return pastedText.slice(0, inputCharLimit);
      } else if (i < index + pastedText.length) {
        return pastedText.slice(inputCharLimit * i, inputCharLimit * (i + 1));
      } else {
        return inputValues[i - pastedText.length + 1];
      }
    });
    setInputValues(newValues);

    const lastInput = inputRef.current[numberOfInputs - 1];
    if (lastInput) {
      const lastInputLength = lastInput.value.length;
      lastInput.focus();
      lastInput.setSelectionRange(lastInputLength, lastInputLength);
    }
  };

  useEffect(() => {
    onChange(inputValues.join(''));
  }, [inputValues, onChange]);

  const onKeyDown = (event, index) => {
    const key = event.key;
    const currentInput = inputRef.current[index];
    const nextInput = inputRef.current[index + 1];
    const prevInput = inputRef.current[index - 1];

    switch (key) {
      case 'Delete': {
        if (currentInput.selectionStart === currentInput.value.length) {
          setInputValues((prevValues) => {
            const newValues = [...prevValues];
            newValues[index] = '';
            return newValues;
          });
          nextInput && nextInput.focus();
        }
        break;
      }
      case 'Backspace': {
        if (currentInput.selectionStart === 0) {
          setInputValues((prevValues) => {
            const newValues = [...prevValues];
            newValues[index] = '';
            return newValues;
          });

          prevInput && prevInput.focus();
        }
        break;
      }
      case 'ArrowLeft': {
        if (currentInput.selectionStart === 0 && prevInput) {
          event.preventDefault();
          prevInput.focus();
          prevInput.setSelectionRange(
            prevInput.value.length,
            prevInput.value.length
          );
        }
        break;
      }
      case 'ArrowRight': {
        if (
          currentInput.selectionStart === currentInput.value.length &&
          nextInput
        ) {
          nextInput.focus();
        }
        break;
      }

      default: {
        if (event.ctrlKey || event.altKey) return;
        if (key.length > 1) return;
        if (key.match(/^[^0-9]$/)) return event.preventDefault();
      }
    }
  };

  return (
    <form>
      <fieldset className={styles.formGroup}>
        <legend>{title}</legend>
        <label htmlFor='cc-1'>
          <h1
            className={styles.legendText}
            style={{ color: titleColor, fontSize: titleFontSize }}
          >
            {title}
          </h1>
        </label>
        <div className={styles.ccInputsContainer}>
          {inputArray.map((_, index) => (
            <input
              style={{ width: `${inputCharLimit}ch`, fontSize }}
              key={index}
              type='tel'
              maxLength={inputCharLimit}
              aria-label={`Credit card digit ${index + 1}`}
              id={`cc-${index + 1}`}
              required
              pattern={`[0-9]{${inputCharLimit}}`}
              ref={(input) => setInputRef(index, input)}
              value={inputValues[index] || ''}
              onChange={(event) => handleInputChange(index, event)}
              onKeyDown={(event) => onKeyDown(event, index)}
              onPaste={(event) => handlePaste(event, index)}
              placeholder={placeholder}
            />
          ))}
        </div>
      </fieldset>
    </form>
  );
};

export default MultiInputForm;
