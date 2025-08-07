import React from 'react';
import HeaderTecnico from '../../components/headers/headerTecnico';
import TicketsTecnico from '../../components/cards/ticketsTecnico/ticketsTecnico'


export default function MainTecnico() {
  return (
    <>
      <HeaderTecnico />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-2xl font-bold">Todos los Tickets</h1>
        <TicketsTecnico />
      </div>
    </>
  );
} 