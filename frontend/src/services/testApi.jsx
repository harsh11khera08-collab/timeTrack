import { useState } from "react";
import { msalInstance } from "../main.jsx";

const API_BASE = "http://localhost:4000/api"; // change port if needed

async function getAccessToken() {
  const account = msalInstance.getAllAccounts()[0];
  if (!account) throw new Error("Not logged in");

  const response = await msalInstance.acquireTokenSilent({
    scopes: ["openid", "profile", "email", "User.Read"],
    account,
  });
  return response.accessToken;
}

export default function TestAPI() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleTest = async () => {
    setLoading(true);
    setResult(null);
    try {
      const token = await getAccessToken();
      console.log("Token:", token); 

      const res = await fetch(`${API_BASE}/test`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setResult(data);
    } catch (err) {
      setResult({ success: false, error: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 24 }}>
      <button onClick={handleTest} disabled={loading}>
        {loading ? "Testing..." : "Test API with Azure Token"}
      </button>

      {result && (
        <pre style={{ marginTop: 16, background: "#f1f5f9", padding: 16, borderRadius: 8 }}>
          {JSON.stringify(result, null, 2)}
        </pre>
      )}
    </div>
  );2
}