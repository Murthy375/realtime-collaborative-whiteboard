import { BrowserRouter, Route, Routes } from "react-router";
import Layout from "./components/Layout";
import Whiteboard from "./pages/Whiteboard";
import "../src/App.css";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* routes that do not need Layout, like Login and Register page */}

        <Route>
          <Route element={<Layout />}>
            {/* routes that need Layout, like Home, Whiteboard, etc */}
            <Route path="/whiteboard/:id" element={<Whiteboard />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
