import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Dashboard } from "../dashboard/Dashboard";
import { Slider } from "../dashboard/slider/Slider";
import { StaffDash } from "../dashboard/staff/StaffDash";
import { AddStaffDash } from "../dashboard/staff/add-staff/AddStaffDash"
import { Usuarios } from "../dashboard/usuarios/Usuarios";
import { EmotivaStaff } from "../home/structure/home/structure/staff/EmotivaStaff";
import { AddSlider } from "../dashboard/slider/add-slider/AddSlider";
import { PrivateRoute } from "./private/PrivateRoute";
import { PublicRoute } from "./public/PublicRoute";
import { EmotivaLoginRouter } from "./EmotivaLoginRouter";
import { EmotivaHomeRouter } from "./EmotivaHomeRouter";
import { EmotivaAccountRouter } from "./EmotivaAccountRouter";
import { EmotivaLogoutRouter } from "./EmotivaLogoutRouter";
import { EmotivaHomeUserRouter } from "./EmotivaHomeUserRouter";
import { EmotivaNewsRouter } from "./EmotivaNewsRouter";
import { EmotivaRelevanteRouter } from "./EmotivaRelevanteRouter";
import { EmotivaRelevanteNewsRouter } from "./EmotivaRelevanteNewsRouter";
import { EmotivaLifeStyleRouter } from "./EmotivaLifeStyleRouter";
import { EmotivaSportsRouter } from "./EmotivaSportsRouter";
import { EmotivaEntertainmentRouter } from "./EmotivaEntertainmentRouter";
import { RelevanteDash } from "../dashboard/relevante/Relevante";
import { AddRelevante } from "../dashboard/relevante/add-relevante/AddRelevante";
import { AddLifeStyle } from "../dashboard/lifestyle/add-lifestyle/AddLifeStyle";
import { LifeStyleDash } from "../dashboard/lifestyle/LifeStyle";
import { SportsDash } from "../dashboard/sports/SportsDash";
import { AddSports } from "../dashboard/sports/add-sports/AddSports";
import { EntertainmentfDash } from "../dashboard/entertainment/EntertainmentDash";
import { AddEntertainment } from "../dashboard/entertainment/add-entertainment/AddEntertainment";
import { Users } from "../dashboard/users/Users";
import { EmotivaLifeStyleNewsRouter } from "./EmotivaLifeStyleNewsRouter";
import { EmotivaSportsNewsRouter } from "./EmotivaSportsNewsRouter";
import { EmotivaEntertainmentNewsRouter } from "./EmotivaEntertainmentNewsRouter";
import { EmotivaTop10Router } from "./EmotivaTop10Router";

export const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path= "/private" element={<PrivateRoute />}>
          <Route index element={<EmotivaHomeUserRouter />} />
          <Route path="/private/logout" element={<EmotivaLogoutRouter />} />
        </Route>

        <Route path="/" element={<PublicRoute />}>
          <Route index element={<EmotivaHomeRouter />} />
          <Route path="/login" element={<EmotivaLoginRouter />} />
          <Route path="/create-account" element={<EmotivaAccountRouter />} />
        </Route>

        <Route path="/staff/detalle/:id" element={<EmotivaStaff />} />
        <Route path="/news/:id" element={<EmotivaNewsRouter />} />
        <Route path="/news" element={<EmotivaRelevanteNewsRouter />} />
        <Route path="/lifestyle" element={<EmotivaLifeStyleNewsRouter />} />
        <Route path="/sports" element={<EmotivaSportsNewsRouter/>} />
        <Route path="/entertainment" element={<EmotivaEntertainmentNewsRouter/>} />
        <Route path="/relevante/:id" element={<EmotivaRelevanteRouter />} />
        <Route path="/lifestyle/:id" element={<EmotivaLifeStyleRouter />} />
        <Route path="/sports/:id" element={<EmotivaSportsRouter />} />
        <Route path="/entertainment/:id" element={<EmotivaEntertainmentRouter />} />
        <Route path="/top-10" element={<EmotivaTop10Router />} />
        
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="resumen" element={<Slider />} />
          <Route path="users" element={<Users />} /> 
          <Route path="staff" element={<StaffDash />} />
          <Route path="add-staff" element={<AddStaffDash />} />
          <Route path="usuarios" element={<Usuarios />} /> 
          <Route path="add-slider" element={<AddSlider />} />
          <Route path= "relevante-dash" element={<RelevanteDash />} />
          <Route path="add-relevante" element={<AddRelevante />} />
          <Route path="lifestyle" element={<LifeStyleDash />} />
          <Route path="add-lifestyle" element={<AddLifeStyle />} />
          <Route path="sports" element={<SportsDash />} />
          <Route path="add-sports" element={<AddSports />} />
          <Route path="entertainment" element={<EntertainmentfDash/>} />
          <Route path="add-entertainment" element={<AddEntertainment/>} />
        </Route>
      </Routes>
    </Router>
  );
};


