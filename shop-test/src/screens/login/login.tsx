import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import "./styles.css";
import { useState } from "react";
import { Buttons } from "../../components/buttons";


const Login = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const auth = getAuth();
      await signInWithEmailAndPassword(auth, username, password);
      setLoading(false);
    } catch (error: any) {      
      toast.error('correo o contraseña mal');
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h1>Iniciar sesión</h1>
        <div className="form-control">
          <label htmlFor="username">Usuario:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername((e.target as HTMLInputElement).value)}
          />
        </div>
        <div className="form-control">
          <label htmlFor="password">Contraseña:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword((e.target as HTMLInputElement).value)}
          />
        </div>
        <div className="btns-container">
          <Buttons
            text="Iniciar sesión"
            loading={loading}
            onClick={handleSubmit}
          />
        </div>
      </form>
      <ToastContainer
        limit={1}
        position="bottom-center"
        autoClose={3000}
        toastClassName="toast"
      />
    </div>
  );
};

export default Login;
