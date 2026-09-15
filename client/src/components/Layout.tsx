import { Outlet } from "react-router";



const Layout = () => {
  return <>
  {/* nav comes here */}
  <Outlet/>
  {/* footer comes here */}
  </>;
};

export default Layout;
