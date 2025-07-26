export default function FilaUsuario({ usuario, onEditar }) {
    // FilaUsuario recibe un objeto usuario y una función onEditar como props.
    
  return (
    <tr className="bg-white border-b border-gray-200 rounded-lg">
      <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
        {usuario.nombre}
      </th>
      <td className="px-6 py-4">{usuario.apellido}</td>
      <td className="px-6 py-4">{usuario.email}</td>
      <td className="px-6 py-4">{usuario.id}</td>
      <td className="px-6 py-4">{usuario.rol}</td>
      <td className="px-6 py-4">{usuario.marcas || 'N/A'}</td>{/*Si usuario.marcas tiene un valor "truthy" (por ejemplo, un string no vacío), entonces mostralo.Si no (es null, undefined, '', 0, etc.), mostrá 'N/A'.*/}
      <td className="px-6 py-4">{usuario.fallas || 'N/A'}</td>
      <td className="px-6 py-4">{usuario.estado}</td>
      <td className="px-6 py-4">
        <button
          className="bg-blue-600 rounded-md text-white py-1 px-2 cursor-pointer hover:bg-blue-500"
          onClick={() =>{onEditar(usuario);console.log('Id del usuario sobre el que se apreto el boton editar:', usuario.id);} }//propaga el evento de clic al padre(tablaUsuarios), pasando el id del usuario.
        >
          Editar
        </button>
      </td>
    </tr>
  );
}