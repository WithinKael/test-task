import React from "react";
import { NavLink, Route, Routes } from "react-router-dom";
import NotFoundPage from "../pages/NotFoundPage";
import MyAccount from "../pages/MyAccount";
import css from "../css/App.module.css";
import Team from "../pages/Team";

const App = () => {
  return (
    <div className={css.mainLayout}>
      <div className={css.mainLayoutWrapper}>
        <header>
          <h2 className={css.title}>Settings</h2>
        </header>
        <div className={css.contentWrapper}>
          <div className={css.navigationWrapper}>
            <nav className={css.navigation}>
              <NavLink className="navLink" to="/">
                My Account
              </NavLink>
              <NavLink className="navLink" to="/team">
                Team
              </NavLink>
            </nav>
          </div>
          <main>
            <Routes>
              <Route path="/" element={<MyAccount />} />
              <Route path="/team" element={<Team />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>
        </div>
      </div>
    </div>
  );
};

export default App;
