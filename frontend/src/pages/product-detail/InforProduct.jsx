import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import React from "react";
import InforProductTable from "./InfortableProduct";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}
CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
export default function InforProduct({ inforProduct }) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Thông tin" {...a11yProps(0)} />
          <Tab label="Mô tả" {...a11yProps(1)} />
          <Tab label="Chế biến" {...a11yProps(2)} />
          <Tab label="Lưu ý" {...a11yProps(3)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <InforProductTable inforProduct={inforProduct} />

        <Box
          component={"div"}
          dangerouslySetInnerHTML={{
            __html: `
          ${
            inforProduct?.description_infoProduct || "No description available."
          }
        `,
          }}
        />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <Box
          component={"div"}
          dangerouslySetInnerHTML={{
            __html: `
          ${
            inforProduct?.description_infoProduct || "No description available."
          }
        `,
          }}
        />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        {inforProduct?.prepare || "Chưa có thông tin chế biến"}
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        {inforProduct?.note || "Chưa có lưu ý"}
      </CustomTabPanel>
    </Box>
  );
}
