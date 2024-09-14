import React, { useEffect, useState } from 'react';
import { AssignmentList } from '../../api/Routing';
import { useParams } from 'react-router-dom';
import { LoadingPage } from '../../LoadingPage';

export const LearnerAssignment = () => {
  const { id } = useParams();
  const [assignments, setAssignments] = useState([]);
  const [extractedData, setExtractedData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadAssignment = async () => {
      try {
        let response = await AssignmentList(id);
        if (Array.isArray(response.data) && response.data.length > 0) {
          // Extract data
          const extractedData = response.data.map(item => ({
            courseId: item.course,
            instructorId: item.instructor,
            activities: item.activities || []  // Default to empty array if activities is not present
          }));
    
          // Combine all activities into a single array
          const allActivities = response.data.flatMap(item => item.activities || []);
    
          setAssignments(allActivities);
          setExtractedData(extractedData);
    
          console.log("Extracted Data:", extractedData);
          console.log("All Activities:", allActivities);
        } else {
          setAssignments([]);
        }
      } catch (error) {
        setError(error);
        console.log(error); 
      } finally {
        setLoading(false);
      }
    };

    loadAssignment(); // Call the async function to load data
  }, [id]); // Include `id` in dependencies array

  if (loading) return <div><LoadingPage/></div>;
  if (error) return <div>Error loading Assignment details. Please try again later.</div>;
  if (assignments.length === 0) return <div>No Assignment found.</div>;

  return (
    <div className="p-4">
      <h1 className=" mb-6 text-center text-2xl font-bold text-green-500" >Learners Assignment</h1>
      <ul className="space-y-4">
        {assignments.map((row, index) => {
          // Access corresponding data from `extractedData`
          const dataItem = extractedData.find(item => item.activities.includes(row)) || {};
          
          return (
            <li key={index} className="p-4 border rounded-md shadow-sm">
              <div className="mt-2 flex flex-col md:flex-row md:justify-between items-start md:space-x-4">
                <div className="dark:text-white mb-2 md:mb-0 pe-11">
                  <div className="text-lg font-semibold dark:text-white">No: {index + 1}</div>
                </div>
                <div className="dark:text-white mb-2 md:mb-0 flex-1">
                  <div className="text-lg font-semibold dark:text-white">Title:</div> {row.task}
                </div>
                <div className="dark:text-white mb-2 md:mb-0 whitespace-normal flex-1">
                  <div className="text-lg font-semibold dark:text-white">Description:</div> {row.description}
                </div>
                <div className="dark:text-white mb-2 md:mb-0 md:px-20 md:ml-auto text-right">
                  <div className="text-lg font-semibold dark:text-white">Due Date:</div> {row.dueDate}
                </div>
              </div>
              <div className="mt-2 flex flex-col md:flex-row md:justify-between md:space-x-4">
                <div className="dark:text-white mb-2 md:mb-0">
                  <div className="text-lg font-semibold dark:text-white mb-2 md:mb-0">Course ID:</div> {dataItem.courseId}
                </div>
                <div className="dark:text-white mb-2 md:mb-0">
                  <div className="text-lg font-semibold dark:text-white mb-2 md:mb-0">Instructor ID:</div> {dataItem.instructorId}
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
