import { Route, Routes } from "react-router-dom";

import Home from "./components/pages/Home";
import Layout from "./components/layout/Layout";
import Notice from "./components/pages/Notice";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/notice" element={<Notice />} />
      </Routes>
    </Layout>
  );
}

export default App;
