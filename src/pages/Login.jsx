import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase";
import { useNavigate } from "react-router-dom";

function Login() {

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {

      const result = await signInWithPopup(
        auth,
        provider
      );

      alert(
        "Welcome " + result.user.displayName
      );

      navigate("/home");

    } catch (error) {
      console.log(error);
      alert("Login Failed");
    }
  };

  return (
    <div>
      <h1>Login Page</h1>

      <button onClick={handleLogin}>
        Login With Google
      </button>
    </div>
  );
}

export default Login;