import { BrowserRouter, NavLink, Route, Router, Routes } from "react-router-dom"
import { HomePage } from "./pages/HomePage"
import { EntrezPage } from "./pages/EntrezPage"
import { EntrezSearch } from "./components/EntrezSearch"
import { FilePage } from "./pages/FilePage"
import { FileUpload } from "./components/FileUpload"
import { SequenceRecordsContext } from "./context/SequenceRecordsContext"
import { useState } from "react"
import { SequenceRecord } from "./lib/types"
import AnalyzePage from "./pages/AnalyzePage"

function App() {
  const [savedRecords, setSavedRecords] = useState<SequenceRecord[]>([])

  return (
    <>
      <SequenceRecordsContext.Provider value={{savedRecords, setSavedRecords}}>
        <BrowserRouter>
          <nav className="flex justify-evenly w-full border-b bg-green-600 text-white">
            <NavLink to="/" className="w-full text-center hover:!bg-green-400 p-1">Home</NavLink>
            <NavLink to="/entrez" className="w-full text-center hover:!bg-green-400 p-1">Entrez</NavLink>
            <NavLink to="/file" className="w-full text-center hover:!bg-green-400 p-1">File</NavLink>
            <NavLink to="/analyze" className="w-full text-center hover:!bg-green-400 p-1">Analyze</NavLink>
          </nav>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="entrez"  element={<EntrezPage />}>
                {/* <Route path="" element={<EntrezInfo />} /> */}
                <Route path="search" element={<EntrezSearch />}/>
            </Route>
            <Route path="file"  element={<FilePage />}>
                {/* <Route path="" element={<EntrezInfo />} /> */}
                <Route path="upload" element={<FileUpload />}/>
            </Route>
            <Route path="analyze"  element={<AnalyzePage />}>
                {/* <Route path="" element={<EntrezInfo />} /> */}
            </Route>
          </Routes>
        </BrowserRouter>
      </SequenceRecordsContext.Provider>
    </>
  )
}

export default App
