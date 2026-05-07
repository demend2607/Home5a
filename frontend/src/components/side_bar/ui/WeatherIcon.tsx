import { useEffect, useState } from "react";

const iconModules = import.meta.glob("../icons/*.svg", { eager: false, as: "url" });

interface WeatherIconProps {
  iconKey: string;
  width?: number;
  height?: number;
  fallbackIcon?: string; // опциональный путь к иконке-заглушке
}

function isNightTime(): boolean {
  const hours = new Date().getHours();
  return hours >= 20 || hours < 6;
}

export default function WeatherIcon({ iconKey, width = 180, height = 180, fallbackIcon = "/icons/sunny.svg" }: WeatherIconProps) {
  const [url, setUrl] = useState<string | null>(null);

  useEffect(() => {
    const loadIcon = async () => {
      const night = isNightTime();
      let finalKey = iconKey;
      if (night && !iconKey.endsWith("-night")) {
        finalKey = `${iconKey}-night`;
      }

      const expectedPath = `../icons/${finalKey}.svg`;
      const importer = iconModules[expectedPath];

      if (!importer) {
        if (night && !iconKey.endsWith("-night")) {
          const dayPath = `../icons/${iconKey}.svg`;
          const dayImporter = iconModules[dayPath];
          if (dayImporter) {
            const dayUrl = await dayImporter();
            setUrl(dayUrl);
            return;
          }
        }
        setUrl(fallbackIcon);
        return;
      }

      try {
        const loadedUrl = await importer();
        setUrl(loadedUrl);
      } catch (err) {
        console.error(`Failed to load icon ${finalKey}:`, err);
        if (night && !iconKey.endsWith("-night")) {
          const dayPath = `../icons/${iconKey}.svg`;
          const dayImporter = iconModules[dayPath];
          if (dayImporter) {
            try {
              const dayUrl = await dayImporter();
              setUrl(dayUrl);
              return;
            } catch {}
          }
        }
        setUrl(fallbackIcon);
      }
    };

    loadIcon();
  }, [iconKey]);

  if (!url) return <div style={{ width, height }} />;

  return <img src={url} alt={iconKey} width={width} height={height} className="weather_icon" />;
}
