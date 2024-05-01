import { useAuthContext } from "../../contexts/AuthContext";
import { Footer } from "../home/structure/home/footer/Footer";
import { NavbarFijoAdmin } from "../home/structure/home/navbar/admin/fijo-admin/NavbarFijoAdmin";
import { NavbarFijo } from "../home/structure/home/navbar/navbar/fijo/NavbarFijo";
import { StyleTopNews } from "../home/structure/home/styletop/styletop-news/StyleTopNews";

export const EmotivaLifeStyleRouter = () => {
  const { isAuthenticated, rol } = useAuthContext();
  console.log("Autenticado: ", isAuthenticated);
  console.log("Rol: ", rol);

  const navbarComponent = isAuthenticated ? (
    rol === "Administrador" ? <NavbarFijoAdmin /> : <NavbarFijo />
  ) : <NavbarFijo />;

  return (
    <div>
      {navbarComponent}
      <StyleTopNews />
      <Footer />
    </div>
  )
}