import React from "react";

export default function Explanation() {
  const flowSteps = [
    "MainComponent loads",
    "Fetch configuration metadata",
    "renderTree recursively builds containers",
    "UIDataComponent initializes communication",
    "WebSocket fetches runtime page data",
    "Redux stores GroupTree, FieldList, VariableList, MainValueList, FunctionList",
    "DynamicForm loads metadata",
    "Recursive RenderTree creates containers",
    "RenderingUi creates dynamic fields",
    "refs[] registered",
    "DataToUIFunction pushes server data into UI",
    "User interacts with UI",
    "UiToData extracts values using getProperty()",
    "Redux updates",
    "WebSocket syncs server",
    "ExecuteFunctionList runs calculations/functions",
    "UI refreshes dynamically",
  ];

  const runtimeCards = [
    {
      title: "Dynamic Rendering",
      desc: "UI completely generated from JSON configuration.",
    },
    {
      title: "Runtime Bindings",
      desc: "VariableList maps runtime values to components.",
    },
    {
      title: "WebSocket Sync",
      desc: "Real-time synchronization between frontend and backend.",
    },
    {
      title: "Recursive Engine",
      desc: "Nested containers generated dynamically using recursion.",
    },
    {
      title: "refs[] Runtime Registry",
      desc: "Stores all runtime component references dynamically.",
    },
    {
      title: "Cross Platform",
      desc: "Supports Web and Mobile using Platform Registry.",
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">

      {/* HERO SECTION */}
      <div
        className="
          relative
          overflow-hidden
          rounded-b-[40px]
          bg-gradient-to-b
          from-[#1b2150]
          via-[#0b1028]
          to-black
          py-20
          px-6
          mb-20
        "
      >

        {/* Glow */}
        <div
          className="
            absolute
            top-[-120px]
            left-1/2
            -translate-x-1/2
            w-[500px]
            h-[500px]
            bg-blue-500/10
            blur-[120px]
            rounded-full
          "
        />

        <div
          className="
            absolute
            bottom-[-100px]
            right-[10%]
            w-[300px]
            h-[300px]
            bg-indigo-500/10
            blur-[100px]
            rounded-full
          "
        />

        <div className="relative z-10 max-w-7xl mx-auto text-center">

          {/* BADGE */}
          <div
            className="
              inline-flex
              items-center
              gap-2
              px-6
              py-3
              rounded-full
              border
              border-blue-500/30
              bg-blue-500/10
              text-blue-300
              text-xs
              sm:text-sm
              tracking-[0.2em]
              uppercase
              mb-10
              shadow-[0_0_25px_rgba(59,130,246,0.15)]
              backdrop-blur-md
            "
          >
            <div className="w-2 h-2 rounded-full bg-blue-400" />
            Configuration Driven Architecture
          </div>

          {/* TITLE */}
          <h1
            className="
              text-4xl
              sm:text-6xl
              md:text-7xl
              font-extrabold
              tracking-tight
              text-white
              leading-tight
              mb-8
            "
          >
            Configuration Driven
            <br />

            <span
              className="
                bg-gradient-to-r
                from-blue-300
                via-white
                to-indigo-300
                bg-clip-text
                text-transparent
              "
            >
              UI Engine
            </span>
          </h1>

          {/* SUBTITLE */}
          <p
            className="
              text-base
              sm:text-lg
              md:text-xl
              text-blue-200/70
              max-w-3xl
              mx-auto
              leading-relaxed
            "
          >
            Click any stage to explore the runtime rendering,
            metadata processing, recursive UI generation,
            Redux synchronization, and WebSocket orchestration
            behind the Configuration Driven Runtime Engine.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8">

        {/* FLOWCHART */}
        <div className="mb-24 overflow-hidden">

          <h2
            className="
              text-3xl
              md:text-5xl
              font-bold
              text-center
              mb-14
              text-white
            "
          >
            Complete Runtime Flowchart
          </h2>

          {/* DESKTOP */}
          <div className="hidden lg:block">

            <div className="overflow-x-auto pb-6">

              <div className="flex items-center gap-6 min-w-max px-4">

                {flowSteps.map((step, index) => (
                  <React.Fragment key={index}>

                    <div
                      className="
                        w-[320px]
                        min-h-[180px]
                        bg-[#11162f]
                        border
                        border-blue-500/20
                        rounded-3xl
                        p-6
                        flex
                        flex-col
                        justify-center
                        shadow-[0_0_30px_rgba(59,130,246,0.08)]
                        hover:border-blue-400
                        hover:scale-[1.03]
                        transition-all
                        duration-300
                      "
                    >

                      <div
                        className="
                          w-14
                          h-14
                          rounded-full
                          bg-gradient-to-r
                          from-blue-500
                          to-indigo-500
                          flex
                          items-center
                          justify-center
                          text-white
                          font-bold
                          text-xl
                          mb-5
                        "
                      >
                        {index + 1}
                      </div>

                      <h3 className="text-lg font-bold text-white leading-relaxed">
                        {step}
                      </h3>
                    </div>

                    {index !== flowSteps.length - 1 && (
                      <div className="text-5xl text-blue-400 font-bold">
                        →
                      </div>
                    )}

                  </React.Fragment>
                ))}

              </div>
            </div>
          </div>

          {/* MOBILE */}
          <div className="lg:hidden">

            <div className="flex flex-col items-center gap-4">

              {flowSteps.map((step, index) => (
                <React.Fragment key={index}>

                  <div
                    className="
                      w-full
                      bg-[#11162f]
                      border
                      border-blue-500/20
                      rounded-2xl
                      p-5
                    "
                  >

                    <div className="flex items-start gap-4">

                      <div
                        className="
                          min-w-[50px]
                          min-h-[50px]
                          rounded-full
                          bg-gradient-to-r
                          from-blue-500
                          to-indigo-500
                          flex
                          items-center
                          justify-center
                          text-white
                          font-bold
                        "
                      >
                        {index + 1}
                      </div>

                      <div className="text-sm sm:text-base font-semibold text-white">
                        {step}
                      </div>

                    </div>
                  </div>

                  {index !== flowSteps.length - 1 && (
                    <div className="text-4xl text-blue-400">
                      ↓
                    </div>
                  )}

                </React.Fragment>
              ))}

            </div>
          </div>
        </div>

        {/* FEATURES */}
        <div className="mb-24">

          <h2
            className="
              text-3xl
              md:text-5xl
              font-bold
              text-center
              mb-14
              text-white
            "
          >
            Runtime Engine Features
          </h2>

          <div
            className="
              grid
              grid-cols-1
              sm:grid-cols-2
              lg:grid-cols-3
              gap-8
            "
          >

            {runtimeCards.map((card, index) => (
              <div
                key={index}
                className="
                  bg-[#11162f]
                  border
                  border-blue-500/20
                  rounded-3xl
                  p-8
                  hover:border-blue-400
                  hover:-translate-y-1
                  transition-all
                  duration-300
                  shadow-[0_0_30px_rgba(59,130,246,0.08)]
                "
              >

                <h3 className="text-2xl font-bold mb-4 text-blue-300">
                  {card.title}
                </h3>

                <p className="text-blue-100/70 leading-relaxed">
                  {card.desc}
                </p>

              </div>
            ))}

          </div>
        </div>

        {/* JSON SECTION */}
        <div className="mb-24">

          <h2
            className="
              text-3xl
              md:text-5xl
              font-bold
              text-center
              mb-14
              text-white
            "
          >
            Runtime JSON Structures
          </h2>

          <div className="space-y-10">

            {/* MAIN CONFIG */}
            <div className="bg-[#11162f] rounded-3xl border border-blue-500/20 overflow-hidden">

              <div className="bg-[#1a2148] px-6 py-5 border-b border-blue-500/20">
                <h3 className="text-2xl font-bold text-blue-300">
                  Main Container Configuration
                </h3>
              </div>

              <pre className="p-6 overflow-auto text-sm md:text-base text-blue-100">
{`{
  "main": {
    "Id": "main",
    "containerName": "EmployeePage",
    "module": "HR",
    "currentPage": "EmployeeDetails"
  }
}`}
              </pre>

            </div>

            {/* GROUPTREE */}
            <div className="bg-[#11162f] rounded-3xl border border-blue-500/20 overflow-hidden">

              <div className="bg-[#1a2148] px-6 py-5 border-b border-blue-500/20">
                <h3 className="text-2xl font-bold text-blue-300">
                  GroupTree Syntax
                </h3>
              </div>

              <pre className="p-6 overflow-auto text-sm md:text-base text-blue-100">
{`[
  {
    "groupName": "section",
    "properties": {
      "title": "Employee Information"
    },
    "elements": [1,2],
    "children": []
  }
]`}
              </pre>

            </div>

            {/* FIELDLIST */}
            <div className="bg-[#11162f] rounded-3xl border border-blue-500/20 overflow-hidden">

              <div className="bg-[#1a2148] px-6 py-5 border-b border-blue-500/20">
                <h3 className="text-2xl font-bold text-blue-300">
                  FieldList Syntax
                </h3>
              </div>

              <pre className="p-6 overflow-auto text-sm md:text-base text-blue-100">
{`[
  {
    "index": 1,
    "type": "textbox",
    "mappingType": "Field",
    "properties": {
      "label": "Employee Name"
    }
  },
  {
    "index": 2,
    "type": "dropdown",
    "mappingType": "Field",
    "properties": {
      "label": "Department"
    }
  }
]`}
              </pre>

            </div>

            {/* VARIABLE LIST */}
            <div className="bg-[#11162f] rounded-3xl border border-blue-500/20 overflow-hidden">

              <div className="bg-[#1a2148] px-6 py-5 border-b border-blue-500/20">
                <h3 className="text-2xl font-bold text-blue-300">
                  VariableList Syntax
                </h3>
              </div>

              <pre className="p-6 overflow-auto text-sm md:text-base text-blue-100">
{`[
  {
    "index": [1],
    "prop": ["value"]
  },
  {
    "index": [2],
    "prop": ["SelectedValues"]
  }
]`}
              </pre>

            </div>

          </div>
        </div>

        {/* FINAL SUMMARY */}
        <div
          className="
            bg-gradient-to-r
            from-[#151d42]
            via-[#1a2148]
            to-[#10162f]
            rounded-3xl
            border
            border-blue-500/20
            p-10
            text-center
            mb-20
          "
        >

          <h2
            className="
              text-3xl
              md:text-5xl
              font-extrabold
              mb-6
              text-white
            "
          >
            Final Engine Summary
          </h2>

          <p
            className="
              text-base
              sm:text-lg
              md:text-2xl
              text-blue-100/70
              leading-relaxed
              max-w-5xl
              mx-auto
            "
          >
            This architecture is a complete Configuration Driven Runtime UI
            Execution Engine capable of dynamically rendering applications
            using metadata, recursive rendering, runtime bindings,
            Redux orchestration, WebSocket synchronization,
            runtime calculations, and platform abstraction.
          </p>

        </div>

      </div>
    </div>
  );
}