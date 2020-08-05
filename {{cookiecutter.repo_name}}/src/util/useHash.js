import { useState } from 'react';

// This hook is used for setting and managing the query hash of the url

const useHash = (initialValue = null) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.location.hash;
      return item ? item.slice(1) : initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });
  const setValue = value => {
    try {
      setStoredValue(value);
      history.pushState(null, null, `#${value}`); //eslint-disable-line
    } catch (error) {
      console.log(error);
    }
  };
  return [storedValue, setValue];
};

export default useHash;
