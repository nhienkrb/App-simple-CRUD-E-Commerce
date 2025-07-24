
import useFetchList from "./useFetchList";
const API_URL = `${import.meta.env.VITE_API_URL}/users`;

export default function useUsers() {
  const {data, refetch} = useFetchList(API_URL);
  const loading = data.length === 0;
  return { users: data, loading, refetch };
}