import { Outlet } from "react-router-dom";
import Nav from "./nav/Nav";

export default function NavLayout() {
  return (
    //added the 1px padding top to prevent margin collapse
    <div style={{paddingTop: '1px'}}>
        <Nav/>
        <Outlet/>
    </div>
  )
}