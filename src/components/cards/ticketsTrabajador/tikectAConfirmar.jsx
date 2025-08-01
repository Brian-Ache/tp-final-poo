import React, { useState } from 'react';
import Boton from '../../buttons/boton';


/*este componente es para mostrar los tickets que estan a confirmar por el trabajador,
que los tecnicos marcaron como resueltos
DEBE HACER UNA PETICION AL BACKEND PARA OBTENER LOS TICKETS RESUELTOS
*/


export default function TicketAConfirmar({ ticket, onActualizarTicket }) {
  const [estadoTicket, setEstadoTicket] = useState(ticket.estado);

  const handleFinalizar = () => { // Función para manejar la acción de finalizar el ticket
      fetch(`url_al_backend ${ticket.id}/finalizado`, {// Reemplaza con la URL delbackend
        method: 'POST',
        headers: {'Content-Type': 'application/json',},
        /*body: JSON.stringify({ estado: 'Finalizado' }) // enviar estado al backend*/ //si quisierar enviar el estado al backend
      }).then(response => {
        if (!response.ok) throw new Error('Error al finalizar el ticket');
        return response.json();// respose.json() devuelve una promesa que se resuelve con el cuerpo de la respuesta
      }).then(() => {
        setEstadoTicket('Finalizado')// actualización visual local
        onActualizarTicket(); // Llama a la función para actualizar los tickets en el componente padre
      }).catch((error) => console.error("Error al cambiar el estado del ticket", error));
  };
  const noResuelto = () => {
    fetch(`url_al_backend ${ticket.id}/reabierto`, {// Reemplaza con la URL del backend
      method: 'POST',
      headers: {'Content-Type': 'application/json',},
      /*body: JSON.stringify({ estado: 'reabierto' }) // enviar estado al backend*/ //si quisierar enviar el estado al backend
    }).then(response => {
      if (!response.ok) throw new Error('Error al cambiar el estado del ticket');
      return response.json();// respose.json() devuelve una promesa que se resuelve con el cuerpo de la respuesta
    }).then(() => {
        setEstadoTicket('reabierto')
        onActualizarTicket(); // Llama a la función para actualizar los tickets en el componente padre
    }) // actualización visual local
    .catch((error) => {
        console.error("Error al cambiar el estado a reabierto del ticket", error)
    });
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-4 m-3 w-full max-w-xs min-w-xs border border-gray-200 
                hover:shadow-[0_4px_20px_rgba(59,130,246,0.4)] transition duration-200 ease-in-out ">

      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-1">{ticket.titulo}</h3>

        {ticket.tecnicoAsignado && (
          <p className="text-sm text-gray-600">
            <span className="font-medium">Técnico:</span> {ticket.tecnicoAsignado}
          </p>
        )}

      </div>
        <div className="mt-3 border-t pt-2 text-sm text-gray-700">
          <p>
            <span className="font-medium">Descripción:</span> {ticket.descripcion}
          </p>
          <p>
            <span className="font-medium">Fecha de creación:</span> {ticket.fechaCreacion}
          </p>
          {ticket.fueReabierto && (
            <>
              <p>
                <span className="font-medium">Reabierto:</span> Sí
              </p>
              <p>
                <span className="font-medium">Técnico anterior:</span> {ticket.tecnicoAnterior}
              </p>
            </>
          )}
          <div className='flex justify-around mt-3'>
            <button
              onClick={handleFinalizar}
              className="mt-3 px-3 py-1 bg-blue-600 text-white text-lg rounded hover:bg-blue-700 transition cursor-pointer"
            >
              Finalizar
            </button>
            <button
              onClick={() => noResuelto()}
                className="mt-3 px-3 py-1 bg-red-600 text-white text-lg rounded hover:bg-red-800 transition cursor-pointer"
            >
              No Resuelto
            </button>
          </div>
            
        </div>
    </div>
  );
}