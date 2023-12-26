import React from 'react';
import { Menu, Dropdown, Avatar, Space, Card, Popover, Flex } from 'antd';
import { DownOutlined, UserOutlined, SettingOutlined, LogoutOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const ProfileMenu = () => {
  const router=useRouter();
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
      // key: "#",
      icon: <LogoutOutlined />,
      onclick:async () =>{
        await signOut({redirect:false});
        router.replace('/login');
      }
    },
    ]
  const menu = (

    <Menu >
    {items.map(item=>(
              <Menu.Item key={item.label} icon={item.icon} onClick={item.onclick}>
                {item.key? <Link href={item.key}>{item.label}</Link> : item.label}
                
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
const {data:session,status} = useSession();
  return (
    <Popover content={menu} trigger='click' color='#fff' title='Profile Details'>
       <Flex justify='space-between' align='center'>

        <Avatar icon={<UserOutlined />}  /> 
        {session?.user?.email}
       </Flex>
    </Popover>
  );
};

export default ProfileMenu;
