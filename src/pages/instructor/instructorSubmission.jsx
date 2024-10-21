import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { DeleteSubmission, getSubmissionList, updateSubmission } from '../../api/Routing'; // Import the updateSubmission function
import { toast } from 'react-toastify';

export const InstructorSubmission = () => { 
    const { id } = useParams();
    const [submissions, setSubmissions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        const fetchSubmissions = async () => {
            try {
                const response = await getSubmissionList(id);
                setSubmissions(response.data);
            } catch (err) {
                console.error("Error fetching submissions:", err);
                setError(err.response?.data.message || "An error occurred while fetching submissions.");
            } finally {
                setLoading(false);
            }
        };

        fetchSubmissions();
    }, [id,refresh]);

    const handleScoreSubmit = async (rowId, score) => {
        try {
            await updateSubmission(rowId, { score });
            const updatedSubmissions = submissions.map(submission => 
                submission._id === rowId ? { ...submission, score } : submission
            );
            setSubmissions(updatedSubmissions);
        } catch (err) {
            console.error("Error updating score:", err);
            setError("An error occurred while updating the score.");
        }
    };

    const [editScoreId, setEditScoreId] = useState(null); // Track which submission is being edited
    const [newScore, setNewScore] = useState('');

    const handleEditClick = (rowId, currentScore) => {
        setEditScoreId(rowId);
        setNewScore(currentScore); // Pre-fill the input with the current score
    };

    const handleDeleteClick = async (id) => {
        try {
          await DeleteSubmission(id);
          toast.success('Submission deleted successfully!',id);
          console.log("Submission deleted successfully!",id);
          
            setRefresh((prev) => !prev); // Refresh assignments after deletion
        } catch (error) {
          console.error('Error deleting Submission:', error);
          toast.error('Error deleting Submission.');
        }
      };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;
    if (submissions.length === 0) return <p>No submissions available.</p>; // Message for no submissions

    return (
        <div>
            <ul>
                {submissions.map((row, index) => (
                    <li className="p-4 border rounded-md shadow-sm" key={row._id}>
                        <div className="mt-2 flex flex-col md:flex-row md:justify-between items-start md:space-x-4">
                            <div className="dark:text-white mb-2 md:mb-0 pe-11">
                                <div className="text-lg font-semibold dark:text-white">No: {index + 1}</div>
                            </div>
                            <div className="dark:text-white mb-2 md:mb-0 pe-11">
                                <div className="text-lg font-semibold dark:text-white">Course ID: {row.course}</div>
                            </div>
                        </div>
                        <div className="mt-2 flex flex-col md:flex-row md:justify-between items-start md:space-x-4">
                            <div className="dark:text-white mb-2 md:mb-0 pe-11">
                                <div className="text-lg font-semibold dark:text-white">Task: {row.task}</div>
                            </div>
                            <div className="dark:text-white mb-2 md:mb-0 pe-11">
                                <div className="text-lg font-semibold dark:text-white">Submitted by: {row.student?.name || 'N/A'}</div>
                            </div>
                        </div>
                        <div className="mt-2 flex flex-col md:flex-row md:justify-between items-start md:space-x-4">
                            <div className="dark:text-white mb-2 md:mb-0 pe-11">
                                <div className="text-lg font-semibold text-wrap dark:text-white">Content: <a href={row.content} target="_blank" rel="noopener noreferrer">{row.content}</a></div>
                            </div>
                        </div>
                        <div className="mt-2 flex flex-col md:flex-row md:justify-between items-start md:space-x-4">
                            <div className="dark:text-white mb-2 md:mb-0 pe-11">
                                <div className="text-lg font-semibold dark:text-white">Submission Date: {new Date(row.submissionDate).toLocaleString()}</div>
                            </div>
                        </div>
                        {editScoreId === row._id ? ( // If this submission is being edited
                            <form className="mt-4" onSubmit={(e) => {
                                e.preventDefault();
                                handleScoreSubmit(row._id, newScore); // Update the score
                                setEditScoreId(null); // Reset edit state
                                setNewScore(''); // Clear input
                            }}>
                                <input
                                    type="number"
                                    value={newScore}
                                    onChange={(e) => setNewScore(e.target.value)} // Update state as user types
                                    placeholder="Enter your SCORE here"
                                    required
                                    className="p-2 border rounded-md mr-2"
                                />
                                <button type="submit" className="p-2 bg-green-500 text-white rounded-md">
                                    Save Score
                                </button>
                                <button type="button" onClick={() => setEditScoreId(null)} className="p-2 bg-red-500 text-white rounded-md ml-2">
                                    Cancel
                                </button>
                            </form>
                        ) : (
                            <div className="dark:text-white m-4 md:mb-0 pe-11 flex justify-between ">
                                <label className="text-lg    font-semibold dark:text-white">Score: {row.score}</label>
                                <button onClick={() => handleEditClick(row._id, row.score)} className="bg-green-800 text-white px-2 py-2 rounded hover:bg-red-600">
                                    Change Score
                                </button>
                                <button onClick={() => handleDeleteClick(row._id)} className=" bg-red-600 text-white px-4 py-2 rounded hover:bg-green-800">
                                    Delete
                                </button>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};
