import Tickets from "../../components/cards/ticketsTrabajador/ticketsTrabajador";
import HeaderTrabajador from "../../components/headers/headerTrabajador";

export default function TicketsTrabajador(/*aca iria la lista de tickets que se pasa como props desde el back*/) {
  
  
  return (
    <div>
        <HeaderTrabajador /> 
        <Tickets/>
    </div>
  );
}