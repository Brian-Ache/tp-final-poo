import React, { useState, useRef, useEffect } from 'react';
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { Link, useLocation } from 'react-router-dom';
import { Transition } from '@headlessui/react'

/* Material UI */
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';

const navigation = [
  { name: 'Tickets', to: '/ticketsAResolverPag', type: 'link' },
  { name: 'Mis Tickets', to: '/ticketsTecnicoPag', type: 'link' },
  { name: 'Marcas Y Fallas', type: 'panel' },
  { name: 'Salir', to: '/', type: 'link' },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function HeaderTecnico() {
  const location = useLocation();
  const [showPanel, setShowPanel] = useState(false);
  const [panelPosition, setPanelPosition] = useState({ top: 0, left: 0 });
  const buttonRef = useRef(null);
  const panelRef = useRef(null);

  const handleTogglePanel = () => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setPanelPosition({
        top: rect.bottom + window.scrollY + 8, // Espacio entre el botón y el panel
        left: rect.left + window.scrollX - 60, // Ajuste para centrar el panel
      });
    }
    setShowPanel(prev => !prev);
  };

  // Cerrar el panel si se hace clic fuera
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        panelRef.current &&
        !panelRef.current.contains(event.target) &&
        !buttonRef.current.contains(event.target)
      ) {
        setShowPanel(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <Disclosure as="nav" className="bg-white border border-gray-200 shadow-md">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          {/* Botón mobile */}
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:ring-2 focus:ring-white focus:outline-hidden focus:ring-inset">
              <Bars3Icon className="block size-6 group-data-open:hidden" />
              <XMarkIcon className="hidden size-6 group-data-open:block" />
            </DisclosureButton>
          </div>

          {/* Logo y nombre */}
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start lg:justify-between">
            <div className="flex shrink-0 items-center">
              <p className="text-blue-700 font-bold text-xl">tintaTech</p>
              <img
                alt="Logo"
                src="./src/assets/logoSinLetra.png"
                className="h-8 w-auto ml-3"
              />
            </div>

            {/* Menú modo escritorio */}
            <div className="hidden sm:ml-6 sm:block lg:flex items-center">
              <div className="flex space-x-4">
                {navigation.map((item) => {
                  const isCurrent = location.pathname === item.to;

                  if (item.type === "panel") {
                    return (
                      <button
                        key={item.name}
                        ref={buttonRef}
                        onClick={handleTogglePanel}
                        className="text-gray-500 hover:bg-gray-500 hover:text-white rounded-md px-3 py-2 text-sm font-medium cursor-pointer"
                      >
                        {item.name}
                      </button>
                    );
                  }

                  return (
                    <Link
                      key={item.name}
                      to={item.to}
                      className={classNames(
                        isCurrent
                          ? "bg-blue-600 text-white hover:bg-blue-500"
                          : "text-gray-500 hover:bg-gray-500 hover:text-white",
                        "rounded-md px-3 py-2 text-sm font-medium"
                      )}
                      aria-current={isCurrent ? "page" : undefined}
                    >
                      {item.name}
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Menú móvil */}
      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 px-2 pt-2 pb-3">
          {navigation.map((item) => {
            if (item.type === "panel") {
              return (
                <button
                  key={item.name}
                  ref={buttonRef}
                  onClick={handleTogglePanel}
                  className="text-gray-500 hover:bg-gray-500 hover:text-white rounded-md px-3 py-2 text-sm font-medium cursor-pointer"
                >
                  {item.name}
                </button>
              );
            }

            const isCurrent = location.pathname === item.to;
            return (
              <DisclosureButton
                key={item.name}
                as={Link}
                to={item.to}
                className={classNames(
                  isCurrent
                    ? "bg-blue-600 text-white"
                    : "text-gray-500 hover:bg-gray-500 hover:text-white",
                  "block rounded-md px-3 py-2 text-base font-medium"
                )}
                aria-current={isCurrent ? "page" : undefined}
              >
                {item.name}
              </DisclosureButton>
            );
          })}
        </div>
      </DisclosurePanel>


      {/* Panel de marcas y fallas */}
      <Transition /* Transition para el panel de marcas y fallas */
        show={showPanel}/* si showPanel es true, se muestra el panel */
        enter="transition duration-200 ease-out"//la transición de entrada dura 200ms y es de tipo ease-out 
        enterFrom="opacity-0 scale-95"// la transición de entrada comienza con opacidad 0 y escala 95%
        enterTo="opacity-100 scale-100"// la transición de entrada termina con opacidad 100 y escala 100%
        leave="transition duration-100 ease-in"//la transición de salida dura 100ms y es de tipo ease-in
        leaveFrom="opacity-100 scale-100"// la transición de salida comienza con opacidad 100 y escala 100%
        leaveTo="opacity-0 scale-95"// la transición de salida termina con opacidad 0 y escala 95%
      >
        <div
          ref={panelRef}
          style={{
            position: "absolute",
            top: panelPosition.top,
            left: panelPosition.left,
          }}
          className="z-50 w-64 rounded-md bg-white p-4 shadow-lg border border-gray-300"
        >
          <h2 className="text-lg font-semibold mb-2 ">Marcas y fallas</h2>
          <p>Marcas: 2</p>
          <p>Fallas: 1</p>
        </div>
      </Transition>

    
    </Disclosure>
  );
}