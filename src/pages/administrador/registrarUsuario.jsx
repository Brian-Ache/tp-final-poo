import React, { useState } from "react";
import HeaderAdm from '../../components/headers/headerAdm';

export default function RegistrarUsuario() {

  const [formData, setFormData] = useState({// Estado para almacenar los datos del formulario (que se enviarán al backend al registrar un nuevo usuario).
    nombre: '',
    apellido: '',
    email: '',
    rol: '',
    rolAsString: '',
  });

  const handleSubmit = (e) => {// Función que se ejecuta al enviar el formulario.
    e.preventDefault();// Evita que la página se recargue al enviar el formulario.


    // Aquí podrías hacer una llamada al backend para registrar el usuario.
    // Por ejemplo, usando fetch o axios para enviar los datos a tu API.
    // En este caso, simplemente se simula el envío de datos.
     const token = localStorage.getItem('token');
    fetch('http://localhost:8080/api/admin/usuarios/crear', {
      method: 'POST',
      headers: { 
      'Authorization': `Bearer ${token}`,  
      'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })
      .then(res => {// Verifica si la respuesta es exitosa
        if (!res.ok) throw new Error('Error en la respuesta del servidor');// Lanza un error si la respuesta no es exitosa
        return res.json();//Si fue exitosa, convierte la respuesta en JSON (res.json()), que también devuelve una promesa.
      })
      .then(data => {//Recibe los datos ya convertidos a JSON (data).(del then anterior)
        //data es el objeto que devuelve el backend al registrar un usuario.
        console.log('Usuario registrado:', data);
        alert('✅ Usuario registrado con éxito');
        setFormData({// Resetea el formulario a sus valores iniciales después de enviar los datos.
          nombre: '',
          apellido: '',
          email: '',
          rol: '',
          rolAsString: ''
        });
      })
      .catch(err => {
        console.log(formData)// Muestra los datos del formulario en la consola para depuración.
        console.warn('⚠️ Backend no disponible. Usando datos fake.');
        console.error(err);
        alert('No se pudo conectar con el backend. Datos no enviados.');
      });
  };

  return (
    <>
      <HeaderAdm />
      <div className="flex flex-col items-center mt-8 min-h-230">
        <form className="border border-gray-200 rounded-lg shadow-md" onSubmit={handleSubmit}>
          <div className="flex flex-col items-center px-10">
            <div className="flex items-start justify-start w-full">
              <h2 className="text-base/7 font-semibold mt-7 text-xl">Registrar usuario</h2>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label htmlFor="nombre" className="block text-sm/6 font-medium text-gray-900">
                  Nombre completo
                </label>
                <input
                  id="nombre"
                  name="nombre"
                  type="text"
                  value={formData.nombre}
                  onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                  className="mt-2 block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-blue-600 sm:text-sm/6"
                />
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="apellido" className="block text-sm/6 font-medium text-gray-900">
                  Apellido
                </label>
                <input
                  id="apellido"
                  name="apellido"
                  type="text"
                  value={formData.apellido}
                  onChange={(e) => setFormData({ ...formData, apellido: e.target.value })}
                  className="mt-2 block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-blue-600 sm:text-sm/6"
                />
              </div>

              <div className="sm:col-span-4">
                <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                  Correo electrónico
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="mt-2 block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-blue-600 sm:text-sm/6"
                />
              </div>
            </div>
          </div>

          <div className="rolUsuarioChecks px-10 pb-10 border-b border-gray-900/10">
            <div className="mt-10 space-y-10">
              <fieldset>
                <legend className="text-sm/6 font-semibold text-gray-900">Rol del Usuario</legend>
                <p className="mt-1 text-sm/6 text-gray-600">Seleccione el tipo</p>
                <div className="mt-6 space-y-6">
                  <div className="flex items-center gap-x-3">
                    <input
                      id="trabajador"
                      name="rolUsuario"
                      type="radio"
                      value="TRABAJADOR"
                      checked={formData.rol === 'TRABAJADOR'}
                      onChange={(e) => setFormData({ ...formData, rol: e.target.value,rolAsString: e.target.value })}
                      className="size-4 appearance-none rounded-full border border-gray-300 bg-white checked:border-blue-600 checked:bg-blue-600 focus-visible:outline-blue-600"
                    />
                    <label htmlFor="trabajador" className="text-sm font-medium text-gray-900">
                      Trabajador
                    </label>
                  </div>
                  <div className="flex items-center gap-x-3">
                    <input
                      id="tecnico"
                      name="rolUsuario"
                      type="radio"
                      value="TECNICO"
                      checked={formData.rol === 'TECNICO'}
                      onChange={(e) => setFormData({ ...formData, rol: e.target.value,rolAsString: e.target.value })}
                      className="size-4 appearance-none rounded-full border border-gray-300 bg-white checked:border-blue-600 checked:bg-blue-600 focus-visible:outline-blue-600"
                    />
                    <label htmlFor="tecnico" className="text-sm font-medium text-gray-900">
                      Técnico
                    </label>
                  </div>
                </div>
              </fieldset>
            </div>
          </div>

          <div className="m-6 flex items-center justify-end gap-x-6">
            <button
              type="submit"
              className="rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white hover:bg-blue-500 focus-visible:outline-blue-600"
            >
              Registrar
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
