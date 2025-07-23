"use client";

import { redirect } from "next/navigation";
import React, { useEffect, useState } from "react";

function Home() {
  const [token, setToken] = useState<string | null>(null);
  useEffect(() => {
    const getToken = localStorage.getItem("authToken");
    setToken(getToken);
  }, [token]);
  if (!token) {
    redirect("/dashboard");
  }
  return <div>Home</div>;
}

export default Home;
