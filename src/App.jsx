import AuthContextProvider from "../src/app/contexts/AuthContext";
import { AppRouter } from "../src/app/components/routers/AppRouter";

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
