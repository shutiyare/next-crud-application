import { getServerSession } from "next-auth";
import Link from "next/link";
import Logout from "./logout";

export default async function Page() {
  // const session=await getServerSession();

  return (
    <>
    <p>welcome to home page</p>
    </>
  )
}
