import { Card ,Space,Statistic} from "antd";
import React from "react";

interface MyComponentProps {
    title: React.ReactNode,
    value: number,
    icon: React.ReactNode,
    num?:string
    
  }

const Dashboardcard:React.FC<MyComponentProps> =({icon,title,value,})=> {
    return (
      <Card>
        <Space direction="horizontal">
          {icon}
          <Statistic title={title} value={value} />
        </Space>
      </Card>
    );
  }
  export default Dashboardcard;