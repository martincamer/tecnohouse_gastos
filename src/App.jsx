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

//import normales
import RutaProtegida from "./layouts/RutaProtejida";
import "react-toastify/dist/ReactToastify.css";
import "react-toastify/dist/ReactToastify.min.css";
import { GastosProvider } from "./context/GastosProvider";
import { Ventas } from "./routes/pages/protected/Ventas";
import { VentasProvider } from "./context/VentasProvider";
import { ViewVenta } from "./routes/pages/protected/ViewVenta";

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
          </Route>
          <Route
            element={<RutaProtegida isAllowed={isAuth} redirectTo={"/login"} />}
          >
            <Route
              element={
                <GastosProvider>
                  <VentasProvider>
                    <main className="flex gap-2 h-full">
                      <Sidebar />
                      <Outlet />
                    </main>
                  </VentasProvider>
                </GastosProvider>
              }
            >
              <Route index path="/" element={<Home />} />
              <Route index path="/gastos" element={<Gastos />} />
              <Route index path="/ventas" element={<Ventas />} />
              <Route index path="/gastos/:id" element={<ViewGasto />} />
              <Route index path="/ventas/:id" element={<ViewVenta />} />
            </Route>
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
