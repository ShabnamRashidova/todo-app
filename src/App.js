import React from "react";
import Actions from "./components/Actions.js";
import Footer from "./components/Footer/index.js";
import Header from "./components/Header";
import TodoList from "./components/TodoList.js";
import './App.css'
const App = () => {
  return (
    <>
      <section className="todoapp">
        <Header />
        <section className="main">
          <TodoList />
          <Actions />
        </section>
      </section>
      <Footer />
    </>
  );
};

export default App;
