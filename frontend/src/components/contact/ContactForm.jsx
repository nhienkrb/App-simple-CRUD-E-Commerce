import React, { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';

const ContactForm = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Dữ liệu form:', form);
    // TODO: gửi dữ liệu về server ở đây
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        padding: 4,
        borderRadius: 2,
        maxWidth: 600,
        mx: 'auto',
      }}
    >
      <Typography variant="body1" fontWeight="bold">
        Họ và tên (Bắt buộc)
      </Typography>
      <TextField
        name="name"
        variant="outlined"
        fullWidth
        required
        value={form.name}
        onChange={handleChange}
      />

      <Typography variant="body1" fontWeight="bold">
        Email (Bắt buộc)
      </Typography>
      <TextField
        name="email"
        type="email"
        variant="outlined"
        fullWidth
        required
        value={form.email}
        onChange={handleChange}
      />

      <Typography variant="body1" fontWeight="bold">
        Số điện thoại
      </Typography>
      <TextField
        name="phone"
        variant="outlined"
        fullWidth
        value={form.phone}
        onChange={handleChange}
      />

      <Typography variant="body1" fontWeight="bold">
        Nội dung
      </Typography>
      <TextField
        name="message"
        variant="outlined"
        fullWidth
        multiline
        rows={5}
        value={form.message}
        onChange={handleChange}
      />

      <Button
        type="submit"
        variant="contained"
        sx={{
          backgroundColor: '#a6191d',
          color: '#fff',
          fontWeight: 'bold',
          width: '100px',
        }}
      >
        SEND
      </Button>
    </Box>
  );
};

export default ContactForm;
