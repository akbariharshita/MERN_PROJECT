import React, { useState } from 'react';
import signpic from "../images/signup.png";
import { NavLink, useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "", email: "", phone: "", work: "", password: "", cpassword: ""
  });

  let name, value;
  const handleInputs = (e) => {
    // console.log(e);
    name = e.target.name;
    value = e.target.value;

    setUser({ ...user, [name]: value });
  }

  const PostData = async (e) => {
    e.preventDefault();
    const { name, email, phone, work, password, cpassword } = user;

    const res = await fetch('/register', {
      method:"POST",
      headers:{
        "Content-Type" : "application/json"
      },
      body:JSON.stringify({
        name, email, phone, work, password, cpassword 
      })
    });

   const data = await res.json();

   if(res.status === 422 || !data){
    window.alert("Invalid Registration");
    console.log("Invalid Registration");
   }else{
    window.alert("Registration Successfull");
    console.log("Registration Successfull");
    navigate("/login");
   }

  }

  return (
    <>
      <section className='signup'>
        <div className="container-fluid mt-5">
          <div className="row">
            <div className="col-lg-8 col-12 mx-auto">
              <div className='row box'>
                <h2 className='form-title text-center'>Sign up</h2>
                <div className='col-lg-6 col-12 d-flex justify-content-center'>
                  <form method='POST' className='register-form' id='register-form'>

                    <div className='form-group'>
                      <label htmlFor='name'>
                        <i className="zmdi zmdi-account material-icons-name"></i>
                      </label>
                      <input type='text' name='name' id='name' autoComplete='off' value={user.name} onChange={handleInputs} placeholder='Your Name' />
                    </div>

                    <div className='form-group'>
                      <label htmlFor='email'>
                        <i className="zmdi zmdi-email material-icons-name"></i>
                      </label>
                      <input type='email' name='email' id='email' autoComplete='off' value={user.email} onChange={handleInputs} placeholder='Your Email' />
                    </div>

                    <div className='form-group'>
                      <label htmlFor='phone'>
                        <i className="zmdi zmdi-phone-in-talk material-icons-name"></i>
                      </label>
                      <input type='number' name='phone' id='phone' autoComplete='off' value={user.phone} onChange={handleInputs} placeholder='Your Phone' />
                    </div>

                    <div className='form-group'>
                      <label htmlFor='work'>
                        <i className="zmdi zmdi-slideshow material-icons-name"></i>
                      </label>
                      <input type='text' name='work' id='work' autoComplete='off' value={user.work} onChange={handleInputs} placeholder='Your Profession' />
                    </div>

                    <div className='form-group'>
                      <label htmlFor='password'>
                        <i className="zmdi zmdi-lock material-icons-name"></i>
                      </label>
                      <input type='password' name='password' id='password' autoComplete='off' value={user.password} onChange={handleInputs} placeholder='Your Password' />
                    </div>

                    <div className='form-group'>
                      <label htmlFor='cpassword'>
                        <i className="zmdi zmdi-lock material-icons-name"></i>
                      </label>
                      <input type='password' name='cpassword' id='cpassword' autoComplete='off' value={user.cpassword} onChange={handleInputs} placeholder='Confirm Your Password' />
                    </div>

                    <div className='form-group form-button'>
                      <input type='submit' name='signup' id='signup' className='form-submit' value='Register' onClick={PostData} />
                    </div>
                  </form>
                </div>
                <div className='col-lg-6 col-12 text-center img '>
                  <figure>
                    <img src={signpic} alt='registration pic' className='signup-image' />
                  </figure>
                  <NavLink to="/login" className="signup-image-link">I am already register</NavLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Signup
