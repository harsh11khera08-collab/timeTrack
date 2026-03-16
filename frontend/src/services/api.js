// // src/services/api.js

// const API_BASEE =
//   "https://timetrack-pro-dje7dcctf5huh4fh.centralindia-01.azurewebsites.net/api";

const API_BASEE = "http://localhost:4000/api";


// ===============================
// 🔐 AUTH HELPERS
// ===============================

export const setToken = (token) => {
  localStorage.setItem("token", token);
};

export const getToken = () => {
  return localStorage.getItem("token");
};

export const removeToken = () => {
  localStorage.removeItem("token");
};

// ===============================
// 🔐 LOGIN
// ===============================

export const loginUser = async (email, password) => {
  const res = await fetch(`${API_BASEE}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();

  if (!res.ok || !data.success) {
    throw new Error("Invalid email or password");
  }

  // ✅ Store token
  localStorage.setItem("token", data.token);

  // ✅ Store user object
  localStorage.setItem("user", JSON.stringify(data.user));

  return data.user;
};

// ===============================
// 🔑 AUTH HEADER
// ===============================

export const getAuthHeaders = () => {
  const token = getToken();

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

// ===============================
// 📦 PROJECTS
// ===============================

// export const fetchProjects = async () => {
//   const res = await fetch(`${API_BASEE}/projects`, {
//     method: "GET",
//     headers: getAuthHeaders(),
//     Authorization: `Bearer ${getToken()}`,
//   });

//   const data = await res.json();
//   console.log("Fetch Projects Response:", data); // Debug log
//   if (!res.ok || !data.success) {
//     throw new Error("Failed to fetch projects");
//   }

//   return data.data; // ✅ IMPORTANT
// };
export const fetchProjects = async () => {
  const res = await fetch(`${API_BASEE}/projects`, {
    method: "GET",
    headers: {
      ...getAuthHeaders(),
      Authorization: `Bearer ${getToken()}`,
    },
  });

  const data = await res.json();
  console.log("Fetch Projects Response:", data);

  if (!res.ok || !data.success) {
    throw new Error("Failed to fetch projects");
  }

  return data.data;
};
export const createProject = async (projectData) => {
  const res = await fetch(`${API_BASEE}/projects`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(projectData),
  });

  const data = await res.json();

  if (!res.ok || !data.success) {
    throw new Error("Failed to create project");
  }

  return data.data; // backend likely returns { success, data }
};
const BASE_URL =
  "https://timetrack-pro-dje7dcctf5huh4fh.centralindia-01.azurewebsites.net/api";

export const fetchTimesheets = async () => {
  const res = await fetch(
    "https://timetrack-pro-dje7dcctf5huh4fh.centralindia-01.azurewebsites.net/api/timesheets",
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    },
  );

  const json = await res.json();

  return json.data; // 🔥 only return array
};

export const createTimesheet = async (payload) => {
  const res = await fetch(`${BASE_URL}/timesheets`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(payload),
  });

  const data = await res.json();
  return data.data;
};

export const updateTimesheet = async (id, payload) => {
  const res = await fetch(`${BASE_URL}/timesheets/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(payload),
  });

  const data = await res.json();
  return data.data;
};

export const submitTimesheet = async (weekStart) => {
  const res = await fetch(`${BASE_URL}/timesheets/submit`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify({ weekStart }),
  });

  return await res.json();
};

// ===============================
// ❌ DELETE PROJECT
// ===============================
export const deleteProject = async (projectId) => {
  const res = await fetch(`${API_BASEE}/projects/${projectId}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });

  const data = await res.json();

  if (!res.ok || !data.success) {
    throw new Error(data.error || "Failed to delete project");
  }

  return data;
};

// ===============================
// ❌ DELETE TIMESHEET ENTRY
// ===============================
export const deleteTimesheet = async (entryId) => {
  const res = await fetch(`${API_BASEE}/timesheets/${entryId}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });

  const data = await res.json();

  if (!res.ok || !data.success) {
    throw new Error(data.error || "Failed to delete timesheet");
  }

  return data;
};

// Tasks 
export const fetchTasks = async (projectId) => {
  const res = await fetch(`${API_BASEE}/tasks?projectId=${projectId}`,{
    headers:{Authorization : `Bearer ${getToken()} `},
  });
  return res.json();
}

