'use client'
import React from "react";
import { useState } from "react";
import { Space, Table, Avatar, Typography, Rate } from "antd";
import { useEffect } from "react";
import { getInventory } from '../../lib/data';
function Inventory() {
  return (
    <div className="customers">
      <Space direction="vertical">
        <Typography.Title level={3}>Recent Inventory</Typography.Title>

        <GetRecentUsers />
      </Space>
    </div>
  );
}
function GetRecentUsers() {
  const [dataSource, setDataSource] = useState([]);
  const [isLoading, setisLoading] = useState(false);

  useEffect(() => {
    setisLoading(true);
    getInventory()
      .then((result) => {
        setDataSource(result.products);
        setisLoading(false);
        console.log(dataSource);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <Space>
        <Table
          columns={[
            { title: "Number", dataIndex: "id" },
            {
              title: "thumbnail",
              dataIndex: "thumbnail",
              render: (me) => {
                return <Avatar src={me} />;
              },
            },
            { title: "Title", dataIndex: "title" },
            {
              title: "Price",
              dataIndex: "price",
              render: (value) => <span>${value}</span>,
            },
            {
              title: "Rating",
              dataIndex: "rating",
              render: (rating) => <Rate value={rating} allowHalf={true} />,
            },
            { title: "Stock", dataIndex: "stock" },
            { title: "Brand", dataIndex: "brand" },
            { title: "Category", dataIndex: "category" },
          ]}
          loading={isLoading}
          dataSource={dataSource}
          pagination={{ pageSize: 5 }}
        ></Table>
      </Space>
    </>
  );
}

export default Inventory;