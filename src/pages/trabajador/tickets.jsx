import Tickets from "../../components/cards/ticketsTrabajador/ticketsTrabajador";
import HeaderTrabajador from "../../components/headers/headerTrabajador";

export default function TicketsTrabajador(/*aca iria la lista de tickets que se pasa como props desde el back*/) {
  
  
  return (
    <div>
        <HeaderTrabajador /> 
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-2xl font-bold mt-5">Tickets Creados</h1>
            <Tickets/>
        </div>
        
    </div>
  );
}