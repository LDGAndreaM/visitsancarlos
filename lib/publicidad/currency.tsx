"use client";

import { createContext, useContext, useEffect, useState } from "react";

// Respaldo si no se puede consultar el tipo de cambio en vivo (se
// sobrescribe casi de inmediato en cuanto la petición responde).
const FALLBACK_RATE = 18.5;

type Currency = "MXN" | "USD";

type CurrencyContextValue = {
  currency: Currency;
  setCurrency: (c: Currency) => void;
  rate: number;
  format: (mxn: number) => string;
};

const CurrencyContext = createContext<CurrencyContextValue | null>(null);

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrency] = useState<Currency>("MXN");
  const [rate, setRate] = useState(FALLBACK_RATE);

  useEffect(() => {
    let cancelled = false;
    fetch("https://open.er-api.com/v6/latest/USD")
      .then((res) => res.json())
      .then((data) => {
        const mxn = data?.rates?.MXN;
        if (!cancelled && typeof mxn === "number" && mxn > 0) setRate(mxn);
      })
      .catch(() => {
        // Sin conexión al servicio de tipo de cambio: se sigue usando el respaldo.
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const format = (mxn: number) => {
    if (currency === "USD") {
      return `$${Math.round(mxn / rate).toLocaleString("en-US")}`;
    }
    return `$${mxn.toLocaleString("es-MX")}`;
  };

  return <CurrencyContext.Provider value={{ currency, setCurrency, rate, format }}>{children}</CurrencyContext.Provider>;
}

export function useCurrency(): CurrencyContextValue {
  const ctx = useContext(CurrencyContext);
  if (!ctx) throw new Error("useCurrency debe usarse dentro de <CurrencyProvider>");
  return ctx;
}
