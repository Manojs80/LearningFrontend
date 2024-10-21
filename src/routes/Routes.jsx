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
import {  AdminLearners } from "../pages/admin/AdminLearners";
import { AdminInstructors } from "../pages/admin/AdminInstructors";
import { SignUpPage } from "../pages/SignUpPage";
import { Contact } from "../components/Contact";
import { FeedbackMessage } from "../components/FeedbackMessage";
import { Assignment } from "../pages/course/Assignment";
import { AdminFM } from "../pages/admin/AdminFM";
import { Quiz } from "../pages/course/Quiz";
import { UserAuth } from "./UserAuth";
import { InstructorAuth } from "./InstructorAuth";
import { AdminAuth } from "./AdminAuth";
import { LearnerProfileEdit } from "../pages/learner/LearnerProfileEdit";
import { InstructorProfileEdit } from "../pages/instructor/InstructorProfileEdit";
import { AdminProfileEdit } from "../pages/admin/AdminProfileEdit";
import { LearnerQuiz } from "../pages/learner/LearnerQuiz";
import { CourseCreateEdit } from "../pages/course/CourseCreateEdit";
import { InstructorHome } from "../pages/instructor/InstructorHome";
import { QuizAdd } from "../pages/course/QuizAdd";
import { AdminAssignments } from "../pages/admin/AdminAssignments";
import { AdminQuizList } from "../pages/admin/AdminQuizList";
import { PaymentSuccess } from "../pages/course/PaymentSuccess";
import { PaymentCancel } from "../pages/course/PaymentCancel";
import { FooterPage } from "../pages/FooterPage";
import { PaymentLogin } from "../components/PaymentLogin";
import { AdminAssignmentsDetails } from "../pages/admin/AdminAssignmentsDetails";
import { AdminQuizDetails } from "../pages/admin/AdminQuizDetails";
import { AdminEnquiries } from "../pages/admin/AdminEnquiries";
import { InstructorSubmission } from "../pages/instructor/instructorSubmission";




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
          path: '',
          element: <CourseCard/>
        },
        {
          path: 'courseAdd',
          element: <CourseCreateEdit/>
        },
        {
          path: 'Payment/:id',
          element: <PaymentLogin/>
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
          path: "payment/success",
          element: <PaymentSuccess/>
        },
        {
          path: "payment/cancel",
          element: <PaymentCancel/>
        },
        {
          path: "Contact",
          element: <Contact/>
        },
        {
          path: 'footer/:sectionId',
          element: <FooterPage/>
        },
       
      ]
    },
   
    {
      path: "/Learner/",
      element: <UserAuth><LearnerPage/></UserAuth>,
      errorElement: <ErrorPage/>,
      children: [
         {
          path: "profile/:id",
          element: <LearnerProfile/>
        },
        {
          path: ":id",
          element: <LearnerProfile/>
        },
        {
          path: ":id/edit",
          element: <LearnerProfileEdit/>
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
          path: "course/AssignmentList/:id",
          element:  <LearnerAssignment/>
        },
        {
          path: "course/quizs/:id",
          element:  <LearnerQuizList/>
        },
        {
          path: "quiz/:id",
          element:  <LearnerQuiz/>
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
      element: <InstructorAuth><InstructorPage/></InstructorAuth>,
      errorElement: <ErrorPage/>,
      children: [
         {
          path: ":id",
          element: <InstructorProfile/>
        },
        {
          path: ":id/edit",
          element: <InstructorProfileEdit/>
        },
        {
          path: "home",
          element: <InstructorHome/>
        },
        {
          path: "home/CourseAdd",
          element: <CourseCreateEdit/>
        },
        {
          path: "CourseAdd/:id",
          element: <CourseCreateEdit/>
        },
        {
          path: "course/:id",
          element: <InstructorClassroom/> 
        },
        {
          path: "CourseCard/:id",
          element: <CourseDetail/>
        },
        {
          path: "course/AssignmentList/:id",
          element:  <InstructorAssignment/>
        },      
        {
          path: "course/SubmissionList/:id",
          element:  <InstructorSubmission/>
        },
        {
          path: "assignmetAdd/:id",
          element:  <Assignment/>
        },
        {
          path: ":courseId/assignmetChange",
          element:  <Assignment/>
        },
        {
          path: "course/quizs/:id",
          element:  <InstructorQuizList/>
        },
        {
          path: "quizAdd/:id",
          element: <QuizAdd/>
        },
        {
          path: ":courseId/quizChange/:id",
          element: <Quiz/>
        },
        {
          path: "suggestion",
          element: <FeedbackMessage/>
        },
        {
          path: "Course/:courseId/studyplan",
          element: <SplanCreateEdit/>
        },
        {
          path: "Course/:courseId/studyplan/:id",
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
      element:  <AdminAuth><AdminPage/></AdminAuth>,
      errorElement: <ErrorPage/>,
      children: [
         {
          path: ":id",
          element: <AdminProfile/>
        },
        {
          path: ":id/edit",
          element: <AdminProfileEdit/>
        },
        {
          path: "home",
          element: <CourseCard/>
        },
        {
          path: "Courses",
          element: <AdminClassroom/>
        },
        {
          path: "Courses/:id",
          element: <CourseDetail/>
        },
       
        {
          path: "Instructors",
          element:  <AdminInstructors/>
        },
        {
          path: "Instructors/:id",
          element:  <InstructorProfile/>
        },
        {
          path: "Instructors/:id/edit",
          element: <InstructorProfileEdit/>
        },
        {
          path: "Assignments",
          element:  <AdminAssignments/>
        },
        {
          path: "Assignments/:id",
          element:  <AdminAssignmentsDetails/>
        },
        {
          path: "assignmetAdd/:id",
          element:  <Assignment/>
        },
        {
          path: "assignmetChange/:courseId",
          element:  <Assignment/>
        },
        {
          path: "Learners",
          element:  <AdminLearners/>
        },
        {
          path: "Learners/:id",
          element:  <LearnerProfile/>
        },
        {
          path: "Learners/:id/edit",
          element: <LearnerProfileEdit/>
        },
        {
          path: "QuizList",
          element:  <AdminQuizList/>
        },
        {
          path: "QuizList/:id",
          element:  <AdminQuizDetails/>
        }, {
          path: "quizAdd/:id",
          element: <QuizAdd/>
        },
        {
          path: ":courseId/quizChange/:id",
          element: <Quiz/>
        },
        {
          path: "feedback/message",
          element:  <AdminFM/>
        },
        {
          path: "Enquiries",
          element:  <AdminEnquiries/>
        },
        {
          path: "*",
          element: <LearnerError/>
        },
      ]
    },
  ]);