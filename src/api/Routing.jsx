import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;

//create course
export const CreateCourse = async (formData)=> {
  console.log("axios course create");
  console.log(`${apiUrl}/v1/course/create`);
  try {
      const response = await axios({
          method: 'post',
          url: `${apiUrl}/v1/course/create`,
          data: formData,  
          headers: {
            'Content-Type': 'multipart/form-data', 
          },
        });
      return  response.data
  } catch (error) {
    throw error  
  }
}

//getall course
    export const CourseList = async ()=> {
         
          try {
              const response = await axios({
                  method: 'get',
                  url: `${apiUrl}/v1/course/courseList`,
                  
                });
              return  response.data
          } catch (error) {
            throw error  
          }
      }
//DetailsCourse
export const DetailsCourse = async (id)=> {
  console.log("axios c detail",id);
  console.log(`${apiUrl}/v1/course/getcourse/${id}`);
  try {
      const response = await axios({
          method: 'get',
          url: `${apiUrl}/v1/course/getcourse/${id}`, 
        });
      return  response.data
  } catch (error) {
    throw error  
  }
}
//CourseListinstructor
export const CourseListinstructor = async (id)=> {
  console.log("axios c detail",id);
  console.log(`${apiUrl}/v1/course/courseList/${id}`);
  try {
      const response = await axios({
          method: 'get',
          url: `${apiUrl}/v1/course/courseList/${id}`, 
        });
      return  response.data
  } catch (error) {
    throw error  
  }
}
//update course
export const UpdateCourse = async (id,formData)=> {
  console.log("axios course update",id);
  console.log(`${apiUrl}/v1/course/update/${id}`);
  try {
      const response = await axios({
          method: 'put',
          url: `${apiUrl}/v1/course/update/${id}`,
          data: formData,  
          headers: {
            'Content-Type': 'multipart/form-data', 
          }, 
        });
        console.log("response",response)
      return  response
  } catch (error) {
    throw error  
  }
}
//delete course
export const DeleteCourse = async (id)=> {
  console.log("Delete course frontapi",`${apiUrl}/v1/course/delete/${id}`);
  try {
      const response = await axios({
          method: 'delete',
          url: `${apiUrl}/v1/course/delete/${id}`,
          
        });
      return  response.data
  } catch (error) {
    throw error  
  }
}
//post learners
export const Learnerlogin = async (data)=> {
   
  console.log("apiUrl",`${apiUrl}/v1/user/login`);
  
      try {
          const response = await axios({
              method: 'post',
              url: `${apiUrl}/v1/user/login`,
              data, 
              withCredentials:true,              
            });
          return  response.data
      } catch (error) {
        throw error  
      }
  }
//loading learners
export const DetailsLearner = async (id)=> {
  console.log("axios Learner detail",id);
  console.log(`${apiUrl}/v1/user/profile/${id}`);
  try {
      const response = await axios({
          method: 'get',
          url: `${apiUrl}/v1/user/profile/${id}`, 
        });
      return  response.data
  } catch (error) {
    throw error  
  }
}

//create learner
export const CreateLearner = async (formData)=> {
  console.log("axios Learner create");
  console.log(`${apiUrl}/v1/user/create`);
  try {
      const response = await axios({
          method: 'post',
          url: `${apiUrl}/v1/user/create`,
          data: formData,  
          headers: {
            'Content-Type': 'multipart/form-data', 
          },
        });
      return  response.data
  } catch (error) {
    throw error  
  }
}

//update learner
export const UpdateLearner = async (id,formData)=> {
  console.log("axios Learner update",id);
  console.log(`${apiUrl}/v1/user/update/${id}`);
  try {
      const response = await axios({
          method: 'put',
          url: `${apiUrl}/v1/user/update/${id}`,
          data: formData,  
          headers: {
            'Content-Type': 'multipart/form-data', // Set headers if you are sending form data
          }, 
        });
        console.log("response",response)
      return  response
  } catch (error) {
    throw error  
  }
}
//delete learners
export const DeleteLearner = async (id)=> {
  console.log("Delete learner frontapi",`${apiUrl}/v1/user/delete/${id}`);
  try {
      const response = await axios({
          method: 'delete',
          url: `${apiUrl}/v1/user/delete/${id}`,
          
        });
      return  response.data
  } catch (error) {
    throw error  
  }
}
//create studyplan 
export const CreateStudyplan = async (formData)=> {
  console.log("axios studyplan create");
  console.log(`${apiUrl}/v1/studyplan/create`);
  try {
      const response = await axios({
          method: 'post',
          url: `${apiUrl}/v1/studyplan/create`,
          data: formData,  
          headers: {
            'Content-Type': 'application/json', 
          },
        });
      return  response.data
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message || 'Unknown error');
    }
    throw new Error('Network or server error');
   
  }
}

