import { createBrowserRouter } from "react-router-dom";
import Home from "../Pages/Home/Home";
import Note from "../Pages/Note/Note";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Home/>,
    },
    {
        path: "/note",
        element: <Note/>,
    }
]);