import React, { useState } from 'react';

export default function TicketTrabajador({ ticket}) {
  const [estadoTicket, setEstadoTicket] = useState(ticket.estado);

  return (
    <div className="bg-white shadow-md rounded-lg p-4 m-3 w-full max-w-xs min-w-xs border border-gray-200 
                hover:shadow-[0_4px_20px_rgba(59,130,246,0.4)] transition duration-200 ease-in-out cursor-pointer">

      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-1">{ticket.titulo}</h3>

        <p className="text-sm text-gray-600">
          <span className="font-medium">Estado:</span> {estadoTicket}
        </p>

        <p className="text-sm text-gray-600">
          <span className="font-medium">Trabajador: es el mismo esto hay que sacarlo :</span>
            {ticket.trabajadorCreador}
        </p>

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
        </div>
    </div>
  );
}