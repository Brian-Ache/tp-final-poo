import FilaUsuario from "../filaUsuario/filaUsuario";

export default function TablaUsuarios({ usuarios, onEditar }) {// TablaUsuarios recibe dos props: usuarios (un array de objetos usuario) y onEditar (una función que se ejecuta al hacer clic en el botón Editar de cada fila).
  return (
    <table className="w-full text-sm text-left text-gray-500 shadow-md border border-gray-200">
      <thead className="text-xs text-gray-800 uppercase bg-zinc-300">
        <tr>
          <th className="px-6 py-3">Nombre</th>
          <th className="px-6 py-3">Apellido</th>
          <th className="px-6 py-3">Correo electrónico</th>
          <th className="px-6 py-3">Id</th>
          <th className="px-6 py-3">Rol</th>
          <th className="px-6 py-3">Marcas</th>
          <th className="px-6 py-3">Fallas</th>
          <th className="px-6 py-3">Estado</th>
          <th className="px-6 py-3">Acciones</th>
        </tr>
      </thead>
      <tbody>
      {/* onEditar es una función que se pasa como prop desde el componente padre y se ejecuta cuando el usuario hace clic en el botón Editar de la fila correspondiente. */}
        {usuarios.map((u) => (/*recorremos el array usuarios y para cada usuario creamos una fila de la tabla usando el componente FilaUsuario. Le pasamos el usuario actual y la función onEditar como props. */
          <FilaUsuario key={u.id} usuario={u} onEditar={onEditar} />
           /*propaga onEditar al padra listaUsuarios para que pueda manejar la edición del usuario. Cada fila de la tabla representa un usuario y al hacer clic en el botón Editar, se llama a la función onEditar con el id del usuario correspondiente. Esto permite que el componente padre maneje la lógica de edición, como abrir un modal o redirigir a otra página.
            */
        ))} 
      </tbody>
    </table>
  );
}