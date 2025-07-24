import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Grid,
  Box,
  Button,
  Chip,
  CircularProgress,
  TextField,
} from "@mui/material";
import { useState, useEffect } from "react";
import {
  useCategoryService,
  useSingleCategory,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../../service/CategoryService";

export default function CategoriesAdmin() {
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [categoryImage, setCategoryImage] = useState(null);
  const [formData, setFormData] = useState({
    category_name: "",
    slug: "",
  });

  const { categories, loading, refetch  } = useCategoryService();
  const { category, loading: categoryLoading } = useSingleCategory(selectedCategoryId);

  // Đổ dữ liệu khi click nút Sửa
  useEffect(() => {
    if (category) {
      setFormData({
        category_name: category.category_name || "",
        slug: category.slug || "",
      });
      setCategoryImage(category.category_image);
    }
  }, [category]);

  // Reset lại form sau khi tạo/cập nhật
  const resetForm = () => {
    setSelectedCategoryId("");
    setFormData({ category_name: "", slug: "" });
    setCategoryImage(null);
    document.getElementById("category_image").value = null;
  };

  // Xử lý Lưu (tạo hoặc cập nhật)
  const handleSave = async () => {
    const form = new FormData();
    form.append("category_name", formData.category_name);
    form.append("slug", formData.slug);

    if (categoryImage instanceof File) {
      form.append("category_image", categoryImage);
    }

    try {
      if (selectedCategoryId) {
        await updateCategory(selectedCategoryId, form);
        alert("Cập nhật thành công!");
      } else {
        await createCategory(form);
        alert("Tạo mới thành công!");
      }
      refetch();
      resetForm();
    } catch (error) {
      console.error("Lỗi khi lưu:", error);
      alert("Có lỗi xảy ra!");
    }
  };

  const handleDelete =  async(id) => {
    if (window.confirm("Bạn có chắc muốn xóa danh mục này không?")) {
      try {
        await deleteCategory(id);
        alert("Đã xóa danh mục!");
        refetch();
      } catch (error) {
        console.error("Lỗi khi xóa:", error);
      }
    }
  };
  return (
    <>
      <Grid container spacing={2} sx={{ marginBottom: 2 }}>
        <Grid size={{ xs: 12, sm: 4, md: 4 }}>
          <Box width="100%" height="300px" sx={{ border: "1px dashed grey" }}>
            {categoryImage ? (
              <img
                src={
                  categoryImage instanceof File
                    ? URL.createObjectURL(categoryImage)
                    : categoryImage
                }
                alt="Category"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            ) : (
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="100%"
                color="gray"
              >
                Chưa chọn ảnh
              </Box>
            )}
          </Box>

          <input
            hidden
            id="category_image"
            type="file"
            accept="image/*"
            onChange={(e) => setCategoryImage(e.target.files[0])}
          />

          <Chip
            label="Chọn Ảnh"
            variant="outlined"
            sx={{ margin: 1, width: "100%", fontSize: "16px", cursor: "pointer" }}
            onClick={() => document.getElementById("category_image").click()}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 8, md: 8 }} >
          <TextField
            fullWidth
            label="Tên Loại"
            variant="outlined"
            sx={{ background: "#fff", margin: 1 }}
            size="small"
            value={formData.category_name}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, category_name: e.target.value }))
            }
          />
          <TextField
            fullWidth
            label="Slug"
            variant="outlined"
            sx={{ background: "#fff", margin: 1 }}
            size="small"
            value={formData.slug}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, slug: e.target.value }))
            }
          />
          <Button
            fullWidth
            variant="contained"
            color="success"
            sx={{ margin: 1 }}
            onClick={handleSave}
          >
            {selectedCategoryId ? "Cập Nhật" : "Tạo Mới"}
          </Button>
        </Grid>
      </Grid>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="Category Table">
          <TableHead>
            <TableRow>
              <TableCell>Image</TableCell>
              <TableCell align="right">Tên Loại</TableCell>
              <TableCell align="right">Slug</TableCell>
              <TableCell align="center">Ngày Tạo</TableCell>
              <TableCell align="center">Ngày Cập Nhật</TableCell>
              <TableCell align="center">Hành Động</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell align="center" colSpan={6}>
                  <CircularProgress />
                </TableCell>
              </TableRow>
            ) : (
              categories.map((cat) => (
                <TableRow key={cat.id}>
                  <TableCell>
                    <img
                      src={cat.category_image}
                      alt={cat.category_name}
                      style={{ width: "50px", height: "50px", objectFit: "cover" }}
                    />
                  </TableCell>
                  <TableCell align="right">{cat.category_name}</TableCell>
                  <TableCell align="right">{cat.slug}</TableCell>
                  <TableCell align="center">
                    {new Date(cat.created_at).toLocaleString()}
                  </TableCell>
                  <TableCell align="center">
                    {new Date(cat.updated_at).toLocaleString()}
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      sx={{ margin: "5px" }}
                      onClick={() => setSelectedCategoryId(cat.id)}
                    >
                      Sửa
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      size="small"
                      onClick={() => handleDelete(cat.id)}
                    >
                      Xóa
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
