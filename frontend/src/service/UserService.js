import useFetchList from "../hooksCustom/useFetchList";

const API_URL = `${import.meta.env.VITE_API_URL}/users`;

export default function getUsers() {
  return useFetchList(API_URL); //  gọi hook trong custom hook
};

export const createUser = async (user) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });
  return await res.json();
};

export const updateUser = async (id, user) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT", // hoặc PATCH
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });
  return await res.json();
};

export const deleteUser = async (id) => {
  await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
};
