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
        bottom: '7%',            // cách đỉnh trang 7%
        right: 10,              // cách mép trái 10px
        display: 'flex',
        flexDirection: 'column',
        gap: 3,
        zIndex: 1000,          // nổi trên các thành phần khác
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
        href="https://zalo.me/0934446663"
        target="_blank"
      >
        <ChatIcon />
      </IconButton>

      {/* Phone */}
      <IconButton
        size="large"
        sx={{
          background: '#a4161a',
          color: '#fff',
          boxShadow: '0 0 0 10px rgba(164, 22, 26, 0.2)',
          '&:hover': { background: '#870d11' },
        }}
        href="tel:0934446663"
      >
        <PhoneIcon />
      </IconButton>
    </Box>
  );
};

export default FloatingSocialButtons;
