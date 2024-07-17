import Homepage from './components/Homepage';
import { Route, Routes, Navigate } from 'react-router-dom';
import CreateNotes from './components/CreateNotes';
import CreateEvent from './components/CreateEvent';
import { AuthProvider, AuthContext } from './Auth/AuthContext';
import Login from './Auth/Login';
import SignUp from './Auth/SignUp';
import Logout from './Auth/Logout';
import LandingPage from './LandingPage';
import CreateTodo from './components/CreateTodo';
import './App.css'
import Location from './components/Location';
import Protected from './Protected';
import EditNotes from './components/EditNotes';
import EditEvent from './components/EditEvent';
import EditTodo from './components/EditTodo';
import ViewNote from './components/ViewNote';
import ViewTodo from './components/ViewTodo';
import ViewEvent from './components/ViewEvent';
import Profile from './components/Profile';




function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/logout" element={<Logout />} />
        <Route path='homepage' element={ <Protected><Homepage /></Protected> } /> <Route path='createnote' element={  <Protected><CreateNotes /></Protected> } /><Route path='/createevent' element={ <Protected><CreateEvent /></Protected>  } /> <Route path='/createtodo' element={<Protected><CreateTodo /></Protected> } />
        <Route path='/viewnote' element={ <Protected><ViewNote /></Protected>}/>
        <Route path='/viewevent' element={ <Protected><ViewEvent /></Protected>}/>
        <Route path='/viewtodo' element={ <Protected><ViewTodo/></Protected>}/>

        <Route path='/location' element={ <Protected><Location/></Protected>} />
        
        <Route path='/editnotes' element={ <Protected><EditNotes/></Protected>} />
        
        <Route path='/editevent' element={<Protected><EditEvent/></Protected> } /> 
        <Route path='/edittodo' element={ <Protected><EditTodo/></Protected> } />
        
        <Route path='/profile' element={ <Protected><Profile/></Protected> } />



       </Routes>
    </AuthProvider>
  )
}

export default App
