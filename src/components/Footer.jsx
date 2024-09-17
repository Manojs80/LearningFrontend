// src/components/Footer.jsx

import React from 'react';

export const Footer = () => {
  return (
    <footer className="footer pl-20 bg-neutral text-neutral-content  pt-5 pb-3">
      
      <nav>
        <h6 className="footer-title">Services</h6>
        <a href="/footer/course-catalog" className="link link-hover">Course Catalog</a>
        <a href="/footer/Interactive-learning-materials" className="link link-hover">Interactive Learning Materials</a>
        <a href="/footer/assessment-and-certification" className="link link-hover">Assessment and Certification</a>
        <a href="/footer/community-and-networking" className="link link-hover">Community and Networking</a>
      </nav>
      <nav>
      <h6 className="footer-title">Company</h6>
        <a href="/footer/our-team" className="link link-hover">Our Team</a>
        <a href="/footer/careers" className="link link-hover">Careers</a>
        <a href="/footer/partners" className="link link-hover">Partners</a>
        <a href="/footer/media" className="link link-hover">Media</a>

      </nav>
      <nav className="mr-auto">
        <h6 className="footer-title ">Legal</h6>
        <a href="/footer/terms-of-use" className="link link-hover">Terms of use</a>
        <a href="/footer/privacy-policy" className="link link-hover">Privacy policy</a>
        <a href="/footer/cookie-policy" className="link link-hover">Cookie policy</a>
      </nav>
      
    </footer>
  );
};


