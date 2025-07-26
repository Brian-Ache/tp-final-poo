export default function BuscadorUsuarios({ onBuscar }) {
  return (
    <div className="pb-4 bg-white h-12">
      <div className="relative mt-1">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 20 20">
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
        <input
          type="text"
          className="block h-10 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 h-8"
          placeholder="NOMBRE/APELLIDO/ID/ESTADO"
          onChange={(e) => onBuscar(e.target.value)}
        />
      </div>
    </div>
  );
}