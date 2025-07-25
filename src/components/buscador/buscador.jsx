


export default function Buscador({buscar}) {//recibe la función buscar(setFiltro) como prop(el padre sabe cuando el usuario escribe) 
    
    const handleChange = (e) => {// Esta función se ejecuta cuando el usuario escribe en el input
        buscar(e.target.value); // Le avisa al padre lo que el usuario escribió
    };

    return (
        <form className="w-sm mr-8" onSubmit={(e) => e.preventDefault()}/*previene el comportamiento por defecto del formulario al hacer submit, que es recargar la página*/>
            {/* Etiqueta oculta para accesibilidad */}
            <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only">
                Buscar
            </label>

            <div className="relative">
                {/* Convertimos el contenedor del ícono en un botón */}
                <button
                    type="submit"
                    className="absolute inset-y-0 start-0 flex items-center ps-3 text-gray-500 hover:text-gray-700 cursor-pointer"
                    aria-label="Buscar"
                    
                >
                    <svg
                        className="w-5 h-5"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 20"
                        stroke="currentColor"
                        strokeWidth="2"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                        />
                    </svg>
                </button>

                {/* Input de búsqueda */}
                <input
                    type="search"
                    id="default-search"
                    className="block w-full p-4 ps-10 text-sm text-gray-900 border-1 border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Buscar tickets..."
                    required
                    onChange={handleChange}// al hacer click en el botón, se ejecuta handleChange
                />
            </div>
        </form>
    );
}