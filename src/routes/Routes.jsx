import { createBrowserRouter } from "react-router-dom";
import { HomePage } from "../pages/HomePage";
import { LoginPage } from "../pages/admin/LoginPage";
import { CourseCard } from "../pages/course/CourseCard";
import { ErrorPage } from "../pages/ErrorPage";
import { CourseDetail } from "../pages/course/CourseDetail";
import { LearnerPage} from "../pages/LearnerPage";
import { LearnerError } from "../components/LearnerError";
import { LearnerProfile } from "../pages/learner/LearnerProfile";
import { LearnerClassroom } from "../pages/learner/LearnerClassroom";
import { LearnerAssignment } from "../pages/learner/LearnerAssignment";
import { LearnerQuizList } from "../pages/learner/LearnerQuizList";
import { InstructorPage } from "../pages/InstructorPage";
import { InstructorProfile } from "../pages/instructor/InstructorProfile";
import { InstructorClassroom } from "../pages/instructor/InstructorClassroom";
import {  SplanCreateEdit } from "../pages/course/SplanCreateEdit";
import { InstructorAssignment } from "../pages/instructor/InstructorAssignment";
import { InstructorQuizList } from "../pages/instructor/InstructorQuizList";
import { AdminPage } from "../pages/AdminPage";
import { AdminProfile } from "../pages/admin/AdminProfile";
import { AdminClassroom } from "../pages/admin/AdminClassroom";
import { AdminAssignment } from "../pages/admin/AdminAssignment";
import { AdminQuizList } from "../pages/admin/AdminQuizList";
import { SignUpPage } from "../pages/SignUpPage";
import { Contact } from "../components/Contact";
import { FeedbackMessage } from "../components/FeedbackMessage";
import { Assignment } from "../pages/course/Assignment";
import { AdminFM } from "../pages/admin/AdminFM";
import { Quiz } from "../pages/course/Quiz";



export const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage/> ,
      errorElement: <ErrorPage/>,
      children: [
        {
          path: "home",
          element: <CourseCard/>
        },
        {
          path: "login",
          element: <LoginPage/>
        },
        {
          path: "signup",
          element: <SignUpPage/>
        },
        {
          path: "CourseDetail/:id",
          element: <CourseDetail/>
        },
        {
          path: "Contact",
          element: <Contact/>
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
          path: "home",
          element: <CourseCard/>
        },
        {
          path: "course/:id",
          element: <LearnerClassroom/>
        },
        {
          path: "AssignmentList/:id",
          element:  <LearnerAssignment/>
        },
        {
          path: "quizs",
          element:  <LearnerQuizList/>
        },
        {
          path: "feedback-message",
          element: <FeedbackMessage/>
        },
        {
          path: "*",
          element: <LearnerError/>
        },
      ]
    },
    {
      path: "/Instructor/",
      element:  <InstructorPage/>,
      errorElement: <ErrorPage/>,
      children: [
         {
          path: ":id",
          element: <InstructorProfile/>
        },
        {
          path: "home",
          element: <CourseCard/>
        },
        {
          path: "course/:id",
          element: <InstructorClassroom/>
        },
        {
          path: "AssignmentList/:id",
          element:  <InstructorAssignment/>
        },
        {
          path: "AssignmentList/66d552db2b47076d37d8ed64/assignmetAdd",
          element:  <Assignment/>
        },
        {
          path: "AssignmentList/:id/assignmet/:id",
          element:  <Assignment/>
        },
        {
          path: "quizs",
          element:  <InstructorQuizList/>
        },
        {
          path: "quizs/quizAdd",
          element: <Quiz/>
        },
        {
          path: "Quizs/:id",
          element:  <Quiz/>
        },
        {
          path: "suggestion",
          element: <FeedbackMessage/>
        },
        {
          path: "Course/66c431f1c8addb7d24853198/studyplan",
          element: <SplanCreateEdit/>
        },
        {
          path: "Course/66c431f1c8addb7d24853198/studyplan/:id",
          element: <SplanCreateEdit/>
        },
        {
          path: "*",
          element: <LearnerError/>
        },
      ]
    },
    {
      path: "/Admin/",
      element:  <AdminPage/>,
      errorElement: <ErrorPage/>,
      children: [
         {
          path: ":id",
          element: <AdminProfile/>
        },
        {
          path: "home",
          element: <CourseCard/>
        },
        {
          path: "course/:id",
          element: <AdminClassroom/>
        },
       
        {
          path: "AssignmentList",
          element:  <AdminAssignment/>
        },
        {
          path: "AssignmentList/assignment/:id",
          element:  <Assignment/>
        },
        {
          path: "quizs",
          element:  <AdminQuizList/>
        },
        {
          path: "feedback/message",
          element:  <AdminFM/>
        },
        {
          path: "*",
          element: <LearnerError/>
        },
      ]
    },
  ]);