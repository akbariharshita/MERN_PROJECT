import React, { useEffect, useState } from 'react';

const Contact = () => {

  const [userData, setUserData] = useState({ name: "", email: "", phone: "", message: "" });

  const userContact = async () => {
    try {
      const res = await fetch("/getdata", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();

      if (res.status === 200) {
        setUserData({ ...userData, name: data.name, email: data.email, phone: data.phone });
      } else {
        throw new Error("Request failed with status: " + res.status);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    userContact();
  }, []);

  const handleInputs = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setUserData({ ...userData, [name]: value });
  }

  const contactForm = async (e) => {
    e.preventDefault();

    const { name, email, phone, message } = userData;

    const res = await fetch('/contact', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name, email, phone, message
      })
    });

    const data = await res.json();

    if(!data) {
      console.log("message not send")
    }else{
      alert("message send");
      setUserData({...userData, message:""});
    }

  }

  return (
    <>
      <div className='contact_info'>
        <div className='container-fluid'>
          <div className='row'>
            <div className='col-lg-10 mx-auto'>
              <div className='row mt-5'>
                <div className='col-md-4 col-12 mb-3'>
                  <div className='boxs d-flex justify-content-start align-items-center'>
                    <img width="40" height="40" src='https://img.icons8.com/office/24/000000/iphone.png' alt='phone' />
                    <div className='contact'>
                      <div className='contact-title'>
                        Phone
                      </div>
                      <div className='contact_text'>
                        +91 1111 543 2198
                      </div>
                    </div>
                  </div>
                </div>

                <div className='col-md-4 col-12 mb-3'>
                  <div className='boxs d-flex justify-content-start align-items-center'>
                    <img width="40" height="40" src="https://img.icons8.com/pulsar-color/48/000000/mail.png" alt="mail" />
                    <div className='contact'>
                      <div className='contact-title'>
                        Email
                      </div>
                      <div className='contact_text'>
                        abc@gmail.com
                      </div>
                    </div>
                  </div>
                </div>

                <div className='col-md-4 col-12 mb-3'>
                  <div className='boxs d-flex justify-content-start align-items-center'>
                    <img width="40" height="40" src="https://img.icons8.com/ultraviolet/40/home--v1.png" alt="address" />
                    <div className='contact'>
                      <div className='contact-title'>
                        Address
                      </div>
                      <div className='contact_text'>
                        Pune, MH, India
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='contact_form'>
        <div className='container'>
          <div className='row'>
            <div className='col-lg-10 boxs mt-5 mx-auto'>
              <div className='my-5 py-5'>
                <div className='contact_title p-3'>Get in Touch</div>
                <form method='POST' id='contact_form'>
                  <div className='contact_name d-flex justify-content-between align-items-center'>
                    <input type='text' id='contact-name' className='input-field' onChange={handleInputs} name='name' value={userData.name} placeholder='Your Name' required='true' />
                    <input type='email' id='contact-email' className='input-field' onChange={handleInputs} name='email' value={userData.email} placeholder='Your Email' required='true' />
                    <input type='number' id='contact-number' className='input-field' onChange={handleInputs} name='phone' value={userData.phone} placeholder='Your Number' required='true' />
                  </div>

                  <div className='form-text mt-4 text-center'>
                    <textarea className='text-field' onChange={handleInputs} name='message' value={userData.message} placeholder='Message' cols="30" rows="10"></textarea>
                  </div>

                  <div className='contact-button text-center'>
                    <button type='submit' className='btn btn-primary mt-4 py-2' onClick={contactForm}>Send Message</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Contact
