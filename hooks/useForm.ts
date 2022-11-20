import { useState } from 'react';

const useForm = <T>(initialState: T) => {
  const [form, setForm] = useState(initialState);

  const formValueHandler = (key: string, enteredText: string) => {
    setForm((prev) => ({ ...prev, [key]: enteredText }));
  };

  const resetForm = () => {
    setForm(initialState);
  };

  return {
    ...form,
    form,
    formValueHandler,
    resetForm,
    setForm
  };
};
export default useForm;
