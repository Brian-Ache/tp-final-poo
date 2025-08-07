import MisTickets from '../../components/cards/ticketsTecnico/misTickets';
import HeaderTecnico from '../../components/headers/headerTecnico';

export default function ticketsTecnico() {
  return (
    <>
      <HeaderTecnico />
      <div className="flex flex-col items-center min-h-screen bg-gray-100">
        <h1 className="text-2xl font-bold mt-10">Mis Tickets</h1>
        <MisTickets />
      </div>
    </>
  );
}