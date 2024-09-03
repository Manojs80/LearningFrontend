import { FileText, SquarePlay } from 'lucide-react';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { GetStudyplan } from '../../api/Routing';
import { useEffect } from 'react';


export const LearnerClassroom = () => {
    
  const { id } = useParams();
  const [Studyplan, setStudyplan] = useState(null); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadStudyplan = async () => {
      try {
        let response = await GetStudyplan(id);
        setStudyplan(response.data.activities);
      } catch (error) {
        setError(error);
        console.log(error); 
      } finally {
        setLoading(false);
      }
    };

    loadStudyplan(); // Call the async function to load data
  }, [id]);  
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading Studyplan details. Please try again later.</div>;
  if (!Studyplan) return <div>No Studyplan found.</div>;

  return (
 <div>
   <div className="relative w-full pb-[56.25%]">
   {/* Video Player */}
   <iframe
    className="absolute inset-0 w-full h-full"
    src="https://www.youtube.com/embed/lJC_sJ6jhDo?list=PLTZYG7bZ1u6pQJShZs9iV0aJNzsqTm4Mx"
    title="YouTube video player"
   // frameBorder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowFullScreen
   />
   </div>
   <div>
   <div className="p-4">
      <ul className="space-y-4   ">
        {Studyplan.map((task) => (
          <li key={task.id} className="flex items-center justify-between p-4 border rounded-md shadow-sm">
            <div className="flex items-center space-x-4">
              <span className="text-lg font-semibold dark:text-white">{task.task}</span>
              <span className="dark:text-white">taskDescription: {task.taskDescription} </span>
            </div>
            <div className="flex gap-20">
              <a href={task.pdfUrl} download className="flex items-center">
                  <FileText size={28} color="#fa0000" strokeWidth={1.75} />
              </a>
              <a href={task.videoUrl} className="flex items-center">
                  <SquarePlay size={28} color="#fa0000" strokeWidth={1.75} />
              </a>
            </div>
          </li>
        ))}
      </ul>
    </div>
 

   </div>
 </div> 
  
  )
}





