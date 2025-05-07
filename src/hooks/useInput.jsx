import { useState } from 'react';

function useInput(defaultValue = '') {
  const [value, setValue] = useState(defaultValue);

  function handleValueChange({ target }) {
    setValue(target.value);
  }

  function reset() {
    setValue(defaultValue);
  }

  return [value, handleValueChange, reset];
}


export { useInput };