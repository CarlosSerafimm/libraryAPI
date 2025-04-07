import { Outlet, Link } from "react-router-dom";

export default function App() {
  return (
    <div>
      <nav>
        <Link to="home">Home</Link> |{" "}
        <Link to="/auth">Sair</Link>
      </nav>
      <Outlet />
    </div>
  );
}