//getstudyplan
export const GetStudyplan = async (id)=> {
  console.log("GetStudyplan frontapi",id);
  console.log(`${apiUrl}/v1/studyplan/getstudyplan/${id}`);
  try {
      const response = await axios({
          method: 'get',
          url: `${apiUrl}/v1/studyplan/getstudyplan/${id}`, 
        });
      return  response.data
  } catch (error) {
    throw error  
  }
}
//update studyplan
export const UpdateStudyplan = async (id,formData)=> {
  console.log("axios studyplan update",id);
  console.log(`${apiUrl}/v1/studyplan/update/${id}`);
  try {
      const response = await axios({
          method: 'put',
          url: `${apiUrl}/v1/studyplan/update/${id}`,
          data: formData,  
          headers: {
            'Content-Type': 'application/json', // Set headers if you are sending form data
          }, 
        });
        console.log("response",response)
      return  response
  } catch (error) {
    throw error  
  }
}
//delete studyplan
export const DeleteStudyplan = async (id)=> {
  console.log("Delete studyplan frontapi",`${apiUrl}/v1/studyplan/delete/${id}`);
  try {
      const response = await axios({
          method: 'delete',
          url: `${apiUrl}/v1/studyplan/delete/${id}`,
          
        });
      return  response.data
  } catch (error) {
    throw error  
  }
}
//create assignment
export const CreateAssignment = async (formData)=> {
  console.log("axios assignment create",formData);
  console.log(`${apiUrl}/v1/assignment/create`);
  try {
      const response = await axios({
          method: 'post',
          url: `${apiUrl}/v1/assignment/create`,
          data: formData,  
          headers: {
            'Content-Type': 'application/json', 
          },
        });
      return  response.data
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message || 'Unknown error');
    }
    throw new Error('Network or server error');
   
  }
}

//getAssignment
export const GetAssignment = async (id)=> {
  console.log("GetAssignment frontapi",id);
  console.log(`${apiUrl}/v1/assignment/getassignment/${id}`);
  try {
      const response = await axios({
          method: 'get',
          url: `${apiUrl}/v1/assignment/getassignment/${id}`, 
        });
      return  response.data
  } catch (error) {
    throw error  
  }
}
//Assignment-all

