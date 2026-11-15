import { Navigate, Route, Routes } from "react-router-dom";
import { MemoriasProvider } from "./lib/memorias";
import { PerfilProvider } from "./lib/perfil";
import Login from "./pages/Login";
import RecuperarSenha from "./pages/RecuperarSenha";
import LinkEnviado from "./pages/LinkEnviado";
import Cadastro from "./pages/Cadastro";
import CriarNo from "./pages/CriarNo";
import NoCriado from "./pages/NoCriado";
import Feed from "./pages/Feed";
import Mapa from "./pages/Mapa";
import Calendario from "./pages/Calendario";
import Perfil from "./pages/Perfil";
import EditarPerfil from "./pages/EditarPerfil";
import NovaMemoria from "./pages/NovaMemoria";
import EditarMemoria from "./pages/EditarMemoria";
import CompartilharMemoria from "./pages/CompartilharMemoria";
import VerMemoria from "./pages/VerMemoria";

export default function App() {
  return (
    <MemoriasProvider>
      <PerfilProvider>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />

          {/* entrada */}
          <Route path="/login" element={<Login />} />
          <Route path="/recuperar-senha" element={<RecuperarSenha />} />
          <Route path="/recuperar-senha/enviado" element={<LinkEnviado />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/criar-no" element={<CriarNo />} />
          <Route path="/no-criado" element={<NoCriado />} />

          {/* app */}
          <Route path="/feed" element={<Feed />} />
          <Route path="/mapa" element={<Mapa />} />
          <Route path="/calendario" element={<Calendario />} />
          <Route path="/perfil" element={<Perfil />} />
          <Route path="/perfil/editar" element={<EditarPerfil />} />

          {/* publicar memória */}
          <Route path="/nova-memoria" element={<NovaMemoria />} />
          <Route path="/nova-memoria/editar" element={<EditarMemoria />} />
          <Route path="/nova-memoria/compartilhar" element={<CompartilharMemoria />} />
          <Route path="/memoria/:id" element={<VerMemoria />} />

          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </PerfilProvider>
    </MemoriasProvider>
  );
}
