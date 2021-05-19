import { BrowserRouter } from "react-router-dom";
import Routes from "./routes";
import AuthProvider from "./contexts/auth";
import GlobalStyle from "./createGlobalStyle";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
function App() {
  return (
    <div className="App">
      <GlobalStyle />
      <AuthProvider>
        <BrowserRouter>
          <ToastContainer autoClose={2000} />
          <Routes />
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
