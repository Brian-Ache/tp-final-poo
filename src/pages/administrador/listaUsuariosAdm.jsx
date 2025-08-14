import React, { useState,useEffect } from 'react';
import HeaderAdm from '../../components/headers/headerAdm';
import TablaUsuarios from '../../components/tablaUsuarios/tablaUsuarios';
import BuscadorUsuarios from '../../components/buscador/buscadorUsuarios';
import MultipleSelectUsuarios from '../../components/selec/selectUsuariosRol';
import SelectUsuarioEstado from '../../components/selec/selectUsarioEstado';
import ModalEditUser from '../../components/modal/modalVerUsuario';

const usuariosMock = [
  { id: 1453, nombre: 'Tomás', apellido: 'Aguirre', email: 'tomas@example.com', rol: 'Tecnico', estado: 'Activo', marcas: 2, fallas: 2 },
  { id: 1001, nombre: 'Lucia', apellido: 'Fernandez', email: 'lucia@example.com', rol: 'Trabajador', estado: 'Bloqueado' },
  { id: 1456, nombre: 'Tomás', apellido: 'Aguirre', email: 'tomas@example.com', rol: 'Tecnico', estado: 'Activo', marcas: 2, fallas: 2 },
  { id: 1104, nombre: 'Mateo', apellido: 'Ramírez', email: 'mateo@example.com', rol: 'Trabajador', estado: 'Activo' },
  { id: 1202, nombre: 'Sofia', apellido: 'Gomez', email: 'sofia@gmail.com', rol: 'Administrador', estado: 'Activo' },
  { id: 1458, nombre: 'Tomás', apellido: 'Aguirre', email: 'tomas@example.com', rol: 'Tecnico', estado: 'Activo', marcas: 2, fallas: 2 },
  { id: 1451, nombre: 'Tomás', apellido: 'Aguirre', email: 'tomas@example.com', rol: 'Tecnico', estado: 'Activo', marcas: 2, fallas: 2 },
];

