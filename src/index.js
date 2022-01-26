import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter,
        Route,
        Routes} from "react-router-dom";

import './index.css';

import MainPage from "./components/MainPage";
import NewsPage from "./components/NewsPage";
import NotFoundPage from "./components/NotFoundPage";

ReactDOM.render(
  <React.StrictMode>
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/article/:articleId" element={<NewsPage/>} />
              <Route path="/*" element={<NotFoundPage/>} />
          </Routes>
      </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
