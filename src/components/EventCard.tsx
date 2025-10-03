import React from "react";

export interface EventItem {
  id: string;
  title: string;
  url: string;
  organization?: string; // preferred field name
  provider?: string; // fallback field name in case JSON uses provider
  type?: string;
  date: string; // ISO date string, e.g. 2025-10-03
  timeFrom?: string; // HH:mm or H:mm
  timeTo?: string; // HH:mm or H:mm
  color?: "blue" | "pink" | "white" | "purple" | "magenta" | "cyan" | "green";
}

interface EventCardProps {
  event: EventItem;
}

function formatTime12h(time?: string): string | null {
  if (!time) return null;
  // Accept formats like HH:mm or H:mm
  const match = time.match(/^(\d{1,2}):(\d{2})$/);
  if (!match) return time; // return as-is if unknown format
  const hours = parseInt(match[1], 10);
  const minutes = match[2];
  const period = hours >= 12 ? "PM" : "AM";
  const hour12 = ((hours + 11) % 12) + 1; // 0->12, 13->1 etc
  return `${hour12}:${minutes} ${period}`;
}

function getMonthAbbrev(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleString(undefined, { month: "short" });
}

function getDayNumber(dateStr: string): string {
  const d = new Date(dateStr);
  return String(d.getDate());
}

export function EventCard({ event }: EventCardProps) {
  const { title, url, date, timeFrom, timeTo } = event;

  const color = event.color ?? "cyan";
  const colors: Record<NonNullable<EventItem["color"]>, string> = {
    blue: "#5BCEFA",
    pink: "#F5A9B8",
    white: "#FFFFFF",
    purple: "#BB86FC",
    magenta: "#FF006E",
    cyan: "#00F5FF",
    green: "#39FF14",
  };

  const glowRgba: Record<NonNullable<EventItem["color"]>, string> = {
    blue: "91, 206, 250",
    pink: "245, 169, 184",
    white: "255, 255, 255",
    purple: "187, 134, 252",
    magenta: "255, 0, 110",
    cyan: "0, 245, 255",
    green: "57, 255, 20",
  };

  const month = getMonthAbbrev(date);
  const day = getDayNumber(date);

  const from12h = formatTime12h(timeFrom || undefined);
  const to12h = formatTime12h(timeTo || undefined);
  const timeLabel = from12h && to12h ? `${from12h} - ${to12h}` : from12h || to12h || "";

  return (
    <a
      href={url}
      className="relative block p-4 border-4 transition-all duration-200 hover:scale-105 min-h-[180px]"
      style={{
        borderColor: colors[color],
        boxShadow: `4px 4px 0 0 ${colors[color]}, 0 0 20px rgba(${glowRgba[color]}, 0.35)`,
        imageRendering: "pixelated",
        backgroundColor: "rgba(42, 45, 58, 0.6)",
        backdropFilter: "blur(10px)",
      }}
    >
      {/* Date badge - top-left */}
      <div
        className="absolute top-3 left-3 flex flex-col items-center justify-center px-2 py-1 border-2"
        style={{
          borderColor: colors[color],
          backgroundColor: "rgba(26, 29, 42, 0.85)",
        }}
      >
        <div
          style={{
            fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
            fontSize: "1.75rem",
            lineHeight: 1,
            color: colors[color],
          }}
        >
          {day}
        </div>
        <div
          style={{
            fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
            fontSize: "0.75rem",
            letterSpacing: "0.08em",
            color: colors[color],
            opacity: 0.9,
          }}
        >
          {month.toUpperCase()}
        </div>
      </div>

      {/* Content area */}
      <div className="pl-24 pr-2 flex flex-col h-full">
        <h3
          className="mb-2"
          style={{
            fontFamily: "'Orbitron', monospace",
            fontSize: "1.25rem",
            letterSpacing: "0.06em",
            color: "#FFFFFF",
            textShadow: "0 0 12px rgba(187, 134, 252, 0.6)",
          }}
        >
          {title}
        </h3>
        {timeLabel && (
          <div
            className="text-sm mb-2"
            style={{ fontFamily: "'JetBrains Mono', monospace", color: "#BB86FC" }}
          >
            {timeLabel}
          </div>
        )}
        {/* Organization label if present */}
        {(event.organization || event.provider) && (
          <div
            className="mt-auto text-xs opacity-80"
            style={{ fontFamily: "'JetBrains Mono', monospace", color: "#5BCEFA" }}
          >
            {(event.organization || event.provider) as string}
          </div>
        )}
      </div>
    </a>
  );
}
