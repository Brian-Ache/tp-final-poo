import React, { useState } from 'react';
import Boton from '../../buttons/boton';


/*este componente es para mostrar los tickets que estan a confirmar por el trabajador,
que los tecnicos marcaron como resueltos
DEBE HACER UNA PETICION AL BACKEND PARA OBTENER LOS TICKETS RESUELTOS
*/


export default function TicketAConfirmar({ ticket}) {
  const [expandido, setExpandido] = useState(false);
  const [estadoTicket, setEstadoTicket] = useState(ticket.estado);

  const toggleExpandir = () => {
    setExpandido(!expandido);
  };

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

      {expandido && (// Si está expandido, muestra más detalles)
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
        </div>
      )}
    </div>
  );
}