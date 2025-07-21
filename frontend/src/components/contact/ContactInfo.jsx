import React from 'react';
import { Box, Typography, Link, Grid } from '@mui/material';
import { Email, Language, Phone, LocationOn } from '@mui/icons-material';
import '@fortawesome/fontawesome-free/css/all.min.css';

const ContactInfo = () => {
  return (
    <Box sx={{ p: 4, borderRadius: 2 }}>
      <Typography variant="h6" fontWeight="bold" gutterBottom>
        THÔNG TIN LIÊN HỆ
      </Typography>

      <ul style={{ listStyle: 'disc', paddingLeft: '20px' }}>
        <li>
          <Typography component="span" sx={{ fontWeight: 'bold', color: 'red' }}>
            CÔNG TY TNHH ĐẦU TƯ 
          </Typography>
        </li>
        <li>MST: 0110650850</li>
        <li>
          <LocationOn fontSize="small" /> Địa chỉ: xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
        </li>
        <li>
          <Phone fontSize="small" /> Điện thoại: <b>xxxxxxxxx</b> – Zalo: <b style={{ color: 'red' }}>0832700969</b>
        </li>
        <li>
          <Email fontSize="small" /> Mail: <Link href="mailto:nhiennkrb@gmail.com">nhiennkrb@gmail.com</Link>
        </li>
        <li>
          <Language fontSize="small" /> Website: <Link href="https://laptrinhwebtea.in" target="_blank" rel="noopener" color="error">
            https://frontend.laptrinhwebtea.in
          </Link>
        </li>
      </ul>

      <Grid container spacing={2} mt={2}>
        {[
          { icon: 'fab fa-facebook', color: '#3b5998' },
          { icon: 'fab fa-tiktok', color: '#000000' },
          { icon: 'fab fa-twitter', color: '#1da1f2' },
          { icon: 'fas fa-envelope', color: '#444' },
          { icon: 'fab fa-whatsapp', color: '#25d366' },
          { icon: 'fab fa-pinterest', color: '#bd081c' },
          { icon: 'fab fa-linkedin', color: '#0077b5' },
          { icon: 'fab fa-youtube', color: '#ff0000' },
        ].map((item, idx) => (
          <Grid  key={idx}>
            <Box
              component="span"
              sx={{
                width: 40,
                height: 40,
                display: 'inline-flex',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: '50%',
                backgroundColor: item.color,
                color: 'white',
                fontSize: 20,
                cursor: 'pointer',
              }}
            >
              <i className={item.icon}></i>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ContactInfo;
