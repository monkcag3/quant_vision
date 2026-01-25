import { CssVarsProvider } from "@mui/joy/styles";
import { CssBaseline } from "@mui/joy";
import { Outlet } from "react-router-dom"
import "./scoped.scss"

import Sidebar from "./sidebar";
import StyledLayout from "./styles";


const MainLayout: React.FC = () => {
  return (
    <CssVarsProvider disableTransitionOnChange>
      <CssBaseline />
        <StyledLayout>
          <Sidebar />
          <Outlet />
        </StyledLayout>
    </CssVarsProvider>
  )
}

export default MainLayout;