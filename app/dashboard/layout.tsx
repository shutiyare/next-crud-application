"use client"
import React, { Suspense, useState } from 'react';
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Avatar, Breadcrumb, Flex, Layout, Menu, Typography, theme,Affix } from 'antd';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import styles from './dashboard.module.css'
import Link from 'next/link';
import Image from 'next/image';
import ProfileMenu from './components/profile';
import App from './loading';


const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}



export default  function layout({children}:{children:React.ReactNode}) {
  const router = useRouter();
  const pathname=usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [isShown, setisShown] = useState(false);
  const handleToggle = () => {
    // Update the state to the inverse of its current value
    // isShown((prevIsToggled:boolean) => !prevIsToggled);
  };
  const items=[
    {
      label: "Dashboard",
      key: "/dashboard",
      icon: <DesktopOutlined />,
    },
    {
      label: "Inventory",
      key: "/dashboard/inventory",
      icon: <PieChartOutlined />,
    },
    {
      label: "Products",
      key: "/dashboard/products",
      icon: <TeamOutlined />,
    },
    {
      label: "Customers",
      key: "/dashboard/customers",
      icon: <UserOutlined />,
    },
    {
      label: "Students",
      key: "/dashboard/students",
      icon: <UserOutlined />,
    },
  ]

  const {
    token: { colorBgContainer,colorBgBase,colorFillSecondary, },
  } = theme.useToken();

  return (
  <>
  
  <Layout style={{ minHeight: '100vh' }} >
      <Sider collapsible collapsed={collapsed} color={colorBgContainer} 
      onCollapse={(value) => setCollapsed(value)} className={styles.sider}>
        <div className="demo-logo-vertical" />
        {/* <Image src='' width={200} height={200} alt='image'/> */}
        <Affix offsetTop={10}>

        <Menu theme="dark" defaultSelectedKeys={['1']}
        //  mode="vertical" items={items}
        //   onClick={(item)=> {router.push(`${item.key}`)}}
          >
            {items.map(item=>(
              <Menu.Item key={item.label} icon={item.icon}>
                <Link href={item.key}>{item.label}</Link>
              </Menu.Item>
            ))}
          </Menu>
        </Affix>

      </Sider>
      <Layout>

        <Affix offsetTop={1}>
          
        <Header  style={{ padding: '0 10px', background: colorBgBase ,marginLeft:" 10px" ,marginRight:"10px" }}
        
       >
        <Flex justify='space-between' align='flex-end'>
          <div>
            <Typography.Title level={3} color='red'>Sample Dashboard project</Typography.Title>
          </div>
          <div>
            <ProfileMenu /> 
          </div>
        </Flex>
       </Header>
       </Affix>

       
        <Content style={{ marginTop: '10px',marginLeft:'10px',marginBottom:'0px' }}>
          
          <div style={{ padding: 24, minHeight: '80vh', background: colorBgContainer }}>
            
      <Typography.Title level={3} className={styles.pathname} color='blue'>
      {pathname.split('/').pop()}

      </Typography.Title>
      <Suspense fallback={<App />}>

            {children}
      </Suspense>

          </div>
        </Content>
        <Footer style={{ textAlign: 'center' ,fontSize:'1rem'}}>Sample Dashboard project</Footer>
      </Layout>
    </Layout>

  </>
  )
}
