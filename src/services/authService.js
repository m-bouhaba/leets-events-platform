// src/services/authService.js

const ADMIN_EMAIL = "admin@leetsevents.com";
const ADMIN_PASSWORD = "123456";

export function login(email, password) {
  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    localStorage.setItem("adminAuth", "true");
    return true;
  }
  return false;
}

export function logout() {
  localStorage.removeItem("adminAuth");
}

export function isAuthenticated() {
  return localStorage.getItem("adminAuth") === "true";
}
