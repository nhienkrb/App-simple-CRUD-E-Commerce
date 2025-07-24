import { useAllCategories, useCategoryById } from "../hooksCustom/useCategories";

const API_URL = `${import.meta.env.VITE_API_URL}/categories`;

// ✅ HOOK: Lấy tất cả categories
export function useCategoryService() {
  return useAllCategories();
}

// ✅ HOOK: Lấy 1 category theo ID
export function useSingleCategory(id) {
  return useCategoryById(id);
}

// ✅ HÀM: Tạo category mới
export async function createCategory(formData) {
  try {
    const res = await fetch(API_URL, {
      method: "POST",
      body: formData, // Phải là FormData nếu có ảnh
    });
    const json = await res.json();
    return json;
  } catch (err) {
    console.error("Create category error:", err);
    throw err;
  }
}

// ✅ HÀM: Cập nhật category
export async function updateCategory(id, formData) {
  try {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      body: formData,
    });
    const json = await res.json();
    return json;
  } catch (err) {
    console.error("Update category error:", err);
    throw err;
  }
}

// ✅ HÀM: Xóa category
export async function deleteCategory(id) {
  try {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });
    const json = await res.json();
    return json;
  } catch (err) {
    console.error("Delete category error:", err);
    throw err;
  }
}
