import "./App.css";
import { AuthComponent } from "./Auth/AuthComponent";
import { Header } from "./components/Header";
import { Button } from "./components/ui/button";

function App() {
  return (
    <>
      <Header />
      <AuthComponent />
    </>
  );
}

export default App;
