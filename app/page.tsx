"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Loading from "@/app/loading";

function getCurrentDate() {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1; // 月は0から始まるため+1する
  const day = now.getDate();
  return { year, month, day };
}

export default function Home() {
  const router = useRouter();
  const { year, month, day } = getCurrentDate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    router.push(`/calender/day/${year}/${month}/${day}`);
    setIsLoading(false);
  }, [router, year, month, day]);

  if (isLoading) {
    return <Loading />;
  }

  return <div></div>;
}
