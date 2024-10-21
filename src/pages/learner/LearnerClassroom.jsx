import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { GetStudyplan } from '../../api/Routing';
import { LoadingPage } from '../../LoadingPage';
import { FileText, SquarePlay } from 'lucide-react';

export const LearnerClassroom = () => {
  const { id } = useParams();
  const [Studyplan, setStudyplan] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentVideoUrl, setCurrentVideoUrl] = useState('https://www.youtube.com/embed/lJC_sJ6jhDo'); // Default video URL

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

  if (loading) return <LoadingPage />;
  if (error) return <div>Error loading Studyplan details. Please try again later.</div>;
  if (!Studyplan.length) return <div>No Studyplan found.</div>;

  const handleVideoChange = (videoUrl) => {
    setCurrentVideoUrl(videoUrl); // Update the video URL state
  };

  return (
    <div>
      <h1 className="mb-6 text-center text-2xl font-bold text-green-500">Learners ClassRoom</h1>
      <div className="relative w-full pb-[56.25%]">
        {/* Video Player */}
        <iframe
          className="absolute inset-0 w-full h-full"
          src={currentVideoUrl} // Use the current video URL from state
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
      <div className="p-4">
        <ul className="space-y-4">
          {Studyplan.map((task) => (
            <li key={task.id} className="flex items-center justify-between p-4 border rounded-md shadow-sm">
              <div className="flex items-center space-x-4">
                <span className="text-lg font-semibold dark:text-white">{task.task}</span>
                <span className="dark:text-white">taskDescription: {task.taskDescription}</span>
              </div>
              <div className="flex gap-20">
              <a 
                 href={task.pdfNote} 
                 download 
                 target="_blank" 
                       rel="noopener noreferrer" 
                className="flex items-center"
                 >
                  <FileText size={28} color="#fa0000" strokeWidth={1.75} />
                </a>

                <button onClick={() => handleVideoChange(task.videoUrl)} className="flex items-center">
                  <SquarePlay size={28} color="#fa0000" strokeWidth={1.75} />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
