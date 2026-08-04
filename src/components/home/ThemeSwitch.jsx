"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Button } from "@heroui/react";
import {Sun,Moon} from '@gravity-ui/icons';

export default function ThemeSwitch() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // avoid theme mismatch flash on first paint (server doesn't know the client's theme yet)
  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <div className="h-8 w-8" />;
  }

  const isDark = theme === "dark";

  return (
    <Button
      isIconOnly
      variant="light"
      radius="full"
      size="sm"
      aria-label="Toggle theme"
      onPress={() => setTheme(isDark ? "light" : "dark")}
    >
      {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </Button>
  );
}