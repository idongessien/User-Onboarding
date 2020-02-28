import React, { useEffect, useState } from 'react';
import { withFormik, Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const UserForm = ({ errors, status, touched, values }) => {
    const[users, setUsers] = useState([]);
    
    useEffect(() => {
        console.log("status changed", status);
        status && setUsers(users => [...users, status])
    }, [status]);

    return (
        <div>
            <Form>
                <label htmlFor = "name">
                    Name:
                    <Field 
                        id = "name"
                        type = "text"
                        name = "name"
                        placeholder = "Name..."
                    />
                    { touched.name && errors.name && (
                        <h4>{ errors.name }</h4>
                    )}
                </label>

                <label htmlFor = "email">
                    Email:
                    <Field 
                        id = "email"
                        type = "email"
                        name = "email"
                        placeholder = "Email..."
                    />
                    { touched.email && errors.email && (
                        <h4>{ errors.email }</h4>
                    )}
                </label>

                <label htmlFor = "password">
                    Password:
                    <Field 
                        id = "password"
                        type = "password"
                        name = "password"
                        placeholder = "Password..."
                    />
                    { touched.password && errors.password && (
                        <h4>{ errors.password }</h4>
                    )}
                </label>

                <label htmlFor = "terms">
                    "I agree to the terms":
                    <Field 
                        id = "terms"
                        type = "checkbox"
                        name = "terms"
                        checked = { values.terms }
                    />
                    { touched.password && errors.password && (
                        <h4>{ errors.password }</h4>
                    )}
                </label>

                <button type="submit">SUBMIT</button>
            </Form>

                    <pre>{ JSON.stringify(values, null, 2)}</pre>
                    {users.map(user => (
                        <ul key={ user.id }>
                            <li>Name: { user.name }</li>
                            <li>Email: { user.email }</li>
                            <li>Password: { user.password }</li>
                        </ul>
                    ))}
        </div>
    )
}

const FormikUserForm = withFormik({
    mapPropsToValues({ name, email, password, terms }) {
        return {
            name: name || "",
            email: email || "",
            password: password || "",
            terms: terms || false
        };
    },
    validationSchema: Yup.object().shape({
        name: Yup.string().required(),
        email: Yup.string().required()
    }),
    handleSubmit(values, { setStatus, resetForm }) {
        console.log("Submitting...", values);
        axios.post("https://reqres.in/api/users", values).then(response => {
            console.log("success", response);
            setStatus(response.data);
            resetForm();
        });
    }
})(UserForm);
export default FormikUserForm;