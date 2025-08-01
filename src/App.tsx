import LoginPage from './pages/login/login';
import RegistrarUsuario from './pages/administrador/registrarUsuario';
import ListaUsuarios from './pages/administrador/listaUsuariosAdm';
import MainAdm from './pages/administrador/mainAdm';
import Login from './components/login/login';
import ListaTicketsAdm from './pages/administrador/listaTicketsAdm';
import MainTecnico from './pages/tecnico/mainTecnico.jsx';
import MainTrabajador from './pages/trabajador/mainTrabajador';
import AConfirmar from './pages/trabajador/aConfirmar.jsx';
import TicketsTrabajador from './pages/trabajador/tickets.jsx';
import CrearTicket from './pages/trabajador/crearTicket.jsx';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
      {/* CONFIGURACION DE LA RUTAS PARA NAVEGAR (solo las pages)*/}
      <Router>
        <Routes>
          {/* Ruta raíz "/" muestra LoginPage */}
          <Route path="/" element={<LoginPage />} />

          {/* Ruta "/mainAdm" muestra pagina principal del adm*/}
          <Route path="/mainAdm" element={<MainAdm />} />

          {/* Ruta "/lista-Usuarios" muestra lista de usuarios */}
          <Route path="/lista-usuarios-adm" element={<ListaUsuarios />} />

          {/* Ruta "/lista-tickets" muestra galeria de tickets */}
          <Route path="/lista-tickets-adm" element={<ListaTicketsAdm />} />

          {/* Ruta "/registrarUsuario" muestra formulario de registro */}
          <Route path="/registrarUsuario" element={<RegistrarUsuario />} />

          {/*Ruta "/mainTecnico" muestra pagina principal del tecnico*/}
          
          <Route path="/mainTecnico" element={<MainTecnico/>} />
          
          {/*Ruta "/mainTrabajador" muestra pagina principal del trabajador*/}
          <Route path="/mainTrabajador" element={<MainTrabajador />} />

          {/* Ruta "/aConfirmar" muestra tickets a confirmar */}
          <Route path="/aConfirmar" element={<AConfirmar />} />

          {/* Ruta "/ticketsTrabajador" muestra tickets del trabajador */}
          <Route path="/ticketsTrabajador" element={<TicketsTrabajador />} />
          
          {/* Ruta "/crearTicket" muestra formulario para crear un ticket */}
          <Route path="/crearTicket" element={<CrearTicket />} />

          {/* Ruta "/login" muestra el componente de login */}
        
        </Routes>
        
      </Router>      
    </>
  )
}

export default App
