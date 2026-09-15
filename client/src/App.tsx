import { BrowserRouter, Route, Routes } from "react-router";
import Layout from "./components/Layout";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>

        {/* routes that do not need Layout, like Login and Register page */}

        {/* routes that share Laout */}
        <Route>
          <Route element={<Layout />}></Route>
        </Route>

      </Routes>
    </BrowserRouter>
  );
};

export default App;
