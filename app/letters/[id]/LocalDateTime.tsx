"use client";

import { useEffect, useState } from "react";

export default function LocalDateTime({
  value,
}: {
  value: string;
}) {
  const [formatted, setFormatted] = useState("");

  useEffect(() => {
    setFormatted(
      new Date(value).toLocaleString(undefined, {
        dateStyle: "medium",
        timeStyle: "short",
      })
    );
  }, [value]);

  return <>{formatted || "Loading date..."}</>;
}
