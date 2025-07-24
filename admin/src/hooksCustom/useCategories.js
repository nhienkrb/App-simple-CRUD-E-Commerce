import useFetchList from "./useFetchList";
import useFetchOne from "./useFetchOne"; // Bạn sẽ tạo hook này bên dưới

const API_URL = `${import.meta.env.VITE_API_URL}/categories`;

// Hook lấy toàn bộ danh sách category
export function useAllCategories() {
  const {data, refetch} = useFetchList(API_URL);
  const loading = data.length === 0;
  return { categories: data, loading, refetch };
}

// Hook lấy chi tiết 1 category theo id
export function useCategoryById(id) {
  const data = useFetchOne(`${API_URL}/${id}`);
  const loading = !data;
  return { category: data, loading };
}
