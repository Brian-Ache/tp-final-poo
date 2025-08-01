import { useNavigate } from "react-router-dom";
import React from "react";
import { useState } from "react";

export default function Login() {
  // Simulación de usuario y contraseña
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
  
    const navigate = useNavigate();
    const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //Suponé que esta validación es correcta
    if (user === 'admin' && password === '1234') {
      // Redirige al home
      navigate('/mainAdm');
    }
    else if (user === 'tecnico' && password === '1234') {
      // Redirige al home del técnico
      navigate('/mainTecnico');
    }
    else if (user === 'trabajador' && password === '1234') {
      // Redirige al home del cliente
      navigate('/mainTrabajador');
    }
    else {
      alert('Credenciales incorrectas');
    }
    };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 mt-5 lg:px-8 ">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="text-center text-2xl/9 font-bold tracking-tight text-gray-900">
              Ingresar a tu cuenta
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm bg-white border border-gray-200 rounded-lg shadow-md p-12">
            <form action="#" method="POST" className="space-y-6" onSubmit={handleLogin}>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Numero de identificacion
                </label>
                <div className="mt-2">
                  <input
                    id="identification"
                    name="identification"
                    type="text"
                    required
                    autoComplete="identification"
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"
                    value={user}
                    onChange={(e) => setUser(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm/6 font-medium text-gray-900"
                  >
                    Contraseña
                  </label>
                  <div className="text-sm">
                    <a
                      href="#"
                      className="font-semibold text-blue-600 hover:text-blue-500"
                    >
                      Has olvidado tu contraseña?
                    </a>
                  </div>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    autoComplete="current-password"
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 mt-10 text-sm/6 font-semibold text-white shadow-xs hover:bg-blue-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 cursor-pointer"
                >
                  Ingresar
                </button>
              </div>
            </form>
          </div>
        </div>
    </>
  );
}
