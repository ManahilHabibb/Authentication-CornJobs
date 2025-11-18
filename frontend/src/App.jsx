import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Nav from "./components/Nav";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import { SignedIn, SignedOut, SignInButton } from "@clerk/clerk-react";

export default function App() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/dashboard"
          element={
            <SignedIn>
              <Dashboard />
            </SignedIn>
          }
        />
        <Route
          path="/signin"
          element={
            <SignedOut>
              <div className="p-8 max-w-xl mx-auto text-center mt-24">
                <h2 className="text-2xl font-bold mb-4">Sign in</h2>
                <SignInButton mode="modal">
                  <button className="px-4 py-2 rounded bg-indigo-600 text-white">Sign in</button>
                </SignInButton>
              </div>
            </SignedOut>
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}
