import { BrowserRouter, NavLink, Route, Router, Routes, Navigate } from "react-router-dom"
import { HomePage } from "./pages/HomePage"
import { EntrezPage } from "./pages/EntrezPage"
import { EntrezSearch } from "./components/EntrezSearch"
import { FilePage } from "./pages/FilePage"
import { FileUpload } from "./components/FileUpload"
import { SequenceRecordsContext } from "./context/SequenceRecordsContext"
import { useEffect, useState } from "react"
import { SequenceRecord } from "./lib/types"
import AnalyzePage from "./pages/AnalyzePage"
import NucleotideCount from "./components/analyze/NucleotideCount"
import Register from "./pages/Register"
import Login from "./pages/Login"
import ProtectedRoute from "./components/ProtectedRoute"
import NotFound from "./pages/NotFound"
import SequencePage from './pages/SequencePage'
import { getCurrentUser } from "./api/auth"
import { CurrentUserContext } from "./context/CurrentUserContext"
import { ACCESS_TOKEN } from "./lib/constants"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { FaUserCircle } from "react-icons/fa";

function Logout() {
  localStorage.clear()

  return <Navigate to="/login" />
}

function RegisterAndLogout() {
  localStorage.clear()
  return <Register />
}

function App() {
  const queryClient = useQueryClient()

  const {isLoading, isError, isSuccess, data} = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
  })
  const [savedRecords, setSavedRecords] = useState<SequenceRecord[]>([])
  const [currentUser, setCurrentUser] = useState({})

  useEffect(() => {
    const setUserData = async ()=> {
      if(isLoading) setCurrentUser({})
      if(isError) setCurrentUser({})
      else if(isSuccess){
          console.log(data)
          setCurrentUser(data)
      }
    }
    window.addEventListener("storage",setUserData);

    return () => {
      // When the component unmounts remove the event listener
      window.removeEventListener("storage", setUserData);
    };
  }, []);

  return (
    <>
      <CurrentUserContext.Provider value={{currentUser, setCurrentUser}}>
        <SequenceRecordsContext.Provider value={{savedRecords, setSavedRecords}}>
          <BrowserRouter>
            <nav className="w-full bg-slate-600 text-white flex">
              <div className="flex w-[60%] items-center">
                <NavLink to="/" className="w-full text-center hover:!bg-slate-500 p-3 hover:brightness-125">Home</NavLink>
                <NavLink to="/entrez" className="w-full text-center hover:!bg-slate-500 p-3">Entrez</NavLink>
                <NavLink to="/file" className="w-full text-center hover:!bg-slate-500 p-3">File</NavLink>
                <NavLink to="/analyze" className="w-full text-center hover:!bg-slate-500 p-3">Analyze</NavLink>
                <NavLink to="/sequences" className="w-full text-center hover:!bg-slate-500 p-3">Sequences</NavLink>
              </div>
              <div className="w-[40%] flex items-center justify-end">
              {
                localStorage.getItem('access') ? 
                  <>
                    <NavLink to="/logout" className="text-center hover:!bg-slate-500 p-3">Logout</NavLink>
                    <NavLink to="/profile" className="text-center hover:!bg-slate-500 p-4 self-center"><FaUserCircle /></NavLink>
                  </> : 
                  <NavLink to="/login" className="text-center hover:!bg-slate-500 p-3">Login</NavLink>
              }
              </div>
            </nav>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/logout" element={<Logout />} />
              <Route path="/register" element={<Register />} />
              <Route path="/sequences" element={<ProtectedRoute><SequencePage /></ProtectedRoute>} />
              <Route 
                path="entrez"  
                element={
                  <ProtectedRoute>
                    <EntrezPage />
                  </ProtectedRoute>
                }
              >
                  {/* <Route path="" element={<EntrezInfo />} /> */}
                  <Route path="search" element={<ProtectedRoute><EntrezSearch /></ProtectedRoute>}/>
              </Route>
              <Route path="file"  element={<FilePage />}>
                  {/* <Route path="" element={<EntrezInfo />} /> */}
                  <Route path="upload" element={<FileUpload />}/>
              </Route>
              <Route path="analyze"  element={<AnalyzePage />}>
                  <Route path="nucleotide-count" element={<NucleotideCount />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </SequenceRecordsContext.Provider>
      </CurrentUserContext.Provider>
    </>
  )
}

export default App
