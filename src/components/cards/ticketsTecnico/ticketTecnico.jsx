
/*ES EL TICKET BASICO QUE PUEDE VER EL TECNICO"
/*el componente recibe un ticket como paremetro*/
/*el componente tambien recibe la funcion AtualizarTicket que la ejecuta el padre para hacer el GET y mostrar los tickets nuevamente*/
export default function TicketTecnico({ ticket, onActualizarTicket }) {
    
    //////////////////////////////////////////////////////////////////////
    ////////////////////////////BACKEND///////////////////////////////////
    const token = localStorage.getItem('token');
    //console.log("El ticket que estamos viendoe es este:"+ticket.id);
    const usuario = JSON.parse(localStorage.getItem('usuario'));
    const idUsuario = usuario && usuario.id ? usuario.id : null;

    if (!idUsuario) {
    console.warn("No se encontró el ID del técnico en localStorage.");
    }
    //console.log("el id el usuario es:"+ idUsuario);

    /*en el backend debe cambiar el estado del ticket a atendido*/
    const handleTomarTicket = () => { // Función para manejar la acción de tomar el ticket el ticket
      fetch(`http://localhost:8080/api/tecnico/tickets/${ticket.id}/tomar?idTecnico=${idUsuario}`, {// Reemplaza con la URL delbackend
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',},
        /*body: JSON.stringify({ estado: 'atendido' }) // enviar estado al backend*/ //si quisierar enviar el estado al backend
      }).then(response => {
        if (!response.ok) throw new Error('Error al tomar el ticket');
        return response.text();// respose.json() devuelve una promesa que se resuelve con el cuerpo de la respuesta
      }).then((r) => {
        alert(r);
        onActualizarTicket(); // Llama a la función para actualizar los tickets en el componente padre
      }).catch((error) => console.error("Error al cambiar el estado del ticket", error));
  };
  //////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <div className="bg-white shadow-md rounded-lg p-4 m-3 w-full max-w-xs min-w-xs border border-gray-200 
                hover:shadow-[0_4px_20px_rgba(59,130,246,0.4)] transition duration-200 ease-in-out ">

      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-1">{ticket.titulo}</h3>

      </div>
        <div className="mt-3 border-t pt-2 text-sm text-gray-700">
          <p>
            <span className="font-medium">Descripción:</span> {ticket.descripcion}
          </p>
          <p>
            <span className="font-medium">Fecha de creación:</span> {ticket.fechaCreacion}
          </p>
          {ticket.estado == "REABIERTO" && (
            <>
              <p>
                <span className="font-medium">Reabierto:</span> Sí
              </p>
            </>
          )}
          <div className='flex justify-around mt-3'>
            <button
              onClick={handleTomarTicket}
              className="opacity-[0.75] mt-3 px-3 py-1 bg-blue-600 text-white text-lg rounded hover:bg-blue-800 transition cursor-pointer"
            >
              Tomar Ticket
            </button>
          </div>
            
        </div>
    </div>
  );
}