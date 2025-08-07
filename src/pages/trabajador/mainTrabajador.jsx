import React from 'react';
import HeaderTrabajador from '../../components/headers/headerTrabajador';
import TicketsTrabajadorConfirm from "../../components/cards/ticketsTrabajador/ticketsTrabajadorConfirm";

export default function MainTrabajador() {
  return (
    <>
      <HeaderTrabajador />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-2xl font-bold mt-5">Tickets Resueltos</h1>
        <TicketsTrabajadorConfirm />
      </div>
    </>
  );
}