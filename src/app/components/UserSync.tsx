"use client";

import { useEffect } from "react";
import { syncUser } from "@/lib/actions";

export default function UserSync() {
  useEffect(() => {
    syncUser();
  }, []);

  return null;
}
