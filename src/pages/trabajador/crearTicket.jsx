/*ESTE COMPONENTE ES PARA CREAR UN NUEVO TICKET*/
/*LE PASA AL NACKEND UNICAMENTE EL TITULO Y LA DESCRIPCION DEL TICKET*/
/*EL BACKEND SE ENCARGA DE ASIGNARLE UN ID Y UN ESTADO INICIAL,ECT*/


import React, { useState } from 'react';
import HeaderTrabajador from '../../components/headers/headerTrabajador';

export default function CrearTicket() {
  const [formData, setFormData] = useState({// Estado para almacenar los datos del formulario (que se enviarán al backend al registrar un nuevo ticket).
      titulo: '',
      descripcion: '',
    });
  
    const handleSubmit = (e) => {// Función que se ejecuta al enviar el formulario.
      e.preventDefault();// Evita que la página se recargue al enviar el formulario.
  
  
      // Aquí podrías hacer una llamada al backend para registrar el ticket.
      // Por ejemplo, usando fetch o axios para enviar los datos a tu API.
      // En este caso, simplemente se simula el envío de datos.
      const token = localStorage.getItem('token');
      console.log("El token es: " + token);
      fetch('http://localhost:8080/api/tickets/crear-ticket', {
        method: 'POST',
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json' },
        body: JSON.stringify(formData),// Convierte los datos del formulario a una cadena JSON para enviarlos al backend.
      })
        .then(res => {// Verifica si la respuesta es exitosa
          if (!res.ok) throw new Error('Error en la respuesta del servidor');// Lanza un error si la respuesta no es exitosa
          return res.json();//Si fue exitosa, convierte la respuesta en JSON (res.json()), que también devuelve una promesa.
        })
        .then(data => {//Recibe los datos ya convertidos a JSON (data).(del then anterior)
          //data es el objeto que devuelve el backend al registrar un usuario.
          console.log('Ticket registrado:', data);
          alert('✅ Ticket registrado con éxito');
          setFormData({// Resetea el formulario a sus valores iniciales después de enviar los datos.
            titulo: '',
            descripcion: '',
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
        <HeaderTrabajador />
        <div className="flex flex-col items-center mt-30  h-screen">
          <form className="border border-gray-200 rounded-lg shadow-md" onSubmit={handleSubmit}>
            <div className="flex flex-col items-center px-10">
              <div className="flex items-start justify-start w-full">
                <h2 className="text-base/7 font-semibold mt-7 text-xl">Crear Ticket</h2>
              </div>
  
              <div className="mt-10 ">
                <div className="">
                  <label htmlFor="titulo" className="block text-sm/6 font-medium text-gray-900">
                    Titulo 
                  </label>
                  <input
                    id="titulo"
                    name="titulo"
                    type="text"
                    value={formData.titulo}
                    onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
                    className="mt-2 block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-blue-600 sm:text-sm/6"
                  />
                </div>
  
                <div className="">
                  <label htmlFor="descripcion" className="block text-sm/6 font-medium text-gray-900">
                    descripcion
                  </label>
                  <textarea
                    id="descripcion"
                    name="descripcion"
                    rows={4}
                    value={formData.descripcion}
                    onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                    className="max-h-60 min-h-30 mt-2 block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-blue-600 sm:text-sm/6"
                  />
                </div>
              </div>
            </div>

            <div className="m-6 flex items-center justify-center gap-x-6">
              <button
                type="submit"
                className="rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white hover:bg-blue-500 focus-visible:outline-blue-600 cursor-pointer"
              >
                Crear Ticket
              </button>
            </div>
          </form>
        </div>
      </>
    );
}