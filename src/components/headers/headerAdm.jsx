import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { Link, useLocation } from 'react-router-dom'

const navigation = [
  { name: 'Usuarios', to: '/lista-usuarios-adm' },
  { name: 'Tickets', to: '/lista-tickets-adm' },
  { name: 'Agregar Usuario', to: '/registrarUsuario' },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function HeaderAdm() {
  const location = useLocation()

  return (
    <Disclosure as="nav" className="bg-white border border-gray-200 shadow-md">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* Botón menú mobile */}
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:ring-2 focus:ring-white focus:outline-hidden focus:ring-inset">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Abrir menú</span>
              <Bars3Icon aria-hidden="true" className="block size-6 group-data-open:hidden" />
              <XMarkIcon aria-hidden="true" className="hidden size-6 group-data-open:block" />
            </DisclosureButton>
          </div>

          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start lg:justify-between">
            <div className="flex shrink-0 items-center">
              <p className='text-blue-700 font-bold text-xl'>tintaTech</p>
              <img
                alt="Logo"
                src="./src/assets/logoSinLetra.png"
                className="h-8 w-auto ml-3"
              />
            </div>

            <div className="hidden sm:ml-6 sm:block lg:flex items-center">
              <div className="flex space-x-4">
                {navigation.map((item) => {
                  const isCurrent = location.pathname === item.to
                  return (
                    <Link
                      key={item.name}
                      to={item.to}
                      className={classNames(
                        isCurrent
                          ? 'bg-blue-600 text-white hover:bg-blue-500'
                          : 'text-gray-500 hover:bg-gray-500 hover:text-white',
                        'rounded-md px-3 py-2 text-sm font-medium'
                      )}
                      aria-current={isCurrent ? 'page' : undefined}
                    >
                      {item.name}
                    </Link>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Menú mobile */}
      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 px-2 pt-2 pb-3">
          {navigation.map((item) => {
            const isCurrent = location.pathname === item.to
            return (
              <DisclosureButton
                key={item.name}
                as={Link}
                to={item.to}
                className={classNames(
                  isCurrent
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-500 hover:bg-gray-500 hover:text-white',
                  'block rounded-md px-3 py-2 text-base font-medium'
                )}
                aria-current={isCurrent ? 'page' : undefined}
              >
                {item.name}
              </DisclosureButton>
            )
          })}
        </div>
      </DisclosurePanel>
    </Disclosure>
  )
}
