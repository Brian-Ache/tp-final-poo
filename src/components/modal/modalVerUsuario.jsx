import React from 'react';

function ModalEditUser({ isOpen, onClose, user, onSave }) {// parametros: isOpen (booleano que indica si el modal está abierto), onClose (función para cerrar el modal), user (objeto con los datos del usuario a editar) y onSave (función para guardar los cambios).
  // Si el modal no está abierto, no renderizamos nada.
  if (!isOpen) return null;

  // Manejamos cambios de los campos del formulario.
  const [editedUser, setEditedUser] = React.useState(user);//inicializamos el estado editedUser con los datos del usuario que se pasa como prop.

  const handleChange = (e) => {
    setEditedUser({ ...editedUser, [e.target.name]: e.target.value });/*
    e.target.name
    👉 Es el nombre del campo que estás editando en el formulario.
    Ejemplo: "nombre" o "email".
    e.target.value
    👉 Es lo que el usuario acaba de escribir.
    { ...editedUser, [e.target.name]: e.target.value }
    👉 Esto crea una copia del objeto editedUser, pero cambiando el valor del campo que el usuario editó.*/
  };

  const handleSubmit = (e) => {//cuando el usuario envía el formulario.
    e.preventDefault();// Evita que el formulario se envíe de la manera tradicional.
    onSave(editedUser); // Llama al padre para guardar cambios.
    onClose(); // Cierra el modal.
  };

  return (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-blue-100 bg-opacity-50 transition-opacity duration-300">
    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md mx-4">
      <h2 className="text-xl font-semibold mb-4">Editar Usuario</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Nombre:</label>
          <input
            type="text"
            name="nombre"
            value={editedUser.nombre}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Email:</label>
          <input
            type="email"
            name="email"
            value={editedUser.email}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>
        <div className="flex justify-end space-x-2 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Guardar
          </button>
        </div>
      </form>
    </div>
  </div>
);
}

export default ModalEditUser;