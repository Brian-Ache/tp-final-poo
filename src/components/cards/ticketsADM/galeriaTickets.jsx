import React from "react";
import TicketCard from "./ticketCard";
import Buscador from "../../buscador/buscador";
import MultipleSelect from "../../selec/selectTickets"; // Importa el componente de selección si es necesario
import { useState,useEffect } from "react"; //Se usa para crear un estado local, en este caso para guardar el texto que el usuario escribe al buscar.

const ticketsMock = [
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
  },
  {
    id: 4,
    titulo: "Problemas de conexión",
    descripcion: "Se corta el WiFi en mi oficina a cada rato...",
    estado: "Resuleto",
    trabajadorCreador: "Lucía Torres",
    tecnicoAsignado: "Carlos Gómez",
    tecnicoAnterior: "marcelo López",
    fueReabierto: true,
    fechaCreacion: "2025-04-19 14:42",
  },
  {
    id: 5,
    titulo: "Problemas de conexión",
    descripcion: "Se corta el WiFi en mi oficina a cada rato...",
    estado: "Sin Resolver",
    trabajadorCreador: "Lucía Torres",
    tecnicoAsignado: "Carlos Gómez",
    tecnicoAnterior: null,
    fueReabierto: false,
    fechaCreacion: "2025-04-19 14:42",
  },
  {
    id: 6,
    titulo: "Problemas de conexión",
    descripcion: "Se corta el WiFi en mi oficina a cada rato...",
    estado: "Reabierto",
    trabajadorCreador: "Lucía Torres",
    tecnicoAsignado: "Carlos Gómez",
    tecnicoAnterior: null,
    fueReabierto: false,
    fechaCreacion: "2025-04-19 14:42",
  },
  {
    id: 7,
    titulo: "Problemas de conexión",
    descripcion: "Se corta el WiFi en mi oficina a cada rato...",
    estado: "Sin Resolver",
    trabajadorCreador: "Lucía Torres",
    tecnicoAsignado: "Carlos Gómez",
    tecnicoAnterior: null,
    fueReabierto: false,
    fechaCreacion: "2025-04-19 14:42",
  },
  // otros tickets...
];

export default function GaleriaDeTickets(/*aca iria la lista de tickets que se pasa como props desde el back*/) {
  const [tickets, setTickets] = useState(ticketsMock);
  const [filtro, setFiltro] = useState('');/*
  Crea una variable de estado llamada filtro que empieza vacía.
  setFiltro se usa para actualizar el valor de filtro cuando el usuario escribe.*/
  const [estadoSeleccionado, setEstadoSeleccionado] = useState('Todos');// Estado para el filtro de estado seleccionado

  ///////////////////////////////////////////////////////////////
  //PETICION AL BACK SI NO FUNCIONA CARGA LOS TICKETS DEL ARREGLO
  //////////////////////////////////////////////////////////////
  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log("El token es: " + token);
  
    fetch('http://localhost:8080/api/admin/tickets', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        //'Content-Type': 'application/json', // opcional para GET
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error('Error al obtener tickets');
        return res.json();
      })
      .then((data) => {
        setTickets(data);
        console.log("los tickets del backend son:");
        console.log(data);
      })
      .catch((err) => {
        console.error("⚠️ Backend no disponible. Usando datos mock.", err);
      });
  }, []);
  


  /////////////////////////////////////////////////
  /*PRIMERO FILTRA POR ESTADO, LUEGO POR TEXTO*/
  ////////////////////////////////////////////////
  const ticketsFiltrados = tickets.filter(ticket =>//crea un nuevo array con los tickets que cumplen la condición del filtro.(recorre array tickets)
    estadoSeleccionado === 'Todos' || // Si el estado seleccionado es "Todos", no filtra por estado
    ticket.estado === estadoSeleccionado // Filtra por el estado seleccionado
  )
  .filter(ticket =>//crea un nuevo array con los tickets que cumplen la condición del filtro.(recorre array tickets)
    ticket.titulo.toLowerCase().includes(filtro.toLowerCase()) || //una condicion o la otra
    ticket.descripcion.toLowerCase().includes(filtro.toLowerCase())
    /*aca podria ir más condiciones si se quiere filtrar por más campos, como estado, trabajadorCreador, etc.*/
  );


  return (
    <>
        <div className="mt-10 flex justify-center items-center">
          <Buscador buscar={setFiltro} />{/*Componente Buscador que recibe la función setFiltro(actualiza el valor de la variable filtro) como prop. cada vez que el usuario escribe en el componente Buscador se ejecuta setFiltro */}
          <MultipleSelect estadoSeleccionado={setEstadoSeleccionado}/> {/*Componente de selección múltiple, si es necesario*/}
        </div>
        
        <div className="flex justify-center items-center mt-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {ticketsFiltrados.map((ticket) => (
            <TicketCard key={ticket.id} ticket={ticket} />
            ))}
        </div>
        </div>
    </>
  );
}
