import { useState, useMemo } from "react";
import ConfigDrivenEngineFlow from "./landingPage.jsx";
import { COMPONENTS, ALL_TYPES } from "./data";

const TYPE_META = {
  boolean:  { bg: "#d1fae5", color: "#065f46", border: "#6ee7b7" },
  string:   { bg: "#fef3c7", color: "#92400e", border: "#fcd34d" },
  array:    { bg: "#e0f2fe", color: "#0c4a6e", border: "#7dd3fc" },
  object:   { bg: "#fce7f3", color: "#831843", border: "#f9a8d4" },
  function: { bg: "#ede9fe", color: "#4c1d95", border: "#c4b5fd" },
  number:   { bg: "#fef9c3", color: "#713f12", border: "#fde68a" },
  any:      { bg: "#f1f5f9", color: "#475569", border: "#cbd5e1" },
};

function getTypeMeta(typeStr = "") {
  const t = typeStr.toLowerCase();
  for (const key of Object.keys(TYPE_META)) {
    if (t.includes(key)) return { key, ...TYPE_META[key] };
  }
  return { key: "any", ...TYPE_META.any };
}

function TypeBadge({ type }) {
  const m = getTypeMeta(type);
  return (
    <span
      className="inline-block font-mono text-[11px] font-semibold px-2 py-0.5 rounded-full border whitespace-nowrap"
      style={{ background: m.bg, color: m.color, borderColor: m.border }}
    >
      {type}
    </span>
  );
}

function PropRow({ prop, query }) {
  function highlight(text) {
    if (!query) return text;
    const idx = text.toLowerCase().indexOf(query.toLowerCase());
    if (idx === -1) return text;
    return (
      <>
        {text.slice(0, idx)}
        <mark className="bg-amber-100 text-amber-900 rounded-sm px-px">
          {text.slice(idx, idx + query.length)}
        </mark>
        {text.slice(idx + query.length)}
      </>
    );
  }

  return (
    <tr className="transition-colors hover:bg-teal-50/50 [&:not(:last-child)>td]:border-b [&:not(:last-child)>td]:border-stone-100">
      <td className="px-3.5 py-2.5 align-top">
        <code className="font-mono text-[12.5px] font-medium text-teal-800 bg-teal-50 px-1.5 py-0.5 rounded whitespace-nowrap">
          {highlight(prop.name)}
        </code>
        {prop.required && (
          <sup className="text-rose-500 font-bold text-[10px] ml-1">*</sup>
        )}
      </td>
      <td className="px-3.5 py-2.5 align-top">
        <TypeBadge type={prop.type} />
      </td>
      <td className="px-3.5 py-2.5 align-top">
        <code className="font-mono text-[11.5px] text-stone-500 bg-stone-100 px-1.5 py-0.5 rounded">
          {prop.defaultVal}
        </code>
      </td>
      <td className="px-3.5 py-2.5 align-top">
        <p className="text-stone-800 text-[13px] leading-relaxed mb-1">
          {highlight(prop.description)}
        </p>
        <p className="text-stone-400 text-[12px] italic">
          ↪ {highlight(prop.usage)}
        </p>
      </td>
    </tr>
  );
}

