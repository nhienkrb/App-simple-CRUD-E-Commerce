import React from 'react';
import { Box, IconButton } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import PhoneIcon from '@mui/icons-material/Phone';
import ChatIcon from '@mui/icons-material/Chat'; // thay bằng icon Zalo nếu có

const FloatingSocialButtons = () => {
  return (
    <Box
      sx={{
        position: 'fixed',     // bám cố định vào màn hình
        bottom: 90,
        right: 20,              // cách mép trái 10px
        display: 'flex',
        flexDirection: 'column',
        gap: 3,
      }}
    >
      {/* Facebook */}
      <IconButton
        size="large"
        sx={{
          background: '#3b5998',
          color: '#fff',
          boxShadow: '0 0 0 10px rgba(59, 89, 152, 0.2)',
          '&:hover': { background: '#2d4373' },
        }}
        href="https://facebook.com"
        target="_blank"
      >
        <FacebookIcon />
      </IconButton>

      {/* Zalo */}
      <IconButton
        size="large"
        sx={{
          background: '#0084ff',
          color: '#fff',
          boxShadow: '0 0 0 10px rgba(0, 132, 255, 0.2)',
          '&:hover': { background: '#006edc' },
        }}
        href="https://zalo.me/0832700969"
        target="_blank"
      >
        <PhoneIcon />
      </IconButton>

      {/* Phone */}
      {/* <IconButton
        size="large"
        sx={{
          background: '#a4161a',
          color: '#fff',
          boxShadow: '0 0 0 10px rgba(164, 22, 26, 0.2)',
          '&:hover': { background: '#870d11' },
        }}
      >
        <ChatIcon />
      </IconButton> */}
    </Box>
  );
};

export default FloatingSocialButtons;
