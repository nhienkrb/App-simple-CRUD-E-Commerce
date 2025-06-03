import { Box, Container, Grid, List, ListItem, ListItemText } from "@mui/material";
import React from "react";
import ContactInfo from "../../components/contact/ContactInfo";
import ContactForm from "../../components/contact/ContactForm";

export default function Contact() {
  return (
    <Container maxWidth="xl" sx={{ mt: 2, mb: 2 }}>
      {/*Start banner contact */}
      <Grid container spacing={2}>
        <Grid
          size={{ sm: 12, md: 12, lg: 12, xl: 12 }}
          sx={{ borderRight: "1px solid rgba(0,0,0,.1)" }}
        >
          <Box display={"inline-block"} sx={{ overflow: "hidden" }}>
            <Box
              sx={{
                width: "100%",
                opacity: 1,
                transition: "opacity 0.3s ",
                display: "inline-block",
                height: "auto",
              }}
              component={"img"}
              src="https://bachlien.vn/wp-content/uploads/2025/03/2.png"
              alt="Contact"
            />
          </Box>
        </Grid>
      </Grid>
      {/*End banner contact */}

      <Grid container spacing={2}>
        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 6 }}>
              <ContactInfo />
            
        </Grid>
           <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 6 }}>
              <ContactForm />
            
        </Grid>
      </Grid>
    </Container>
  );
}
