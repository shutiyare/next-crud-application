'use client'
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { getOrders, getInventory, getUsers } from '../../app/lib/data';
import { Space, Table, Typography, Card, Statistic, Avatar, Flex, Row, Col } from "antd";
import {
  ShoppingCartOutlined,
  ShoppingOutlined,
  UserOutlined,
  MoneyCollectOutlined,
} from "@ant-design/icons";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import styles from './dashboard.module.css'
import ProfileMenu from "./components/profile";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function Dashboard() {
  const [revenue, setrevenue] = useState(0);
  const [orders, setorders] = useState(0);
  const [inventory, setinventory] = useState(0);
  const [customers, setcustomers] = useState(0);
  useEffect(() => {
    getOrders().then((res) => {
      setorders(res.total);
      setrevenue(res.discountedTotal);
    });

    getUsers().then((res) => {
      setcustomers(res.total);
    });

    getInventory().then((res) => {
      setinventory(res.total);
    });
  }, []);

  return (
    <div >
      <div  className={styles.statistics}>
      <Row gutter={16}>
        <div>

          <Dashboardcard
            icon={
              <ShoppingCartOutlined
                style={{
                  backgroundColor: "cyan",
                  color: "black",
                  padding: 8,
                  fontSize: 26,
                  borderRadius: 25,
                }}
              />
            }
            title="Orders"
            value={orders}
          />
        </div>

        <div>

          <Dashboardcard
            icon={
              <MoneyCollectOutlined
                style={{
                  backgroundColor: "#7FFFD4",
                  color: "black",
                  padding: 8,
                  fontSize: 26,
                  borderRadius: 25,
                }}
              />
            }
            title="Revenue"
            value={revenue}
            
            // num="$"

          />
        </div>
        <div>

          <Dashboardcard
            icon={
              <ShoppingOutlined
                style={{
                  backgroundColor: "cyan",
                  color: "black",
                  padding: 8,
                  fontSize: 26,
                  borderRadius: 25,
                }}
              />
            }
            title="Inventory"
            value={inventory}
          />
        </div>
        <div>

          <Dashboardcard
            icon={
              <UserOutlined
                style={{
                  backgroundColor: "#7FFFD4",
                  color: "black",
                  padding: 8,
                  fontSize: 26,
                  borderRadius: 25,
                }}
              />
            }
            title="Customers"
            value={customers}
          />
        </div>
        </Row>
      </div>
      <Typography.Title level={5}>Recent Orders</Typography.Title>
      <div className={styles.table}>
        <div className={styles.left}>
          <GetRecentUsers />
        </div>
        <div className={styles.left}>
          <GetRecentUsers />
        </div>

      </div>
      <br />
    </div>
  );
}

interface MyComponentProps {
  title: React.ReactNode,
  value:  number 
  icon: React.ReactNode,
  num?:string
}

const Dashboardcard: React.FC<MyComponentProps> = ({ icon, title, value,num }) => {
  return (
    
    <Col span={14}>
      <Card bordered={false}>
        <Space direction="horizontal">
    {icon}
        <Statistic
          title={title}
          value={value}
          precision={2}
          valueStyle={{ color: '#3f8600' }}
          prefix={num }
        />
        </Space>
      </Card>
    </Col>
    // <Card >
    //   <Space direction="horizontal">
    //     {icon}
    //     <Statistic title={title} value={value}  prefix={num}/>
    //   </Space>
    // </Card>
  );
}
function GetRecentUsers() {
  const [dataSource, setDataSource] = useState([]);
  const [isLoading, setisLoading] = useState(false);

  useEffect(() => {
    setisLoading(true);
    getOrders()
      .then((result) => {
        setDataSource(result.products.splice(0, 5));
        setisLoading(false);
        console.log(dataSource);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
        <Table size="large"bordered
          columns={[
            { title: "Number", dataIndex: "id" },
            {
              title: "Price",
              dataIndex: "price",
              render: (price) => <span>${price}</span>,
            },
            {
              title: "discountedPrice",
              dataIndex: "discountedPrice",
              render: (discount) => <span>${discount}</span>,
            },
            { title: "Quantity", dataIndex: "quantity" },
            { title: "Total", dataIndex: "total" },
          ]}
          loading={isLoading}
          dataSource={dataSource}
          pagination={false}
        ></Table>
    </>
  );
}
function DahboardChart() {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
      title: {
        display: true,
        text: "orders Revenue",
      },
    },
  };
  const labels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
  ];

  const data = {
    labels,
    datasets: [
      {
        label: "Dataset 1",
        data: labels.map(() => Math.random() * 1000),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Dataset 2",
        data: labels.map(() => Math.random() * 1000),
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };
  // return <Bar options={options} data={data} />;
}
export default Dashboard;