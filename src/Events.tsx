import { useEffect, useMemo, useState } from "react";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { EventCard, EventItem } from "./components/EventCard";

const pageAnimation = `
  @keyframes pageContentFadeIn {
    0% { opacity: 0; transform: translateY(20px); }
    100% { opacity: 1; transform: translateY(0); }
  }
`;

type ViewMode = "month" | "organization";

interface EventsResponse {
  events: EventItem[];
}

function getMonthKey(dateStr: string): string {
  const d = new Date(dateStr);
  const y = d.getFullYear();
  const m = d.getMonth();
  return `${y}-${String(m + 1).padStart(2, "0")}`;
}

function monthLabelFromKey(key: string): string {
  const [y, m] = key.split("-");
  const d = new Date(Number(y), Number(m) - 1, 1);
  return d.toLocaleString(undefined, { month: "short", year: "numeric" });
}

export default function Events() {
  const [viewMode, setViewMode] = useState<ViewMode>("month");
  const [events, setEvents] = useState<EventItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [collapsedSections, setCollapsedSections] = useState<Set<string>>(new Set());

  const toggleSection = (sectionId: string) => {
    setCollapsedSections((prev) => {
      const next = new Set(prev);
      if (next.has(sectionId)) next.delete(sectionId);
      else next.add(sectionId);
      return next;
    });
  };

  useEffect(() => {
    const loadEvents = async () => {
      try {
        setIsLoading(true);
        const remoteUrl = `https://raw.githubusercontent.com/JaneAdora/ebrtq/main/src/data/events.json?v=${Date.now()}`;
        let response = await fetch(remoteUrl);
        if (!response.ok) {
          response = await fetch(`/src/data/events.json?v=${Date.now()}`);
        }
        if (!response.ok) {
          throw new Error("Failed to load events");
        }
        const data: EventsResponse = await response.json();
        const normalized = (data.events || []).map((ev) => ({
          ...ev,
          organization: ev.organization || ev.provider,
        }));
        normalized.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        setEvents(normalized);
        setError(null);
      } catch (e) {
        console.error(e);
        setError("Failed to load events. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    loadEvents();
  }, []);

  const byOrganization = useMemo(() => {
    return events.reduce((acc, ev) => {
      const org = ev.organization || "Other";
      if (!acc[org]) acc[org] = [];
      acc[org].push(ev);
      return acc;
    }, {} as Record<string, EventItem[]>);
  }, [events]);

  const byMonth = useMemo(() => {
    const grouped = events.reduce((acc, ev) => {
      const key = getMonthKey(ev.date);
      if (!acc[key]) acc[key] = [];
      acc[key].push(ev);
      return acc;
    }, {} as Record<string, EventItem[]>);
    Object.values(grouped).forEach((arr) => arr.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()));
    return grouped;
  }, [events]);

  const sortedMonthKeys = useMemo(() => {
    return Object.keys(byMonth).sort((a, b) => {
      const [ya, ma] = a.split("-").map(Number);
      const [yb, mb] = b.split("-").map(Number);
      if (ya !== yb) return ya - yb;
      return ma - mb;
    });
  }, [byMonth]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8 bg-gradient-to-br from-pink-100 via-blue-50 to-purple-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Loading Events...</h2>
          <p className="text-gray-600">Please wait while we load the latest events.</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8 bg-gradient-to-br from-pink-100 via-blue-50 to-purple-100">
        <div className="text-center max-w-md">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Unable to Load Events</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-2 rounded-lg font-medium transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen flex flex-col items-center px-4 py-8"
      style={{
        background: "linear-gradient(135deg, #1e1e2e 0%, #2a1f3d 25%, #1f2937 50%, #1e3a5f 75%, #1e1e2e 100%)",
        backgroundSize: "400% 400%",
        animation: "gradient 15s ease infinite",
      }}
    >
      <style>{`
        @keyframes gradient { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
      `}</style>
      <div className="w-full" style={{ maxWidth: 960 }}>
        <style>{pageAnimation}</style>
        <Header />

        {/* Toggle */}
        <div
          className="flex gap-4 mb-8 justify-center"
          style={{ animation: "pageContentFadeIn 1.5s ease-out 1.2s both" }}
        >
          <button
            onClick={() => setViewMode("month")}
            className={`px-6 py-3 border-4 transition-all duration-300 ${
              viewMode === "month" ? "scale-105" : "opacity-60 hover:opacity-100 hover:scale-110"
            }`}
            style={{
              borderColor: viewMode === "month" ? "#00F5FF" : "rgba(0, 245, 255, 0.3)",
              boxShadow:
                viewMode === "month"
                  ? "4px 4px 0 0 #00F5FF, 0 0 25px rgba(0, 245, 255, 0.6)"
                  : "none",
              fontFamily: "'JetBrains Mono', 'Fira Code', 'Consolas', 'Monaco', 'Courier New', monospace",
              letterSpacing: "0.1em",
              imageRendering: "pixelated",
              backgroundColor: "rgba(42, 45, 58, 0.7)",
              backdropFilter: "blur(10px)",
              cursor: viewMode === "month" ? "default" : "pointer",
            }}
          >
            BY MONTH
          </button>

          <button
            onClick={() => setViewMode("organization")}
            className={`px-6 py-3 border-4 transition-all duration-300 ${
              viewMode === "organization" ? "scale-105" : "opacity-60 hover:opacity-100 hover:scale-110"
            }`}
            style={{
              borderColor: viewMode === "organization" ? "#FF69B4" : "rgba(255, 105, 180, 0.3)",
              boxShadow:
                viewMode === "organization"
                  ? "4px 4px 0 0 #FF69B4, 0 0 25px rgba(255, 105, 180, 0.6)"
                  : "none",
              fontFamily: "'JetBrains Mono', 'Fira Code', 'Consolas', 'Monaco', 'Courier New', monospace",
              letterSpacing: "0.1em",
              imageRendering: "pixelated",
              backgroundColor: "rgba(42, 45, 58, 0.7)",
              backdropFilter: "blur(10px)",
              cursor: viewMode === "organization" ? "default" : "pointer",
            }}
          >
            BY ORGANIZATION
          </button>
        </div>

        {/* Content */}
        <div className="space-y-8" style={{ animation: "pageContentFadeIn 1.5s ease-out 1.2s both" }}>
          {viewMode === "organization" ? (
            Object.entries(byOrganization).map(([org, orgEvents]) => {
              const sectionId = `org-${org}`;
              const isCollapsed = collapsedSections.has(sectionId);
              return (
                <div key={org}>
                  <h2
                    className="mb-4 pb-2 border-b-4 cursor-pointer transition-all duration-300 hover:opacity-80"
                    onClick={() => toggleSection(sectionId)}
                    style={{
                      fontFamily: "'Orbitron', monospace",
                      fontSize: "1.75rem",
                      letterSpacing: "0.15em",
                      borderColor: "#FF69B4",
                      color: "#FFFFFF",
                      textShadow: "0 0 20px rgba(255, 105, 180, 0.9)",
                      cursor: "pointer",
                    }}
                  >
                    <span
                      style={{
                        color: "#FF69B4",
                        transform: isCollapsed ? "rotate(0deg)" : "rotate(90deg)",
                        display: "inline-block",
                        transition: "transform 0.3s ease",
                        fontSize: "1.5em",
                        marginRight: "0.5em",
                      }}
                    >
                      ▸
                    </span>
                    {org}
                  </h2>
                  {!isCollapsed && (
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                        gap: "1rem",
                        marginTop: "0.75rem",
                      }}
                    >
                      {orgEvents.map((ev) => (
                        <EventCard key={ev.id} event={ev} />
                      ))}
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            sortedMonthKeys.map((key) => {
              const sectionId = `month-${key}`;
              const isCollapsed = collapsedSections.has(sectionId);
              const monthEvents = byMonth[key] || [];
              return (
                <div key={key}>
                  <h2
                    className="mb-4 pb-2 border-b-4 cursor-pointer transition-all duration-300 hover:opacity-80"
                    onClick={() => toggleSection(sectionId)}
                    style={{
                      fontFamily: "'Orbitron', monospace",
                      fontSize: "1.75rem",
                      letterSpacing: "0.15em",
                      borderColor: "#00F5FF",
                      color: "#FFFFFF",
                      textShadow: "0 0 20px rgba(0, 245, 255, 0.8)",
                      cursor: "pointer",
                    }}
                  >
                    <span
                      style={{
                        color: "#00F5FF",
                        transform: isCollapsed ? "rotate(0deg)" : "rotate(90deg)",
                        display: "inline-block",
                        transition: "transform 0.3s ease",
                        fontSize: "1.5em",
                        marginRight: "0.5em",
                      }}
                    >
                      ▸
                    </span>
                    {monthLabelFromKey(key)}
                  </h2>
                  {!isCollapsed && (
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                        gap: "1rem",
                        marginTop: "0.75rem",
                      }}
                    >
                      {monthEvents.map((ev) => (
                        <EventCard key={ev.id} event={ev} />
                      ))}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        <div style={{ animation: "pageContentFadeIn 1.5s ease-out 1.2s both" }}>
          <Footer />
        </div>
      </div>
    </div>
  );
}