export const AssignmentList = async (id)=> {
  console.log("AssignmentList frontapi",`${apiUrl}/v1/assignment/assignmentList/${id}`);
  try {
      const response = await axios({
          method: 'get',
          url: `${apiUrl}/v1/assignment/assignmentList/${id}`,
          
        });
      return  response.data
  } catch (error) {
    throw error  
  }
}
//updateAssignment
export const UpdateAssignment = async (id,formData)=> {
  console.log("axios Assignment update",id);
  console.log("axios assignment update",formData);
  console.log(`${apiUrl}/v1/assignment/update/${id}`);
  try {
      const response = await axios({
          method: 'put',
          url: `${apiUrl}/v1/assignment/update/${id}`,
          data: formData,  
          headers: {
            'Content-Type': 'application/json', // Set headers if you are sending form data
          }, 
        });
        console.log("response",response)
      return  response
  }catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message || 'Unknown error');
    }
    throw new Error('Network or server error');
   
  }
}
//deleteassignment
export const DeleteAssignment = async (id)=> {
  console.log("DeleteQuiz frontapi",`${apiUrl}/v1/assignment/delete/${id}`);
  try {
      const response = await axios({
          method: 'delete',
          url: `${apiUrl}/v1/assignment/delete/${id}`,
          
        });
      return  response.data
  } catch (error) {
    throw error  
  }
}
// crete quiz
export const CreateQuiz = async (formData)=> {
  console.log("axios quiz create",formData);
  console.log(`${apiUrl}/v1/quiz/create`);
  try {
      const response = await axios({
          method: 'post',
          url: `${apiUrl}/v1/quiz/create`,
          data: formData,  
          headers: {
            'Content-Type': 'application/json', 
          },
        });
      return  response.data
  } catch (error) {
    throw error  
  }
}
//GetQuizList
export const QuizListGet = async (id)=> {
  console.log("GetQuizList frontapi",`${apiUrl}/v1/quiz/quizList/${id}`);
  try {
      const response = await axios({
          method: 'get',
          url: `${apiUrl}/v1/quiz/quizList/${id}`,
          
        });
      return  response.data
  } catch (error) {
    throw error  
  }
}
//getquiz
export const GetQuiz = async (id)=> {
  console.log("Getquiz frontapi",id);
  console.log(`${apiUrl}/v1/quiz/getQuiz/${id}`);
  try {
      const response = await axios({
          method: 'get',
          url: `${apiUrl}/v1/quiz/getQuiz/${id}`, 
        });
      return  response.data
  } catch (error) {
    throw error  
  }
}
//SubmitQuiz
export const SubmitQuiz = async (payload) => {
  console.log("axios quiz SubmitQuiz", payload);
  try {
    const response = await axios({
      method: 'post',
      url: `${apiUrl}/v1/quiz/submit`,
      data: payload, 
      headers: {
        'Content-Type': 'application/json',
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error submitting quiz:', error);
    throw error;
  }
};
//quizupdate
export const UpdateQuiz = async (id,formData)=> {
  console.log("axios Learner update",id);
  console.log(`${apiUrl}/v1/quiz/update/${id}`);
  try {
      const response = await axios({
          method: 'put',
          url: `${apiUrl}/v1/quiz/update/${id}`,
          data: formData,  
          headers: {
            'Content-Type': 'application/json', // Set headers if you are sending form data
          }, 
        });
        console.log("response",response)
      return  response
  } catch (error) {
    throw error  
  }
}
//quizdelete
export const DeleteQuiz = async (id)=> {
  console.log("DeleteQuiz frontapi",`${apiUrl}/v1/quiz/delete/${id}`);
  try {
      const response = await axios({
          method: 'delete',
          url: `${apiUrl}/v1/quiz/delete/${id}`,
          
        });
      return  response.data
  } catch (error) {
    throw error  
  }
}
//DetailsInstructor
export const DetailsInstructor = async (id)=> {
  console.log("axios Instructor detail",id);
  console.log(`${apiUrl}/v1/instructor/profile/${id}`);
  try {
      const response = await axios({
          method: 'get',
          url: `${apiUrl}/v1/instructor/profile/${id}`, 
        });
      return  response.data
  } catch (error) {
    throw error  
  }
}
//create instuctor
export const CreateInstructor = async (formData)=> {
  console.log("axios instructor create");
  console.log(`${apiUrl}/v1/instructor/create`);
  try {
      const response = await axios({
          method: 'post',
          url: `${apiUrl}/v1/instructor/create`,
          data: formData,  
          headers: {
            'Content-Type': 'multipart/form-data', 
          },
        });
      return  response.data
  } catch (error) {
    throw error  
  }
}

//login instructor
export const Instructorlogin = async (data)=> {
   
  console.log(apiUrl,"apiUrl");
  
      try {
          const response = await axios({
              method: 'post',
              url: `${apiUrl}/v1/instructor/login`,
              data,
              withCredentials:true,
            });
          return  response.data
      } catch (error) {
        throw error  
      }
  }
//update instuctor
export const UpdateInstructor = async (id,formData)=> {
  console.log("axios instructor update",id);
  console.log(`${apiUrl}/v1/instructor/update/${id}`);
  try {
      const response = await axios({
          method: 'put',
          url: `${apiUrl}/v1/instructor/update/${id}`,
          data: formData,  
          headers: {
            'Content-Type': 'multipart/form-data', // Set headers if you are sending form data
          }, 
        });
        console.log("response",response)
      return  response
  } catch (error) {
    throw error  
  }
}
//instructorlist
export const InstructorList = async ()=> {
  console.log("Get instructor List frontapi",`${apiUrl}/v1/instructor/instructorlist`);
  try {
      const response = await axios({
          method: 'get',
          url: `${apiUrl}/v1/instructor/instructorlist`,
          
        });
      return  response.data
  } catch (error) {
    throw error  
  }
}
//deleteinstructor
export const DeleteInstructor = async (id)=> {
  console.log("Delete instructor frontapi",`${apiUrl}/v1/instructor/delete/${id}`);
  try {
      const response = await axios({
          method: 'delete',
          url: `${apiUrl}/v1/instructor/delete/${id}`,
          
        });
      return  response.data
  } catch (error) {
    throw error  
  }
}
//adminlogin
export const Adminlogin = async (data)=> {
   
  console.log(apiUrl,"apiUrl");
  
      try {
          const response = await axios({
              method: 'post',
              url: `${apiUrl}/v1/admin/login`,
              data,
              withCredentials:true,
            });
          return  response.data
      } catch (error) {
        throw error  
      }
  }
  //admin deatails
  export const DetailsAdmin = async (id)=> {
    console.log("axios Admin detail",id);
    console.log(`${apiUrl}/v1/admin/profile/${id}`);
    try {
        const response = await axios({
            method: 'get',
            url: `${apiUrl}/v1/admin/profile/${id}`, 
          });
          console.log("axios Admin detail2");
        return  response.data
    } catch (error) {
      throw error  
    }
  }
  //update Admin
export const UpdateAdmin = async (id,formData)=> {
  console.log("axios Admin update frontend",id);
  console.log(`${apiUrl}/v1/admin/update/${id}`);
  try {
      const response = await axios({
          method: 'put',
          url: `${apiUrl}/v1/admin/update/${id}`,
          data: formData,  
          headers: {
            'Content-Type': 'multipart/form-data', // Set headers if you are sending form data
          }, 
        });
        console.log("response",response)
      return  response
  } catch (error) {
    throw error  
  }
}
//Feedback
//contactFeedback
export const CreateFeedback = async (data)=> {
  console.log("axiosFeedback create");
  console.log(`${apiUrl}/v1/feedback/create`);
  try {
      const response = await axios({
          method: 'post',
          url: `${apiUrl}/v1/feedback/create`,
          data: data,  
          
        });
      return  response.data
  } catch (error) {
    throw error  
  }
}

//getall Feedback
    export const FeedbackList = async ()=> {
         
          try {
              const response = await axios({
                  method: 'get',
                  url: `${apiUrl}/v1/feedback/feedbackList`,
                  
                });
              return  response.data
          } catch (error) {
            throw error  
          }
      }
//Details Feedback
export const DetailsFeedback = async (id)=> {
  console.log("axios Feedback detail",id);
  console.log(`${apiUrl}/v1/feedback/get/${id}`);
  try {
      const response = await axios({
          method: 'get',
          url: `${apiUrl}/v1/feedback/get/${id}`, 
        });
      return  response.data
  } catch (error) {
    throw error  
  }
}

//delete Feedback
export const DeleteFeedback = async (id)=> {
  console.log("Delete Feedback frontapi",`${apiUrl}/v1/feedback/delete/${id}`);
  try {
      const response = await axios({
          method: 'delete',
          url: `${apiUrl}/v1/feedback/delete/${id}`,
          
        });
      return  response.data
  } catch (error) {
    throw error  
  }
}
//contact
//contactcreate
export const CreateContact = async (data)=> {
  console.log("axios Contact create");
  console.log(`${apiUrl}/v1/contact/create`);
  try {
      const response = await axios({
          method: 'post',
          url: `${apiUrl}/v1/contact/create`,
          data: data,  
          
        });
      return  response.data
  } catch (error) {
    throw error  
  }
}

//getall course
    export const ContactList = async ()=> {
         
          try {
              const response = await axios({
                  method: 'get',
                  url: `${apiUrl}/v1/contact/contactList`,
                  
                });
              return  response.data
          } catch (error) {
            throw error  
          }
      }
//DetailsCourse
export const DetailsContact = async (id)=> {
  console.log("axios Contact detail",id);
  console.log(`${apiUrl}/v1/contact/get/${id}`);
  try {
      const response = await axios({
          method: 'get',
          url: `${apiUrl}/v1/contact/get/${id}`, 
        });
      return  response.data
  } catch (error) {
    throw error  
  }
}

//delete course
export const DeleteContact = async (id)=> {
  console.log("Delete Contact frontapi",`${apiUrl}/v1/contact/delete/${id}`);
  try {
      const response = await axios({
          method: 'delete',
          url: `${apiUrl}/v1/contact/delete/${id}`,
          
        });
      return  response.data
  } catch (error) {
    throw error  
  }
}
//loguot
export const Logout = async ()=> {
  console.log("Logout frontapi",`${apiUrl}/v1/logout`);
  try {
      const response = await axios({
          method: 'post',
          url: `${apiUrl}/v1/logout`,
          credentials: 'include',
        });
      return  response.data
  } catch (error) {
    throw error  
  }
}