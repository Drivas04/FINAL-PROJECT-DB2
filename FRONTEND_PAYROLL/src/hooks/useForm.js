import { useState } from "react";

export const useForm = (initialForm) => {

    const [formState, setFormState] = useState(initialForm);

    const onInputChange = ({target}) => {
        const {name, value} = target;
        setFormState({
            ...formState,
            [name]: value
        })
    }

    const onNumberInputChange = ({target}) => {
        const {name, value} = target;
        
        if (/^\d*$/.test(value)) {
          setFormState({
            ...formState,
            [name]: value
        })
        }
    }

  return {
    formState, 
    onInputChange,
    onNumberInputChange,
    setFormState
  }
}
