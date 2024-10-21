import React, { useEffect, useState } from 'react';
import { ContactList, DeleteContact } from '../../api/Routing';
import { LoadingPage } from '../../LoadingPage';


export const AdminEnquiries = () => {
    const [enquiry, setenquiry] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    const handleClick = async (id) => {
      try {
        await DeleteContact(id);
        // Remove the feedback item from state after deletion
        setenquiry(enquiry.filter(item => item._id !== id));
        console.log('Feedback deleted!', id);
      } catch (error) {
        console.error('Error deleting feedback:', error);
      }
    };
  
    useEffect(() => {
      const loadenquiry = async () => {
        try {
          const response = await ContactList();
          setenquiry(response.data);
          console.log(response.data);
        } catch (error) {
          setError(error);
          console.error('Error loading feedback:', error);
        } finally {
          setLoading(false);
        }
      };
  
      loadenquiry(); // Call the async function to load data
    }, []);
  
    if (loading) return <div><LoadingPage/></div>;
    if (error) return <div>Error loading enquiry. Please try again later.</div>;
    if (enquiry.length === 0) return <div>No enquiry found.</div>;
  
    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4 text-green-500  text-center">Enquiries</h1>
        <ul className="space-y-4">
          {enquiry.map((row, index) => (
            <li key={row._id} className="p-4 border rounded-md shadow-sm">
                <div className="dark:text-white mb-2 md:mb-0 pe-11 ">
                  <div className="text-lg font-semibold dark:text-white">No: {index + 1}</div>
                </div>
              <div className="mt-2 flex flex-col md:flex-row md:justify-around items-start md:space-x-4">
                
                <div className="dark:text-white mb-2 ms-12 md:mb-0 flex-1">
                  <div className="text-lg font-semibold dark:text-white">Name:</div> {row.name}
                </div>
                <div className="dark:text-white mb-2 md:mb-0 flex-1">
                  <div className="text-lg font-semibold dark:text-white">Email:</div> {row.email}
                </div>
                <div className="dark:text-white mb-2 md:mb-0 flex-1">
                  <div className="text-lg font-semibold dark:text-white">Mobile:</div> {row.mobile}
                </div>
               
              </div>
              <div className="mt-2 flex flex-col md:flex-row md:justify-between  md:space-x-4">
                 <div className="dark:text-white mb-2 md:pl-24  ">
                  <div className="text-lg font-semibold dark:text-white">Message: {row.message}
                  </div>
                 </div>
                 
                <div >
                <button
                  onClick={() => handleClick(row._id)}
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Delete
                </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  };
  