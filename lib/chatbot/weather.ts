// San Carlos, Sonora (frente a la bahía).
const LAT = 27.9613;
const LON = -111.062;

const WEATHER_LABELS: Record<number, string> = {
  0: "cielo despejado",
  1: "mayormente despejado",
  2: "parcialmente nublado",
  3: "nublado",
  45: "neblina",
  48: "neblina con escarcha",
  51: "llovizna ligera",
  53: "llovizna",
  55: "llovizna intensa",
  61: "lluvia ligera",
  63: "lluvia",
  65: "lluvia intensa",
  71: "nieve ligera",
  80: "chubascos ligeros",
  81: "chubascos",
  82: "chubascos intensos",
  95: "tormenta eléctrica",
  96: "tormenta con granizo",
  99: "tormenta con granizo intenso",
};

function describeCode(code: number): string {
  return WEATHER_LABELS[code] ?? "condiciones variables";
}

export async function fetchWeatherSummary(): Promise<string> {
  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${LAT}&longitude=${LON}&current=temperature_2m,weather_code&daily=temperature_2m_max,temperature_2m_min&timezone=America/Hermosillo`;
    const res = await fetch(url);
    if (!res.ok) throw new Error("weather request failed");
    const data = await res.json();

    const temp = Math.round(data.current?.temperature_2m);
    const code = data.current?.weather_code;
    const max = Math.round(data.daily?.temperature_2m_max?.[0]);
    const min = Math.round(data.daily?.temperature_2m_min?.[0]);

    if (Number.isNaN(temp)) throw new Error("respuesta inesperada");

    const desc = describeCode(code);
    let text = `Ahora mismo en San Carlos hay ${temp}°C con ${desc}.`;
    if (!Number.isNaN(max) && !Number.isNaN(min)) {
      text += ` Hoy se espera una máxima de ${max}°C y mínima de ${min}°C.`;
    }
    return text;
  } catch {
    return "No pude consultar el clima en este momento. Puedes ver el pronóstico y la tabla de mareas completa en la sección Clima y mareas de la página de inicio.";
  }
}
