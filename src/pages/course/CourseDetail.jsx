import React, { useState, useEffect } from 'react';
import { DetailsCourse } from '../../api/Routing';
import { useParams } from 'react-router-dom';

export const CourseDetail = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadCourse = async () => {
      try {
        let response = await DetailsCourse(id);
        setCourse(response.data);
      } catch (error) {
        setError(error);
        console.log(error); 
      } finally {
        setLoading(false);
      }
    };

    loadCourse(); // Call the async function to load data
  }, [id]);  
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading course details. Please try again later.</div>;
  if (!course) return <div>No course found.</div>;

  return (
    <div>
      
      <h1 className=" mb-6 text-center text-2xl font-bold text-green-500" >Course Details</h1>
      <div className="max-w-4xl mx-auto p-6">
        <div className="flex flex-col lg:flex-row bg-gray-500 shadow-lg rounded-lg overflow-hidden">
          <div className="lg:w-1/3">
            <img
              src={course.image}
              alt={`Image for ${course.title}`}
              className="w-full h-96 object-fill"
            />
          </div>
          <div className="lg:w-2/3 p-6 flex flex-col justify-between">
            <div>
              <h1 className="text-3xl font-semibold text-lime-500 mb-2">{course.title}</h1>
              <p className="text-orange-400 mb-4">Instructor: {course.instructor}</p>
              <p className="text-white mb-6">{course.description}</p>
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-lime-500 mb-4">Objectives</h2>
              <ul className="list-disc list-inside text-white">
                {course.objectives && course.objectives.map((item, index) => (
                  <li key={index} className="mb-2">{item}</li>
                ))}
              </ul>
            </div>
            <button className="mt-6 btn btn-primary">
              Enroll Now
            </button>
          </div>
        </div>
      </div> 
    </div>
  );
}


