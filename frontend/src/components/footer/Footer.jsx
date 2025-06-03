import React from 'react';
import { Box, Grid, Typography, Link } from '@mui/material';

const Footer = () => {
  return (
    <Box sx={{ backgroundColor: '#f5f2ed', p: 4 }}>
      <Grid container spacing={4}>
        {/* Về chúng tôi */}
        <Grid size={{xs:12, sm:6, md:3}}>
          <Typography variant="h6" fontWeight="bold" color="error" gutterBottom>
            Về chúng tôi
          </Typography>
          {[
            'Giới thiệu chung',
            'Tin tức',
            'Triết lý kinh doanh',
            'Văn hóa công ty',
            'Cảm nhận của khách hàng',
            'Tuyển dụng',
          ].map((item, i) => (
            <Typography key={i}>
              <Link href="#" underline="hover" color="inherit">
                {item}
              </Link>
            </Typography>
          ))}
        </Grid>

        {/* Sản phẩm */}
        <Grid size={{xs:12, sm:6, md:3}} >
          <Typography variant="h6" fontWeight="bold" color="error" gutterBottom>
            Sản phẩm
          </Typography>
          {[
            'Sản phẩm trà',
            'Sản phẩm mật',
            'Sản phẩm tâm linh',
            'Sản phẩm cao cấp',
            'Sản phẩm khác',
          ].map((item, i) => (
            <Typography key={i}>
              <Link href="#" underline="hover" color="inherit">
                {item}
              </Link>
            </Typography>
          ))}
        </Grid>

        {/* Hỗ trợ khách hàng */}
        <Grid size={{xs:12, sm:6, md:3}}>
          <Typography variant="h6" fontWeight="bold" color="error" gutterBottom>
            Hỗ trợ khách hàng
          </Typography>
          {[
            'Chính sách đổi trả/ bảo hành',
            'Chính sách bảo mật thông tin',
            'Chính sách thanh toán',
            'Chính sách vận chuyển & giao nhận',
            'Chính sách kiểm hàng',
            'Liên hệ',
          ].map((item, i) => (
            <Typography key={i}>
              <Link href="#" underline="hover" color="inherit">
                {item}
              </Link>
            </Typography>
          ))}
        </Grid>

        {/* Bản đồ */}
        <Grid size={{xs:12, sm:6, md:3}}>
          <Typography variant="h6" fontWeight="bold" color="error" gutterBottom>
            Địa chỉ của chúng tôi:
          </Typography>
          <Box
            component="iframe"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3723.917681294094!2d105.82379607592838!3d21.035749080615413!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab29bb6219c7%3A0x43139a1994bc3f61!2zQsOhY2ggTGllbsOqbg!5e0!3m2!1svi!2s!4v1717465441453!5m2!1svi!2s"
            width="100%"
            height="200"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Bản đồ Bách Liên"
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Footer;
