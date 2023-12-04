import { getServerSession } from "next-auth";
import Link from "next/link";
import Logout from "./logout";

export default async function Page() {
  // const session=await getServerSession();

  return <>
  <h1>Welcome to home page</h1>

  </>
}
