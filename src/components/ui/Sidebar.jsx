import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";
import { BiMenu } from "react-icons/bi";
import { useState } from "react";

export const Sidebar = () => {
  const { clickProvider } = useAuth();
  const [click, setClick] = useState(true);

  const handleClick = () => {
    setClick(!click);
  };

  const location = useLocation();

  const navegacion = [
    {
      name: "ABERTURAS",
      path: "/",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6"
          />
        </svg>
      ),
    },
    {
      name: "PRESUPUESTOS",
      path: "/presupuestos",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z"
          />
        </svg>
      ),
    },
  ];

  return (
    <div
      className={`${
        click
          ? "w-[70px] max-md:w-[44px] transition-all ease-in-out duration-300"
          : "w-1/5 transition-all ease-in-out duration-300"
      } w-1/5 bg-white border-[1px] min-h-screen max-h-full block ${
        clickProvider ? "max-md:block" : "max-md:hidden"
      }`}
    >
      <div
        className={`${
          click
            ? "justify-center transition-all ease-in-out duration-300"
            : "justify-end transition-all ease-in-out duration-300"
        } w-full flex px-4 py-2 cursor-pointer`}
      >
        <Link className="t group relative">
          <BiMenu
            onClick={handleClick}
            className="text-primary hover:text-white text-[40px] hover:bg-indigo-500 rounded-xl py-[5px] transition-all ease-in-out duration-300 max-md:hidden"
          />

          <span className="invisible absolute left-10 top-4 ml-5 -translate-y-1/2 rounded bg-slate-900 px-4 w-[150px] flex justify-center py-2 text-xs text-white group-hover:visible font-bold uppercase shadow">
            {click ? "Abrir menu" : "Cerrar menu"}
          </span>
        </Link>
      </div>
      <div
        className={`w-full ${
          click ? "items-center" : ""
        }  flex flex-col gap-12`}
      >
        <div>
          {navegacion.map(({ name, path, icon }) => (
            <div
              key={path}
              className={`${location.pathname === path && "bg-indigo-500"} ${
                click ? "px-4 py-3" : "py-2 px-4 rounded-none  mx-2"
              } py-3 px-4 rounded-xl max-md:px-4`}
            >
              <div className="t group flex items-center max-md:justify-center gap-4  transition-all ease duration-300">
                <Link
                  to={path}
                  className={`${
                    location.pathname === path && "text-white"
                  } text-2xl max-md:text-2xl text-teal-950 relative`}
                >
                  {icon}

                  {click && (
                    <span className="invisible absolute left-10 top-4 ml-5 -translate-y-1/2 rounded bg-slate-900 px-4 w-[150px] flex justify-center py-2 text-xs text-white group-hover:visible font-bold uppercase shadow">
                      {name}
                    </span>
                  )}
                </Link>
                <Link
                  to={path}
                  className={`${location.pathname === path && "text-white"}   ${
                    click
                      ? "hidden transition-all ease-in-out duration-300"
                      : "block transition-all ease-in-out duration-300 text-teal-950"
                  } text-sm  text-teal-950`}
                >
                  {name}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
