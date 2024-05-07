//import {}
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { useAuth } from "./context/AuthProvider";
import { Sidebar } from "./components/ui/Sidebar";
import { Navbar } from "./components/Navbar";
import { NotFound } from "./routes/pages/protected/NotFound";
import { Login } from "./routes/pages/Login";
import { Register } from "./routes/pages/Register";
import { ViewGasto } from "./routes/pages/protected/ViewGasto";
import { ViewVenta } from "./routes/pages/protected/ViewVenta";
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
import { ViewPdf } from "./routes/pages/protected/ViewPdf";
import { MenuMobile } from "./components/MenuMobile";
import { ChangePassword } from "./routes/pages/ChangePassword";
//import normales
import RutaProtegida from "./layouts/RutaProtejida";
import "react-toastify/dist/ReactToastify.css";
import "react-toastify/dist/ReactToastify.min.css";

function App() {
  const { isAuth } = useAuth();

  return (
    <>
      <BrowserRouter>
        <Navbar />
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
                  <PerfilesProvider>
                    <AccesoriosProvider>
                      <PreciosProvider>
                        <PresupuestoProvider>
                          <main className="flex gap-2 h-full">
                            <MenuMobile />
                            <Sidebar />
                            <Outlet />
                          </main>
                        </PresupuestoProvider>
                      </PreciosProvider>
                    </AccesoriosProvider>
                  </PerfilesProvider>
                </AberturasProvider>
              }
            >
              <Route index path="/" element={<AberturasCostos />} />
              <Route path="/perfiles" element={<Perfiles />} />
              <Route path="/accesorios" element={<Accesorios />} />
              <Route path="/presupuestos" element={<GenerarPresupuesto />} />
              <Route path="/gastos/:id" element={<ViewGasto />} />
              <Route path="/ventas/:id" element={<ViewVenta />} />
              <Route path="/aberturas/:id" element={<ViewAbertura />} />
              <Route path="/presupuesto/:id" element={<ViewPresupuesto />} />
              <Route path="/view-pdf" element={<ViewPdf />} />
            </Route>
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
