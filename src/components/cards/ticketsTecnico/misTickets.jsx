import TicketTecnicoActual from "./ticketTecnicoActual";
import { useState, useEffect } from "react"; //Se usa para crear un estado local, en este caso para guardar el texto que el usuario escribe al buscar.

const arrayTickets = [
  {
    id: 1,
    titulo: "No funciona la impresora",
    descripcion: "La impresora HP no imprime desde ayer...",
    estado: "No atendido",
    trabajadorCreador: "Juan Pérez",
    tecnicoAsignado: null,
    tecnicoAnterior: "carlos Gómez",
    fueReabierto: true,
    fechaCreacion: "2025-04-20 10:15",
  },
  {
    id: 2,
    titulo: "Problemas de conexión",
    descripcion: "Se corta el WiFi en mi oficina a cada rato...",
    estado: "Atendido",
    trabajadorCreador: "Lucía Torres",
    tecnicoAsignado: "Carlos Gómez",
    tecnicoAnterior: null,
    fueReabierto: false,
    fechaCreacion: "2025-04-19 14:42",
  },
  {
    id: 3,
    titulo: "Problemas de conexión",
    descripcion: "Se corta el WiFi en mi oficina a cada rato...",
    estado: "Atendido",
    trabajadorCreador: "Lucía Torres",
    tecnicoAsignado: "Carlos Gómez",
    tecnicoAnterior: null,
    fueReabierto: false,
    fechaCreacion: "2025-04-19 14:42",
  }
];


export default function MisTickets() {
  const [tickets, setTickets] = useState([]); // Estado para almacenar los tickets obtenidos del backend

  const token = localStorage.getItem('token');
  console.log("El token es: " + token);
  useEffect(() => {//useEffect se usa para ejecutar código después de que el componente se haya montado.
  
  fetch('http://localhost:8080/api/tickets/tecnico/mis-tickets',{
    method: 'GET',
    headers: {
        'Authorization': `Bearer ${token}`,
        //'Content-Type': 'application/json', // opcional para GET
    },
  }) // Reemplazá con tu URL real
    .then(res => res.json())
    .then(data => setTickets(data))
    .catch(err => {
      console.error('Error al obtener tickets', err)
      setTickets(arrayTickets); // Si falla, usa los tickets por defecto del arreglo;
    });
}, []);
  
  // Actualiza los tickets desde el backend
  const actualizarTickets = () => {
  fetch('http://localhost:8080/api/tickets/tecnico/mis-tickets',{
    method: 'GET',
    headers: {
        'Authorization': `Bearer ${token}`,
        //'Content-Type': 'application/json', // opcional para GET
    },
  })
    .then(res => res.json())
    .then(data => setTickets(data))
    .catch(err => {
      console.log('Utilizando tickets por defecto debido a un error al obtener los tickets del backend');
      console.error('Error al refrescar tickets', err)
      setTickets(arrayTicketstickets)}); // Si falla, usa los tickets por defecto del arreglo;
};


  return (
    <>  
        <div className="flex justify-center items-center mt-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
            {tickets.map((ticket) => (
            <TicketTecnicoActual 
            key={ticket.id} 
            ticket={ticket}
            onActualizarTicket={actualizarTickets} // Pasar la función para actualizar tickets al componente hijo
            />
            ))}
        </div>
        </div>
    </>
  );
}