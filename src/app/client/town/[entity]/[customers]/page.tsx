"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";

interface CustomerProps {
  params: {
    entity: string;
    customers: string;
  };
}

interface CustomerData {
  customer_name: string;
  phone_no: string;
  _id: string;
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
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

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const Customer = ({ params }: CustomerProps) => {
  const { entity, customers } = params;
  const [value, setValue] = useState(0);

  const [customersData, setCustomersData] = useState<CustomerData[]>([]);
  const [verifyCustomers, setVerifyCustomers] = useState<CustomerData[]>([]);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  useEffect(() => {
    const fetchCustomerData = async () => {
      try {
        const { data } = await axios.get(
          `/api/town/${decodeURI(entity)}/${decodeURI(customers)}`
        );
        setCustomersData(data.customers);
      } catch (error) {
        console.error("Error fetching customer data:", error);
      }
    };
    fetchCustomerData();
  }, [entity, customers]);

  useEffect(() => {
    const fetchVerifyCustomer = async () => {
      try {
        const { data } = await axios.get(
          `/api/town/${decodeURI(entity)}/verify/${decodeURI(customers)}`
        );
        setVerifyCustomers(data.customers);
      } catch (error: any) {
        console.log(error?.response?.data?.message);
      }
    };
    fetchVerifyCustomer();
  }, [entity]);

  return (
    <>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
            variant="fullWidth"
            indicatorColor="secondary"
          >
            <Tab label="Pending" {...a11yProps(0)} />
            <Tab label="Completed" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          {customersData &&
            customersData.map((customer, index) => (
              <Card
                key={index}
                sx={{
                  mb: 3,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <CardContent>
                  <Typography variant="subtitle1" component="div">
                    {customer.customer_name}
                  </Typography>
                  <Typography sx={{ fontSize: 14 }}>
                    {customer.phone_no}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Link href={`/audit/${customer._id}`}>
                    <Button size="small" variant="contained">
                      <EditOutlinedIcon />
                    </Button>
                  </Link>
                </CardActions>
              </Card>
            ))}
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          {verifyCustomers &&
            verifyCustomers.map((customer, index) => (
              <Card
                key={index}
                sx={{
                  mb: 3,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <CardContent>
                  <Typography variant="subtitle1" component="div">
                    {customer.customer_name}
                  </Typography>
                  <Typography sx={{ fontSize: 14 }}>
                    {customer.phone_no}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Link href={`/audit/verify/${customer._id}`}>
                    <Button size="small" variant="contained">
                      <RemoveRedEyeIcon />
                    </Button>
                  </Link>
                </CardActions>
              </Card>
            ))}
        </CustomTabPanel>
      </Box>
    </>
  );
};

export default Customer;
