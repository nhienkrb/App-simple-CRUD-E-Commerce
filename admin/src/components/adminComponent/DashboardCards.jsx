import { Grid, Box, Typography } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import CampaignIcon from "@mui/icons-material/Campaign";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import InventoryIcon from "@mui/icons-material/Inventory";
import { BarChart } from "@mui/x-charts/BarChart";
import { LineChart, PieChart } from "@mui/x-charts";
import useFetchList from "../../hooksCustom/useFetchList";
const API_URL = import.meta.env.VITE_API_URL;

const uData = [4000, 3000, 2000, 2780, 1890, 2390, 3490];
const pData = [2400, 1398, 9800, 3908, 4800, 3800, 4300];
const xLabels = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
export default function DashboardCards({ router }) {
  const { data = [] } = useFetchList(API_URL + "/dashboard");
  const dashboard = data[0] || {};
  const { data: dataTop3Products = [] } = useFetchList(
    API_URL + "/dashboard/top3-products"
  );

  const pieChart = dataTop3Products.map((product, index) => {
    return {
      id: index,
      value: product.total_sold,
      label:
        product.product_name.length > 12
          ? product.product_name.slice(0, 12) + "..."
          : product.product_name,
    };
  });

  // Fetching top 3 products sold by month
  const { data: topProductsMonthly = [] } = useFetchList(
    API_URL + "/dashboard/top3-products/month"
  );

  const months = [...new Set(topProductsMonthly.map((item) => item.thang))];
  const productsSet = [
    ...new Set(topProductsMonthly.map((item) => item.product_name)),
  ];
  const monthIndex = Object.fromEntries(months.map((m, i) => [m, i]));

  // Tạo dữ liệu trống cho từng sản phẩm
  const productSeries = productsSet.map((name) => ({
    label: name.length > 12 ? name.slice(0, 12) + "..." : name,
    data: new Array(months.length).fill(0),
  }));

  // Điền số lượng bán vào data
  topProductsMonthly.forEach(({ thang, product_name, total_quantity }) => {
    const series = productSeries.find((s) =>
      s.label.includes(product_name.slice(0, 12))
    );
    if (series) {
      series.data[monthIndex[thang]] += Number(total_quantity);
    }
  });

  const cardData = [
    {
      icon: (
        <ShoppingCartCheckoutIcon sx={{ fontSize: 40, color: "#ff9800" }} />
      ),
      title: "Total Orders Today",
      value: dashboard.order_day || "loading...",
      subtitle: "Today",
      link: "/dashboard",
    },
    {
      icon: <CampaignIcon sx={{ fontSize: 40, color: "#8bc34a" }} />,
      title: "Revenue",
      value: dashboard.revenue_today || "loading...",
      subtitle: "Today",
      link: "/orders",
    },
    {
      icon: <PersonIcon sx={{ fontSize: 40, color: "#f44336" }} />,
      title: "New Customers",
      value: dashboard.new_customer || "loading...",
      subtitle: "This Month",
      link: "/reports",
    },
    {
      icon: <InventoryIcon sx={{ fontSize: 40, color: "#2196f3" }} />,
      title: "Products in Stock",
      value: dashboard.product_almost_out || "loading...",
      subtitle: "Update now",
      link: "/",
    },
  ];
  return (
    <Grid container spacing={2}>
      {cardData.map((item, index) => (
        <Grid key={index} size={{ xs: 12, sm: 6, md: 3, lg: 3 }}>
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

      <Grid size={{ xs: 12, sm: 12, md: 8, lg: 8 }}>
        <Box
          sx={{
            p: 1,
            borderRadius: 2,
            boxShadow: 2,
            display: "flex",
            flexDirection: "column",
            gap: 1,
            height: "100%",
            bgcolor: "white",
            cursor: "pointer",
          }}
        >
          <BarChart
            height={300}
            series={productSeries}
            xAxis={[{ data: months }]}
            yAxis={[{ width: 50 }]}
            margin={{ top: 20, right: 20, bottom: 30, left: 60 }}
          />

          <Typography
            variant="caption"
            color="text.secondary"
            textAlign={"center"}
          >
            Top Products sold by Month
          </Typography>
        </Box>
      </Grid>

      <Grid size={{ xs: 12, sm: 12, md: 4, lg: 4 }}>
        <Box
          sx={{
            p: 1,
            borderRadius: 2,
            boxShadow: 2,
            display: "flex",
            flexDirection: "column",
            gap: 1,
            height: "100%",
            bgcolor: "white",
            cursor: "pointer",
          }}
        >
          <PieChart
            series={[
              {
                data: pieChart,
              },
            ]}
            width={400}
            height={400}
          />
          <Typography
            variant="caption"
            color="text.secondary"
            textAlign={"center"}
          >
            Top 3 Products Sold
          </Typography>
        </Box>
      </Grid>

      <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
        <Box
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
          }}
        >
          <LineChart
            height={300}
            series={[
              { data: pData, label: "pv" },
              { data: uData, label: "uv" },
            ]}
            xAxis={[{ scaleType: "point", data: xLabels }]}
            yAxis={[{ width: 50 }]}
          />
        </Box>
      </Grid>
    </Grid>
  );
}
