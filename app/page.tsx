import { getServerSession } from "next-auth";
import Link from "next/link";
import Logout from "./logout";
import { Button } from "antd";

export default async function Page() {
  // const session=await getServerSession();

  return (
    <>
    <p>welcome to home page</p>
    {/* <Button type="primary"> */}
    {/* client */}
    {/* <link href="/client"> */}
      <a href="/dashboard">Dashboard</a>
    {/* </link> */}
    {/* </Button> */}
    </>
  )
}
