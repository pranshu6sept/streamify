import React, { lazy, Suspense } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";

const Dashboard = lazy(() => import("./components/Dashboard"));

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Suspense fallback={<div>Loading...</div>}>
        <Dashboard className="flex-grow" />
      </Suspense>
      <Footer />
    </div>
  );
}

export default App;
