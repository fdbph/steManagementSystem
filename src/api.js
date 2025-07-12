const API_URL = "http://localhost/login-app-backend/api";

export async function login({ emailOrId, password }) {
  const response = await fetch(`${API_URL}/login.php`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ emailOrId, password }),
  });
  return response.json();
}

export async function register(data) {
  const response = await fetch(`${API_URL}/register.php`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return response.json();
}