export default function ListaUsuarios() {
  const [usuarios, setUsuarios] = useState(usuariosMock);
  const [busqueda, setBusqueda] = useState('');
  const [filtroRol, setFiltroRol] = useState('Todos');
  const [filtroEstado, setFiltroEstado] = useState('Todos');
  const [modalAbierto, setModalAbierto] = useState(false);// Estado para controlar si el modal está abierto o cerrado.
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);// Estado para almacenar el usuario seleccionado para editar.
  const [idUsuario,setIdUsuario] = useState(null);
  //Fetch de datos reales al montar el componente (tecnica mixta para trabajar con datos reales y mock)
  //asi cuando el backend este disponible, se puede usar sin problemas(ya que la API devuelve un array de objetos con la misma estructura que el mock)

  useEffect(() => {
  const token = localStorage.getItem('token');
  console.log("El token es: " + token);

  fetch('http://localhost:8080/api/admin/usuarios/listar-todos', {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      //'Content-Type': 'application/json', // opcional para GET
    },
  })
    .then((res) => {
      if (!res.ok) throw new Error('Error al obtener usuarios');
      return res.json();
    })
    .then((data) => {
      setUsuarios(data);
      console.log("los usuarios del backend son:");
      console.log(data);
    })
    .catch((err) => {
      console.error("⚠️ Backend no disponible. Usando datos mock.", err);
    });
}, []);




  ////////////////////////////////////////////////////////////////////////////////////////////////
  /*primero deberia filtrar por tecnico,trabajador,adn, luego por nombre,apellido o email o id*/
  const usuariosFiltrados = usuarios.filter(
    usuario =>
    filtroEstado === 'Todos' || // Si el estado seleccionado es "Todos", no filtra por estado
    usuario.estado === filtroEstado // Filtra por el estado seleccionado
  ).filter(usuario =>
    filtroRol === 'Todos' || // Si el rol seleccionado es "Todos", no filtra por rol
    usuario.rol === filtroRol // Filtra por el rol seleccionado
  ).filter(usuario =>//despues filtra por busqueda
    usuario.id.toString().includes(busqueda) ||
    usuario.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
    usuario.apellido.toLowerCase().includes(busqueda.toLowerCase()) ||
    usuario.email.toLowerCase().includes(busqueda.toLowerCase())
  );
  /////////////////////////////////////////////////////////////////////////////////////////////////

  //////////////////////////////////////////////////////////////////////////////
  /* Funciones para manejar la apertura y cierre del modal de edición */
  // Estas funciones se encargan de abrir y cerrar el modal, y de pasar el usuario

  const abrirModal = (usuario,idUser) => {
    console.log('abrir modal editar usuario con ID:', idUser);
    setIdUsuario(idUser);
    setUsuarioSeleccionado(usuario);
    setModalAbierto(true);
  };

  const cerrarModal = () => {
    setModalAbierto(false);
    setUsuarioSeleccionado(null);
  };

  //FUNCION PARA ACTUALIZAR EL USUARIO LLAMADO AL BACKEND
  const guardarUsuario = (usuarioEditado) => {
  const token = localStorage.getItem('token');

  // payload con solo los campos que el backend espera
  const payload = {
    nombre: usuarioEditado.nombre,
    apellido: usuarioEditado.apellido,
    email: usuarioEditado.email,
  };
  console.log("el id del usuario a editar es:"+usuarioEditado.id);
  fetch(`http://localhost:8080/api/admin/usuarios/${usuarioEditado.id}/editar`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((res) => {
      if (!res.ok) throw new Error('Error al actualizar usuario');
      return res.json();
    })
    .then((dataActualizada) => {
      setUsuarios(usuarios.map(u => u.id === dataActualizada.id ? dataActualizada : u));
      console.log('Usuario actualizado:', dataActualizada);
    })
    .catch((err) => {
      console.error('Error al guardar usuario:', err);
    });
};





  /*
  const guardarUsuario = (usuarioEditado) => {
    setUsuarios(usuarios.map(u => u.id === usuarioEditado.id ? usuarioEditado : u));
  };*/



  /////////////////////////////////////////////////////////////////////////////////////////////////
  //=========== Función para manejar la edición de un usuario============================
  // Esta función se pasa como prop al componente TablaUsuarios y se ejecuta cuando se hace clic en el botón Editar de una fila.
  const handleEditar = (usuario,idUser) => {
  
  abrirModal(usuario,idUser); // esto actualiza el estado y hace que se muestre el modal
};



  return (
    <>
      <HeaderAdm />
      <div className="overflow-x-auto shadow-md border border-gray-200 rounded-lg mt-10 mx-6 lg:mx-20 p-4">
         <div className="my-10 flex justify-start items-center">
                   <BuscadorUsuarios onBuscar={setBusqueda} />{/*Componente Buscador que recibe la función setFiltro(actualiza el valor de la variable filtro) como prop. cada vez que el usuario escribe en el componente Buscador se ejecuta setFiltro */}
                   <div className='ml-4 w-60'>
                      <MultipleSelectUsuarios rolSeleccionado={setFiltroRol} />
                   </div>
                   <div className='ml-4 w-60'>
                      <SelectUsuarioEstado estadoSeleccionado={setFiltroEstado} />
                   </div>
                  
          </div>
        
        
        <TablaUsuarios usuarios={usuariosFiltrados} onEditar={handleEditar} />{/*le paso los usuarios filtrados y la función onEditar para manejar la edición de usuarios. La funcion onEditar */}
        <ModalEditUser
          isOpen={modalAbierto}
          onClose={cerrarModal}
          user={usuarioSeleccionado}
          userId={idUsuario}
          onSave={guardarUsuario}
        />{/* Componente ModalEditUser que se encarga de mostrar el modal para editar un usuario. Le paso el estado del modal, la función para cerrarlo, el usuario seleccionado y la función para guardar los cambios. */}
        {/*le paso el estado del modal, la función para cerrarlo, el usuario seleccionado y la función para guardar los cambios. */}
      </div>  
    </>
  );
}