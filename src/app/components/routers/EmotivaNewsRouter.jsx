import { useAuthContext } from "../../contexts/AuthContext";
import { NavbarFijoAdmin } from "../home/structure/home/navbar/admin/fijo-admin/NavbarFijoAdmin";
import { News } from "../home/structure/home/news/News";
import { Footer } from "../home/structure/home/footer/Footer";
import { NavbarFijo } from "../home/structure/home/navbar/navbar/fijo/NavbarFijo";

export const EmotivaNewsRouter = () => {
  const { isAuthenticated, rol } = useAuthContext();
  console.log("Autenticado: ", isAuthenticated);
  console.log("Rol: ", rol);

  const navbarComponent = isAuthenticated ? (
    rol === "Administrador" ? <NavbarFijoAdmin /> : <NavbarFijo />
  ) : <NavbarFijo />;

  return (
    <div>
      {navbarComponent}
      <News />
      <Footer />
    </div>
  );
};
