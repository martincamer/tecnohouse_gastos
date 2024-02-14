import { Link, useLocation, useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";
import { BiHome, BiMenu } from "react-icons/bi";
import { FiShoppingBag, FiSend, FiSidebar } from "react-icons/fi";
// import { LiaShoppingBasketSolid } from "react-icons/lia";
import { useState } from "react";

export const Sidebar = () => {
  const { user, clickProvider } = useAuth();
  const [click, setClick] = useState(true);

  const handleClick = () => {
    setClick(!click);
  };

  const location = useLocation();

  const navegacion = [
    {
      name: "INICIO",
      path: "/",
      icon: <BiHome />,
    },
    {
      name: "GASTOS",
      path: "/gastos",
      icon: <FiShoppingBag />,
    },
    {
      name: "VENTAS",
      path: "/ventas",
      icon: <FiSend />,
    },
    {
      name: "ABERTURAS",
      path: "/aberturas",
      icon: <FiSidebar />,
    },
  ];

  return (
    <div
      className={`${
        click
          ? "w-[100px] max-md:w-[44px] transition-all ease-in-out duration-300"
          : "w-1/5 transition-all ease-in-out duration-300"
      } w-1/5 bg-gray-200/90 shadow-md shadow-black/30 min-h-screen max-h-full block ${
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
        <BiMenu
          onClick={handleClick}
          className="text-primary hover:text-white text-[45px] hover:bg-teal-400 rounded-full py-[5px] transition-all ease-in-out duration-300 max-md:hidden"
        />
      </div>
      <div className={`w-full flex flex-col gap-12`}>
        <div>
          {navegacion.map(({ name, path, icon }) => (
            <div
              key={path}
              className={`${
                location.pathname === path && "bg-teal-400"
              } w-full py-3 px-8 max-md:px-4 `}
            >
              <div className="flex items-center max-md:justify-center gap-4 hover:translate-x-2 max-md:hover:translate-x-1 transition-all ease duration-300">
                <Link
                  to={path}
                  className="text-4xl max-md:text-2xl text-teal-950"
                >
                  {icon}
                </Link>
                <Link
                  to={path}
                  className={`${
                    click
                      ? "hidden transition-all ease-in-out duration-300"
                      : "block transition-all ease-in-out duration-300 text-teal-950"
                  } text-xl font-extrabold text-teal-950`}
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
