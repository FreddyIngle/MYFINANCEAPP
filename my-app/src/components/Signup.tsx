import { useState } from "react";
import axios from "axios";

function Signup(){


//Handle input changes
const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {

    console.log("change detected", e.target.name, e.target.value);
};
const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget)
    const payload = Object.fromEntries(formData);

    console.log("Form submitted", payload);

    //send to database POST endpoint
    try{
        const res = await axios.post("http://localhost:4000/signup", payload)

    }catch(error){
        console.log("signup error: ", error);
    }
}



return(
    <>
    <input type="checkbox" id="signup-modal" className="modal-toggle" />
      <div className="modal" role="dialog">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Sign up</h3>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="username"
              placeholder="Username"
              className="input input-bordered w-full mb-2"
              onChange={handleChange}
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="input input-bordered w-full mb-2"
              onChange={handleChange}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="input input-bordered w-full mb-4"
              onChange={handleChange}
            />
            <button type="submit" className="btn btn-primary w-full">Create Account</button>
          </form>
          <div className="modal-action mt-4">
            <label htmlFor="signup-modal" className="btn">Close</label>
          </div>
        </div>
      </div>

    </>
)
}


export default Signup;