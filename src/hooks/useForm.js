import { useState } from "react";

const useForm = (initialValues) => {
  const [form, setForm] = useState(initialValues);

  const handleChange = ({ target }) => {
    const { name, value, type, checked } = target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleReset = () => {
    setForm(initialValues);
  };
  return {
    form,
    setForm,
    handleChange,
    handleReset,
  };
};
export default useForm;
