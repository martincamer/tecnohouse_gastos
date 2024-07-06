//import {}
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { useAuth } from "./context/AuthProvider";
import { Sidebar } from "./components/ui/Sidebar";
import { NotFound } from "./routes/pages/protected/NotFound";
import { Login } from "./routes/pages/Login";
import { Register } from "./routes/pages/Register";
import { AberturasCostos } from "./routes/pages/protected/AberturasCostos";
import { AberturasProvider } from "./context/AberturasProvider";
import { Perfiles } from "./routes/pages/protected/Perfiles";
import { PerfilesProvider } from "./context/PerfilesProvider";
import { AccesoriosProvider } from "./context/AccesoriosProvider";
import { Accesorios } from "./routes/pages/protected/Accesorios";
import { PreciosProvider } from "./context/PreciosProvider";
import { ViewAbertura } from "./routes/pages/protected/ViewAbertura";
import { GenerarPresupuesto } from "./routes/pages/protected/GenerarPresupuesto";
import { PresupuestoProvider } from "./context/PresupuestoProvider";
import { ViewPresupuesto } from "./routes/pages/protected/ViewPresupuesto";
import { MenuMobile } from "./components/MenuMobile";
import { ChangePassword } from "./routes/pages/ChangePassword";
//import normales
import RutaProtegida from "./layouts/RutaProtejida";
import "react-toastify/dist/ReactToastify.css";
import "react-toastify/dist/ReactToastify.min.css";
import { ToastContainer } from "react-toastify";
import { Gastos } from "./routes/pages/protected/Gastos";
import { GastosProvider } from "./context/GastosProvider";
import { Proveedores } from "./routes/pages/protected/Proveedores";
import { Pagos } from "./routes/pages/protected/Pagos";
import { AberturasResumen } from "./routes/pages/protected/AberturasResumen";

function App() {
  const { isAuth } = useAuth();

  return (
    <>
      <BrowserRouter>
        {/* <Navbar /> */}
        <Routes>
          <Route
            element={<RutaProtegida isAllowed={!isAuth} redirectTo={"/"} />}
          >
            <Route index path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/cambiar-contraseña-tecnohouse"
              element={<ChangePassword />}
            />
          </Route>
          <Route
            element={<RutaProtegida isAllowed={isAuth} redirectTo={"/login"} />}
          >
            <Route
              element={
                <AberturasProvider>
                  <GastosProvider>
                    <PerfilesProvider>
                      <AccesoriosProvider>
                        <PreciosProvider>
                          <PresupuestoProvider>
                            <main className="flex  h-full">
                              <ToastContainer />
                              <MenuMobile />
                              <Sidebar />
                              <Outlet />
                            </main>
                          </PresupuestoProvider>
                        </PreciosProvider>
                      </AccesoriosProvider>
                    </PerfilesProvider>
                  </GastosProvider>
                </AberturasProvider>
              }
            >
              <Route index path="/" element={<AberturasCostos />} />
              <Route path="/perfiles" element={<Perfiles />} />
              <Route path="/accesorios" element={<Accesorios />} />
              <Route path="/presupuestos" element={<GenerarPresupuesto />} />
              <Route path="/gastos" element={<Gastos />} />
              <Route path="/pagos" element={<Pagos />} />
              <Route path="/proveedores" element={<Proveedores />} />
              <Route path="/aberturas-resumen" element={<AberturasResumen />} />
              <Route path="/aberturas/:id" element={<ViewAbertura />} />
              <Route path="/presupuesto/:id" element={<ViewPresupuesto />} />
            </Route>
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
