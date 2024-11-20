export const config = {
  apiUrl:
    import.meta.env.VITE_API_URL ||
    process.env.API_URL ||
    "http://localhost:3000",
};
