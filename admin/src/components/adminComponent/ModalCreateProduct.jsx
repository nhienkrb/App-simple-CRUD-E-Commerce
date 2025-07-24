import * as React from 'react';
import {
  AppBar,
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Slide,
  TextField,
  Toolbar,
  Typography,
  MenuItem,
  InputLabel,
  FormControl,
  Select,
  Divider,
  Paper,
  Grid,
} from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import CloseIcon from '@mui/icons-material/Close';
import { useRef } from 'react';
import { useState } from 'react';
import RichTextEditor from '../RichTextEditor';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ProductCreateDialog() {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    product_name: '',
    price: '',
    quantity: '',
    tag_name: '',
    description: '',
    category_id: '',
    brand: '',
    origin: '',
    TeaQuality: '',
    weight: '',
    expiration_date: '',
    note: '',
    prepare: '',
    description_infoProduct: '',
    image: null,
  });

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setForm({ ...form, image: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    for (const key in form) {
      formData.append(key, form[key]);
    }

    try {
      const res = await fetch("https://laptrinhwebtea.click/api/v1/products", {
        method: "POST",
        body: formData,
      });
      const json = await res.json();
      console.log("API response:", json);
      setOpen(false);
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };
 const [images, setImages] = useState([null, null, null,null,null]); // 3 box mặc định
  const fileInputs = useRef([]);

  const handleBoxClick = (index) => {
    if (fileInputs.current[index]) {
      fileInputs.current[index].click();
    }
  };

  const handleFileChange = (index, event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newImages = [...images];
        newImages[index] = reader.result;
        setImages(newImages);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleDelete = (index) => {
    const newImages = [...images];
    newImages[index] = null;
    setImages(newImages);

    // Reset input file (cho phép upload lại cùng 1 ảnh)
    if (fileInputs.current[index]) {
      fileInputs.current[index].value = "";
    }
  };


  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        Thêm sản phẩm
      </Button>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton edge="start" color="inherit"  onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Thêm sản phẩm mới
            </Typography>
            <Button autoFocus color="inherit" variant='outlined' onClick={handleSubmit}>
              Lưu
            </Button>
          </Toolbar>
        </AppBar>

        <DialogContent>
          <Grid container spacing={2} padding={2}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Paper variant="outlined" sx={{ p: 2 }}>
                <Typography fontWeight={600} gutterBottom>
                  Thông tin cơ bản
                </Typography>
               
   <Grid container spacing={2}>
        {images.map((img, index) => (
          <Grid  size={{xs:4}} key={index}>
            <Box
              position="relative"
              width="100%"
              height={120}
              sx={{
                border: "1px dashed grey",
                bgcolor: img ? "transparent" : "grey.300",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
                overflow: "hidden",
              }}
              onClick={() => handleBoxClick(index)}
            >
              {img ? (
                <>
                  <img
                    src={img}
                    alt={`Preview ${index}`}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                  <IconButton
                    size="small"
                    onClick={(e) => {
                      e.stopPropagation(); // Ngăn click vào Box
                      handleDelete(index);
                    }}
                    sx={{
                      position: "absolute",
                      top: 4,
                      right: 4,
                      backgroundColor: "rgba(0,0,0,0.5)",
                      color: "white",
                      "&:hover": {
                        backgroundColor: "rgba(0,0,0,0.7)",
                      },
                    }}
                  >
                    <ClearIcon fontSize="small" />
                  </IconButton>
                </>
              ) : (
                <Typography>Chọn ảnh</Typography>
              )}
              <input
                type="file"
                accept="image/*"
                ref={(el) => (fileInputs.current[index] = el)}
                onChange={(e) => handleFileChange(index, e)}
                style={{ display: "none" }}
              />
            </Box>
          </Grid>
        ))}
      </Grid>
                <TextField name="image" type="file" onChange={handleChange} fullWidth margin="dense" size="small" />
                <TextField name="product_name" label="Tên sản phẩm" value={form.product_name} onChange={handleChange} fullWidth margin="dense" size="small" />
                <TextField name="price" label="Giá" type="number" value={form.price} onChange={handleChange} fullWidth margin="dense" size="small" />
                <TextField name="quantity" label="Số lượng" type="number" value={form.quantity} onChange={handleChange} fullWidth margin="dense" size="small" />
                <TextField name="tag" label="Nhãn. Vd: hong-tra, bach-tra" type="text" value={form.tag} onChange={handleChange} fullWidth margin="dense" size="small" />
                <TextField name="tag_name" label="Tên Nhãn. Vd: Hồng Trà, Bạch Trà" type="text" value={form.tag_name} onChange={handleChange} fullWidth margin="dense" size="small" />
<RichTextEditor
  value={form.description}
  onChange={(value) => setForm({ ...form, description: value })}
/>                <FormControl fullWidth margin="dense" size="small">
                  <InputLabel id="category-label">Danh mục</InputLabel>
                  <Select labelId="category-label" name="category_id" value={form.category_id} onChange={handleChange} label="Danh mục">
                    <MenuItem value={1}>Trà xanh</MenuItem>
                    <MenuItem value={2}>Hồng trà</MenuItem>
                    <MenuItem value={3}>Ô long</MenuItem>
                  </Select>
                </FormControl>
              </Paper>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <Paper variant="outlined" sx={{ p: 2 }}>
                <Typography fontWeight={600} gutterBottom>
                  Thông tin chi tiết
                </Typography>
                <TextField name="tag_name" label="Loại trà" value={form.tag_name} onChange={handleChange} fullWidth margin="dense" size="small" />
                <TextField name="brand" label="Thương hiệu" value={form.brand} onChange={handleChange} fullWidth margin="dense" size="small" />
                <TextField name="origin" label="Xuất xứ" value={form.origin} onChange={handleChange} fullWidth margin="dense" size="small" />
                <TextField name="TeaQuality" label="Chất lượng trà" value={form.TeaQuality} onChange={handleChange} fullWidth margin="dense" size="small" />
                <TextField name="weight" label="Khối lượng" value={form.weight} onChange={handleChange} fullWidth margin="dense" size="small" />
                <TextField name="expiration_date" label="Hạn sử dụng" type="date" InputLabelProps={{ shrink: true }} value={form.expiration_date} onChange={handleChange} fullWidth margin="dense" size="small" />
                <TextField name="note" label="Ghi chú" value={form.note} onChange={handleChange} fullWidth margin="dense" size="small" />
                <TextField name="prepare" label="Cách pha" value={form.prepare} onChange={handleChange} fullWidth margin="dense" size="small" />
                <TextField name="description_infoProduct" label="Mô tả chi tiết" value={form.description_infoProduct} onChange={handleChange} fullWidth margin="dense" size="small" />
              </Paper>
            </Grid>


            <Grid  size={{ xs:12, md: 12 }}>
              <Paper variant="outlined" sx={{ p: 2 }}>
                <Typography fontWeight={600} gutterBottom>
                  Thông tin chi tiết
                </Typography>
                <TextField name="sku" label="sku"  onChange={handleChange} fullWidth margin="dense" size="small" />
                <TextField name="stock_quantity" label="stock_quantity"  onChange={handleChange} fullWidth margin="dense" size="small" />
                <TextField name="specifications" label="specifications"  onChange={handleChange} fullWidth margin="dense" size="small" />
              </Paper>
            </Grid>
          </Grid>
           
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}
