import React from 'react';
import { Menu, Dropdown, Avatar, Space, Card, Popover } from 'antd';
import { DownOutlined, UserOutlined, SettingOutlined, LogoutOutlined } from '@ant-design/icons';
import Link from 'next/link';

const ProfileMenu = () => {
    const items=[
    {
      label: "Profile",
      key: "/dashboard",
      icon: <UserOutlined />,
    },
    {
      label: "settings",
      key: "/dashboard/inventory",
      icon: <SettingOutlined />,
    },
    {
      label: "Logout",
      key: "/dashboard/products",
      icon: <LogoutOutlined />,
    },
    ]
  const menu = (

    <Menu >
    {items.map(item=>(
              <Menu.Item key={item.label} icon={item.icon}>
                <Link href={item.key}>{item.label}</Link>
              </Menu.Item>
            ))}
      {/* <Menu.Item key="profile" style={{display:'flex'}}>
        
        <UserOutlined />
        Profile
      </Menu.Item>
      <Menu.Item key="/inventory">
        <SettingOutlined />
        inventory
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="logout">
        <LogoutOutlined />
        Logout
      </Menu.Item> */}
    </Menu>
    


  );
  const link='https://img.freepik.com/premium-photo/boss-man-looking-camera-smiling-young-businessman-banker-with-beard-photo-with-close-up-portrait_321831-5908.jpg'

  return (
    <Popover content={menu} trigger='click' color='#fff' title='Profile Details'>
        <Avatar icon={<UserOutlined />}  src={link} /> 
    </Popover>
  );
};

export default ProfileMenu;
