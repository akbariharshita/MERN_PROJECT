import React, { useEffect, useState } from 'react';
import passportpic from "../images/passport.png";
import { useNavigate } from 'react-router-dom';

const About = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('about');
  const [userData, setUserData] = useState({});

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const callAboutPage = async () => {
    try {
      const res = await fetch("/about", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include"
      });

      const data = await res.json();

      if (res.status === 200) {
        setUserData(data);
      } else {
        throw new Error("Request failed with status: " + res.status);
      }
    } catch (e) {
      console.log(e);
      navigate('/login');
    }
  };

  useEffect(() => {
    callAboutPage();
  }, []);

  return (
    <>
      <div className='container'>
        <form method='GET'>
          <div className='row'>
            <div className='col-lg-8 mx-auto boxs my-5'>
              <div className='row'>
                <div className='col-md-4 text-center'>
                  <div className='mx-auto'>
                  <img height='250px' width='200px' src={passportpic} alt='passportpic' />
                  </div>
                </div>
                <div className='col-md-5'>
                  <div className='profile-head mt-5 text-center text-md-start'>
                    <h5>{userData.name}</h5>
                    <h6 className='fw-bold text-primary'>{userData.work}</h6>
                    <p className='profile-rating mt-3 mb-5'>RANKINGS: <span> 1/10 </span></p>
                    <ul className="nav nav-underline justify-content-center" role='tablist'>
                      <li className="nav-item fw-bold">
                        <a className="nav-link pointer text-primary" onClick={() => handleTabClick('about')}>About</a>
                      </li>
                      <li className="nav-item fw-bold ">
                        <a className="nav-link pointer text-primary" onClick={() => handleTabClick('timeline')}>Timeline</a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className='col-md-3 text-center'>
                  <input type='submit' className='profile-btn mt-5' name='btnAddMore' value='Edit Profile' />
                </div>
              </div>

              <div className='row'>
                <div className='col-md-4 order-md-1 order-2'>
                  <div className='profile-work ms-4 text-center text-md-start'>
                    <p className='mt-3'>WORK LINK</p>
                    <a href='https://www.youtube.com/channel/UCwfaAHy4zQUb2APNOGXUCCA' className='link-dark mb-2 link-underline-light' target='_thapa'>Youtube</a> <br />
                    <a href='https://www.youtube.com/channel/UCwfaAHy4zQUb2APNOGXUCCA' className='link-dark mb-2 link-underline-light' target='_thapa'>Instagram</a> <br />
                    <a href='https://www.youtube.com/channel/UCwfaAHy4zQUb2APNOGXUCCA' className='link-dark mb-2 link-underline-light' target='_thapa'>Thapa Technical</a> <br />
                    <a href='https://www.youtube.com/channel/UCwfaAHy4zQUb2APNOGXUCCA' className='link-dark mb-2 link-underline-light' target='_thapa'>WebsiteGitHubMern Dev</a> <br />
                    <a href='https://www.youtube.com/channel/UCwfaAHy4zQUb2APNOGXUCCA' className='link-dark mb-2 link-underline-light' target='_thapa'>Figma</a> <br />
                    <a href='https://www.youtube.com/channel/UCwfaAHy4zQUb2APNOGXUCCA' className='link-dark mb-2 link-underline-light' target='_thapa'>Software Engeeneer</a> <br />
                  </div>
                </div>

                <div className='col-md-8 text-center text-md-start pl-5 order-md-2 order-1 about-info'>
                  <div className='tab-content profile-tab' id='myTabContent'>
                    <div className={`tab-pane fade ${activeTab === 'about' ? 'show active' : ''}`} id="home" role="tabpanel" aria-labelledby="home-tab">
                      <div className='row mt-3'>
                        <div className='col-md-6'>
                          <label>User ID</label>
                        </div>
                        <div className='col-md-6'>
                          <label className='text-primary'>39582123412875</label>
                        </div>

                        <div className='row mt-3'>
                          <div className='col-md-6'>
                            <label>Name</label>
                          </div>
                          <div className='col-md-6'>
                            <label className='text-primary'>{userData.name}</label>
                          </div>
                        </div>

                        <div className='row mt-3'>
                          <div className='col-md-6'>
                            <label>Email</label>
                          </div>
                          <div className='col-md-6'>
                            <label className='text-primary'>{userData.email}</label>
                          </div>
                        </div>

                        <div className='row mt-3'>
                          <div className='col-md-6'>
                            <label>Phone</label>
                          </div>
                          <div className='col-md-6'>
                            <label className='text-primary'>{userData.phone}</label>
                          </div>
                        </div>

                        <div className='row mt-3'>
                          <div className='col-md-6'>
                            <label>Profession</label>
                          </div>
                          <div className='col-md-6'>
                            <label className='text-primary'>{userData.work}</label>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className={`tab-pane fade ${activeTab === 'timeline' ? 'show active' : ''}`} id="profile" role="tabpanel" aria-labelledby="profile-tab">
                      <div className='row mt-3'>
                        <div className='col-md-6'>
                          <label>Experience</label>
                        </div>
                        <div className='col-md-6'>
                          <label className='text-primary'>Expert</label>
                        </div>

                        <div className='row mt-3'>
                          <div className='col-md-6'>
                            <label>Hourly Rate</label>
                          </div>
                          <div className='col-md-6'>
                            <label className='text-primary'>10$/hr</label>
                          </div>
                        </div>

                        <div className='row mt-3'>
                          <div className='col-md-6'>
                            <label>Total Projects</label>
                          </div>
                          <div className='col-md-6'>
                            <label className='text-primary'>230</label>
                          </div>
                        </div>

                        <div className='row mt-3'>
                          <div className='col-md-6'>
                            <label>English Level</label>
                          </div>
                          <div className='col-md-6'>
                            <label className='text-primary'>Expert</label>
                          </div>
                        </div>

                        <div className='row mt-3'>
                          <div className='col-md-6'>
                            <label>Avaliability</label>
                          </div>
                          <div className='col-md-6'>
                            <label className='text-primary'>6 months</label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  )
}

export default About






