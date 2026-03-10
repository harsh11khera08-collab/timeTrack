// src/services/api.js

const API_BASE =
  "https://timetrack-pro-dje7dcctf5huh4fh.centralindia-01.azurewebsites.net/api";

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
  const res = await fetch(`${API_BASE}/auth/login`, {
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
//   const res = await fetch(`${API_BASE}/projects`, {
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
  const res = await fetch(`${API_BASE}/projects`, {
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
  const res = await fetch(`${API_BASE}/projects`, {
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
  const res = await fetch(`${API_BASE}/projects/${projectId}`, {
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
  const res = await fetch(`${API_BASE}/timesheets/${entryId}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });

  const data = await res.json();

  if (!res.ok || !data.success) {
    throw new Error(data.error || "Failed to delete timesheet");
  }

  return data;
};
