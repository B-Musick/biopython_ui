import { BrowserRouter, NavLink, Route, Router, Routes } from "react-router-dom"
import { HomePage } from "./pages/HomePage"
import { EntrezPage } from "./pages/EntrezPage"
import { EntrezSearch } from "./components/EntrezSearch"

function App() {
  return (
    <>
      <BrowserRouter>
        <nav className="flex justify-evenly w-full border-b bg-green-600 text-white">
          <NavLink to="/" className="w-full text-center hover:!bg-green-400 p-1">Home</NavLink>
          <NavLink to="/entrez" className="w-full text-center hover:!bg-green-400 p-1">Entrez</NavLink>
        </nav>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="entrez"  element={<EntrezPage />}>
              {/* <Route path="" element={<EntrezInfo />} /> */}
              <Route path="search" element={<EntrezSearch />}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
