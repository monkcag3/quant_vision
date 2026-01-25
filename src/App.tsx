
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom"

import MainLayout from "./pages/layout"
import HomeView from "./pages/home"

const routes = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/*" element={<MainLayout />}>
      <Route index element={<HomeView />} />
    </Route>
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
