import { useAuthContext } from "../../contexts/AuthContext";
import { RelevanteNews } from "../home/structure/home/relevante/relevante-news/RelevanteNews";
import { Footer } from "../home/structure/home/footer/Footer";
import { NavbarFijoAdmin } from "../home/structure/home/navbar/admin/fijo-admin/NavbarFijoAdmin";
import { NavbarFijo } from "../home/structure/home/navbar/navbar/fijo/NavbarFijo";

export const EmotivaRelevanteRouter = () => {
  const { isAuthenticated, rol } = useAuthContext();
  console.log("Autenticado: ", isAuthenticated);
  console.log("Rol: ", rol);

  const navbarComponent = isAuthenticated ? (
    rol === "Administrador" ? <NavbarFijoAdmin /> : <NavbarFijo />
  ) : <NavbarFijo />;

  return (
    <div>
      {navbarComponent}
      <RelevanteNews />
      <Footer />
    </div>
  );
}