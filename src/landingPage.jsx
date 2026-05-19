import { useState, useEffect } from "react";

// ── Responsive hook ──────────────────────────────────────────────────────────
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 640);
  useEffect(() => {
    const fn = () => setIsMobile(window.innerWidth < 640);
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);
  return isMobile;
}

// ── JSON Config section data ─────────────────────────────────────────────────
const JSON_SECTIONS = [
  {
    key: "page_variables",
    color: "#3B82F6",
    label: "page_variables",
    desc: "All runtime variables the page tracks — sourced from APIs, DB tables, user input, or computed values.",
    example: `"page_variables": [
  "$Lead_Id$",
  "$BAI#Disbursement_Id$",
  "$LDF#Lead_Id$",
  "$API1#Roi$",
  "$API1#Tennor$",
  "$FormationDate$",
  "$PaymentAmount$",
  ...
]`,
    bullets: [
      "$Lead_Id$ — root identifier passed into page",
      "$API1#Roi$ — ROI fetched from LeadID Kafka service",
      "$LDI#DisbAmt$ — disbursement amount from DB table",
      "$FormationVAluedt$ — computed value date variable",
      "$PaymentAmount$ — derived net payment after deductions",
      "Format: $Alias#ColumnName$ links variable to its source",
    ],
  },
  {
    key: "Calculation",
    color: "#22C55E",
    label: "Calculation",
    desc: "Defines how variables are derived, assigned, or conditionally computed at runtime.",
    example: `"Calculation": [
  "$API1#Mode$=$Mode$",
  "$cashTotal$=$CollectbleAmt$",
  "$LDI#DisbAmt$ - $DeductbleAmt$
    = $PaymentAmount$",
  "$LDI#LendingType$==224
    ? ($LDI#DisbAmt$ * $LDI#LederPer$ / 100)
    : $LDI#LenderAmt$
    = $LDI#LenderAmt$",
  ...
]`,
    bullets: [
      "Simple assignment: $A$=$B$ copies value between variables",
      "Arithmetic: $DisbAmt$ - $DeductbleAmt$ = $PaymentAmount$",
      "Ternary: condition ? trueVal : falseVal = $target$",
      "Multi-condition lending type logic (224/225/226)",
      "Boolean flags: $UPD#UptDate$ toggled by Capitalize==60",
      "Chain: value flows API → variable → field → DB insert",
    ],
  },
  {
    key: "API",
    color: "#F59E0B",
    label: "API",
    desc: "External service calls (Kafka topics) triggered by variable dependencies.",
    example: `"API": [
  {
    "serviceType": "LeadID",
    "Alias": "API1",
    "depends": "$Lead_Id$",
    "ExternalService": "Kafka"
  },
  {
    "serviceType": "EMIDate",
    "Alias": "API2",
    "depends": "$LDI#DisbAmt$",
    "ExternalService": "Kafka"
  },
  {
    "serviceType": "Schedule",
    "Alias": "API5",
    "depends": "$Schedule$",
    "ExternalService": "Kafka"
  }
]`,
    bullets: [
      "API1 (LeadID) — fires when $Lead_Id$ is available",
      "API2 (EMIDate) — fires when DisbAmt or Due_Day set",
      "API4 (GAPDaysCalculate) — gap days interest calc",
      "API5 (Schedule) — full EMI schedule generation",
      "Alias prefix (e.g. API1#Roi) used in variables/fields",
      "ExternalService: Kafka — async event-driven triggers",
    ],
  },
  {
    key: "table",
    color: "#8B5CF6",
    label: "table",
    desc: "Database table bindings — select reads, insert writes, bulk operations, and custom SQL queries.",
    example: `"table": [
  {
    "name": "Loans.Disbursement",
    "Alias": "LDI",
    "type": "insert",
    "ID": "SCOPE_IDENTITY",
    "columnid": "$Disbursement_Id$"
  },
  {
    "name": "Loans.Disbursement_BankDetails",
    "Alias": "BAI",
    "type": "bulk",
    "var": ["$PaymentType$","$Amount$",...],
    "Data": ["$Bulkdata$"]
  },
  {
    "type": "custom",
    "query": ["SELECT ... WHERE Lead_Id=$B#Lead_Id$"]
  }
]`,
    bullets: [
      "type:select — read data into page variables via Alias#Col",
      "type:insert — write form data; captures SCOPE_IDENTITY",
      "type:bulk — insert multiple rows from inline-edit tables",
      "type:custom — raw SQL with $variable$ interpolation",
      "depends — table fires only when dependency variable is set",
      "wherecolumnname — dynamic WHERE clause using variables",
    ],
  },
  {
    key: "Options",
    color: "#EC4899",
    label: "Options",
    desc: "Dropdown / select option lists loaded from Redis cache at page load.",
    example: `"Options": [
  {
    "DataModule": "redis",
    "optionValues": [
      "$Transactiontype$",
      "$PayTo$",
      "$Company Bank Name$",
      "$BankAccountType$",
      "$YesNoOptions$",
      "$TypeOfLending$",
      "$FeeType$"
    ]
  }
]`,
    bullets: [
      "DataModule:redis — all options pre-cached in Redis",
      "$Transactiontype$ — Cash / Cheque / NEFT / RTGS etc.",
      "$PayTo$ — payee list options",
      "$TypeOfLending$ — 224 (Partner), 225 (Company), 226 (Full)",
      "$YesNoOptions$ — boolean toggle dropdowns",
      "Options bound to fields via Options_Input in UI config",
    ],
  },
  {
    key: "Section / UI Layout",
    color: "#06B6D4",
    label: "Section / UI Layout",
    desc: "The visual page structure — rows, columns, fields, tables, buttons, and sections defined declaratively.",
    example: `"PaymentDetails": {
  "Section_3": {
    "Row_14": {
      "col_1": {
        "className": "threecoloumns",
        "Fields": [{
          "text_4": {
            "label": "Disbursement Amount*",
            "value": "$LDI#DisbAmt$",
            "type": "number",
            "validation": {
              "required": true,
              "maxLength": 7,
              "patternName": "lessThanOrEqual"
            }
          },
          "dropDown_1": {
            "label": "Branch",
            "options": [
              "$MBD#BranchID$",
              "$MBD#BranchName$"
            ],
            "select": "$API1#BranchID$"
          }
        }]
      }
    }
  }
}`,
    bullets: [
      "Top key = Page Name (e.g. PaymentDetails)",
      "Section_N groups logical UI sections (Loan Info, Payment…)",
      "Row_N defines horizontal layout rows within a section",
      "col_N splits row into columns; className controls grid",
      "Fields array holds any component: text, dropdown, table, button",
      "value/$select$ binds field directly to a page variable",
    ],
  },
];

