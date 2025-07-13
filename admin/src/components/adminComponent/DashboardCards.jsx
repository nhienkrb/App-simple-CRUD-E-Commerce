import { Grid, Box, Typography } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import CampaignIcon from "@mui/icons-material/Campaign";
import HubIcon from "@mui/icons-material/Hub";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

const cardData = [
  {
    icon: <PersonIcon sx={{ fontSize: 40, color: "#ff9800" }} />,
    title: "Number",
    value: "150GB",
    subtitle: "Update Now",
    link: "/dashboard",
  },
  {
    icon: <CampaignIcon sx={{ fontSize: 40, color: "#8bc34a" }} />,
    title: "Revenue",
    value: "$ 1,345",
    subtitle: "Last day",
    link: "/orders",
  },
  {
    icon: <HubIcon sx={{ fontSize: 40, color: "#f44336" }} />,
    title: "Errors",
    value: "23",
    subtitle: "In the last hour",
    link: "/reports",
  },
  {
    icon: <FavoriteBorderIcon sx={{ fontSize: 40, color: "#2196f3" }} />,
    title: "Followers",
    value: "+45K",
    subtitle: "Update now",
    link: "/integrations",
  },
];


export default function DashboardCards({ router }) {
  return (
    <Grid container spacing={2}>
      {cardData.map((item, index) => (
        <Grid key={index} size={{xs:12, sm:6, md:3, lg:3}}>
          <Box
            onClick={() => router.navigate(item.link)}
            sx={{
              p: 2,
              borderRadius: 2,
              boxShadow: 2,
              display: "flex",
              flexDirection: "column",
              gap: 1,
              height: "100%",
              bgcolor: "white",
              cursor: "pointer",
              transition: "all 0.2s",
              "&:hover": {
                boxShadow: 4,
                transform: "translateY(-2px)",
              },
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              {item.icon}
              <Box>
                <Typography variant="caption" color="text.secondary">
                  {item.title}
                </Typography>
                <Typography variant="h6" fontWeight="bold">
                  {item.value}
                </Typography>
              </Box>
            </Box>
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ mt: "auto" }}
            >
              {item.subtitle}
            </Typography>
          </Box>
        </Grid>
      ))}
    </Grid>
  );
}

