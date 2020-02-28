import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object({
    name: Yup.string().required('Required'),
    email: Yup.string().required('Required'),
    password: Yup.string().required('Required')
});

export default function UserForm() {
    const { handleSubmit, handleChange, values, errors } = useFormik({
      initialValues: {
        name: "",
        email: "",
        password: ""
      }, 
      validationSchema,
      onSubmit(values, tools) {
          console.log(values, tools);
      } 
    });
    return (
        <form onSubmit={ handleSubmit }>
            <input name="name" type="text" placeholder="Full Name" onChange={ handleChange } values={ values.name } />
            { errors.name }

            <input name="email" type="email" placeholder="Email" onChange={ handleChange } values={ values.email }/>
            { errors.email }

            <input name="password" type="password" placeholder="Password" onChange={ handleChange } values={ values.password } /> 
            { errors.password }

            <button type="submit">Submit</button>
        </form>
            ); // End return
} // End Function