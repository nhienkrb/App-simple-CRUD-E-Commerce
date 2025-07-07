
import useFetchList from "./useFetchList";
const API_URL = `${import.meta.env.VITE_API_URL}/users`;

export default function useUsers() {
  const users = useFetchList(API_URL); // ✅ gọi đúng hook trong custom hook
  const loading = users.length === 0;
  return { users, loading, refetch: () => {} }; // Nếu muốn thêm refetch, sẽ nâng cấp sau
}
