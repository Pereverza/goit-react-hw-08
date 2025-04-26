import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Створюємо екземпляр axios
const authInstance = axios.create({
  baseURL: "https://connections-api.goit.global/",
});

// Функція для встановлення токена в заголовок
const setAuthHeader = (token) => {
  authInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
};

// Функція для очищення токена
const clearAuthHeader = () => {
  authInstance.defaults.headers.common.Authorization = "";
};

// Реєстрація нового користувача
export const register = createAsyncThunk(
  "auth/register",
  async (credentials, thunkAPI) => {
    try {
      const { data } = await authInstance.post("/users/signup", credentials);
      setAuthHeader(data.token);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Логін користувача
export const login = createAsyncThunk(
  "auth/login",
  async (credentials, thunkAPI) => {
    try {
      const { data } = await authInstance.post("/users/login", credentials);
      setAuthHeader(data.token);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Логаут користувача
export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    await authInstance.post("/users/logout");
    clearAuthHeader();
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

// Оновлення даних користувача за токеном
export const refreshUser = createAsyncThunk(
  "auth/refresh",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = state.auth.token;

    if (!token) {
      return thunkAPI.rejectWithValue("No token found");
    }

    try {
      setAuthHeader(token);
      const { data } = await authInstance.get("/users/current");
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
