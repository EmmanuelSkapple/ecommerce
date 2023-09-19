import React from "react";
import { Route, Routes, Navigate, BrowserRouter } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useState, useEffect } from 'react';
import { app } from "../utils/firebase";
import Login from "../screens/login/login";
import Productos from "../screens/products";

const PrivateWrapper = ({
  children,
  isAuthenticated,
}: any) => {
  if (
    (isAuthenticated)
  ) {
    return children;
  } else {
    return <Navigate to="/" replace />;
  }
};

const PublicWrapper = ({ children, isAuthenticated }:any) => {
  return !isAuthenticated ? children : <Navigate to="/panel/products" replace />;
};


const AppRouter = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const inicializeFirebase = app;

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {      
      setIsAuthenticated(!!user?.uid);
    });
    return () => unsubscribe();
  }, []);


  return (
    <BrowserRouter>
      <>
        <Routes>
          <Route
            path="/"
            element={
              <PublicWrapper isAuthenticated={isAuthenticated}>
                <Login />
              </PublicWrapper>
            }
          />
          <Route
            path="/panel/products"
            element={
              <PrivateWrapper
                isAuthenticated={isAuthenticated}
              >
                <Productos/>
              </PrivateWrapper>
            }
          />
        </Routes>
      </>
    </BrowserRouter>
  );
};

export default AppRouter;