const stages = [
  {
    id: 1,
    key: "config",
    color: "#2563EB",
    accent: "#3B82F6",
    glow: "rgba(37,99,235,0.35)",
    label: "Configuration Creation",
    icon: (
      <svg width="24" height="24" viewBox="0 0 28 28" fill="none">
        <rect x="3" y="2" width="18" height="24" rx="3" stroke="currentColor" strokeWidth="2"/>
        <path d="M8 8h8M8 12h8M8 16h5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <rect x="15" y="16" width="10" height="10" rx="2" fill="currentColor" opacity="0.9"/>
        <path d="M18 21h4M20 19v4" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    summary: "Developers write a JSON file per page. Each file contains fixed top-level keys that the engine understands.",
    detail: [
      "page_variables — declare every runtime variable the page needs",
      "Calculation — define assignments, arithmetic & conditional logic",
      "API — map Kafka service calls to aliases & their trigger deps",
      "table — bind DB tables for select / insert / bulk / custom SQL",
      "Options — load dropdown lists from Redis by option key name",
      "Section / UI Layout — define rows, columns, fields & components",
      "Field values reference variables via $Alias#Column$ syntax",
      "Validations, visibility & enable rules live inside each field",
      "One JSON file = one complete self-describing page definition",
    ],
    sections: ["page_variables","Calculation","API","table","Options","Section (UI Layout)"],
    isConfigStage: true,
  },
  {
    id: 2,
    key: "injection",
    color: "#16A34A",
    accent: "#22C55E",
    glow: "rgba(22,163,74,0.35)",
    label: "Injection Tool",
    icon: (
      <svg width="24" height="24" viewBox="0 0 28 28" fill="none">
        <circle cx="14" cy="14" r="11" stroke="currentColor" strokeWidth="2"/>
        <path d="M14 8v6l4 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <circle cx="14" cy="14" r="3" fill="currentColor" opacity="0.3"/>
        <path d="M9 9l10 10M19 9L9 19" stroke="currentColor" strokeWidth="1.5" opacity="0.4"/>
      </svg>
    ),
    summary: "Injection tool reads JSON and generates lists for each configuration section.",
    detail: [
      "Parse raw JSON configuration input",
      "Validate schema integrity & required fields",
      "Generate FieldList records from field definitions",
      "Generate GroupTree nodes from layout config",
      "Generate ClientVariableList entries",
      "Generate ServerVariableList entries",
      "Generate InsertQueryList & QueryList entries",
      "Generate CalculationList & OptionList entries",
      "Output all lists ready for DB persistence",
    ],
    sections: ["Parse JSON","Validate","Generate Lists"],
  },
  {
    id: 3,
    key: "database",
    color: "#7C3AED",
    accent: "#A78BFA",
    glow: "rgba(124,58,237,0.35)",
    label: "Database Storage",
    icon: (
      <svg width="24" height="24" viewBox="0 0 28 28" fill="none">
        <ellipse cx="14" cy="8" rx="9" ry="4" stroke="currentColor" strokeWidth="2"/>
        <path d="M5 8v5c0 2.2 4 4 9 4s9-1.8 9-4V8" stroke="currentColor" strokeWidth="2"/>
        <path d="M5 13v5c0 2.2 4 4 9 4s9-1.8 9-4v-5" stroke="currentColor" strokeWidth="2"/>
      </svg>
    ),
    summary: "All generated lists are injected and persisted in the database.",
    detail: [
      "FieldList Table — stores all field definitions",
      "GroupTree Table — stores layout & hierarchy nodes",
      "ClientVariable Table — frontend variable registry",
      "ServerVariable Table — backend variable registry",
      "Query Table — read query store",
      "InsertQuery Table — write query store",
      "Calculation Table — formula & rule store",
      "Option Table — dropdown values store",
      "Extended tables via '...' for custom entities",
    ],
    sections: ["FieldList Table","GroupTree Table","ClientVariable Table","ServerVariable Table","Query Table","InsertQuery Table","Calculation Table","Option Table","..."],
  },
  {
    id: 4,
    key: "engine",
    color: "#D97706",
    accent: "#FBBF24",
    glow: "rgba(217,119,6,0.35)",
    label: "Engine Load Configuration",
    icon: (
      <svg width="24" height="24" viewBox="0 0 28 28" fill="none">
        <rect x="4" y="6" width="20" height="16" rx="3" stroke="currentColor" strokeWidth="2"/>
        <path d="M9 10h10M9 14h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <circle cx="20" cy="18" r="1.5" fill="currentColor"/>
      </svg>
    ),
    summary: "Engine loads configuration data from database based on application and user context.",
    detail: [
      "Fetch configuration from DB using app + user context",
      "Build in-memory metadata model from all tables",
      "Resolve field hierarchy via GroupTree",
      "Instantiate ClientVariable & ServerVariable maps",
      "Compile QueryList & InsertQueryList executors",
      "Parse CalculationList into runnable rule engine",
      "Resolve OptionList for all select fields",
      "Prepare complete UI structure blueprint",
      "Hand off runtime model to UI Builder",
    ],
    sections: ["Fetch from DB","Build metadata model","Prepare UI structure","Prepare queries, calculations, options"],
  },
  {
    id: 5,
    key: "uibuild",
    color: "#0891B2",
    accent: "#22D3EE",
    glow: "rgba(8,145,178,0.35)",
    label: "UI Build & Binding",
    icon: (
      <svg width="24" height="24" viewBox="0 0 28 28" fill="none">
        <rect x="2" y="4" width="24" height="20" rx="3" stroke="currentColor" strokeWidth="2"/>
        <path d="M2 9h24" stroke="currentColor" strokeWidth="2"/>
        <rect x="6" y="13" width="6" height="7" rx="1" stroke="currentColor" strokeWidth="1.5"/>
        <rect x="16" y="13" width="6" height="3" rx="1" stroke="currentColor" strokeWidth="1.5"/>
        <rect x="16" y="18" width="6" height="2" rx="1" stroke="currentColor" strokeWidth="1.5"/>
      </svg>
    ),
    summary: "UI is dynamically built from configuration using React components and Refs for binding.",
    detail: [
      "Read FieldList to enumerate all UI fields",
      "Read GroupTree to resolve layout & nesting",
      "Create React components dynamically per field type",
      "Attach Refs to each component for direct DOM binding",
      "Bind ClientVariables to component state",
      "Bind ServerVariables to component props/context",
      "Set Options from OptionList on select/radio fields",
      "Apply CalculationList rules & validation logic",
      "Render final composed UI tree",
    ],
    sections: ["Read FieldList & GroupTree","Create Components Dynamically","Attach Refs","Bind Variables","Set Options","Apply Calculations & Validations"],
    uses: ["Refs (React)","Client Variables","Server Variables","Options","Calculations"],
  },
  {
    id: 6,
    key: "runtime",
    color: "#DC2626",
    accent: "#F87171",
    glow: "rgba(220,38,38,0.35)",
    label: "Runtime Execution",
    icon: (
      <svg width="24" height="24" viewBox="0 0 28 28" fill="none">
        <circle cx="14" cy="14" r="11" stroke="currentColor" strokeWidth="2"/>
        <path d="M11 9.5l8 4.5-8 4.5V9.5z" fill="currentColor"/>
      </svg>
    ),
    summary: "User interacts with UI. Engine handles events, validations, calculations, and database operations.",
    detail: [
      "Capture User Interaction events (input, click, change)",
      "Validate field rules from CalculationList",
      "Run dynamic Calculations on related fields",
      "Execute QueryList — fetch/read operations",
      "Execute InsertQueryList — insert/update operations",
      "Commit data & fetch response from database",
      "Update Client & Server Variables with new state",
      "Refresh UI components as per configuration rules",
      "Return response & reflect changes in UI",
    ],
    sections: ["User Interaction","Validate Rules/Calculations","Execute Queries / Insert / Update","Update Variables","Refresh UI as per configuration"],
    dbOps: ["Execute QueryList","Execute InsertQueryList","Commit / Fetch Data","Return Response"],
  },
];

const CONNECTOR_H = 40;

// ── helpers ──────────────────────────────────────────────────────────────────
function hexToRgb(hex) {
  return `${parseInt(hex.slice(1,3),16)},${parseInt(hex.slice(3,5),16)},${parseInt(hex.slice(5,7),16)}`;
}
function hexToRgbInline(hex) { return hexToRgb(hex); }

// ── JsonSectionCard ──────────────────────────────────────────────────────────
function JsonSectionCard({ sec, isMobile }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{
      marginBottom: 10,
      borderRadius: 10,
      border: `1px solid ${open ? sec.color + "55" : "rgba(255,255,255,0.07)"}`,
      background: open
        ? `linear-gradient(135deg,rgba(${hexToRgbInline(sec.color)},0.08) 0%,rgba(10,15,30,0.98) 100%)`
        : "rgba(12,18,35,0.8)",
      transition: "border-color 0.25s,background 0.25s",
      overflow: "hidden",
    }}>
      {/* header */}
      <div
        onClick={(e) => { e.stopPropagation(); setOpen(!open); }}
        style={{
          display: "flex",
          alignItems: "flex-start",
          gap: 10,
          padding: isMobile ? "11px 12px" : "12px 16px",
          cursor: "pointer",
          userSelect: "none",
        }}
      >
        <div style={{
          width: 8, height: 8, borderRadius: "50%", marginTop: 4,
          background: sec.color, flexShrink: 0,
          boxShadow: `0 0 6px ${sec.color}`,
        }} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <span style={{
            fontFamily: "'Fira Code','Cascadia Code','Courier New',monospace",
            fontSize: isMobile ? 12 : 13,
            fontWeight: 700,
            color: sec.color,
            display: "block",
            marginBottom: 2,
          }}>
            "{sec.label}"
          </span>
          <span style={{
            fontSize: isMobile ? 11 : 12,
            color: "#64748B",
            lineHeight: 1.45,
            display: "block",
          }}>
            {sec.desc}
          </span>
        </div>
        <div style={{
          color: "#475569",
          transform: open ? "rotate(180deg)" : "rotate(0)",
          transition: "transform 0.25s",
          flexShrink: 0,
          marginTop: 2,
        }}>
          <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
            <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
          </svg>
        </div>
      </div>

      {/* body */}
      <div style={{
        maxHeight: open ? 2000 : 0,
        overflow: "hidden",
        transition: "max-height 0.4s cubic-bezier(0.4,0,0.2,1)",
      }}>
        <div style={{ padding: isMobile ? "0 12px 14px" : "0 16px 16px" }}>
          {/* stack on mobile, side-by-side on desktop */}
          <div style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
            gap: isMobile ? 12 : 14,
          }}>
            {/* Example */}
            <div>
              <div style={{
                fontSize: 10, fontWeight: 700, letterSpacing: "0.1em",
                textTransform: "uppercase", color: "#475569", marginBottom: 6,
              }}>Example</div>
              <pre style={{
                margin: 0,
                padding: isMobile ? "10px 11px" : "12px 14px",
                borderRadius: 8,
                background: "#060a14",
                border: `1px solid ${sec.color}25`,
                fontFamily: "'Fira Code','Cascadia Code','Courier New',monospace",
                fontSize: isMobile ? 10 : 11.5,
                lineHeight: 1.7,
                color: "#94A3B8",
                overflowX: "auto",
                whiteSpace: "pre-wrap",
                wordBreak: "break-all",
              }}>
                <ColorizedJson text={sec.example} keyColor={sec.color} />
              </pre>
            </div>
            {/* Key Points */}
            <div>
              <div style={{
                fontSize: 10, fontWeight: 700, letterSpacing: "0.1em",
                textTransform: "uppercase", color: "#475569", marginBottom: 6,
              }}>Key Points</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
                {sec.bullets.map((b, i) => (
                  <div key={i} style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                    <div style={{
                      width: 5, height: 5, borderRadius: "50%", flexShrink: 0, marginTop: 5,
                      background: sec.color, boxShadow: `0 0 4px ${sec.color}`,
                    }} />
                    <span style={{ fontSize: isMobile ? 11 : 12.5, color: "#CBD5E1", lineHeight: 1.5 }}>{b}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Syntax colorizer ─────────────────────────────────────────────────────────
function ColorizedJson({ text, keyColor }) {
  const parts = text.split(/("(?:[^"\\]|\\.)*")|(\$[^$]+\$)|([:,\[\]{}\(\)])/g).filter(Boolean);
  return (
    <>
      {parts.map((part, i) => {
        if (/^"/.test(part)) return <span key={i} style={{ color: keyColor }}>{part}</span>;
        if (/^\$/.test(part)) return <span key={i} style={{ color: "#FBBF24" }}>{part}</span>;
        if (/^[{}\[\]]$/.test(part)) return <span key={i} style={{ color: "#64748B" }}>{part}</span>;
        if (part === ":") return <span key={i} style={{ color: "#64748B" }}>{part}</span>;
        if (part === ",") return <span key={i} style={{ color: "#475569" }}>{part}</span>;
        return <span key={i} style={{ color: "#94A3B8" }}>{part}</span>;
      })}
    </>
  );
}

// ── Pills row helper ─────────────────────────────────────────────────────────
function PillRow({ label, items, bg, border, color, isMobile }) {
  return (
    <div style={{ marginTop: 14 }}>
      <div style={{
        fontSize: 10, fontWeight: 700, letterSpacing: "0.1em",
        textTransform: "uppercase", color: "#475569", marginBottom: 7,
      }}>{label}</div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
        {items.map((s) => (
          <span key={s} style={{
            fontSize: isMobile ? 10.5 : 12,
            fontWeight: 600,
            padding: isMobile ? "3px 9px" : "4px 12px",
            borderRadius: 999,
            background: bg,
            border: `1px solid ${border}`,
            color,
          }}>{s}</span>
        ))}
      </div>
    </div>
  );
}

// ── Main page ────────────────────────────────────────────────────────────────
export default function LandingPage() {
  const [active, setActive] = useState(null);
  const isMobile = useIsMobile();

  const toggle = (id, e) => {
    if (active !== id) {
      setTimeout(() => {
        e.currentTarget.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 50);
    }
    setActive(active === id ? null : id);
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0a0f1e",
      fontFamily: "'DM Sans','Segoe UI',sans-serif",
      color: "#e2e8f0",
      paddingBottom: 60,
    }}>

      {/* ── Header ── */}
      <div style={{
        textAlign: "center",
        padding: isMobile ? "32px 16px 24px" : "52px 24px 40px",
        background: "linear-gradient(180deg,rgba(30,41,80,0.9) 0%,transparent 100%)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        marginBottom: 6,
      }}>
        <div style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          background: "rgba(37,99,235,0.12)",
          border: "1px solid rgba(37,99,235,0.3)",
          borderRadius: 999,
          padding: isMobile ? "4px 12px" : "6px 18px",
          fontSize: isMobile ? 9 : 11,
          fontWeight: 600,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: "#93C5FD",
          marginBottom: 14,
        }}>
          <span style={{ width:6, height:6, borderRadius:"50%", background:"#3B82F6", display:"inline-block" }}/>
          Configuration Driven Architecture
        </div>

        <h1 style={{
          fontSize: isMobile ? "clamp(18px,5.5vw,26px)" : "clamp(28px,4vw,44px)",
          fontWeight: 800,
          margin: 0,
          letterSpacing: "-0.02em",
          background: "linear-gradient(135deg,#E2E8F0 30%,#93C5FD 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          lineHeight: 1.2,
          padding: "0 8px",
        }}>
          Configuration Driven UI Engine
        </h1>

        <p style={{
          marginTop: 10,
          color: "#64748B",
          fontSize: isMobile ? 12 : 14,
        }}>
          {isMobile ? "Tap" : "Click"} any stage to explore the steps involved
        </p>
      </div>

      {/* ── Flow ── */}
      <div style={{
        maxWidth: 820,
        margin: "0 auto",
        padding: isMobile ? "0 10px" : "0 20px",
      }}>
        {stages.map((stage, idx) => {
          const isOpen = active === stage.id;
          return (
            <div key={stage.id}>

              {/* ── Stage row ── */}
              <div
                onClick={(e) => toggle(stage.id, e)}
                style={{
                  position: "relative",
                  cursor: "pointer",
                  borderRadius: isMobile ? 12 : 16,
                  border: `1.5px solid ${isOpen ? stage.accent : "rgba(255,255,255,0.08)"}`,
                  background: isOpen
                    ? `linear-gradient(135deg,rgba(${hexToRgb(stage.color)},0.15) 0%,rgba(10,15,30,0.97) 100%)`
                    : "rgba(15,22,40,0.8)",
                  boxShadow: isOpen
                    ? `0 0 28px ${stage.glow},inset 0 1px 0 rgba(255,255,255,0.07)`
                    : "inset 0 1px 0 rgba(255,255,255,0.04)",
                  transition: "all 0.28s cubic-bezier(0.4,0,0.2,1)",
                  overflow: "hidden",
                }}
              >
                {/* accent bar */}
                <div style={{
                  position: "absolute", left:0, top:0, bottom:0, width:4,
                  background: stage.color,
                  borderRadius: "16px 0 0 16px",
                  opacity: isOpen ? 1 : 0.4,
                  transition: "opacity 0.28s",
                }} />

                {/* header */}
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  gap: isMobile ? 10 : 14,
                  padding: isMobile ? "13px 12px 13px 14px" : "18px 20px 18px 22px",
                }}>
                  {/* badge */}
                  <div style={{
                    width: isMobile ? 28 : 34,
                    height: isMobile ? 28 : 34,
                    borderRadius: "50%",
                    background: `linear-gradient(135deg,${stage.color},${stage.accent})`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontWeight: 800, fontSize: isMobile ? 11 : 13,
                    flexShrink: 0, color: "#fff",
                    boxShadow: `0 0 10px ${stage.glow}`,
                  }}>
                    {stage.id}
                  </div>

                  {/* icon — desktop only */}
                  {!isMobile && (
                    <div style={{ color: isOpen ? stage.accent : "#94A3B8", transition: "color 0.28s", flexShrink: 0 }}>
                      {stage.icon}
                    </div>
                  )}

                  {/* text */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{
                      fontSize: isMobile ? 9 : 10,
                      fontWeight: 700,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: isOpen ? stage.accent : "#64748B",
                      transition: "color 0.28s",
                      marginBottom: 2,
                    }}>
                      Stage {stage.id}
                    </div>
                    <div style={{
                      fontSize: isMobile ? 13 : 16,
                      fontWeight: 700,
                      color: isOpen ? "#F1F5F9" : "#CBD5E1",
                      letterSpacing: "-0.01em",
                      transition: "color 0.28s",
                      lineHeight: 1.25,
                    }}>
                      {stage.label}
                    </div>
                    {/* summary — always visible but clamped on mobile when closed */}
                    <div style={{
                      fontSize: isMobile ? 11 : 12,
                      color: "#475569",
                      marginTop: 2,
                      lineHeight: 1.4,
                      overflow: "hidden",
                      display: "-webkit-box",
                      WebkitLineClamp: (!isOpen && isMobile) ? 2 : 99,
                      WebkitBoxOrient: "vertical",
                    }}>
                      {stage.summary}
                    </div>
                  </div>

                  {/* chevron */}
                  <div style={{
                    color: "#475569",
                    transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                    transition: "transform 0.28s",
                    flexShrink: 0,
                  }}>
                    <svg width="15" height="15" viewBox="0 0 18 18" fill="none">
                      <path d="M4 6l5 5 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>

                {/* ── Expanded panel ── */}
                <div
                  onClick={(e) => e.stopPropagation()}
                  style={{
                    maxHeight: isOpen ? (stage.isConfigStage ? 9999 : 1400) : 0,
                    overflow: "hidden",
                    transition: "max-height 0.5s cubic-bezier(0.4,0,0.2,1)",
                  }}
                >
                  <div style={{ padding: isMobile ? "0 12px 16px" : "0 22px 22px" }}>

                    {/* divider */}
                    <div style={{
                      height: 1,
                      background: `linear-gradient(90deg,${stage.color}55,transparent)`,
                      marginBottom: 14,
                    }} />

                    {/* ── CONFIG STAGE ── */}
                    {stage.isConfigStage && (
                      <div>
                        {/* JSON overview */}
                        <div style={{
                          background: "rgba(15,22,40,0.9)",
                          border: "1px solid rgba(37,99,235,0.2)",
                          borderRadius: 10,
                          padding: isMobile ? "10px 11px" : "14px 16px",
                          marginBottom: 12,
                          fontFamily: "'Fira Code','Cascadia Code','Courier New',monospace",
                          fontSize: isMobile ? 10.5 : 12.5,
                          lineHeight: 1.75,
                          color: "#94A3B8",
                          overflowX: "auto",
                        }}>
                          <div style={{
                            color:"#475569",fontSize:9,fontWeight:700,
                            letterSpacing:"0.1em",textTransform:"uppercase",marginBottom:8,
                          }}>JSON File Structure</div>
                          <span style={{color:"#64748B"}}>{`{`}</span><br/>
                          <span style={{paddingLeft:isMobile?10:16,color:"#3B82F6"}}>{`"PaymentDetails"`}</span>
                          <span style={{color:"#64748B"}}>{`: [`}</span><br/>
                          <span style={{paddingLeft:isMobile?20:32,color:"#64748B"}}>{`{`}</span><br/>
                          {[
                            {k:"page_variables",c:"#22C55E",v:"[ ... ]"},
                            {k:"Calculation",c:"#FBBF24",v:"[ ... ]"},
                            {k:"API",c:"#F87171",v:"[ ... ]"},
                            {k:"table",c:"#A78BFA",v:"[ ... ]"},
                            {k:"Options",c:"#EC4899",v:"[ ... ]"},
                            {k:"Section_3",c:"#22D3EE",v:"{ Row_N → Fields }"},
                          ].map((item,i,arr) => (
                            <div key={item.k} style={{paddingLeft:isMobile?30:48}}>
                              <span style={{color:item.c}}>{`"${item.k}"`}</span>
                              <span style={{color:"#64748B"}}>{`: `}</span>
                              <span style={{color:"#94A3B8"}}>{item.v}</span>
                              {i < arr.length-1 && <span style={{color:"#64748B"}}>{`,`}</span>}
                            </div>
                          ))}
                          <span style={{paddingLeft:isMobile?20:32,color:"#64748B"}}>{`}`}</span><br/>
                          <span style={{paddingLeft:isMobile?10:16,color:"#64748B"}}>{`]`}</span><br/>
                          <span style={{color:"#64748B"}}>{`}`}</span>
                        </div>

                        {JSON_SECTIONS.map((sec) => (
                          <JsonSectionCard key={sec.key} sec={sec} isMobile={isMobile} />
                        ))}
                      </div>
                    )}

                    {/* ── NORMAL STAGES ── */}
                    {!stage.isConfigStage && (
                      <div>
                        <div style={{
                          display: "grid",
                          gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fill,minmax(210px,1fr))",
                          gap: isMobile ? 7 : 10,
                        }}>
                          {stage.detail.map((step, i) => (
                            <div key={i} style={{
                              display: "flex",
                              alignItems: "flex-start",
                              gap: 9,
                              padding: isMobile ? "9px 11px" : "11px 13px",
                              borderRadius: 9,
                              background: `rgba(${hexToRgb(stage.color)},0.07)`,
                              border: `1px solid rgba(${hexToRgb(stage.color)},0.15)`,
                            }}>
                              <div style={{
                                width: 19, height: 19, borderRadius: "50%",
                                background: `rgba(${hexToRgb(stage.color)},0.18)`,
                                border: `1.5px solid ${stage.accent}`,
                                display: "flex", alignItems: "center", justifyContent: "center",
                                fontSize: 9, fontWeight: 800, color: stage.accent, flexShrink: 0,
                              }}>
                                {i + 1}
                              </div>
                              <span style={{ fontSize: isMobile ? 11.5 : 13, color: "#CBD5E1", lineHeight: 1.45 }}>
                                {step}
                              </span>
                            </div>
                          ))}
                        </div>

                        {stage.sections && (
                          <PillRow
                            label="Config Sections"
                            items={stage.sections}
                            bg={`rgba(${hexToRgb(stage.color)},0.12)`}
                            border={`rgba(${hexToRgb(stage.color)},0.3)`}
                            color={stage.accent}
                            isMobile={isMobile}
                          />
                        )}
                        {stage.uses && (
                          <PillRow
                            label="Uses"
                            items={stage.uses}
                            bg="rgba(34,211,238,0.1)"
                            border="rgba(34,211,238,0.25)"
                            color="#22D3EE"
                            isMobile={isMobile}
                          />
                        )}
                        {stage.dbOps && (
                          <PillRow
                            label="Database Operations"
                            items={stage.dbOps}
                            bg="rgba(248,113,113,0.1)"
                            border="rgba(248,113,113,0.25)"
                            color="#F87171"
                            isMobile={isMobile}
                          />
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* connector */}
              {idx < stages.length - 1 && (
                <div style={{
                  display: "flex", flexDirection: "column",
                  alignItems: "center", height: CONNECTOR_H,
                }}>
                  <div style={{
                    width: 2, flex: 1,
                    background: `linear-gradient(180deg,${stage.color}70,${stages[idx+1].color}70)`,
                  }} />
                  <svg width="12" height="8" viewBox="0 0 14 10" fill="none" style={{ flexShrink:0 }}>
                    <path d="M7 10L0 0h14L7 10z" fill={stages[idx+1].color} opacity={0.7}/>
                  </svg>
                </div>
              )}
            </div>
          );
        })}

        {/* ── Final badge ── */}
        <div style={{
          marginTop: 8,
          padding: isMobile ? "14px 16px" : "20px 28px",
          borderRadius: isMobile ? 12 : 16,
          background: "linear-gradient(135deg,rgba(22,163,74,0.15),rgba(16,185,129,0.08))",
          border: "1.5px solid rgba(34,197,94,0.35)",
          boxShadow: "0 0 28px rgba(22,163,74,0.18)",
          display: "flex",
          alignItems: "center",
          gap: 12,
          justifyContent: "center",
          flexWrap: "wrap",
          textAlign: "center",
        }}>
          <svg width={isMobile ? 20 : 26} height={isMobile ? 20 : 26} viewBox="0 0 28 28" fill="none">
            <circle cx="14" cy="14" r="13" stroke="#22C55E" strokeWidth="2"/>
            <path d="M8 14l4 4 8-8" stroke="#22C55E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span style={{
            fontSize: isMobile ? 12 : 15,
            fontWeight: 700,
            color: "#86EFAC",
            letterSpacing: "-0.01em",
          }}>
            Application Runtime Ready — Fully Driven by Configuration
          </span>
        </div>
      </div>
    </div>
  );
}