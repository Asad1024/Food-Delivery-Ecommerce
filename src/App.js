import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home/Home";
import SignUp from "./pages/SignUp/SignUp";
import Cart from "./pages/Cart/Cart";
import SignIn from "./pages/SignIn/SignIn";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Profile from "./pages/Profile/Profile";
import Almaida from "./pages/Almaida";
import Muffins from "./pages/Muffins";
import Bryanihut from "./pages/Bryanihut";
import Khwaja from "./pages/Khwaja";
import Street from "./pages/Street";
import DataSweets from "./pages/DataSweets";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/sign-in",
    element: <SignIn />,
  },
  {
    path: "/sign-up",
    element: <SignUp />,
  },
  {
    path: "/cart",
    element: <Cart />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/almaida",
    element: <Almaida />,
  },
  {
    path: "/muffins",
    element: <Muffins />,
  },
  {
    path: "/bryanihut",
    element: <Bryanihut />,
  },
  {
    path: "khwajagn",
    element: <Khwaja />,
  },
  {
    path: "/14thstreet",
    element: <Street />,
  },
  {
    path: "/datasweets",
    element: <DataSweets />,
  },
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

export default App;
