import { useState } from "react";
import ModalMotivo from "../../modal/modalMotivoDevolverTickecTecnico";

export default function TicketTecnicoActual({ ticket, onActualizarTicket }) {

  const [motivo, setMotivo] = useState('');
  const [mostrarModal, setMostrarModal] = useState(false);
  //////////////////////////////////////////////////////////////////////
  ////////////////////////////BACKEND///////////////////////////////////
  const token = localStorage.getItem('token');
  //console.log("El ticket que estamos viendoe es este:"+ticket.id);
  const usuario = JSON.parse(localStorage.getItem('usuario'));
  const idUsuario = usuario && usuario.id ? usuario.id : null;

  const handlerResuelto = () => { // Función para manejar la acción de ticket resuelto
      fetch(`http://localhost:8080/api/tecnico/tickets/${ticket.id}/resolver?idTecnico=${idUsuario}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'},
        /*body: JSON.stringify({ estado: 'Finalizado' }) // enviar estado al backend*/ //si quisierar enviar el estado al backend
      }).then(response => {
        if (!response.ok) throw new Error('Error al finalizar el ticket');
        return response.text();// respose.json() devuelve una promesa que se resuelve con el cuerpo de la respuesta
      }).then(() => {
        alert("Ticket marcado como resuelto");
        onActualizarTicket(); // Llama a la función para actualizar los tickets en el componente padre
      }).catch((error) => console.error("Error al cambiar el estado del ticket", error));
  };
  const handlerNoResuelto = (motivoIngresado) => {
    fetch(`http://localhost:8080/api/tecnico/tickets/${ticket.id}/devolver?idTecnico=${idUsuario}&motivo=${motivoIngresado}`,{
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        //'Content-Type': 'application/json', // opcional para GET
    },
    })
    .then(response => {
      if (!response.ok) throw new Error('Error al cambiar el estado del ticket');
      return response.text();// respose.json() devuelve una promesa que se resuelve con el cuerpo de la respuesta
    }).then(() => {
        onActualizarTicket(); // Llama a la función para actualizar los tickets en el componente padre
        alert("EL TICKET FUE DEVUELTO CORRECTAMENTE");
        setMostrarModal(false);
        setMotivo(''); 
      }) // actualización visual local
    .catch((error) => {
        console.error("Error al cambiar el estado a reabierto del ticket", error)
    });
  }

  return (
    <div
      className="bg-white shadow-md rounded-lg p-4 m-3 w-full max-w-xs min-w-xs border border-gray-200 
                hover:shadow-[0_4px_20px_rgba(59,130,246,0.4)] transition duration-200 ease-in-out "
    >
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-1">
          {ticket.titulo}
        </h3>

        {ticket.tecnicoAsignado && (
          <p className="text-sm text-gray-600">
            <span className="font-medium">Técnico:</span>{" "}
            {ticket.tecnicoAsignado}
          </p>
        )}
      </div>
      <div className="mt-3 border-t pt-2 text-sm text-gray-700">
        <p>
          <span className="font-medium">Descripción:</span> {ticket.descripcion}
        </p>
        <p>
          <span className="font-medium">Fecha de creación:</span>{" "}
          {ticket.fechaCreacion}
        </p>
        {ticket.fueReabierto && (
          <>
            <p>
              <span className="font-medium">Reabierto:</span> Sí
            </p>
            <p>
              <span className="font-medium">Técnico anterior:</span>{" "}
              {ticket.tecnicoAnterior}
            </p>
          </>
        )}
        <div className="flex justify-around mt-3">
          <button
            onClick={handlerResuelto}
            className="opacity-[0.75] mt-3 px-3 py-1 bg-blue-600 text-white text-lg rounded hover:bg-blue-800 transition cursor-pointer"
          >
            Resuelto
          </button>
          <button
            onClick={() => setMostrarModal(true)}
            className="opacity-[0.75] mt-3 px-3 py-1 bg-orange-400 text-white text-lg rounded hover:bg-orange-500 transition cursor-pointer"
          >
            No Resuelto
          </button>
        </div>
      </div>
      <ModalMotivo
        isOpen={mostrarModal}
        onClose={() => setMostrarModal(false)}
        onConfirm={(motivoIngresado) => handlerNoResuelto(motivoIngresado)}
        
      />
    </div>
  );
}