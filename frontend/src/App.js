import "./App.css";
import AdminDashboard from "./components/Admin/AdminDashboard";
import Rating from "./components/user/Rating";
import { Route, BrowserRouter, Routes } from "react-router-dom";

function App() {
  return (
    <div>
      {/* browser router uses regular url paths */}
      <BrowserRouter>
        <Routes>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/rating" element={<Rating />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
