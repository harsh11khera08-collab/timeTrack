// import { useState } from "react";
// import { useMsal } from "@azure/msal-react";
// import { loginUser } from "./services/api";

// export default function Login({ onLogin }) {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

// const handleLogin = async () => {
//   try {
//     setLoading(true);
//     setError("");
//     const user = await loginUser(email, password);
//     onLogin(user); 
//   } catch (err) {
//     setError(err.message);
//   } finally {
//     setLoading(false);
//   }
// };

//   return (
//     <div style={{
//       height: "100vh",
//       display: "flex",
//       justifyContent: "center",
//       alignItems: "center",
//       background: "#F8FAFC"
//     }}>
//       <div style={{
//         width: 320,
//         background: "white",
//         padding: 24,
//         borderRadius: 12,
//         boxShadow: "0 10px 30px rgba(0,0,0,0.08)"
//       }}>
//         <h2 style={{ marginBottom: 20 }}>Login</h2>

//         <input
//           placeholder="Email"
//           value={email}
//           onChange={e => setEmail(e.target.value)}
//           style={{ width: "100%", marginBottom: 12, padding: 8 }}
//         />

//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={e => setPassword(e.target.value)}
//           style={{ width: "100%", marginBottom: 12, padding: 8 }}
//         />

//         {error && (
//           <div style={{ color: "red", fontSize: 12, marginBottom: 10 }}>
//             {error}
//           </div>
//         )}

//         <button
//           onClick={handleLogin}
//           disabled={loading}
//           style={{
//             width: "100%",
//             padding: 10,
//             background: "#3B82F6",
//             color: "white",
//             border: "none",
//             borderRadius: 6
//           }}
//         >
//           {loading ? "Logging in..." : "Login"}
//         </button>
//       </div>
//     </div>
//   );
// }

import { useState } from "react";
import { useMsal } from "@azure/msal-react";
import { loginReq } from "./authConfig";

export default function Login() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { instance } = useMsal();

  const handleMicrosoftLogin = async () => {
    try {
      setLoading(true);
      setError("");
      // This redirects user to Microsoft login page
      // After login, Microsoft sends them back to http://localhost:3000
      await instance.loginRedirect(loginReq);
    } catch (err) {
      setError("Login failed: " + err.message);
      setLoading(false);
    }
  };

  return (
    <div style={{ height: "100vh", display: "flex", justifyContent: "center", alignItems: "center", background: "#F8FAFC" }}>
      <div style={{ width: 320, background: "white", padding: 32, borderRadius: 12, boxShadow: "0 10px 30px rgba(0,0,0,0.08)", textAlign: "center" }}>
        <h2 style={{ marginBottom: 8, fontSize: 22, fontWeight: 700 }}>Welcome</h2>
        <p style={{ marginBottom: 28, color: "#6B7280", fontSize: 14 }}>
          Sign in with your Microsoft account to continue
        </p>

        <button
          onClick={handleMicrosoftLogin}
          disabled={loading}
          style={{ width: "100%", padding: "10px 16px", background: "white", color: "#1a1a1a", border: "1.5px solid #D1D5DB", borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", gap: 10, cursor: loading ? "not-allowed" : "pointer", fontWeight: 500, fontSize: 14, opacity: loading ? 0.7 : 1 }}
        >
          <svg width="18" height="18" viewBox="0 0 21 21" xmlns="http://www.w3.org/2000/svg">
            <rect x="1"  y="1"  width="9" height="9" fill="#f25022"/>
            <rect x="11" y="1"  width="9" height="9" fill="#7fba00"/>
            <rect x="1"  y="11" width="9" height="9" fill="#00a4ef"/>
            <rect x="11" y="11" width="9" height="9" fill="#ffb900"/>
          </svg>
          {loading ? "Redirecting to Microsoft..." : "Sign in with Microsoft"}
        </button>

        {error && <p style={{ color: "red", fontSize: 12, marginTop: 14 }}>{error}</p>}
      </div>
    </div>
  );
}