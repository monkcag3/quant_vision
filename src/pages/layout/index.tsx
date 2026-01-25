
import { Outlet } from "react-router-dom"
import "./scoped.scss"

const MainLayout: React.FC = () => {
  return (
    <>
      <div className="root">
        <div className="main-content">
          <Outlet />
        </div>
      </div>
    </>
  )
}

export default MainLayout;