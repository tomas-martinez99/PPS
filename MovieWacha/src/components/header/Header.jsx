import { useContext } from 'react';
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { AuthenticationContext } from '../../services/Authentication.context'
import { useNavigate } from 'react-router-dom';

function Header() {
  const { user } = useContext(AuthenticationContext)
  const isLoggedIn = Boolean(user);
  const { handleLogout } = useContext(AuthenticationContext)
  const navigate = useNavigate()

  const handleClickLogout = () => {
    handleLogout();
    navigate("/login")
  }

  const handleClickProfile = () => {
    navigate("/profile")
  }

  const navigation = [
    { name: 'Inicio', href: '/', current: true },
  ];
  const buttonsLogin = [
    { name: 'Iniciar secion', href: '/login', current: false },
    { name: 'Registratse', href: '/register', current: false }
  ]

  const filterOptions = [
    
    { name: 'Category 1', action: () => {/* Lógica para filtrar por categoría 1 */ } },
    { name: 'Category 2', action: () => {/* Lógica para filtrar por categoría 2 */ } },
  ];
  const windowsOptionsAdmin = [
    { name: 'Estadisticas', action: () => { navigate ("/statistics")} },
    { name: 'Manejo de Peliculas/Series', action: () => { navigate ("/") } },
    { name: 'Manejo de usuarios', action: () => {/* Lógica para filtrar por categoría 2 */ } },

  ];

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

  return (
    <Disclosure as="nav" className="bg-gray-800">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="flex items-center justify-start h-16">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="block h-6 w-6 group-data-[open]:hidden" />
              <XMarkIcon aria-hidden="true" className="hidden h-6 w-6 group-data-[open]:block" />
            </DisclosureButton>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex flex-shrink-0 items-center">
              <h1>Movie Wacha</h1>
            </div>
            {user?.rol === 0 ? 
              <Menu as="div" className="relative inline-block text-left sm:ml-4 ">
                  <MenuButton className="bg-gray-900 text-white : text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">
                    Pantallas
                  </MenuButton>
                  <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  {windowsOptionsAdmin.map((option) => (
                    <MenuItem key={option.name}>
                      <button
                        onClick={option.action}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        {option.name}
                      </button>
                    </MenuItem>
                  ))}
                </MenuItems>

              </Menu>
            :
              <Menu as="div" className="relative inline-block text-left sm:ml-4 ">
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <a key={item.name} href={item.href}
                        className="bg-gray-900 text-white : text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium" >
                        {item.name}
                      </a>))}
                 
               
                  <MenuButton className="bg-gray-900 text-white : text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">
                    Filter Products
                  </MenuButton>
                  </div>
                  </div>
                <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  {filterOptions.map((option) => (
                    <MenuItem key={option.name}>
                      <button
                        onClick={option.action}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        {option.name}
                      </button>
                    </MenuItem>
                  ))}
                </MenuItems>
              </Menu>
            }
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            {isLoggedIn ?
              <Menu as="div" className="relative ml-3">
                <div>
                  <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                    <span className="absolute -inset-1.5" />
                    <span className="sr-only">Open user menu</span>
                    <img
                      alt=""
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      className="h-8 w-8 rounded-full"
                    />
                  </MenuButton>
                </div>
                <MenuItems
                  transition
                  className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                >{user.rol === 2 &&
                  <MenuItem>
                    <a onClick={handleClickProfile} className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100">
                      Perfil
                    </a>
                  </MenuItem>
                  }
                  <MenuItem>
                    <button onClick={handleClickLogout} className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100">
                      Cerrar Sesion
                    </button>
                  </MenuItem>
                </MenuItems>
              </Menu>
              :
              <div className="hidden sm:ml-6 sm:block">
                <div className="flex space-x-4">
                  {buttonsLogin.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="bg-gray-900 text-white : text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium" >
                      {item.name}
                    </a>
                  ))}
                </div>
              </div>}
          </div>
        </div>
      </div>
      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 px-2 pb-3 pt-2">
          {navigation.map((item) => (
            <DisclosureButton
              key={item.name}
              as="a"
              href={item.href}
              aria-current={item.current ? 'page' : undefined}
              className={classNames(
                item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                'block rounded-md px-3 py-2 text-base font-medium',
              )}
            >
              {item.name}
            </DisclosureButton>
          ))}
        </div>
      </DisclosurePanel>
    </Disclosure>
  )


}

Header.propTypes = {}

export default Header