import { useState } from "react";
import { loginUser } from "./services/api";

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

const handleLogin = async () => {
  try {
    setLoading(true);
    setError("");
    const user = await loginUser(email, password);
    onLogin(user); // pass user to App
  } catch (err) {
    setError(err.message);
  } finally {
    setLoading(false);
  }
};

  return (
    <div style={{
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "#F8FAFC"
    }}>
      <div style={{
        width: 320,
        background: "white",
        padding: 24,
        borderRadius: 12,
        boxShadow: "0 10px 30px rgba(0,0,0,0.08)"
      }}>
        <h2 style={{ marginBottom: 20 }}>Login</h2>

        <input
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          style={{ width: "100%", marginBottom: 12, padding: 8 }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          style={{ width: "100%", marginBottom: 12, padding: 8 }}
        />

        {error && (
          <div style={{ color: "red", fontSize: 12, marginBottom: 10 }}>
            {error}
          </div>
        )}

        <button
          onClick={handleLogin}
          disabled={loading}
          style={{
            width: "100%",
            padding: 10,
            background: "#3B82F6",
            color: "white",
            border: "none",
            borderRadius: 6
          }}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </div>
    </div>
  );
}