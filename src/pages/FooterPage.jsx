// src/components/FooterPage.jsx

import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

export const FooterPage = () => {

  const { sectionId } = useParams();
  console.log("sectionId",sectionId);
  
  useEffect(() => {
    if (sectionId) {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [sectionId]);

  return (
    <div className="p-6 bg-gray-100 text-gray-800">
      <section id="course-catalog" className="py-6">
        <h2 className="text-2xl font-bold mb-2">Course Catalog</h2>
        <p>A course catalog is an extensive listing of all available educational offerings on a learning platform. It provides detailed information about each course, including its description, objectives, prerequisites, duration, and format. Users can browse through various subjects and levels to find courses that meet their interests and needs. The catalog often includes filters and search options to help learners quickly locate specific topics or instructors. This service is crucial for guiding users through the learning options available and assisting them in making informed decisions about their educational path.</p>
      </section>
      <section id="interactive-learning-materials" className="py-6">
        <h2 className="text-2xl font-bold mb-2">Interactive Learning Materials</h2>
        <p>Interactive learning materials engage users through dynamic content that goes beyond traditional text and static images. These materials include videos, quizzes, simulations, and interactive exercises designed to enhance comprehension and retention. By actively participating in the learning process, users can explore concepts more deeply, test their knowledge in real-time, and receive instant feedback. Interactive elements foster a more immersive and personalized learning experience, catering to different learning styles and making complex topics more accessible and engaging.</p>
       </section>
      <section id="assessment-and-certification" className="py-6">
        <h2 className="text-2xl font-bold mb-2">Assessment and Certification</h2>
        <p>Assessment and certification are essential components of a structured learning experience. Assessments, such as quizzes, exams, and assignments, evaluate learners' understanding of course material and their progress. These evaluations provide valuable feedback and help identify areas that need improvement. Upon successful completion of a course or program, learners may receive certificates or badges that validate their achievements. Certifications can serve as a credential for professional development or academic recognition, enhancing learners' qualifications and career prospects.</p>
      </section>
      <section id="community-and-networking" className="py-6">
        <h2 className="text-2xl font-bold mb-2">Community and Networking</h2>
        <p>Community and networking features create a collaborative environment where learners can connect, share, and support each other. Forums, discussion boards, and social groups allow users to engage in conversations, ask questions, and exchange ideas related to their courses. Networking opportunities extend beyond the learning materials, fostering relationships with peers, mentors, and industry professionals. This sense of community enhances the learning experience by providing additional resources, diverse perspectives, and motivation, while also building a professional network that can benefit learners in their academic and career pursuits.</p>
      </section>
      <section id="our-team" className="py-6">
        <h2 className="text-2xl font-bold mb-2">Our Team</h2>
        <p>This section introduces the key individuals behind the learning platform, showcasing their expertise, roles, and contributions. It often includes profiles of senior management, educators, and other pivotal team members. Users can learn about their backgrounds, qualifications, and the vision they bring to the platform. This transparency helps build trust and credibility with users by highlighting the people responsible for delivering high-quality educational content and services.</p>
      </section>
      <section id="careers" className="py-6">
        <h2 className="text-2xl font-bold mb-2">Careers</h2>
        <p>The Careers section provides detailed information about current job openings and career opportunities within the company. It typically includes job descriptions, required qualifications, and instructions on how to apply. This section is essential for attracting talented individuals who are interested in contributing to the company's mission. It may also include insights into the company culture, employee benefits, and opportunities for professional growth, making it a valuable resource for prospective job applicants.</p>
        </section>
      <section id="partners" className="py-6">
        <h2 className="text-2xl font-bold mb-2">Partners</h2>
        <p>This section highlights the company’s strategic partnerships and collaborations with other organizations, institutions, and industry leaders. It provides information about educational institutions, technology partners, and business collaborators that contribute to the platform’s offerings. Featuring partners helps users understand the breadth of resources and expertise available through the platform, and it underscores the company's commitment to providing comprehensive and high-quality educational experiences.</p>
      </section>
      <section id="media" className="py-6">
        <h2 className="text-2xl font-bold mb-2">Media</h2>
        <p> The Media section offers access to various press releases, news articles, and other media coverage related to the company. This includes updates on recent achievements, product launches, and significant milestones. Users can explore how the company is portrayed in the media, view interviews with key personnel, and read about the company’s impact and contributions to the education sector. This section is valuable for those interested in the company’s public image and latest news.</p>
      </section>
      <section id="terms-of-use" className="py-6">
        <h2 className="text-2xl font-bold mb-2">Terms of Use</h2>
        <p>This document outlines the rules and guidelines for using the learning platform. It includes details about user responsibilities, acceptable use, and the legal agreements users enter into when accessing the site. The Terms of Service help establish the legal framework for interactions between the platform and its users.</p>
      </section>
      <section id="privacy-policy" className="py-6">
        <h2 className="text-2xl font-bold mb-2">Privacy Policy</h2>
        <p>The Privacy Notice explains how the platform collects, uses, and protects user data. It details the types of information collected, how it is used, and the measures in place to safeguard user privacy. This document ensures transparency and compliance with data protection regulations, providing users with confidence in how their personal information is handled.</p>
      </section>
      <section id="cookie-policy" className="py-6">
        <h2 className="text-2xl font-bold mb-2">Cookie Policy</h2>
        <p> The Cookies Policy describes how the platform uses cookies and similar technologies to enhance user experience and track website activity. It includes information on the types of cookies used, their purposes, and how users can manage or disable them. This policy helps users understand how their browsing data is collected and used, and it complies with legal requirements for cookie usage.</p>
      </section>
    </div>
  );
};
