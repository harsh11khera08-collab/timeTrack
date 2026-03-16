// src/services/api.js

// const API_BASE =
//   "https://timetrack-pro-dje7dcctf5huh4fh.centralindia-01.azurewebsites.net/api";

const API_BASE = "http://localhost:4000/api"; 

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

//Employees
export const fetchEmployees = async () => {
  const res = await fetch(`${API_BASE}/employees`, {
    method: "GET",
      headers: {
      ...getAuthHeaders(),
      Authorization: `Bearer ${getToken()}`,
    },
  });

  const data = await res.json();
  console.log("Fetch Employees Response:", data);

  if (!res.ok || !data.success) {
    throw new Error("Failed to fetch employees");
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




//***********************************🧁🧁Add Member */
// Get project members
export const fetchProjectMembers = async (projectId) => {
  const res = await fetch(`${API_BASE}/project-members/project/${projectId}`, {
    metthod: "GET",
      headers: {
      ...getAuthHeaders(),
      Authorization: `Bearer ${getToken()}`,
    },
  });
  const resData = await res.json();
  console.log("Fetch Project Members Response:", resData);

  if (!res.ok || !resData.success) {
    throw new Error("Failed to fetch project members");
  }

  return resData.data;
};

// Add member
export const addProjectMember = async (projectId, data) => {
  const res = await fetch(`/api/project-members/project/${projectId}`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });
  const resData = await res.json();
  console.log("Add Project Member Response:", resData);
  if (!res.ok || !resData.success) {
    throw new Error("Failed to add project member");
  }
  return data.data;
};

// Delete member
export const deleteProjectMember = async (id) => {
  const res = await fetch(`/api/project-members/${id}`, {
    method: "DELETE",
     headers: {
      ...getAuthHeaders(),
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return res.json();
};













export const triggerFlow = async () => {
  await fetch("https://11c44b8adbc9ea6d943c4b5299b609.da.environment.api.powerplatform.com:443/powerautomate/automations/direct/workflows/f534d44f26d242a6b7adf072218d10ec/triggers/manual/paths/invoke?api-version=1&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=AEoFJ7P3BD-dUdcc_OEgE-V3MDfUbxwyv4mBSQMnklg", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      username: "Jatin",
      email: "jatin.dhiman@dynamicsmonk.com",
      message: "Button clicked"
    })
  });
};
