

import { Route, Routes } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import Dashboard from './components/Dashboard'
import Overview from './pages/Overview'
import Directory from './pages/Directory'
import AddMember from './components/AddMember'
import Update from './components/Update'

function App() {

  return (
    <>
      <Navbar />

      <Routes>
        <Route path='/' element={<Dashboard />}>
          <Route index element={<Overview />} />  {/* updated */}
          <Route path='overview' element={<Overview />}/>
          <Route path='directory' element={<Directory />}/>
        </Route>

        <Route path='/addmember' element={<AddMember />} />
        <Route path='/update/:id' element={<Update />} />
      </Routes>
    </>
  )
}

export default App
