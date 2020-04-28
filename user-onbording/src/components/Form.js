import React, {useState} from "react";
import * as yup from "yup";
import styled from "styled-components";


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



export default function Form(){
    const initialFormState = {
        name: "",
        email:"",
        password:"",
        terms:"",
    };

    // const [user, setNewUser] = usestate(initialFormState);

    return (
      <FormDiv>
        <form>
          <MainDiv>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent:"spaceBetween"
              }}
            >
              <label
                htmlFor="name"
                syle={{
                  margin: "5px",
                }}
              >
                Name
                <input
                  id="name"
                  type="text"
                  name="name"
                  // onChange={inputChange}
                  // value={user.name}
                />
              </label>

              <label htmlFor="password">
                Password
                <input type="text" name="password" />
              </label>
            </div>
            <label htmlFor="email">
              E-mail
              <input type="text" name="email" />
            </label>
            <label htmlFor="terms">
              <input type="checkbox" />
              Terms & Conditions
            </label>
            <Button type="submit">Submit</Button>
          </MainDiv>
        </form>
      </FormDiv>
    );
}