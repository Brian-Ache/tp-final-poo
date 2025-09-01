import React, { useState } from 'react';
import Boton from '../../buttons/boton';


/*este componente es para mostrar los tickets que estan a confirmar por el trabajador,
que los tecnicos marcaron como resueltos
DEBE HACER UNA PETICION AL BACKEND PARA OBTENER LOS TICKETS RESUELTOS
*/


export default function TicketAConfirmar({ ticket, onActualizarTicket }) {
  const [estadoTicket, setEstadoTicket] = useState(ticket.estado);
  const [motivo,setMotivo] = useState("");
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  const idUsuario = usuario.id;

  //da el ticket como finalizado(la instancia siguiente resuelto)
  const handleFinalizar = () => { // Función para manejar la acción de finalizar el ticket
      fetch((`http://localhost:8080/api/trabajador/tickets/${ticket.id}/evaluar`), {
        method: 'POST',
        headers: {'Content-Type': 'application/json',},
        body: JSON.stringify({
          "idTrabajador": idUsuario,
          "fueResuelto": true,//por que fue resuelto
          "motivo": motivo
        }) // enviar estado al backend 
        
      }).then(response => {
        if (!response.ok) throw new Error('Error al finalizar el ticket');
        return response.json();// respose.json() devuelve una promesa que se resuelve con el cuerpo de la respuesta
      }).then(() => {
        setEstadoTicket('Finalizado')// actualización visual local
        onActualizarTicket(); // Llama a la función para actualizar los tickets en el componente padre
      }).catch((error) => console.error("Error al cambiar el estado del ticket", error));
  };

  //le devuelve el ticket al backend para que los tecnicos lo puedan ver y tomar
  const noResuelto = () => {
    fetch(`http://localhost:8080/api/trabajador/tickets/${ticket.id}/evaluar`, {// Reemplaza con la URL del backend
      method: 'POST',
      headers: {'Content-Type': 'application/json',},
      body: JSON.stringify({
          "idTrabajador": idUsuario,
          "fueResuelto": false,//por que no fue resuelto
          "motivo": motivo
        }) // enviar estado al backend 
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
              className="opacity-[0.75] mt-3 px-3 py-1 bg-blue-600 text-white text-lg rounded hover:bg-blue-800 transition cursor-pointer"
            >
              Finalizar
            </button>
            <button
              onClick={() => noResuelto()}
                className="opacity-[0.75] mt-3 px-3 py-1 bg-orange-400 text-white text-lg rounded hover:bg-orange-500 transition cursor-pointer"
            >
              No Resuelto
            </button>
          </div>
            
        </div>
    </div>
  );
}