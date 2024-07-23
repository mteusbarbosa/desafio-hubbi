import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Planets from "./pages/Planetas/Planets"
import PlanetsId from "./pages/Planetas/PlanetsId"
import Naves from "./pages/Naves/Naves"
import NavesId from "./pages/Naves/NavesId"
import Personagens from "./pages/Personagens/Personagens"
import PersonagensId from "./pages/Personagens/PersonagensId"
import Veiculos from "./pages/Veiculos/Veiculos"
import VeiculosId from "./pages/Veiculos/VeiculosId"
import Navbar from "./Components/Navbar"

function App() {
  return (
    <div className="flex">
      <Navbar />
      <div className="ml-64 flex-1 overflow-auto h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/naves" element={<Naves />} />
          <Route path="/veiculos" element={<Veiculos />} />
          <Route path="/planetas" element={<Planets />} />
          <Route path="/personagens" element={<Personagens />} />
          
          <Route path="/naves/:id" element={<NavesId />} />
          <Route path="/veiculos/:id" element={<VeiculosId />} />
          <Route path="/planetas/:id" element={<PlanetsId />} />
          <Route path="/personagens/:id" element={<PersonagensId />} />
        </Routes>
      </div>
    </div >
  )
}

export default App
