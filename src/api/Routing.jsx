import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;


 export const Learnerlogin = async (data)=> {
   
    console.log(apiUrl,"apiUrl");
    
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
//
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
