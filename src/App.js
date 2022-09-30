import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import WelcomePage from "./pages/WelcomePage";
import CustomersPage from "./pages/CustomersPage";
import CreatePage from "./pages/CreatePage";
import SendPage from "./pages/SendPage";
import ErrorPage from "./pages/ErrorPage";

const App = () => {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/customers" element={<CustomersPage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/:type/:id" element={<SendPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </div>
  );
};

export default App;
