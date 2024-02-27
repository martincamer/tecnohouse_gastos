//import {}
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { useAuth } from "./context/AuthProvider";
import { Sidebar } from "./components/ui/Sidebar";
import { Navbar } from "./components/Navbar";
import { NotFound } from "./routes/pages/protected/NotFound";
import { Login } from "./routes/pages/Login";
import { Register } from "./routes/pages/Register";
import { Home } from "./routes/pages/protected/Home";
import { Gastos } from "./routes/pages/protected/Gastos";
import { ViewGasto } from "./routes/pages/protected/ViewGasto";
import { GastosProvider } from "./context/GastosProvider";
import { Ventas } from "./routes/pages/protected/Ventas";
import { VentasProvider } from "./context/VentasProvider";
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
//import normales
import RutaProtegida from "./layouts/RutaProtejida";
import "react-toastify/dist/ReactToastify.css";
import "react-toastify/dist/ReactToastify.min.css";
import { PresupuestoProvider } from "./context/PresupuestoProvider";
import { ViewPresupuesto } from "./routes/pages/protected/ViewPresupuesto";

function App() {
  const { isAuth } = useAuth();

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route
            element={<RutaProtegida isAllowed={!isAuth} redirectTo={"/pm"} />}
          >
            <Route index path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
          <Route
            element={<RutaProtegida isAllowed={isAuth} redirectTo={"/login"} />}
          >
            <Route
              element={
                <GastosProvider>
                  <VentasProvider>
                    <AberturasProvider>
                      <PerfilesProvider>
                        <AccesoriosProvider>
                          <PreciosProvider>
                            <PresupuestoProvider>
                              <main className="flex gap-2 h-full">
                                <Sidebar />
                                <Outlet />
                              </main>
                            </PresupuestoProvider>
                          </PreciosProvider>
                        </AccesoriosProvider>
                      </PerfilesProvider>
                    </AberturasProvider>
                  </VentasProvider>
                </GastosProvider>
              }
            >
              <Route index path="/" element={<Home />} />
              <Route path="/gastos" element={<Gastos />} />
              <Route path="/ventas" element={<Ventas />} />
              <Route path="/perfiles" element={<Perfiles />} />
              <Route path="/accesorios" element={<Accesorios />} />
              <Route path="/presupuestos" element={<GenerarPresupuesto />} />
              <Route path="/aberturas" element={<AberturasCostos />} />
              <Route path="/gastos/:id" element={<ViewGasto />} />
              <Route path="/ventas/:id" element={<ViewVenta />} />
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
