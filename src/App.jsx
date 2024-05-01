import AuthContextProvider from "./contexts/AuthContext";
import { AppRouter } from "./components/routers/AppRouter";

function App() {
  return (
    <div className="wrapper">
      <AuthContextProvider>
        <AppRouter />
      </AuthContextProvider>
    </div>
  )
}

export default App