export const createTasks = async (taskDetail) => {
  const res = await fetch(`${API_BASEE}/tasks`, { 
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(taskDetail),  
  });
  return res.json(); 
};

// import {msalInstance} from "../main.jsx";

// // const API_BASEE = "https://timetrack-pro-dje7dcctf5huh4fh.centralindia-01.azurewebsites.net/api";

// // ===============================
// // 🔐 GET AZURE AD TOKEN
// // ===============================
// async function getAccessToken() {
//   const account = msalInstance.getAllAccounts()[0];
//   if (!account) throw new Error("No account found");

//   try {
//     const response = await msalInstance.acquireTokenSilent({
//       scopes: ["openid", "profile", "email", "User.Read"],
//       account,
//     });
//     console.log("=== ACCESS TOKEN ===", response.accessToken); // debug
//     return response.accessToken;
//   } catch (err) {
//     console.error("Silent token failed, redirecting:", err);
//     await msalInstance.acquireTokenRedirect({
//       scopes: ["openid", "profile", "email", "User.Read"],
//     });
//   }
// }

// // ===============================
// // 📦 PROJECTS
// // ===============================
// export const fetchProjects = async () => {
//   const token = await getAccessToken();
//   const res = await fetch(`${API_BASEE}/projects`, {
//     headers: { Authorization: `Bearer ${token}` },
//   });
//   const data = await res.json();
//   console.log("Fetch Projects Response:", data);
//   if (!res.ok || !data.success) throw new Error("Failed to fetch projects");
//   return data.data;
// };

// export const createProject = async (projectData) => {
//   const token = await getAccessToken();
//   const res = await fetch(`${API_BASEE}/projects`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${token}`,
//     },
//     body: JSON.stringify(projectData),
//   });
//   const data = await res.json();
//   if (!res.ok || !data.success) throw new Error("Failed to create project");
//   return data.data;
// };

// export const deleteProject = async (projectId) => {
//   const token = await getAccessToken();
//   const res = await fetch(`${API_BASEE}/projects/${projectId}`, {
//     method: "DELETE",
//     headers: { Authorization: `Bearer ${token}` },
//   });
//   const data = await res.json();
//   if (!res.ok || !data.success) throw new Error("Failed to delete project");
//   return data;
// };

// // ===============================
// // ⏱️ TIMESHEETS
// // ===============================
// export const fetchTimesheets = async () => {
//   const token = await getAccessToken();
//   const res = await fetch(`${API_BASEE}/timesheets`, {
//     headers: { Authorization: `Bearer ${token}` },
//   });
//   const json = await res.json();
//   console.log("Fetch Timesheets Response:", json);
//   return json.data;
// };

// export const createTimesheet = async (payload) => {
//   const token = await getAccessToken();
//   const res = await fetch(`${API_BASEE}/timesheets`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${token}`,
//     },
//     body: JSON.stringify(payload),
//   });
//   const data = await res.json();
//   return data.data;
// };

// export const updateTimesheet = async (id, payload) => {
//   const token = await getAccessToken();
//   const res = await fetch(`${API_BASEE}/timesheets/${id}`, {
//     method: "PATCH",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${token}`,
//     },
//     body: JSON.stringify(payload),
//   });
//   const data = await res.json();
//   return data.data;
// };

// export const deleteTimesheet = async (entryId) => {
//   const token = await getAccessToken();
//   const res = await fetch(`${API_BASEE}/timesheets/${entryId}`, {
//     method: "DELETE",
//     headers: { Authorization: `Bearer ${token}` },
//   });
//   const data = await res.json();
//   if (!res.ok || !data.success) throw new Error("Failed to delete timesheet");
//   return data;
// };

// export const submitTimesheet = async (weekStart) => {
//   const token = await getAccessToken();
//   const res = await fetch(`${API_BASEE}/timesheets/submit`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${token}`,
//     },
//     body: JSON.stringify({ weekStart }),
//   });
//   return await res.json();
// };

