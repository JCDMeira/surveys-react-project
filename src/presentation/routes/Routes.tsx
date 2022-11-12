import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Login } from '@/presentation/pages';
import '@/presentation/styles/global.scss';

const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<Login />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
