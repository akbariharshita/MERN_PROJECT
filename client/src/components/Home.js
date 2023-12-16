import React, { useState, useEffect } from 'react'

const Home = () => {

  const [userName, setUserName] = useState('');
  const [show, setShow] = useState(false); 

  const userHomepage = async () => {
    try {
      const res = await fetch("/getdata", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();

      if (res.status === 200) {
        setUserName(data.name);
        setShow(true);
      } else {
        throw new Error("Request failed with status: " + res.status);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    userHomepage();
  }, []);

  return (
    <>
      <div className='home-page'>
        <div className='home'>
          <p className='pt-5 text-center fs-5 text-primary lsc'>WELCOME</p>
          <h1 className='text-center mb-3 fw-bold'>{userName}</h1>
          <h2> {show ? 'Happy, to see you back... 😍' : 'We Are The MERN Developer'}</h2>
        </div>
      </div>
    </>
  )
}

export default Home