function ComponentPanel({ component, query, typeFilter }) {
  const [collapsed, setCollapsed] = useState({});

  const toggleGroup = (g) =>
    setCollapsed((p) => ({ ...p, [g]: !p[g] }));

  const filteredGroups = useMemo(() => {
    return component.propGroups
      .map((pg) => ({
        ...pg,
        props: pg.props.filter((p) => {
          const matchType =
            typeFilter === "all" || getTypeMeta(p.type).key === typeFilter;
          const q = query.toLowerCase();
          const matchQuery =
            !q ||
            p.name.toLowerCase().includes(q) ||
            p.description.toLowerCase().includes(q) ||
            p.usage.toLowerCase().includes(q);
          return matchType && matchQuery;
        }),
      }))
      .filter((pg) => pg.props.length > 0);
  }, [component, query, typeFilter]);

  const totalVisible = filteredGroups.reduce((s, g) => s + g.props.length, 0);
  const totalProps = component.propGroups.reduce((s, g) => s + g.props.length, 0);

  return (
    <section className="w-full max-w-[1100px] mt-1.5 box-border">
      {/* Component header */}
      <div className="bg-white border border-stone-200 rounded-2xl p-5 mb-4 shadow-sm">
        <div className="flex items-center gap-3.5 flex-wrap mb-2">
          <h2
            className="text-[22px] font-bold text-stone-900 tracking-tight"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            {component.name}
          </h2>
          <div className="flex gap-1.5 flex-wrap">
            {component.tags.map((t) => (
              <span
                key={t}
                className="text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-teal-50 text-teal-700 border border-teal-200"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
        <p className="text-sm text-stone-500 leading-relaxed mb-3">
          {component.description}
        </p>
        <div className="flex gap-2">
          <span className="text-xs px-2.5 py-1 rounded-full bg-stone-100 text-stone-500 border border-stone-200">
            {totalVisible} / {totalProps} props shown
          </span>
          <span className="text-xs px-2.5 py-1 rounded-full bg-stone-100 text-stone-500 border border-stone-200">
            {component.propGroups.length} groups
          </span>
        </div>
      </div>

      {filteredGroups.length === 0 ? (
        <div className="p-10 text-center text-stone-400 text-sm bg-white border border-dashed border-stone-200 rounded-xl">
          No props match your filters.
        </div>
      ) : (
        filteredGroups.map((pg) => (
          <div
            key={pg.group}
            className="bg-white border border-stone-200 rounded-xl mb-2.5 overflow-hidden transition-all hover:-translate-y-0.5 hover:shadow-[0_6px_18px_rgba(28,25,23,0.07)]"
          >
            <button
              className="w-full flex items-center gap-2.5 bg-stone-50 cursor-pointer text-left transition-colors hover:bg-stone-100"
              style={{ padding: "12px 18px", border: "none", borderBottom: "1px solid #e7e5e4" }}
              onClick={() => toggleGroup(pg.group)}
            >
              <span
                className="text-[13px] font-semibold text-stone-700 flex-1 tracking-wide"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                {pg.group}
              </span>
              <span className="text-[11px] bg-teal-500 text-white px-2 py-0.5 rounded-full font-semibold">
                {pg.props.length}
              </span>
              <span className="text-[10px] text-stone-400 ml-1">
                {collapsed[pg.group] ? "▶" : "▼"}
              </span>
            </button>

            {!collapsed[pg.group] && (
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-[13.5px]">
                  <thead>
                    <tr>
                      <th className="px-3.5 py-2.5 text-left text-[11px] font-semibold tracking-widest uppercase text-stone-400 bg-stone-50 border-b border-stone-200 w-[18%]">
                        Prop
                      </th>
                      <th className="px-3.5 py-2.5 text-left text-[11px] font-semibold tracking-widest uppercase text-stone-400 bg-stone-50 border-b border-stone-200 w-[13%]">
                        Type
                      </th>
                      <th className="px-3.5 py-2.5 text-left text-[11px] font-semibold tracking-widest uppercase text-stone-400 bg-stone-50 border-b border-stone-200 w-[14%]">
                        Default
                      </th>
                      <th className="px-3.5 py-2.5 text-left text-[11px] font-semibold tracking-widest uppercase text-stone-400 bg-stone-50 border-b border-stone-200">
                        Description &amp; Usage
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {pg.props.map((p) => (
                      <PropRow key={p.name} prop={p} query={query} />
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        ))
      )}
    </section>
  );
}

export default function App() {
  const [query, setQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [activeComponent, setActiveComponent] = useState(COMPONENTS[0].id);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [view, setView] = useState("browser");

  const currentComponent = COMPONENTS.find((c) => c.id === activeComponent);

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: "#1c1917" }}>
      {/* ── Sidebar ── */}
      {view === "browser" && (
        <aside
          className={[
            "w-[240px] flex-shrink-0 flex flex-col overflow-hidden",
            "max-[900px]:fixed max-[900px]:left-0 max-[900px]:top-0 max-[900px]:bottom-0 max-[900px]:h-screen max-[900px]:z-40 max-[900px]:transition-transform max-[900px]:duration-[250ms]",
            sidebarOpen ? "max-[900px]:translate-x-0" : "max-[900px]:-translate-x-[110%]",
          ].join(" ")}
          style={{
            background: "#141210",
            borderRight: "1px solid #2c2520",
            boxShadow: "none",
          }}
        >
        {/* Logo */}
        <div
          className="flex items-center gap-2.5 px-[18px] py-5 pb-4"
          style={{ borderBottom: "1px solid #2c2520" }}
        >
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
            <path d="M11 2L19.66 7V17L11 22L2.34 17V7L11 2Z" fill="none" stroke="#14b8a6" strokeWidth="1.5" />
            <path d="M11 6L16.2 9V15L11 18L5.8 15V9L11 6Z" fill="#14b8a6" fillOpacity="0.2" stroke="#14b8a6" strokeWidth="1" />
          </svg>
          <span
            className="font-bold text-[17px] tracking-tight"
            style={{ fontFamily: "'Syne', sans-serif", color: "#fafaf9" }}
          >
            Components
          </span>
        </div>

        {/* Nav */}
        <nav
          className="flex-1 overflow-y-auto px-2.5 py-3"
          style={{ scrollbarWidth: "thin", scrollbarColor: "#2c2520 transparent" }}
        >
          <p
            className="text-[10px] font-semibold tracking-[0.1em] uppercase px-2 pb-2 pt-1"
            style={{ color: "#44403c" }}
          >
            Components
          </p>
          {COMPONENTS.map((c) => {
            const isActive = c.id === activeComponent;
            return (
              <button
                key={c.id}
                className="w-full flex items-center justify-between px-2.5 py-2 rounded-lg mb-0.5 cursor-pointer text-left transition-all duration-150"
                style={{
                  background: isActive ? "linear-gradient(135deg, #134e4a 0%, #0d3330 100%)" : "transparent",
                  border: isActive ? "1px solid #0f766e" : "1px solid transparent",
                }}
                onMouseEnter={(e) => { if (!isActive) e.currentTarget.style.background = "#1c1917"; }}
                onMouseLeave={(e) => { if (!isActive) e.currentTarget.style.background = "transparent"; }}
                onClick={() => {
                  setActiveComponent(c.id);
                  if (sidebarOpen) setSidebarOpen(false);
                }}
              >
                <span
                  className="font-mono text-[12.5px] truncate transition-colors"
                  style={{ color: isActive ? "#99f6e4" : "#78716c" }}
                >
                  {c.name}
                </span>
                <span
                  className="text-[10px] px-1.5 py-px rounded-full flex-shrink-0 ml-1.5 font-medium"
                  style={
                    isActive
                      ? { background: "#14b8a6", color: "#fff" }
                      : { background: "#292524", color: "#57534e" }
                  }
                >
                  {c.propGroups.reduce((s, g) => s + g.props.length, 0)}
                </span>
              </button>
            );
          })}
        </nav>

        {/* Footer */}
        <div
          className="px-3.5 py-3 text-[11px] leading-relaxed"
          style={{ borderTop: "1px solid #2c2520", color: "#44403c" }}
        >
          Add more components in{" "}
          <code className="font-mono text-[10.5px]" style={{ color: "#14b8a6" }}>
            data.js
          </code>
        </div>
      </aside>)}

 
      {view === "browser" && sidebarOpen && (
        <div
          className="fixed inset-0 z-30 min-[901px]:hidden"
          style={{ background: "rgba(12,10,9,0.65)" }}
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ── Main ── */}
      <main className="flex-1 flex flex-col overflow-hidden" style={{ background: "#fafaf9" }}>
        {/* Topbar */}
        <div
          className="sticky top-0 z-20 flex items-center gap-4 px-6 flex-wrap min-[901px]:h-[68px] max-[900px]:px-3 max-[900px]:py-3"
          style={{ background: "#ffffff", borderBottom: "1px solid #e7e5e4" }}
        >
          {/* Hamburger */}
          <button
            className="min-[901px]:hidden inline-flex items-center justify-center w-10 h-10 rounded-xl cursor-pointer text-xl transition-colors"
            style={{ background: "transparent", border: "1px solid #e7e5e4", color: "#78716c" }}
            aria-label="Toggle sidebar"
            onMouseEnter={(e) => (e.currentTarget.style.background = "#f5f5f4")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
            onClick={() => setSidebarOpen((s) => !s)}
          >
            ☰
          </button>

          {/* View selector */}
          <div className="flex items-center gap-2 flex-wrap max-[900px]:w-full">
            <button
              className="px-3 py-1 rounded-full text-xs font-medium transition-all"
              style={
                view === "browser"
                  ? { background: "#0d9488", color: "#fff", border: "1.5px solid #0d9488", fontWeight: 600 }
                  : { background: "#fff", color: "#78716c", border: "1.5px solid #e7e5e4" }
              }
              onClick={() => {
                setView("browser");
                setSidebarOpen(false);
              }}
            >
              Component Browser
            </button>
            <button
              className="px-3 py-1 rounded-full text-xs font-medium transition-all"
              style={
                view === "landing"
                  ? { background: "#0d9488", color: "#fff", border: "1.5px solid #0d9488", fontWeight: 600 }
                  : { background: "#fff", color: "#78716c", border: "1.5px solid #e7e5e4" }
              }
              onClick={() => {
                setView("landing");
                setSidebarOpen(false);
              }}
            >
              Landing Page
            </button>
          </div>

          {/* Search */}
          <div className="relative flex-1 min-w-[200px] max-w-[380px] max-[900px]:max-w-none max-[900px]:flex-[1_1_100%]">
            <span
              className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[18px] pointer-events-none leading-none"
              style={{ color: "#a8a29e" }}
            >
              ⌕
            </span>
            <input
              className="w-full py-2 pl-9 pr-8 rounded-xl text-[13.5px] outline-none transition-all"
              style={{
                border: "1.5px solid #e7e5e4",
                background: "#f5f5f4",
                color: "#1c1917",
                fontFamily: "'DM Sans', sans-serif",
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = "#14b8a6";
                e.currentTarget.style.background = "#fff";
                e.currentTarget.style.boxShadow = "0 0 0 3px rgba(20,184,166,0.1)";
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = "#e7e5e4";
                e.currentTarget.style.background = "#f5f5f4";
                e.currentTarget.style.boxShadow = "none";
              }}
              type="text"
              placeholder="Search props, descriptions, usage…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            {query && (
              <button
                className="absolute right-2 top-1/2 -translate-y-1/2 border-none bg-transparent cursor-pointer text-xs px-1 py-0.5 rounded"
                style={{ color: "#a8a29e" }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#f5f5f4")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                onClick={() => setQuery("")}
              >
                ✕
              </button>
            )}
          </div>

          {/* Type filters */}
          <div className="flex gap-1.5 flex-wrap max-[900px]:overflow-x-auto max-[900px]:max-w-full max-[900px]:pb-1 max-[900px]:gap-2 max-[900px]:mx-1 max-[900px]:py-1">
            <button
              className="px-3 py-1 rounded-full text-xs font-medium cursor-pointer transition-all whitespace-nowrap"
              style={
                typeFilter === "all"
                  ? { background: "#0d9488", color: "#fff", border: "1.5px solid #0d9488", fontWeight: 600 }
                  : { background: "#fff", color: "#78716c", border: "1.5px solid #e7e5e4" }
              }
              onClick={() => setTypeFilter("all")}
            >
              All
            </button>
            {ALL_TYPES.map((t) => {
              const m = TYPE_META[t];
              const isActive = typeFilter === t;
              return (
                <button
                  key={t}
                  className="px-3 py-1 rounded-full text-xs font-medium cursor-pointer transition-all whitespace-nowrap flex-shrink-0"
                  style={
                    isActive
                      ? { background: m.bg, color: m.color, border: `1.5px solid ${m.border}`, fontWeight: 600 }
                      : { background: "#fff", color: "#78716c", border: "1.5px solid #e7e5e4" }
                  }
                  onClick={() => setTypeFilter(typeFilter === t ? "all" : t)}
                >
                  {t}
                </button>
              );
            })}
          </div>
        </div>

        {/* Content */}
        <div
          className="flex-1 overflow-y-auto px-7 py-6 max-[900px]:px-3 max-[900px]:py-4"
          style={{ scrollbarWidth: "thin", scrollbarColor: "#d6d3d1 transparent" }}
        >
          {view === "landing" ? (
            <ConfigDrivenEngineFlow />
          ) : (
            currentComponent && (
              <ComponentPanel
                component={currentComponent}
                query={query}
                typeFilter={typeFilter}
              />
            )
          )}
        </div>
      </main>
    </div>
        
  );
}