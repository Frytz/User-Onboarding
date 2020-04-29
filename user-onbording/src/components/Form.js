import React, {useState, useEffect} from "react";
import * as yup from "yup";
import styled from "styled-components";
import axios from "axios";


const FormDiv = styled.div`
border:1px solid blue;
display:flex;
align-items:center;
justify-content:center;
height:100vh;
`


const MainDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px red solid;
  width: 50vw;
  height: 50vh;
  align-self: center;
`;

const Button = styled.button`
width:max-content;

`
const formSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup
    .string()
    .email("Must be a valid email")
    .required("Email is required"),
  password: yup.string().required("Must include password"),
  terms: yup.boolean().oneOf([true], "please agree to the terms")
});


export default function Form(){
     
     const [buttonDisabled, setButtonDisabled] = useState(true);
     
      const [formState, setFormState] = useState({
      name: "",
      email: "",
      password: "",
      terms: "",
      });

        const [errors, setErrors] = useState({
        name: "",
        email: "",
        password: "",
        terms: "",
        })
         

         const [post, setPost] = useState([]);

 useEffect(() => {
    formSchema.isValid(formState).then(valid => {
      setButtonDisabled(!valid);
    });
  }, [formState]);

         const validateChange = (e) => {
           yup
             .reach(formSchema, e.target.name)
             .validate(e.target.value)
             .then((valid) => {
               setErrors({
                 ...errors,
                 [e.target.name]: "",
               });
             })
             .catch((err) => {
               setErrors({
                 ...errors,
                 [e.target.name]: err.errors,
               });
             });
         };
         const formSubmit = e => {
e.preventDefault();
axios.post("https://reqres.in/api/users", formState)
.then(res => {
  setPost(res.data);
  console.log("success", post)
  setFormState({
    name: "",
          email: "",
          password: "",
          terms: ""
  });
})
.catch(err => console.log(err.response));
         };
         
         const inputChange = e => {
           e.persist();
           const newFormData = {
             ...formState,
             [e.target.name]:
               e.target.type === "checkbox"
                 ? e.target.checked
                 : e.target.value,
           };
           validateChange(e);
           setFormState(newFormData);
         };
    return (
      <FormDiv>
        <form onSubmit={formSubmit}>
          <MainDiv>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
              }}
            >
              <label
                htmlFor="name"
              >
                Name
                <input
                  id="name"
                  type="text"
                  name="name"
                  onChange={inputChange}
                  value={formState.name}
                />
              </label>
    {errors.name.length > 0 ? <p className="error">{errors.name}</p> : null}
              <label htmlFor="password">
                Password
                <input type="text" name="password" value={formState.password} onChange={inputChange} />
              </label>
            {errors.password.length > 0 ? (
        <p className="error">{errors.password}</p>
      ) : null}
            </div>
            <label htmlFor="email">
              E-mail
              <input type="text" name="email" value={formState.email}  onChange={inputChange} />
            </label>
              {errors.email.length > 0 ? <p className="error">{errors.email}</p> : null}
            <label htmlFor="terms">
              <input type="checkbox"  name="terms"  checked={formState.terms} onChange={inputChange} />
              Terms & Conditions
            </label>
            <pre>{JSON.stringify(post, null, 2)}</pre>
            <Button disabled={buttonDisabled} type="submit">Submit</Button>
          </MainDiv>
        </form>
      </FormDiv>
    );
}