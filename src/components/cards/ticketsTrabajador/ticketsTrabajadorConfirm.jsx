import React from "react";
import TicketAConfirmar from "./tikectAConfirmar";
import Buscador from "../../buscador/buscador";
import { useState } from "react"; //Se usa para crear un estado local, en este caso para guardar el texto que el usuario escribe al buscar.

const tickets = [
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

export default function TicketsTrabajadorConfirm(/*aca iria la lista de tickets que se pasa como props desde el back*/) {
  const [filtro, setFiltro] = useState('');/*
  Crea una variable de estado llamada filtro que empieza vacía.
  setFiltro se usa para actualizar el valor de filtro cuando el usuario escribe.*/
  
  /////////////////////////////////////////////////
  /* FILTRA TEXTO*/
  ////////////////////////////////////////////////
  const ticketsFiltrados = tickets.filter(ticket =>//crea un nuevo array con los tickets que cumplen la condición del filtro.(recorre array tickets)
    ticket.titulo.toLowerCase().includes(filtro.toLowerCase()) || //una condicion o la otra
    ticket.descripcion.toLowerCase().includes(filtro.toLowerCase())
    /*aca podria ir más condiciones si se quiere filtrar por más campos, como estado, trabajadorCreador, etc.*/
  );

  return (
    <>
        <div className="mt-10 flex justify-center items-center">
          <Buscador buscar={setFiltro} />{/*Componente Buscador que recibe la función setFiltro(actualiza el valor de la variable filtro) como prop. cada vez que el usuario escribe en el componente Buscador se ejecuta setFiltro */}
        </div>
        
        <div className="flex justify-center items-center mt-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {ticketsFiltrados.map((ticket) => (
            <TicketAConfirmar key={ticket.id} ticket={ticket} />
            ))}
        </div>
        </div>
    </>
  );
}