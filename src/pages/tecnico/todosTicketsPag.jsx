import React from 'react';
import TicketsTecnico from '../../components/cards/ticketsTecnico/ticketsTecnico'
import HeaderTecnico from '../../components/headers/headerTecnico';

export default function TicketsAResolver() {
  return (
    <>
      <HeaderTecnico />
      <div className="flex flex-col items-center min-h-screen bg-gray-100">
        <h1 className="text-2xl font-bold mt-8">Todos los Tickets</h1>
        <TicketsTecnico />
      </div>
    </>
  );
}