import { useState } from "react";

const useForm = () => {
  const [ values, setValues ] = useState({ });
  const [ isLoading, setLoading ] = useState(false);

  const handleChange = (event) => {
    setValues({...values, [event.target.name] : event.target.value});
  };

  const handleSubmit = callback => async event => {
    event.preventDefault();
    setLoading(true);
    await callback();
    setLoading(false);
  };
  return [{ values, isLoading }, handleChange, handleSubmit];
};

export default useForm;