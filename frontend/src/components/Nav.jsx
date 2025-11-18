import React from "react";
import { NavLink } from "react-router-dom";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";

export default function Nav() {
  return (
    <nav className="bg-white border-b sticky top-0 z-20">
      <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <NavLink to="/" className="font-bold text-indigo-600 text-lg">Social</NavLink>
          <NavLink to="/dashboard" className="text-gray-600">Dashboard</NavLink>
        </div>

        <div>
          <SignedIn>
            <div className="flex items-center gap-3">
              <UserButton afterSignOutUrl="/" />
            </div>
          </SignedIn>

          <SignedOut>
            <SignInButton>
              <button className="px-3 py-2 rounded bg-indigo-600 text-white">Sign in</button>
            </SignInButton>
          </SignedOut>
        </div>
      </div>
    </nav>
  );
}
