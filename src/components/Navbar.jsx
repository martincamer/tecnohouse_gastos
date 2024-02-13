import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import { BiCloset, BiMenu } from "react-icons/bi";
import { IoClose } from "react-icons/io5";

// const rutasPrivadas = [
//   {
//     name: "Inicio",
//     path: "/",
//   },
//   {
//     name: "Perfiles",
//     path: "/productos",
//   },
//   {
//     name: "Clientes",
//     path: "/clientes",
//   },
//   {
//     name: "Presupuestos",
//     path: "/presupuestos",
//   },
//   {
//     name: "Realizar Venta",
//     path: "/ventas-clientes",
//   },
// ];

const rutasuno = [
  {
    name: "SALIR",
    path: "/logout",
  },
];

const rutasdos = [
  // {
  //   name: "Login",
  //   path: "/",
  // },
  // {
  //   name: "Registrarse",
  //   path: "/register",
  // },
];

export const Navbar = () => {
  const { isAuth, signout, user, clickProvider, setClickProvider } = useAuth();

  return (
    <header className="shadow-md shadow-black/20 py-4 px-6 max-md:px-2">
      <div
        className={`flex justify-between items-center gap-4 max-md:flex-col ${
          !isAuth ? "w-[1220px]" : "w-full max-md:px-2"
        } mx-auto`}
      >
        <div className="flex gap-4 items-center">
          <Link
            to={"/"}
            className="text-2xl font-extrabold text-teal-400 max-md:text-lg"
          >
            TECNOHOUSE <span className="text-gray-700">ABERTURAS.</span>
          </Link>
          <div
            onClick={() => setClickProvider(!clickProvider)}
            className="cursor-pointer"
          >
            {!clickProvider ? (
              <BiMenu
                // onClick={handleClick}

                className="text-primary text-[40px] hover:bg-white rounded-full py-[5px] transition-all ease-in-out duration-300 max-md:block hidden"
              />
            ) : (
              <IoClose className="text-primary text-[38px] hover:bg-white rounded-full py-[5px] transition-all ease-in-out duration-300 max-md:block hidden" />
            )}
          </div>
        </div>
        {isAuth ? (
          ""
        ) : (
          <div className="font-bold text-2xl uppercase text-teal-400">
            Administración De Gastos
          </div>
        )}

        <div className="flex flex-row gap-6">
          {isAuth
            ? rutasuno.map(({ path, name }) => (
                <div className="flex items-center gap-4">
                  <div className="font-bold text-medium bg-teal-400 shadow text-black p-1 rounded-full px-4 max-md:text-sm uppercase">
                    USUARIO: {user?.username}
                  </div>
                  <Link
                    onClick={() => signout()}
                    className="text-[17px] max-md:text-sm max-md:font-bold max-md:py-1 font-semibold transition-all ease-in-out duration-300 bg-gray-600 px-10 rounded-full py-2 text-white hover:shadow-md hover:shadow-black/20 hover:scale-[1.02]"
                    //o={path}
                    key={path}
                  >
                    {name}
                  </Link>
                </div>
              ))
            : rutasdos.map(({ path, name }) => (
                <Link
                  className="text-[17px] font-semibold transition-all ease-in-out duration-300 bg-blue-500 px-4 rounded-full py-2 text-white hover:shadhttps://www.viviendastecnohouse.com.ar/storage/img/modelos/25.jpgow-md hover:shadow-black/20 hover:scale-[1.02]"
                  to={path}
                  key={path}
                >
                  {name}
                </Link>
              ))}
        </div>
      </div>
    </header>
  );
};
