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
import NucleotideCount from "./components/analyze/NucleotideCount"
import SequenceFunctions from "./components/analyze/SequenceFunctions"
import Translate from "./components/analyze/Translate"
import Motif from "./components/analyze/Motif"
import MultipleSequenceAnalysisPage from "./pages/MultipleSequenceAnalysisPage"

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
            <NavLink to="/multiple" className="w-full text-center hover:!bg-green-400 p-1">Multiple</NavLink>
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
                <Route path="nucleotide-count" element={<NucleotideCount />} />
                <Route path="sequence-functions" element={<SequenceFunctions />} />
                <Route path="translate" element={<Translate />} />
                <Route path="motif" element={<Motif />} />
            </Route>
            <Route path="multiple" element={<MultipleSequenceAnalysisPage/>}>
                <Route path="motif" element={<Motif />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </SequenceRecordsContext.Provider>
    </>
  )
}

export default App
