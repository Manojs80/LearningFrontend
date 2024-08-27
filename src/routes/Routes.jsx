import { createBrowserRouter } from "react-router-dom";
import { HomePage } from "../pages/HomePage";
import { SignUpPage } from "../pages/instructor/SignUpPage";
import { LoginPage } from "../pages/admin/LoginPage";
import { CourseCard } from "../pages/course/CourseCard";
import { ErrorPage } from "../pages/ErrorPage";
import { CourseDetail } from "../pages/course/CourseDetail";
import { LearnerPage} from "../pages/LearnerPage";
import { LearnerError } from "../components/LearnerError";
import { LearnerProfile } from "../pages/learner/LearnerProfile";
import { LearnerSignup } from "../pages/learner/LearnerSignup";



export const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage/> ,
      errorElement: <ErrorPage/>,
      children: [
        {
          path: "",
          element: <CourseCard/>
        },
        {
          path: "login",
          element: <LoginPage/>
        },
        {
          path: "signup",
          element: <LearnerSignup/>
        },
        {
          path: "CourseDetail/:id",
          element: <CourseDetail/>
        },
       
      ]
    },
    {
      path: "/Learner/",
      element:  <LearnerPage/>,
      errorElement: <ErrorPage/>,
      children: [
         {
          path: ":id",
          element: <LearnerProfile/>
        },
        {
          path: "66c21e5d525f93085956f0ab/edit/:id",
          element:  <LearnerSignup/>
        },
        {
          path: "Assignments",
          element:  "Assignments  page"
        },
        {
          path: "quizs",
          element:  "quizs page"
        },
        {
          path: "helps",
          element: "help page"
        },
        {
          path: "*",
          element: <LearnerError/>
        },
      ]
    },
  ]);