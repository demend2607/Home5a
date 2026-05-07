import { cn } from "../../../shared/lib/utils";

import "./infoPanel.css";

export default function InfoPanel({ className, children, duration = 16 }: { className?: string; children?: React.ReactNode; duration?: number }) {
  return (
    <div className={cn("info_panel", className)} style={{ "--marquee-duration": `${duration}s` } as React.CSSProperties}>
      <div className="marquee">{children}</div>
    </div>
  );
}