// // ===============================
// // ✅ TASKS
// // ===============================
// export const fetchTasks = async (projectId) => {
//   const token = await getAccessToken();
//   const res = await fetch(`${API_BASEE}/tasks?projectId=${projectId}`, {  // ← fixed URL
//     headers: { Authorization: `Bearer ${token}` },
//   });
//   return res.json();
// };

// export const createTask = async (data) => {
//   const token = await getAccessToken();
//   const res = await fetch(`${API_BASEE}/tasks`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${token}`,
//     },
//     body: JSON.stringify(data),
//   });
//   return res.json();
// };

// import { msalInstance } from "../main.jsx";

// const API_BASE = "http://localhost:4000/api";

// // Get Azure AD token
// async function getAccessToken() {
//   const account = msalInstance.getAllAccounts()[0];
//   if (!account) throw new Error("No account found");

//   try {
//     const response = await msalInstance.acquireTokenSilent({
//       scopes: ["openid", "profile", "email", "User.Read"],
//       account,
//     });
//     return response.accessToken;
//   } catch (err) {
//     await msalInstance.acquireTokenRedirect({
//       scopes: ["openid", "profile", "email", "User.Read"],
//     });
//   }
// }

// // ── Projects ──────────────────────────────────────────────────────
// export const fetchProjects = async () => {
//   const token = await getAccessToken();
//   const res = await fetch(`${API_BASE}/projects`, {
//     headers: { Authorization: `Bearer ${token}` },
//   });
//   const data = await res.json();
//   return data.data;
// };

// export const createProject = async (projectData) => {
//   const token = await getAccessToken();
//   const res = await fetch(`${API_BASE}/projects`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
//     body: JSON.stringify(projectData),
//   });
//   const data = await res.json();
//   return data.data;
// };

// export const updateProject = async (id, projectData) => {
//   const token = await getAccessToken();
//   const res = await fetch(`${API_BASE}/projects/${id}`, {
//     method: "PATCH",
//     headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
//     body: JSON.stringify(projectData),
//   });
//   const data = await res.json();
//   return data.data;
// };

// export const deleteProject = async (projectId) => {
//   const token = await getAccessToken();
//   const res = await fetch(`${API_BASE}/projects/${projectId}`, {
//     method: "DELETE",
//     headers: { Authorization: `Bearer ${token}` },
//   });
//   const data = await res.json();
//   return data;
// };

// // ── Timesheets ────────────────────────────────────────────────────
// export const fetchTimesheets = async () => {
//   const token = await getAccessToken();
//   const res = await fetch(`${API_BASE}/timesheets`, {
//     headers: { Authorization: `Bearer ${token}` },
//   });
//   const data = await res.json();
//   return data.data;
// };

// export const createTimesheet = async (payload) => {
//   const token = await getAccessToken();
//   const res = await fetch(`${API_BASE}/timesheets`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
//     body: JSON.stringify(payload),
//   });
//   const data = await res.json();
//   return data.data;
// };

// export const updateTimesheet = async (id, payload) => {
//   const token = await getAccessToken();
//   const res = await fetch(`${API_BASE}/timesheets/${id}`, {
//     method: "PATCH",
//     headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
//     body: JSON.stringify(payload),
//   });
//   const data = await res.json();
//   return data.data;
// };

// export const deleteTimesheet = async (entryId) => {
//   const token = await getAccessToken();
//   const res = await fetch(`${API_BASE}/timesheets/${entryId}`, {
//     method: "DELETE",
//     headers: { Authorization: `Bearer ${token}` },
//   });
//   const data = await res.json();
//   return data;
// };

// export const submitTimesheet = async (weekStart) => {
//   const token = await getAccessToken();
//   const res = await fetch(`${API_BASE}/timesheets/submit`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
//     body: JSON.stringify({ weekStart }),
//   });
//   return res.json();
// };

// // ── Tasks ─────────────────────────────────────────────────────────
// export const fetchTasks = async (projectId) => {
//   const token = await getAccessToken();
//   const res = await fetch(`${API_BASE}/tasks?projectId=${projectId}`, {
//     headers: { Authorization: `Bearer ${token}` },
//   });
//   return res.json();
// };

// export const createTask = async (data) => {
//   const token = await getAccessToken();
//   const res = await fetch(`${API_BASE}/tasks`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
//     body: JSON.stringify(data),
//   });
//   return res.json();
// };