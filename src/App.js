import {createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route
} from 'react-router-dom'
import useThemeContext from './hook/useThemeContext';
import './App.css';
import Signup, {action as signupAction} from './pages/signup/Signup';
import Login, {action as loginAction} from './pages/login/Login';
import Packages from './pages/packages/Packages';
import Dashboard from './pages/dashboard/Dashboard';
import Error from './components/Error';
import UserLayout from './components/UserLayout';
import { UserAuthContextProvider } from './context/UserAuthContext';
import UserAuthLayout from './components/UserAuthLayout';
import NavLayout from './components/NavLayout';
import PublicHome from './pages/public_home/PublicHome';
import Exam from './pages/exam/Exam';
import Training from './pages/training/Training';
import SideLayout from './components/SideLayout';
import Exams from './pages/exams/Exams';
import Trainings from './pages/trainings/Trainings';
import Profile from './pages/profile/Profile';
import Contact from './pages/contact/Contact';
import { action as messageAction } from './components/form/ContactForm';
import NoMatch from './pages/noMatch/NoMatch';
import Help from './pages/Help/Help';
import AdminLogin, {action as adminLoginAction} from './pages/login/AdminLogin';
import { AdminAuthContextProvider } from './context/AdminAuthContext';
import AdminAuthLayout from './components/AdminAuthLayout';
import SideLayoutAdmin from './components/SideLayoutAdmin';
import DashboardAdmin from './pages/dashboard/DashboardAdmin';
import Students from './pages/students/Students';
import Questions from './pages/questions/Questions';
import Admins from './pages/admins/Admins';
import Messages from './pages/messages.jsx/Messages';
import UpdateQuestion from './pages/questions/UpdateQuestion';
import UpdateStudent from './pages/students/UpdateStudent';
import UpdateAdmin from './pages/admins/UpdateAdmin';


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' errorElement={<Error/>}>

      {/* ACCESSED BY ONLY BY LOGGED IN USERS */}
      <Route element={<UserAuthContextProvider><UserLayout/></UserAuthContextProvider>} >
        <Route element={<SideLayout/>}>
          <Route 
            path='home' 
            element={<Dashboard/>}
          />
          <Route 
            path='exams' 
            element={<Exams/>}
          />
          <Route
            path='trainings' 
            element={<Trainings/>}
          />
          <Route 
            path='profile' 
            element={<Profile/>}
          />
          <Route 
            path='contact' 
            element={<Contact/>}
            action={messageAction}
          />
        </Route>

        <Route 
          path='exam' 
          element={<Exam/>}
          errorElement={<Error/>}
        />

        <Route 
          path='training' 
          element={<Training/>}
          errorElement={<Error/>}
        />
      </Route>

      {/* ACCESSED BY EVERYONE */}
      <Route element={<NavLayout/>}>
        <Route
          index
          element={<PublicHome/>}
          action={messageAction}
        />

        <Route
          path='packages'
          element={<Packages/>}
        />

        <Route
          path='/help'
          element={<Help/>}
        />
        
        <Route path='*' element={<NoMatch/>}/>

      </Route>

      {/* ACCESSED BY EVERYONE */}
      <Route element={<UserAuthContextProvider><UserAuthLayout/></UserAuthContextProvider>} >
        <Route
          path='signup' 
          element={<Signup/>}
          action={signupAction}
        />

        <Route 
          path='login' 
          element={<Login/>}
          action={loginAction}
        />

      </Route>


      {/* ONLY ACCESSED BY ADMINS */}
      <Route path='admin' >
        <Route element={<AdminAuthContextProvider><AdminAuthLayout/></AdminAuthContextProvider>}>
          <Route
            path='login'
            element={<AdminLogin/>}
            action={adminLoginAction}
            />
        </Route>

        <Route element={<AdminAuthContextProvider><SideLayoutAdmin/></AdminAuthContextProvider>} >
          <Route index element={<DashboardAdmin/>}/>
          <Route path="students" element={<Students/>}/>
          <Route path="students/:id" element={<UpdateStudent/>}/>
          <Route path="questions" element={<Questions/>}/>
          <Route path="questions/:id" element={<UpdateQuestion/>}/>
          <Route path="admins" element={<Admins/>}/>
          <Route path="admins/:id" element={<UpdateAdmin/>}/>
          <Route path="messages" element={<Messages/>}/>
          <Route path="messages/:id" element={<Messages/>}/>
        </Route>
      </Route>

    </Route>
  )
)


function App() {

  //using the theme context
  const {theme} = useThemeContext()

  return (
    <div id={theme}>
      <RouterProvider router={router}/>
    </div>
  );
}

export default App;