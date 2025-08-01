/*Framer-motion te da componentes especiales como motion.div, motion.button, motion.span, etc., que se comportan igual que los HTML normales, pero con animaciones integradas.*/
import { motion, AnimatePresence } from "framer-motion"; // Importamos los componentes necesarios de framer-motion para animar el modal
import React from "react";
import SelectUsuarioEstado from "../selec/selectUsarioEstado";

export default function ModalEditUser({ isOpen, onClose, user, onSave }) {
  const [editedUser, setEditedUser] = React.useState(user);

  React.useEffect(() => {
    // Si el usuario cambia, actualizamos el estado del usuario editado
    setEditedUser(user);
  }, [user]);

  const handleChange = (e) => {
    setEditedUser({ ...editedUser, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevenimos el comportamiento por defecto del formulario
    onSave(editedUser); // Llamamos a la función onSave para guardar los cambios
    onClose(); // Cerramos el modal después de guardar
  };

  return (
    <AnimatePresence>
      {/*AnimatePresence permite animar elementos que se están eliminando (como un modal que se cierra).*/}
      {isOpen && ( // Si el modal está abierto, renderizamos el contenido del modal
        <motion.div //este es el contenedor del modal que cubre toda la pantalla
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
          className="fixed inset-0 z-50 flex items-center justify-center"
          initial={{ opacity: 0 }} // Opacidad inicial del modal
          animate={{ opacity: 1 }} // Opacidad al abrir el modal
          exit={{ opacity: 0 }} // Opacidad al cerrar el modal
        >
          <motion.div //este es el contenido del modal que se muestra en el centro de la pantalla
            className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md mx-4"
            initial={{ scale: 0.95, opacity: 0 }} // Escala y opacidad iniciales del contenido del modal
            animate={{ scale: 1, opacity: 1 }} // Escala y opacidad al abrir el modal
            exit={{ scale: 0.95, opacity: 0 }} // Escala y opacidad al cerrar el modal
            transition={{ duration: 0.25 }} // Duración de la animación
          >
            <h2 className="text-xl font-semibold mb-4">Editar Usuario</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block mb-1 font-medium">Nombre:</label>
                <input
                  type="text"
                  name="nombre"
                  value={editedUser?.nombre || ""} //Si objeto existe, devuelve el valor de propiedad.Si objeto es null o undefined, devuelve undefined y no lanza error.
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">Apellido:</label>
                <input
                  type="text"
                  name="apellido"
                  value={editedUser?.apellido || ""} // Si editedUser es null o undefined, mostramos un string vacío (si no ponemos el operador de encadenamiento opcional(?), puede dar error si editedUser es null o undefined)
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">Email:</label>
                <input
                  type="email"
                  name="email"
                  value={editedUser?.email || ""} //
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
              </div>
              <div className="flex justify-start items-center space-x-4">
                <div>
                  <label className="block mb-1 font-medium">Fallas</label>
                  <input
                    type="text"
                    name="fallas"
                    value={editedUser?.fallas || ""}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block mb-1 font-medium">Marcas</label>
                  <input
                    type="text"
                    name="marcas"
                    value={editedUser?.marcas || ""}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded px-3 py-2"
                  />
                </div>
              </div>
              <div className="flex justify-between items-center mt-8">
                <div className=" items-center justify-between">
                  <label
                    htmlFor="bloqueado"
                    className="text-sm font-medium text-gray-700"
                  >
                    ¿Está bloqueado?
                  </label>
                  <div className="flex space-x-3 items-center">
                    <span className="ml-3 text-sm text-gray-600">
                      {editedUser?.bloqueado ? "Bloqueado" : "Activo"}
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        setEditedUser({
                          ...editedUser,
                          bloqueado: !editedUser.bloqueado,
                        })
                      }
                      className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors duration-300
                        ${
                          editedUser?.bloqueado ? "bg-red-500" : "bg-blue-500"
                        }`}
                    >
                      <span
                        className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform duration-300
                            ${
                              editedUser?.bloqueado
                                ? "translate-x-6"
                                : "translate-x-1"
                            }`}
                      />
                    </button>
                  </div>
                </div>
                <button
                  type="submit"
                  className="h-10 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 cursor-pointer text-md font-medium"
                >
                  Reestablecer contraseña
                </button>
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
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
