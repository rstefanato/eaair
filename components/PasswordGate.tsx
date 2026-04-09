"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

const COOKIE_NAME = "eaair_access";
const PASSWORD = "rafalindo";

function getCookie(name: string): string | null {
  const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
  return match ? match[2] : null;
}

function setCookie(name: string, value: string, days: number) {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${value}; expires=${expires}; path=/`;
}

export function PasswordGate({ children }: { children: React.ReactNode }) {
  const [authorized, setAuthorized] = useState(false);
  const [checking, setChecking] = useState(true);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    setAuthorized(getCookie(COOKIE_NAME) === "1");
    setChecking(false);
  }, []);

  const handleSubmit = () => {
    if (password === PASSWORD) {
      setCookie(COOKIE_NAME, "1", 7);
      setAuthorized(true);
    } else {
      setError("Senha incorreta");
      setPassword("");
    }
  };

  if (checking) return null;
  if (authorized) return <>{children}</>;

  return (
    <div className="flex min-h-screen items-center justify-center bg-dark px-5">
      <div className="w-full max-w-[340px]">
        <div className="mb-6 text-center">
          <div className="mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-white/10">
            <span className="font-heading text-sm font-bold text-white">EA</span>
          </div>
          <h1 className="font-heading text-lg font-semibold text-white/90">Acesso restrito</h1>
          <p className="mt-1 font-body text-xs text-white/40">Digite a senha para acessar o site</p>
        </div>
        <div className="space-y-3">
          <Input
            label=""
            type="password"
            placeholder="Senha"
            value={password}
            error={error}
            onChange={(e) => { setPassword(e.target.value); setError(""); }}
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            className="bg-white/5 border-white/10 text-white placeholder:text-white/25 focus:border-blue"
          />
          <Button variant="blue" onClick={handleSubmit}>
            Entrar
          </Button>
        </div>
      </div>
    </div>
  );
}
