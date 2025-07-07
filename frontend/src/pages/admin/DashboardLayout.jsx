import * as React from "react";
import { createTheme, styled } from "@mui/material/styles";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import BarChartIcon from "@mui/icons-material/BarChart";
import DescriptionIcon from "@mui/icons-material/Description";
import LayersIcon from "@mui/icons-material/Layers";
import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { PageContainer } from "@toolpad/core/PageContainer";
import Grid from "@mui/material/Grid";
import { Box, Typography } from "@mui/material";
import DashboardCards from "../../components/adminComponent/DashboardCards";
import OrderAdmin from "./OrderAdmin";
import { Person } from "@mui/icons-material";
import UserList from "./UserList";
import FilterComponentAdmin from "../../components/filter/FilterOrderAdmin";

const NAVIGATION = [
  {
    kind: "header",
    title: "Main items",
  },
  {
    segment: "dashboard",
    title: "Dashboard",
    icon: <DashboardIcon />,
  },
  {
    segment: "orders",
    title: "Orders",
    icon: <ShoppingCartIcon />,
  },
  {
    kind: "divider",
  },
  {
    kind: "header",
    title: "Analytics",
  },
  {
    segment: "reports",
    title: "Reports",
    icon: <BarChartIcon />,
    children: [
      {
        segment: "sales",
        title: "Sales",
        icon: <DescriptionIcon />,
      },
      {
        segment: "traffic",
        title: "Traffic",
        icon: <DescriptionIcon />,
      },
    ],
  },
  {
    segment: "users",
    title: "Users",
    icon: <Person />,
  },

    {
    segment: "products",
    title: "Products",
    icon: <LayersIcon />,
  },
];

const demoTheme = createTheme({
  colorSchemes: { light: true, dark: true },
  cssVariables: {
    colorSchemeSelector: "class",
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

function useDemoRouter(initialPath) {
  const [pathname, setPathname] = React.useState(initialPath);

  const router = React.useMemo(() => {
    return {
      pathname,
      searchParams: new URLSearchParams(),
      navigate: (path) => setPathname(String(path)),
    };
  }, [pathname]);

  return router;
}

function RenderPage({ pathname }) {
  switch (pathname) {
    case "/dashboard":
      return <DashboardCards />;
    case "/orders":
      return (<> <OrderAdmin /></>);
    case "/users":
      return <UserList/>
      case "/products":
      return <UserList/>
    default:
      return <h2>404 - Page Not Found</h2>;
  }
}
const adminPaths = ["/dashboard", "/orders", "/reports","/users","/products"];
export default function DashboardLayoutBs(props) {
  const { window } = props;

  const router = useDemoRouter("/dashboard");
React.useEffect(() => {
if (adminPaths.some((path) => router.pathname.startsWith(path))) {
    document.body.style.background = "#f7f7f7"; 
    document.documentElement.style.background = "#f7f7f7";
  } else {
    document.body.style.background = '';
    document.documentElement.style.background = '';
  }
}, [router.pathname]);

  // Remove this const when copying and pasting into your project.
  const demoWindow = window ? window() : undefined;

  return (
    <AppProvider
      navigation={NAVIGATION}
      router={router}
      theme={demoTheme}
      window={demoWindow}
    >
      <DashboardLayout>
        <PageContainer>
          <RenderPage pathname={router.pathname} />
        </PageContainer>
      </DashboardLayout>
    </AppProvider>
  );
}
