export default function ConfigDrivenEngineFlow() {
  const flowSteps = [
    {
      id: 1,
      title: "JSON Configuration Creation",
      color: "from-blue-500 to-blue-700",
      icon: "📄",
      description:
        "Developers write complete application configuration in JSON format.",
      items: [
        "FieldList",
        "GroupTree",
        "ClientVariableList",
        "ServerVariableList",
        "InsertQueryList",
        "QueryList",
        "CalculationList",
        "OptionList",
      ],
    },
    {
      id: 2,
      title: "Injection Tool Processing",
      color: "from-green-500 to-emerald-700",
      icon: "⚙️",
      description:
        "Injection engine parses JSON and generates runtime metadata lists.",
      items: [
        "Validate JSON",
        "Generate Metadata Lists",
        "Prepare DB Payload",
        "Build Config Mapping",
      ],
    },
    {
      id: 3,
      title: "Database Injection",
      color: "from-purple-500 to-fuchsia-700",
      icon: "🗄️",
      description:
        "Generated lists are injected into configuration tables.",
      items: [
        "Field Table",
        "GroupTree Table",
        "Query Table",
        "Calculation Table",
        "Option Table",
      ],
    },
    {
      id: 4,
      title: "Runtime Engine Load",
      color: "from-orange-500 to-red-600",
      icon: "🚀",
      description:
        "React engine fetches metadata dynamically from database.",
      items: [
        "Fetch Configurations",
        "Build In-Memory State",
        "Prepare Runtime Variables",
        "Initialize Refs",
      ],
    },
    {
      id: 5,
      title: "Dynamic UI Builder",
      color: "from-cyan-500 to-sky-700",
      icon: "🧩",
      description:
        "UI is generated dynamically using refs and component mapping.",
      items: [
        "Read FieldList",
        "Create Components",
        "Bind Refs",
        "Apply Calculations",
        "Attach Validations",
        "Inject Dropdown Options",
      ],
    },
    {
      id: 6,
      title: "Runtime Execution",
      color: "from-indigo-500 to-violet-700",
      icon: "⚡",
      description:
        "User interaction drives validations, queries, and calculations dynamically.",
      items: [
        "User Interaction",
        "Validation Engine",
        "Query Execution",
        "Insert/Update/Delete",
        "Dynamic Refresh",
        "Variable Synchronization",
      ],
    },
  ];

  const architecture = [
    {
      title: "Configuration Layer",
      children: [
        "JSON Schema",
        "Field Definitions",
        "Group Tree",
        "Business Rules",
      ],
    },
    {
      title: "Metadata Layer",
      children: [
        "FieldList",
        "QueryList",
        "OptionList",
        "CalculationList",
      ],
    },
    {
      title: "Runtime Engine",
      children: [
        "React Refs",
        "Redux Store",
        "Variable Engine",
        "Validation Engine",
      ],
    },
    {
      title: "Dynamic UI",
      children: [
        "Dynamic Components",
        "Dynamic Forms",
        "Binding System",
        "Workflow Actions",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6 md:p-10">
      {/* HEADER */}
      <div className="max-w-7xl mx-auto mb-12 text-center">
        <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-slate-800 border border-slate-700 mb-6">
          <span className="text-2xl">⚙️</span>
          <span className="text-sm tracking-widest uppercase text-slate-300">
            Configuration Driven Development
          </span>
        </div>

        <h1 className="text-4xl md:text-6xl font-black bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent leading-tight">
          Dynamic UI Engine Architecture
        </h1>

        <p className="text-slate-400 max-w-4xl mx-auto mt-6 text-base md:text-lg leading-8">
          Fully configuration-driven enterprise application engine where
          complete UI, validations, queries, calculations, workflows, and
          bindings are generated dynamically from JSON metadata.
        </p>
      </div>

      {/* FLOW SECTION */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {flowSteps.map((step, index) => (
            <div
              key={step.id}
              className="relative bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl"
            >
              <div
                className={`h-2 bg-gradient-to-r ${step.color}`}
              />

              <div className="p-6 md:p-8">
                <div className="flex items-start justify-between gap-4 mb-6">
                  <div>
                    <div className="flex items-center gap-4 mb-3">
                      <div
                        className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${step.color} flex items-center justify-center text-3xl shadow-xl`}
                      >
                        {step.icon}
                      </div>

                      <div>
                        <p className="text-slate-500 text-sm font-semibold uppercase tracking-widest">
                          Step {step.id}
                        </p>
                        <h2 className="text-2xl font-bold text-white leading-tight">
                          {step.title}
                        </h2>
                      </div>
                    </div>

                    <p className="text-slate-400 leading-7 text-sm md:text-base">
                      {step.description}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6">
                  {step.items.map((item) => (
                    <div
                      key={item}
                      className="bg-slate-800/70 border border-slate-700 rounded-xl px-4 py-3 text-sm text-slate-200 hover:border-cyan-500 transition-all duration-300"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              {index !== flowSteps.length - 1 && (
                <div className="hidden lg:flex absolute -bottom-5 left-1/2 -translate-x-1/2 z-20">
                  <div className="w-10 h-10 rounded-full bg-cyan-500 flex items-center justify-center text-black font-bold shadow-2xl">
                    ↓
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* RUNTIME FLOW */}
      <div className="max-w-7xl mx-auto mt-20">
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 md:p-10 shadow-2xl">
          <h2 className="text-3xl md:text-4xl font-black mb-10 text-center bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">
            Runtime Architecture Flow
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {architecture.map((layer, idx) => (
              <div
                key={layer.title}
                className="relative bg-slate-800 border border-slate-700 rounded-2xl p-6"
              >
                <div className="flex items-center justify-between mb-5">
                  <h3 className="text-xl font-bold text-white">
                    {layer.title}
                  </h3>

                  <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-500 flex items-center justify-center text-cyan-400 font-bold">
                    {idx + 1}
                  </div>
                </div>

                <div className="space-y-3">
                  {layer.children.map((child) => (
                    <div
                      key={child}
                      className="bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm text-slate-300"
                    >
                      {child}
                    </div>
                  ))}
                </div>

                {idx !== architecture.length - 1 && (
                  <div className="hidden xl:flex absolute top-1/2 -right-6 -translate-y-1/2 text-cyan-400 text-3xl font-black z-20">
                    →
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ENGINE FEATURES */}
      <div className="max-w-7xl mx-auto mt-20 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {[
          {
            title: "Dynamic Components",
            desc: "UI components are created dynamically using component mapping.",
            icon: "🧱",
          },
          {
            title: "Runtime Ref Binding",
            desc: "Refs control values, visibility, validations, and dependency updates.",
            icon: "🔗",
          },
          {
            title: "Configuration Queries",
            desc: "Insert, update, and fetch operations are driven from metadata.",
            icon: "🗃️",
          },
          {
            title: "Calculation Engine",
            desc: "Rules and calculations execute dynamically without hardcoding.",
            icon: "🧮",
          },
        ].map((feature) => (
          <div
            key={feature.title}
            className="bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 rounded-3xl p-6 hover:scale-[1.02] transition-all duration-300"
          >
            <div className="text-5xl mb-5">
              {feature.icon}
            </div>

            <h3 className="text-2xl font-bold mb-4 text-white">
              {feature.title}
            </h3>

            <p className="text-slate-400 leading-7 text-sm md:text-base">
              {feature.desc}
            </p>
          </div>
        ))}
      </div>

      {/* FOOTER */}
      <div className="max-w-7xl mx-auto mt-20 text-center">
        <div className="inline-flex flex-wrap items-center justify-center gap-4 bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-5 rounded-2xl shadow-2xl">
          <span className="text-2xl">🚀</span>
          <span className="text-lg md:text-2xl font-black text-white text-center">
            Fully Dynamic • Metadata Driven • Runtime Generated UI Engine
          </span>
        </div>
      </div>
    </div>
  );
}
