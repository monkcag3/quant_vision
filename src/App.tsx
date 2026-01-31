
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom"

import MainLayout from "./pages/layout"
import HomeView from "./pages/home"
import OrderList from "./pages/screener"
import StrategyList from "./pages/strategy"
import MinLayout from "./pages/min_layout"

const routes = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/*" element={<MainLayout />}>
        <Route index element={<OrderList />} />
        <Route path="strategies" element={<StrategyList />}/>
      </Route>
      <Route path="symbol/:symbol" element={<MinLayout />}>
        <Route index element={<HomeView />}/>
      </Route>
    </>
  )
)


function App() {
  return (
    <>
      <RouterProvider router={routes} />
    </>
  )
}

export default App
