import {useState} from 'react'
type InitialState = {
  name?: string,
  email?: string,
  password?: string,
  amount?: number | string,
  category?: string,
  comments?: string,
  createdAt?: string
}

const INITIAL_STATE = {
  name: '',
  email: "",
  password: '',
  amount: '',
  category: '',
  comments: '',
}

const useForm = (initialState: InitialState = INITIAL_STATE) => {
  const [inputs, setInputs] = useState(initialState)

  const handleChange = e => {
    let {value, name, type} = e.target;
    if (type === 'number') {
      value = parseFloat(value)
    }
    setInputs({
      ...inputs,
      [name]: value
    }) 
  }
  const reset = () => setInputs(INITIAL_STATE);

  return {inputs, handleChange, reset}
}

export default useForm;