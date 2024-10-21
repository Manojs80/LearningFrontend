import React, { useEffect, useState } from 'react';
import { AssignmentList, getSubmission, SubmitAssignment, Submitupdate } from '../../api/Routing';
import { useParams } from 'react-router-dom';
import { LoadingPage } from '../../LoadingPage';
import { toast } from 'react-toastify';

export const LearnerAssignment = () => {
  const { id } = useParams();
  const [assignments, setAssignments] = useState([]);
  const [submission, setSubmission] = useState([]);
  const [extractedData, setExtractedData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const loadAssignment = async () => {
      try {
        const LearnerId = sessionStorage.getItem('loginId');
        console.log("LearnerId storage data", LearnerId);
        const submit = await getSubmission(LearnerId);
        setSubmission(submit);
        console.log("setSubmission", submission);
        let response = await AssignmentList(id);
        if (Array.isArray(response.data) && response.data.length > 0) {
          const extractedData = response.data.map(item => ({
            courseId: item.course,
            instructorId: item.instructor,
            activities: item.activities || [],
          }));
          const allActivities = response.data.flatMap(item => item.activities || []);
          setAssignments(allActivities);
          setExtractedData(extractedData);
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

    loadAssignment();
  }, [id,refresh]);

  const handleSubmit = async (event, task, url) => {
    event.preventDefault(); // Prevent default form submission behavior
    const LearnerId = sessionStorage.getItem('loginId');
    console.log("LearnerId storage data", LearnerId);
    try {
      // Prepare the payload
      const payload = {
        courseId: id,
        task: task,
        url: url,
        LearnerId: LearnerId
      };
      let response;
      console.log("submission handle", {submission});
      const submissionData = submission.data.find(sub => sub.task === task);
     if (!submissionData) {
       response = await SubmitAssignment(payload);
     } else {
      const submissionId = submissionData._id;
      console.log("submission._id;",submissionId);
      
      response = await Submitupdate(submissionId,payload);
     }
      
      console.log("Submitting payload:", response);
      toast.success(response.data.message);
      setRefresh((prev) => !prev); // Refresh assignments after deletion
    } catch (error) {
      toast.error(error.message || 'Error saving study plan');
    }
  };

  useEffect(() => {
    console.log("Updated submission:", submission);
  }, [submission]);

  if (loading) return <LoadingPage />;
  if (error) return <div>Error loading Assignment details. Please try again later.</div>;
  if (assignments.length === 0) return <div>No Assignment found.</div>;

return (
  <div className="p-4">
    <h1 className="mb-6 text-center text-2xl font-bold text-green-500">Learners Assignment</h1>
    <ul className="space-y-4">
      {assignments.map((row, index) => {
        const dataItem = extractedData.find(item => item.activities.includes(row)) || {};
        const submissionData = submission.data.find(sub => sub.task === row.task);
        const score = submissionData ? submissionData.score : 'N/A';
        const existingUrl = submissionData ? submissionData.content : ''; // Fetch existing URL for resubmission

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
            
            {/* Display existing URL only if it exists and matches the task */}
            {submissionData && (
              <div>
                <div className="dark:text-white mb-2 md:mb-0">
                  <div className="text-lg font-semibold dark:text-white mb-2 md:mb-0">Submitted Link:</div>
                  <a href={existingUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                    {existingUrl}
                  </a>
                </div>
              </div>
            )}

            {/* Display score only if submissionData exists */}
            <div className="mt-2 flex flex-col md:flex-row md:justify-between md:space-x-4">
               {score && (
              <div className="dark:text-white mb-2 md:mb-0">
                <div className="text-lg font-semibold dark:text-white mb-2 md:mb-0">Score:</div>{submissionData ? score : 'N/A'} 
              </div>
              )}
              <form onSubmit={(event) => {
                const url = document.getElementById(`urlInput-${index}`).value; // Get the URL from the input field
                handleSubmit(event, row.task, url);
              }} className="mt-4">
                <input
                  type="url"
                  placeholder="Enter your URL here"
                  id={`urlInput-${index}`} // Unique ID for each input
                  required
                  defaultValue={existingUrl} // Set existing URL for resubmission
                  className="p-2 border rounded-md mr-2"
                />
                <button type="submit" className="p-2 bg-green-500 text-white rounded-md">
                  {submissionData ? 'Resubmit URL' : 'Submit URL'} {/* Change button text based on submission state */}
                </button>
              </form>
            </div>
          </li>
        );
      })}
    </ul>
  </div>
);


};
