import React from "react";

export interface EventItem {
  id: string;
  title: string;
  url: string;
  organization?: string;
  provider?: string;
  type?: string;
  date: string; // ISO date string
  timeFrom?: string; // HH:mm or H:mm
  timeTo?: string; // HH:mm or H:mm
  color?: "blue" | "pink" | "white" | "purple" | "magenta" | "cyan" | "green";
}

interface EventCardProps {
  event: EventItem;
}

function formatTime12h(time?: string): string | null {
  if (!time) return null;
  const match = time.match(/^(\d{1,2}):(\d{2})$/);
  if (!match) return time; // return as-is if unknown format
  const hours = parseInt(match[1], 10);
  const minutes = match[2];
  const period = hours >= 12 ? "PM" : "AM";
  const hour12 = ((hours + 11) % 12) + 1;
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
      // Use inline styles for layout to avoid relying on missing utilities
      style={{
        position: "relative",
        display: "block",
        padding: "1rem",
        borderWidth: 4,
        borderStyle: "solid",
        borderColor: colors[color],
        boxShadow: `4px 4px 0 0 ${colors[color]}, 0 0 20px rgba(${glowRgba[color]}, 0.35)`,
        imageRendering: "pixelated",
        backgroundColor: "rgba(42, 45, 58, 0.6)",
        backdropFilter: "blur(10px)",
        minHeight: 180,
        transition: "transform 200ms ease-in-out",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLAnchorElement).style.transform = "scale(1.03)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLAnchorElement).style.transform = "scale(1)";
      }}
    >
      {/* Date badge */}
      <div
        style={{
          position: "absolute",
          top: 12,
          left: 12,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "4px 6px",
          borderWidth: 2,
          borderStyle: "solid",
          borderColor: colors[color],
          backgroundColor: "rgba(26, 29, 42, 0.85)",
        }}
      >
        <div
          style={{
            fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
            fontSize: "1.5rem",
            lineHeight: 1,
            color: colors[color],
          }}
        >
          {day}
        </div>
        <div
          style={{
            fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
            fontSize: "0.7rem",
            letterSpacing: "0.08em",
            color: colors[color],
            opacity: 0.9,
          }}
        >
          {month.toUpperCase()}
        </div>
      </div>

      {/* Content area */}
      <div
        style={{
          paddingLeft: 96, // space for date badge
          paddingRight: 8,
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        <h3
          style={{
            margin: 0,
            marginBottom: 8,
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
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              color: "#BB86FC",
              fontSize: "0.9rem",
              marginBottom: 8,
            }}
          >
            {timeLabel}
          </div>
        )}
        {(event.organization || event.provider) && (
          <div
            style={{
              marginTop: "auto",
              fontFamily: "'JetBrains Mono', monospace",
              color: "#5BCEFA",
              fontSize: "0.8rem",
              opacity: 0.8,
            }}
          >
            {(event.organization || event.provider) as string}
          </div>
        )}
      </div>
    </a>
  );
}
