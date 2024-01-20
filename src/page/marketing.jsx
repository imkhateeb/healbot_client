import React from 'react';
import { Link } from 'react-router-dom';
import backgroundImageUrl from '../assets/bg.jpg';

const HomeMarketingPage = () => {
  return (
    <div className="home-page">
      <header className="hero-section" style={{ backgroundImage: `url(${backgroundImageUrl})` }}>
        <div className="hero-overlay">
          <div className="hero-content">
            <h1>Your Health Matters</h1>
            <p>Committed to providing quality healthcare for a healthier community.</p>
            <Link to="/chat" className="cta-button">Chat with HealtBot</Link>
          </div>
        </div>
      </header>
{/* 
      <section className="about-section">
        <div className="container">
          <h2>About Us</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla eget sem eu libero dapibus dapibus non in risus.</p>
        </div>
      </section>

      <section className="services-section">
        <div className="container">
          <h2>Our Services</h2>
          <p>Discover a wide range of healthcare services tailored to your needs.</p>
          <Link to="/services" className="cta-button">View Services</Link>
        </div>
      </section>

      <section className="contact-section">
        <div className="container">
          <h2>Contact Us</h2>
          <p>Have questions or need assistance? Contact our friendly team today.</p>
          <Link to="/contact" className="cta-button">Contact Now</Link>
        </div>
      </section> */}

      {/* Additional sections can be added based on your content */}
    </div>
  );
};

export default HomeMarketingPage;
