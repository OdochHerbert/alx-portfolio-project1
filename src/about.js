import React from 'react';

const AboutPage = () => {
  return (
    <div>

      {/* About Section */}
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6">
            <img src="img/odoch.jpeg" alt="Profile" className="img-fluid rounded"/>
          </div>
          <div className="col-md-6">
            <h2>About Me</h2>
            <p>
              Welcome to my alx-portfolio project. 
              I'm passionate about software engineering. This has inspired me to take a journey to do the hard things
              with ALX AFRICA
            </p>
            <p>
              Connect with me on LinkedIn: <a href="www.linkedin.com/in/odoch-herbert-13b600212" target="_blank" rel="noopener noreferrer">LinkedIn Profile</a>.
            </p>
            <p>
              Email: <a href="mailto:odoherb@gmail.com">odoherb@gmail.com</a>
            </p>
            {/* Add more details about yourself as needed */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
