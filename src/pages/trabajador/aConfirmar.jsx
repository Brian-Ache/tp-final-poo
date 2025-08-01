import TicketsTrabajadorConfirm from "../../components/cards/ticketsTrabajador/ticketsTrabajadorConfirm";
import HeaderTrabajador from "../../components/headers/headerTrabajador";

export default function AConfirmar() {
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