import { useAuthContext } from "../../contexts/AuthContext";
import { SportView } from "../home/structure/home/sportEnt/sport-view/SportView";
import { Footer } from "../home/structure/home/footer/Footer";
import { NavbarFijoAdmin } from "../home/structure/home/navbar/admin/fijo-admin/NavbarFijoAdmin";
import { NavbarFijo } from "../home/structure/home/navbar/navbar/fijo/NavbarFijo";

export const EmotivaSportsNewsRouter = () => {
  const { isAuthenticated, rol } = useAuthContext();
  console.log("Autenticado: ", isAuthenticated);
  console.log("Rol: ", rol);

  const navbarComponent = isAuthenticated ? (
    rol === "Administrador" ? <NavbarFijoAdmin /> : <NavbarFijo />
  ) : <NavbarFijo />;

  return (
    <div>
      {navbarComponent}
      <SportView />
      <Footer />
    </div>
  );
}