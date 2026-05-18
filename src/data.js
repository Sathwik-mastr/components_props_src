export const COMPONENTS = [
  {
    id: "unified-dynamic-table",
    name: "UnifiedDynamicTable",
    description:
      "A full-featured data grid supporting inline editing, card view, row selection, sorting, filtering, validation, and pagination.",
    tags: ["grid", "table", "editable", "MUI"],
    propGroups: [
      {
        group: "Core / Identity",
        props: [
          { name: "component", type: "string", defaultVal: "—", required: false, description: "Identifier for the icon-label component shown in the header.", usage: "Used to render <IconLabelComponent> when no title is provided. e.g. 'grid'" },
          { name: "iconName", type: "string", defaultVal: "—", required: false, description: "Name of the icon displayed in the header beside the tagline.", usage: "Pass the icon key that <IconLabelComponent> expects, e.g. 'table' or 'list'." },
          { name: "iconColor", type: "string", defaultVal: "—", required: false, description: "CSS color string applied to the header icon.", usage: "Any valid CSS color: '#4a6cf7' or 'var(--primary)'." },
          { name: "iconBgClass", type: "string", defaultVal: "—", required: false, description: "CSS class applied to the icon background wrapper in the header.", usage: "Tailwind/utility classes like 'bg-blue-100 rounded-lg'." },
          { name: "title", type: "string", defaultVal: "—", required: false, description: "If provided, renders a plain <h3> title instead of the icon-label component.", usage: "Use when a simple text label is preferred over the icon+tagline pattern." },
          { name: "titleClass", type: "string", defaultVal: "—", required: false, description: "CSS class applied to the <h3> title element.", usage: "Custom font, weight, or color class from your stylesheet." },
          { name: "tagline", type: "string", defaultVal: "—", required: false, description: "Subtitle text displayed below the icon in the header.", usage: "A one-line descriptor e.g. 'Manage loan records'." },
          { name: "children", type: "any", defaultVal: "—", required: false, description: "Child nodes forwarded into the icon-label component.", usage: "Rarely needed — only if <IconLabelComponent> accepts slotted content." },
        ],
      },
      {
        group: "Column Configuration",
        props: [
          { name: "columnTitles", type: "array", defaultVal: "[]", required: true, description: "Array of column header strings in display order.", usage: "['Name','Age','Status'] — drives column rendering, sorting, filters, and validation keys." },
          { name: "rowVisible", type: "array", defaultVal: "[]", required: true, description: "Parallel array of 'true'/'false' strings controlling column visibility.", usage: "['true','false','true'] — hidden columns excluded from render but still exist in data." },
          { name: "rowTypes", type: "array", defaultVal: "[]", required: false, description: "Parallel array of cell display-type strings.", usage: "'toggle' columns are never disabled by isCellDisabled. e.g. ['text','toggle','badge']" },
          { name: "rowInputs", type: "array", defaultVal: "[]", required: false, description: "Parallel array of input types for inline-edit and add-row cells.", usage: "'text','number','dropdown','upload','date' — passed to <ValidatedCell> type prop." },
          { name: "format", type: "array", defaultVal: "[]", required: false, description: "Parallel array of display format strings applied to cell values.", usage: "'currency','date','percent' — consumed by renderExternalCell for formatting output." },
          { name: "highlightColumns", type: "array", defaultVal: "[]", required: false, description: "Column names that receive conditional highlight coloring.", usage: "Column titles whose values trigger getHighlightColor for color-coded cells." },
          { name: "addColumn", type: "array", defaultVal: "[]", required: false, description: "Array of action column config objects with label and icons[].", usage: "[{label:'Actions', icons:['edit','delete']}] — adds an icon-button column outside inline-edit mode." },
        ],
      },
      {
        group: "Data & State",
        props: [
          { name: "tableData", type: "object", defaultVal: "{}", required: false, description: "Meta-config object. Currently supports showSearch (boolean).", usage: "Pass {showSearch: true} to render the search bar in the header." },
          { name: "rowTotal", type: "object", defaultVal: "{enable:false,label:'Total',columns:[]}", required: false, description: "Config for a computed row-total column in inline-edit mode.", usage: "{enable:true, label:'Sum', columns:['Amount','Tax']} — sums the listed columns per row." },
          { name: "footer", type: "object", defaultVal: "{}", required: false, description: "Config for the table footer totals row.", usage: "{showFooter:true, totalLabel:'Grand Total'} — shows a summed footer row below the body." },
          { name: "groupAggregations", type: "object", defaultVal: "null", required: false, description: "Config for group-level column aggregations passed to the hook.", usage: "Enables grouped sum/avg/count computations via useUnifiedTableLogic." },
          { name: "dropdownConfig", type: "object", defaultVal: "{}", required: false, description: "Maps column indexes to dropdown option sources or configs.", usage: "Drives dynamic select options in editable cells via dropdownConfigState." },
          { name: "dependency", type: "object", defaultVal: "{}", required: false, description: "Cell dependency map — defines which fields auto-fill based on another field's value.", usage: "When a source column changes, dependent column values are auto-populated." },
          { name: "Options", type: "array", defaultVal: "[]", required: false, description: "Static option lists forwarded to the hook for dropdown cells.", usage: "Parallel to columnTitles — each entry is an array of values for that column's dropdown." },
          { name: "Options_Input", type: "array", defaultVal: "—", required: false, description: "Input-specific option lists separate from display options.", usage: "Useful when the add-row input needs different options from the display dropdown." },
        ],
      },
      {
        group: "Behaviour & Features",
        props: [
          { name: "InlineEdit", type: "boolean", defaultVal: "false", required: false, description: "Enables inline row editing with Save/Cancel/Edit/Delete action buttons.", usage: "Set true for editable grids. False = read-only table with external action icons only." },
          { name: "rowSelect", type: "boolean", defaultVal: "false", required: false, description: "Adds a checkbox column for row selection.", usage: "Enable when the parent form needs to know which rows are 'selected' before saving." },
          { name: "cardview", type: "boolean", defaultVal: "false", required: false, description: "Renders data as a responsive card grid instead of a table.", usage: "Ideal for mobile-friendly layouts or visually rich record displays." },
          { name: "cardColumnTrue", type: "boolean", defaultVal: "false", required: false, description: "In card view, only shows columns where rowVisible is 'true'.", usage: "Set true to respect column visibility in card mode; false shows all columns." },
          { name: "header", type: "boolean", defaultVal: "true", required: false, description: "Toggles the entire header section (title, search, add button, filter button).", usage: "Set false to embed the table without any header UI." },
          { name: "showFilterButton", type: "boolean", defaultVal: "true", required: false, description: "Controls visibility of the Filter/Hide Filters toggle button.", usage: "Set false to suppress the filter button while keeping the rest of the header." },
          { name: "visible", type: "boolean", defaultVal: "true", required: false, description: "Controls whether the whole component renders at all.", usage: "Tie to form-level visibility rules — false causes early return (null)." },
          { name: "mandatory", type: "boolean", defaultVal: "true", required: false, description: "Marks the table as required for form submission.", usage: "Used by hook to gate submission if the table has no selected rows." },
          { name: "tableRequired", type: "boolean", defaultVal: "false", required: false, description: "Shows a warning dialog if the user tries to proceed with an empty table.", usage: "Set true when at least one data row must exist before the form can be saved." },
          { name: "backendValidation", type: "boolean", defaultVal: "true", required: false, description: "Enables server-side validation integration.", usage: "Set false to skip backend validation calls and rely on client-side rules only." },
        ],
      },
      {
        group: "Validation",
        props: [
          { name: "validationRules", type: "array", defaultVal: "—", required: false, description: "Parallel array of validation rule objects for each column.", usage: "[null,{required:true},{min:0,max:100}] — consumed by validateRow and <ValidatedCell>." },
          { name: "dependencyValidation", type: "array | object", defaultVal: "—", required: false, description: "Validation rules that depend on another cell's value.", usage: "Cross-field validators e.g. 'End Date must be after Start Date'." },
          { name: "dependencyFields", type: "array", defaultVal: "[]", required: false, description: "Column indexes that act as dependency triggers.", usage: "When a value at these indexes changes, dependent column values are cleared." },
          { name: "dependentIndexes", type: "array", defaultVal: "[]", required: false, description: "Column indexes that get cleared when a dependencyField changes.", usage: "Paired with dependencyFields to implement cascading dropdowns." },
          { name: "Celldependency", type: "any", defaultVal: "—", required: false, description: "Cell-level dependency config forwarded to the hook.", usage: "Fine-grained per-cell dependency logic beyond column-level dependency." },
          { name: "autoIncrement", type: "array", defaultVal: "[]", required: false, description: "Config for auto-incrementing column values on blur.", usage: "[{colIndex:0, start:1}] — auto-fills sequential IDs when the user tabs out." },
        ],
      },
      {
        group: "Actions & Events",
        props: [
          { name: "addButtonLabel", type: "string", defaultVal: "—", required: false, description: "Label text for the Add button. Button is hidden when empty.", usage: "'+ Add Loan' — triggers pagination/add command when clicked in non-inline mode." },
          { name: "addButtonStyle", type: "object", defaultVal: "{}", required: false, description: "Inline style object applied to the Add button.", usage: "{backgroundColor:'#4a6cf7', color:'#fff'} — overrides MUI Button default styles." },
          { name: "AddbtnClass", type: "string", defaultVal: "''", required: false, description: "CSS class applied to the Add button element.", usage: "Useful for targeting the button with external stylesheets." },
          { name: "ActionsType", type: "string", defaultVal: "—", required: false, description: "Action type string passed to executeCommands / pagination payload.", usage: "Identifies what command to fire when the add button or icon actions are clicked." },
          { name: "event", type: "any", defaultVal: "—", required: false, description: "Event config forwarded to executeCommands for row actions.", usage: "Carries context (form ID, parent entity key, etc.) for the command dispatcher." },
          { name: "pagenation", type: "any", defaultVal: "—", required: false, description: "Pagination config forwarded to buildPaginationPayload.", usage: "Drives server-side paging when Add or action icons fire commands." },
          { name: "parameters", type: "any", defaultVal: "—", required: false, description: "Extra parameters passed to handleIconClickExternal.", usage: "Contextual data (e.g. parent record ID) needed by external icon actions." },
          { name: "onGridUpdate", type: "function", defaultVal: "()=>{}", required: false, description: "Callback fired whenever the grid data changes.", usage: "Sync the table's current data to parent state: (rows) => setMyRows(rows)." },
          { name: "actionRules", type: "array", defaultVal: "[]", required: false, description: "Rules controlling which action icons are visible per row.", usage: "e.g. hide 'delete' for rows in 'Approved' status." },
          { name: "buttonlabels", type: "array", defaultVal: "[]", required: false, description: "Custom label strings for action buttons in cells.", usage: "Override default icon-button tooltips or labels per column." },
        ],
      },
      {
        group: "Upload & Persistence",
        props: [
          { name: "uploadPersist", type: "string", defaultVal: "''", required: false, description: "Key used to persist uploaded file paths in Redux.", usage: "Pass the form/entity ID so uploaded paths are stored under the right slice key." },
          { name: "DbDelete", type: "any", defaultVal: "—", required: false, description: "Config for soft/hard delete behavior when rows are removed.", usage: "Passed to the hook to determine whether deletion hits the DB immediately." },
          { name: "deleteFlagColumnIndex", type: "number", defaultVal: "—", required: false, description: "Column index used as a soft-delete flag in the data.", usage: "When a row is 'deleted', this column is set to a truthy value instead of removing the row." },
        ],
      },
      {
        group: "Display Extras",
        props: [
          { name: "cardIcons", type: "array", defaultVal: "[]", required: false, description: "Parallel array of icon name strings for card-view column rows.", usage: "['phone','email','location'] — overrides the auto-detected icon per column in card mode." },
          { name: "popup", type: "any", defaultVal: "—", required: false, description: "Popup config forwarded to renderExternalCell for cell-level popups.", usage: "Enables click-to-expand or detail-popup behavior on specific cell types." },
          { name: "mainExtension", type: "string", defaultVal: "—", required: false, description: "Extension/module identifier forwarded to ValidatedCell and upload logic.", usage: "Used to scope file uploads and hook behavior to the current form instance." },
          { name: "index", type: "any", defaultVal: "—", required: false, description: "Identifier for this table instance used in Redux updates.", usage: "Passed to SetUIChangedList so Redux knows which table triggered a change." },
          { name: "prop", type: "string", defaultVal: "'export'", required: false, description: "Property key used when pushing data to Redux/export.", usage: "Default 'export' matches the standard grid output key in the shared slice." },
          { name: "Export_Names", type: "any", defaultVal: "—", required: false, description: "Export name map used in UpdateRowObjects and renderExternalCell.", usage: "Maps column keys to their server-side field names for command dispatching." },
          { name: "rowFilter", type: "array", defaultVal: "—", required: false, description: "Parallel array of 'true'/'false' strings enabling filter inputs per column.", usage: "['true','false','true'] — only 'true' columns show a filter input in the filter row." },
          { name: "rowFilterType", type: "array", defaultVal: "—", required: false, description: "Parallel array of filter input types: 'text' or 'dropdown'.", usage: "['text','dropdown'] — determines what control appears in the filter row for each column." },
          { name: "rowFilterValues", type: "array", defaultVal: "—", required: false, description: "Parallel array of option arrays for dropdown-type column filters.", usage: "[null,['Active','Pending','Closed']] — provides the option list for dropdown filters." },
          { name: "rowVar", type: "array", defaultVal: "[]", required: false, description: "Row-level variable config forwarded to the hook.", usage: "Used internally for row-expression evaluation and row-state initialisation." },
          { name: "expressions", type: "object", defaultVal: "—", required: false, description: "Column-level computed expressions evaluated by the hook.", usage: "{'Total':'row.Qty * row.Price'} — auto-computed column values across all rows." },
          { name: "rowExpressions", type: "object", defaultVal: "—", required: false, description: "Per-row expressions evaluated whenever a cell changes.", usage: "{'Amount':'row.Rate * row.Units'} — recalculates on every cell edit inline." },
          { name: "columnAggregations", type: "object", defaultVal: "—", required: false, description: "Aggregation config (sum/avg/count) per column for the footer.", usage: "{'Amount':'sum','Count':'count'} — drives columnAggResults used in the footer row." },
          { name: "SavedKeys", type: "any", defaultVal: "—", required: false, description: "Keys of previously saved data forwarded to the hook.", usage: "Allows the table to pre-mark rows as saved vs. newly inserted." },
        ],
      },
    ],
  },

  // ─── ADD MORE COMPONENTS BELOW — same shape ───────────────────────────────

  {
    id: "text-field-component",
    name: "TextFieldComponent",
    description:
      "A controlled MUI TextField wrapper with built-in validation, masking, visibility toggling, enable/disable state, amount validation popup, and blur/change handling — all driven by useTextFieldLogic.",
    tags: ["input", "form", "MUI", "validation", "forwardRef"],
    propGroups: [
      {
        group: "Core Value & Label",
        props: [
          { name: "value", type: "any", defaultVal: "—", required: true, description: "The current value of the text field, passed into useTextFieldLogic to compute the display value.", usage: "Bind to your form state: values={formValues.loanAmount}" },
          { name: "label", type: "string", defaultVal: "''", required: false, description: "Floating label text rendered above the MUI TextField input.", usage: "label='Loan Amount' — shown as a shrinking label on focus." },
          { name: "prop", type: "string", defaultVal: "'value'", required: false, description: "The key within the form state object this field reads from and writes to.", usage: "prop='loanAmount' — tells the hook which key to update in setFormValues." },
          { name: "empty", type: "any", defaultVal: "—", required: false, description: "Fallback/empty value passed to the hook for display when values is null or undefined.", usage: "empty='' or empty=0 depending on field type." },
          { name: "children", type: "any", defaultVal: "—", required: false, description: "Child nodes — forwarded through the component but not rendered directly by TextFieldComponent.", usage: "Rarely used; available for composition patterns." },
        ],
      },
      {
        group: "State & Visibility",
        props: [
          { name: "visible", type: "boolean", defaultVal: "true", required: false, description: "Controls whether the field renders at all. When false the component returns null.", usage: "visible={formValues.showAltContact} — conditionally shows the field." },
          { name: "enable", type: "boolean", defaultVal: "false", required: false, description: "When true, the MUI TextField is rendered as disabled (read-only interaction).", usage: "enable={!isEditMode} — disables the field outside of edit mode." },
          { name: "readOnly", type: "boolean", defaultVal: "false", required: false, description: "Sets the native inputProps.readOnly on the underlying <input> element — allows focus/copy but blocks typing.", usage: "readOnly={true} for display-only fields that still need to be tabbable." },
          { name: "initialValidation", type: "any", defaultVal: "—", required: false, description: "Triggers validation on mount / initial render when provided.", usage: "Pass the initial error state or a flag so the hook can pre-validate on load." },
        ],
      },
      {
        group: "Event Handlers",
        props: [
          { name: "onChange", type: "function", defaultVal: "—", required: false, description: "External onChange callback forwarded to useTextFieldLogic. Called after internal state is updated.", usage: "onChange={(val) => console.log(val)} — receives the new value, not the raw event." },
          { name: "onBlur", type: "function", defaultVal: "—", required: false, description: "External onBlur callback forwarded to the hook. Also triggered when Enter is pressed.", usage: "onBlur={() => validateField('email')} — useful for deferred validation." },
        ],
      },
      {
        group: "Validation & Errors",
        props: [
          { name: "error", type: "boolean | string", defaultVal: "—", required: false, description: "External error state passed from the parent form. Combined with internalError from the hook to show MUI error styling.", usage: "error={errors.loanAmount} — pass the error string or boolean from your form validator." },
          { name: "helperText", type: "string", defaultVal: "—", required: false, description: "Static helper text displayed below the field via FormHelperText. Overridden by internalError when present.", usage: "helperText='Enter the sanctioned loan amount' — shown when there is no validation error." },
          { name: "yupcondition", type: "any", defaultVal: "—", required: false, description: "Yup-based conditional validation config forwarded to the hook.", usage: "Passes a Yup schema or condition expression for dynamic field validation." },
          { name: "AmountValidation", type: "any", defaultVal: "—", required: false, description: "Config to trigger the amount-validation popup dialog. When the condition is met, showAmountPopup becomes true.", usage: "AmountValidation={lanOdConfig} — shows a DialogueboxComponentss warning about part-payment restrictions." },
          { name: "limit", type: "number | string", defaultVal: "—", required: false, description: "Maximum character or value limit enforced by the hook.", usage: "limit={10} to cap input length or numeric range." },
          { name: "limitType", type: "string", defaultVal: "—", required: false, description: "Specifies the kind of limit — e.g. 'char', 'value'. Tells the hook how to apply the limit prop.", usage: "limitType='char' caps character count; limitType='value' caps the numeric value." },
        ],
      },
      {
        group: "Form Integration",
        props: [
          { name: "mainExtension", type: "string", defaultVal: "—", required: false, description: "Form/module identifier passed to the hook and the amount-popup component for scoping Redux updates.", usage: "mainExtension='loanApplicationForm' — scopes all field updates to the correct form slice." },
          { name: "index", type: "any", defaultVal: "—", required: false, description: "Field identifier used as the MUI TextField id and forwarded to the hook.", usage: "index='loanAmount' — used for label association and hook-level field tracking." },
          { name: "setFormValues", type: "function", defaultVal: "—", required: false, description: "React state setter for the parent form values object. The hook calls this on every change.", usage: "setFormValues={setFormValues} — direct from useState or useReducer dispatch." },
          { name: "setErrors", type: "function", defaultVal: "—", required: false, description: "React state setter for the parent form errors object. The hook calls this when validation fires.", usage: "setErrors={setErrors} — keeps error state in sync with the parent form." },
          { name: "ElementList", type: "any", defaultVal: "—", required: false, description: "List of related form elements forwarded to the hook for cross-field logic.", usage: "Used when field visibility or value depends on sibling fields." },
          { name: "refs", type: "any", defaultVal: "—", required: false, description: "Ref map of sibling fields forwarded to the hook for programmatic focus management.", usage: "refs={fieldRefs} — lets the hook shift focus to the next field on Enter." },
          { name: "mask", type: "string | object", defaultVal: "—", required: false, description: "Input mask pattern forwarded to the hook to format the display value.", usage: "mask='99/99/9999' for date fields or mask={phoneMask} for phone inputs." },
          { name: "pagenation", type: "any", defaultVal: "—", required: false, description: "Pagination config forwarded to the DialogueboxComponentss amount-popup.", usage: "Required when AmountValidation is active — drives the popup's continue/cancel commands." },
        ],
      },
      {
        group: "Styling",
        props: [
          { name: "style", type: "object", defaultVal: "—", required: false, description: "Style overrides object. Supports width and fieldset sub-keys that are applied to MUI sx props.", usage: "style={{ width: '50%', fieldset: { borderColor: 'red' } }} — custom width and border color." },
        ],
      },
    ],
  },

  {
  id: "dynamic-combobox-component",
  name: "DropDownComponent",
  description:
    "A reusable MUI Autocomplete wrapper with freeSolo search, dynamic option formatting, filtering, validation, visibility toggling, enable/disable state, backend option syncing, and keyboard handling — all powered by useSearchbarLogic.",
  tags: [
    "autocomplete",
    "searchbar",
    "dropdown",
    "MUI",
    "validation",
    "forwardRef",
  ],

  propGroups: [
    {
      group: "Core Display & Selection",
      props: [
        {
          name: "label",
          type: "string",
          defaultVal: "''",
          required: false,
          description:
            "Floating label displayed above the Autocomplete input.",
          usage:
            "label='Country' — shows a floating label on focus.",
        },

        {
          name: "defaultOption",
          type: "string",
          defaultVal: "'Select'",
          required: false,
          description:
            "Placeholder text shown inside the input when no value is selected.",
          usage:
            "defaultOption='Select Country'",
        },

        {
          name: "prop",
          type: "string",
          defaultVal: "'Select'",
          required: false,
          description:
            "Key name used by useSearchbarLogic to read/write form values.",
          usage:
            "prop='country' — updates formValues.country.",
        },

        {
          name: "options",
          type: "array",
          defaultVal: "[]",
          required: false,
          description:
            "Dropdown options rendered inside the Autocomplete component.",
          usage:
            "options={[{ SequenceID: 1, OptionValue: 'India' }]}",
        },

        {
          name: "value",
          type: "any",
          defaultVal: "—",
          required: false,
          description:
            "Selected value managed internally through useSearchbarLogic.",
          usage:
            "Controlled automatically through selectedOption.",
        },
      ],
    },

    {
      group: "Visibility & Interaction",
      props: [
        {
          name: "visible",
          type: "boolean",
          defaultVal: "true",
          required: false,
          description:
            "Controls whether the component renders. Returns null when false.",
          usage:
            "visible={formValues.showCountry}",
        },

        {
          name: "enable",
          type: "boolean",
          defaultVal: "false",
          required: false,
          description:
            "Disables the Autocomplete input when true.",
          usage:
            "enable={!isEditable}",
        },

        {
          name: "readOnly",
          type: "boolean",
          defaultVal: "false",
          required: false,
          description:
            "Prevents editing while still allowing focus and text selection.",
          usage:
            "readOnly={true}",
        },
      ],
    },

    {
      group: "Validation & Errors",
      props: [
        {
          name: "error",
          type: "boolean | string",
          defaultVal: "—",
          required: false,
          description:
            "External validation error passed from parent form.",
          usage:
            "error={errors.country}",
        },

        {
          name: "helperText",
          type: "string",
          defaultVal: "—",
          required: false,
          description:
            "Helper message shown below the component when no internal error exists.",
          usage:
            "helperText='Select your country'",
        },

        {
          name: "empty",
          type: "any",
          defaultVal: "—",
          required: false,
          description:
            "Fallback value used when the selected option is empty or undefined.",
          usage:
            "empty=''",
        },

        {
          name: "initialValidation",
          type: "any",
          defaultVal: "—",
          required: false,
          description:
            "Triggers validation logic during initial render.",
          usage:
            "initialValidation={true}",
        },
      ],
    },

    {
      group: "Form Integration",
      props: [
        {
          name: "setFormValues",
          type: "function",
          defaultVal: "—",
          required: false,
          description:
            "Updates parent form state whenever selection changes.",
          usage:
            "setFormValues={setFormValues}",
        },

        {
          name: "setErrors",
          type: "function",
          defaultVal: "—",
          required: false,
          description:
            "Updates parent error state from validation logic.",
          usage:
            "setErrors={setErrors}",
        },

        {
          name: "mainExtension",
          type: "string",
          defaultVal: "—",
          required: false,
          description:
            "Module/form identifier used for scoped state handling.",
          usage:
            "mainExtension='customerForm'",
        },

        {
          name: "index",
          type: "string | number",
          defaultVal: "—",
          required: false,
          description:
            "Unique field identifier forwarded to MUI and logic hooks.",
          usage:
            "index='countryField'",
        },

        {
          name: "ElementList",
          type: "array",
          defaultVal: "[]",
          required: false,
          description:
            "List of related form elements used for dependency-based logic.",
          usage:
            "ElementList={formElements}",
        },
      ],
    },

    {
      group: "Event Handlers",
      props: [
        {
          name: "onChange",
          type: "function",
          defaultVal: "—",
          required: false,
          description:
            "Callback triggered whenever the selected option changes.",
          usage:
            "onChange={(value) => console.log(value)}",
        },
      ],
    },

    {
      group: "Option Handling",
      props: [
        {
          name: "optionsFormat",
          type: "number",
          defaultVal: "—",
          required: false,
          description:
            "Controls how options are compared and rendered internally.",
          usage:
            "optionsFormat={3} for primitive string arrays.",
        },

        {
          name: "selectedOption",
          type: "object | string",
          defaultVal: "null",
          required: false,
          description:
            "Currently selected option from UI interaction.",
          usage:
            "Managed internally by useSearchbarLogic.",
        },

        {
          name: "selectedBackendOption",
          type: "object | string",
          defaultVal: "null",
          required: false,
          description:
            "Preloaded value mapped from backend response.",
          usage:
            "Used to display saved values during edit mode.",
        },

        {
          name: "inputValue",
          type: "string",
          defaultVal: "''",
          required: false,
          description:
            "Current typed search text inside the Autocomplete input.",
          usage:
            "Managed automatically through handleInputChange.",
        },
      ],
    },

    {
      group: "Styling",
      props: [
        {
          name: "style",
          type: "object",
          defaultVal: "{}",
          required: false,
          description:
            "Inline style object applied to the FormControl wrapper.",
          usage:
            "style={{ width: '300px' }}",
        },
      ],
    },
  ],
},

{
  id: "multi-select-dropdown-component",
  name: "MultiSelectDropdown",
  description:
    "A reusable MUI multi-select dropdown component with checkbox selection, optional search filtering, validation handling, dynamic visibility, and controlled form integration — powered by useMultiSelectLogic.",
  
  tags: [
    "multiselect",
    "dropdown",
    "MUI",
    "checkbox",
    "search",
    "validation",
    "forwardRef",
  ],

  propGroups: [
    {
      group: "Core Selection & Display",
      props: [
        {
          name: "label",
          type: "string",
          defaultVal: "''",
          required: false,
          description:
            "Floating label displayed above the Select component.",
          usage:
            "label='Select Skills'",
        },

        {
          name: "prop",
          type: "string",
          defaultVal: "'select'",
          required: false,
          description:
            "Key used by useMultiSelectLogic to read/write selected values in form state.",
          usage:
            "prop='skills' — updates formValues.skills.",
        },

        {
          name: "options",
          type: "array",
          defaultVal: "[]",
          required: false,
          description:
            "Dropdown option list rendered inside the multi-select menu.",
          usage:
            "options={[{ SequenceID: 1, OptionValue: 'React' }]}",
        },

        {
          name: "localSelected",
          type: "array",
          defaultVal: "[]",
          required: false,
          description:
            "Currently selected option IDs managed internally by useMultiSelectLogic.",
          usage:
            "Managed internally through handleChange.",
        },
      ],
    },

    {
      group: "Visibility & Interaction",
      props: [
        {
          name: "readOnly",
          type: "boolean",
          defaultVal: "false",
          required: false,
          description:
            "Disables the dropdown and prevents user interaction when true.",
          usage:
            "readOnly={true}",
        },

        {
          name: "visibleState",
          type: "boolean",
          defaultVal: "true",
          required: false,
          description:
            "Controls component visibility internally. Component returns null when false.",
          usage:
            "Handled internally through useMultiSelectLogic.",
        },

        {
          name: "filter",
          type: "boolean",
          defaultVal: "false",
          required: false,
          description:
            "Enables searchable filtering inside the dropdown menu.",
          usage:
            "filter={true} — shows search input inside dropdown.",
        },
      ],
    },

    {
      group: "Validation & Errors",
      props: [
        {
          name: "internalError",
          type: "string",
          defaultVal: "''",
          required: false,
          description:
            "Validation error message returned from useMultiSelectLogic.",
          usage:
            "Displayed automatically using FormHelperText.",
        },

        {
          name: "setErrors",
          type: "function",
          defaultVal: "—",
          required: false,
          description:
            "Updates parent error state whenever validation changes.",
          usage:
            "setErrors={setErrors}",
        },

        {
          name: "initialValidation",
          type: "any",
          defaultVal: "—",
          required: false,
          description:
            "Triggers validation logic during initial render.",
          usage:
            "initialValidation={true}",
        },
      ],
    },

    {
      group: "Filtering & Search",
      props: [
        {
          name: "searchValue",
          type: "string",
          defaultVal: "''",
          required: false,
          description:
            "Current text entered into the dropdown search field.",
          usage:
            "Managed internally through setSearchValue.",
        },

        {
          name: "setSearchValue",
          type: "function",
          defaultVal: "—",
          required: false,
          description:
            "Updates the internal search text used for filtering options.",
          usage:
            "setSearchValue('React')",
        },

        {
          name: "filteredOptions",
          type: "array",
          defaultVal: "[]",
          required: false,
          description:
            "Filtered option list displayed after applying search text.",
          usage:
            "Automatically derived when filter={true}.",
        },

        {
          name: "optionMap",
          type: "object",
          defaultVal: "{}",
          required: false,
          description:
            "Maps SequenceID values to display labels for renderValue formatting.",
          usage:
            "{ '1': 'React', '2': 'Node.js' }",
        },
      ],
    },

    {
      group: "Form Integration",
      props: [
        {
          name: "setFormValues",
          type: "function",
          defaultVal: "—",
          required: false,
          description:
            "Updates parent form state whenever selected values change.",
          usage:
            "setFormValues={setFormValues}",
        },

        {
          name: "mainExtension",
          type: "string",
          defaultVal: "—",
          required: false,
          description:
            "Module/form identifier used for scoped state handling.",
          usage:
            "mainExtension='employeeForm'",
        },

        {
          name: "index",
          type: "string | number",
          defaultVal: "—",
          required: false,
          description:
            "Unique field identifier forwarded to useMultiSelectLogic.",
          usage:
            "index='skillsDropdown'",
        },

        {
          name: "ElementList",
          type: "array",
          defaultVal: "[]",
          required: false,
          description:
            "List of related form elements used for dependency-based logic.",
          usage:
            "ElementList={formElements}",
        },

        {
          name: "refs",
          type: "object",
          defaultVal: "{}",
          required: false,
          description:
            "Reference map used for programmatic focus management.",
          usage:
            "refs={fieldRefs}",
        },
      ],
    },

    {
      group: "Event Handling",
      props: [
        {
          name: "handleChange",
          type: "function",
          defaultVal: "—",
          required: false,
          description:
            "Handles selection updates when dropdown values change.",
          usage:
            "Triggered automatically on selection.",
        },
      ],
    },

    {
      group: "Styling",
      props: [
        {
          name: "style",
          type: "object",
          defaultVal: "{}",
          required: false,
          description:
            "Inline style overrides applied to the FormControl wrapper.",
          usage:
            "style={{ width: '300px' }}",
        },
      ],
    },
  ],
},

{
  id: "custom-date-picker-component",
  name: "CustomDatePicker",
  description:
    "A reusable React DatePicker wrapper with validation, range selection, dynamic visibility, enable/disable handling, floating labels, min/max date constraints, and form integration — powered by useDatePickerLogic.",

  tags: [
    "datepicker",
    "calendar",
    "date",
    "range-picker",
    "validation",
    "react-datepicker",
    "MUI",
    "forwardRef",
  ],

  propGroups: [
    {
      group: "Core Date & Display",
      props: [
        {
          name: "label",
          type: "string",
          defaultVal: "''",
          required: false,
          description:
            "Floating label displayed above the date picker input.",
          usage:
            "label='Date of Birth'",
        },

        {
          name: "prop",
          type: "string",
          defaultVal: "'value'",
          required: false,
          description:
            "Key used by useDatePickerLogic to read/write values in form state.",
          usage:
            "prop='dob'",
        },

        {
          name: "values",
          type: "Date | array",
          defaultVal: "—",
          required: false,
          description:
            "Current selected date or date range value.",
          usage:
            "values={formValues.dob}",
        },

        {
          name: "selectedDate",
          type: "Date | array",
          defaultVal: "null",
          required: false,
          description:
            "Internally managed selected date value from useDatePickerLogic.",
          usage:
            "Handled automatically through handleDateChange.",
        },

        {
          name: "placeholderText",
          type: "string",
          defaultVal: "'DD/MM/YYYY'",
          required: false,
          description:
            "Placeholder shown when no date is selected.",
          usage:
            "Automatically becomes 'Start - End' when range=true.",
        },
      ],
    },

    {
      group: "Date Range & Restrictions",
      props: [
        {
          name: "range",
          type: "boolean",
          defaultVal: "false",
          required: false,
          description:
            "Enables start/end date range selection.",
          usage:
            "range={true}",
        },

        {
          name: "minDate",
          type: "Date",
          defaultVal: "undefined",
          required: false,
          description:
            "Minimum selectable date.",
          usage:
            "minDate={new Date()}",
        },

        {
          name: "maxDate",
          type: "Date",
          defaultVal: "undefined",
          required: false,
          description:
            "Maximum selectable date.",
          usage:
            "maxDate={new Date('2030-12-31')}",
        },

        {
          name: "currentDate",
          type: "boolean",
          defaultVal: "false",
          required: false,
          description:
            "Disables manual date selection and locks the field to current date behavior.",
          usage:
            "currentDate={true}",
        },

        {
          name: "showTimeSelect",
          type: "boolean",
          defaultVal: "false",
          required: false,
          description:
            "Enables time selection along with date selection.",
          usage:
            "showTimeSelect={true}",
        },
      ],
    },

    {
      group: "Visibility & Interaction",
      props: [
        {
          name: "visible",
          type: "boolean",
          defaultVal: "true",
          required: false,
          description:
            "Controls component visibility. Returns null when false.",
          usage:
            "visible={showDOBField}",
        },

        {
          name: "readOnly",
          type: "boolean",
          defaultVal: "false",
          required: false,
          description:
            "Prevents date selection while still displaying the value.",
          usage:
            "readOnly={true}",
        },

        {
          name: "enable",
          type: "boolean",
          defaultVal: "false",
          required: false,
          description:
            "Disables user interaction with the date picker.",
          usage:
            "enable={!isEditable}",
        },

        {
          name: "enableState",
          type: "boolean",
          defaultVal: "false",
          required: false,
          description:
            "Internal enable/disable state managed through useDatePickerLogic.",
          usage:
            "Handled internally.",
        },

        {
          name: "isFocused",
          type: "boolean",
          defaultVal: "false",
          required: false,
          description:
            "Tracks focus state for floating label animations.",
          usage:
            "Managed internally through setIsFocused.",
        },
      ],
    },

    {
      group: "Validation & Errors",
      props: [
        {
          name: "error",
          type: "boolean | string",
          defaultVal: "—",
          required: false,
          description:
            "External validation error passed from parent form.",
          usage:
            "error={errors.dob}",
        },

        {
          name: "helperText",
          type: "string",
          defaultVal: "—",
          required: false,
          description:
            "Helper message displayed below the field when no internal error exists.",
          usage:
            "helperText='Select your birth date'",
        },

        {
          name: "internalError",
          type: "string",
          defaultVal: "''",
          required: false,
          description:
            "Validation error generated internally by useDatePickerLogic.",
          usage:
            "Displayed automatically using FormHelperText.",
        },

        {
          name: "required",
          type: "boolean",
          defaultVal: "false",
          required: false,
          description:
            "Marks the field as mandatory for validation.",
          usage:
            "required={true}",
        },

        {
          name: "initialValidation",
          type: "any",
          defaultVal: "—",
          required: false,
          description:
            "Triggers validation during initial render.",
          usage:
            "initialValidation={true}",
        },

        {
          name: "validateValue",
          type: "function",
          defaultVal: "—",
          required: false,
          description:
            "Internal validation handler triggered on blur.",
          usage:
            "Handled automatically through useDatePickerLogic.",
        },

        {
          name: "isValidDate",
          type: "function",
          defaultVal: "—",
          required: false,
          description:
            "Utility function to validate date objects before rendering.",
          usage:
            "Used internally for safe date handling.",
        },
      ],
    },

    {
      group: "Form Integration",
      props: [
        {
          name: "setFormValues",
          type: "function",
          defaultVal: "—",
          required: false,
          description:
            "Updates parent form state whenever date changes.",
          usage:
            "setFormValues={setFormValues}",
        },

        {
          name: "setErrors",
          type: "function",
          defaultVal: "—",
          required: false,
          description:
            "Updates parent error state during validation.",
          usage:
            "setErrors={setErrors}",
        },

        {
          name: "mainExtension",
          type: "string",
          defaultVal: "—",
          required: false,
          description:
            "Module/form identifier used for scoped state handling.",
          usage:
            "mainExtension='employeeForm'",
        },

        {
          name: "index",
          type: "string | number",
          defaultVal: "—",
          required: false,
          description:
            "Unique identifier forwarded to useDatePickerLogic.",
          usage:
            "index='joiningDate'",
        },

        {
          name: "ElementList",
          type: "array",
          defaultVal: "[]",
          required: false,
          description:
            "List of related form elements used for dependency logic.",
          usage:
            "ElementList={formElements}",
        },
      ],
    },

    {
      group: "Event Handlers",
      props: [
        {
          name: "onChange",
          type: "function",
          defaultVal: "—",
          required: false,
          description:
            "Callback triggered whenever the selected date changes.",
          usage:
            "onChange={(date) => console.log(date)}",
        },

        {
          name: "handleDateChange",
          type: "function",
          defaultVal: "—",
          required: false,
          description:
            "Internal handler for date selection updates.",
          usage:
            "Managed automatically by useDatePickerLogic.",
        },

        {
          name: "setIsFocused",
          type: "function",
          defaultVal: "—",
          required: false,
          description:
            "Updates focus state for label animation handling.",
          usage:
            "Triggered internally on focus/blur.",
        },
      ],
    },

    {
      group: "Localization & Formatting",
      props: [
        {
          name: "locale",
          type: "string | object",
          defaultVal: "—",
          required: false,
          description:
            "Locale configuration passed to react-datepicker.",
          usage:
            "locale='en-GB'",
        },

        {
          name: "formattedValue",
          type: "function",
          defaultVal: "—",
          required: false,
          description:
            "Formats selected date into display-friendly text.",
          usage:
            "Used internally for rendering input value.",
        },

        {
          name: "className",
          type: "string",
          defaultVal: "''",
          required: false,
          description:
            "Custom CSS class applied to the date picker.",
          usage:
            "className='custom-datepicker'",
        },
      ],
    },
  ],
}

,
{
  id: "SearchBar-component",
  name: "SearchBar Component",
  description:
    "A reusable MUI Autocomplete wrapper with freeSolo search support, dynamic option formatting, validation handling, backend option syncing, keyboard validation, and controlled form integration — powered by useSearchbarLogic.",

  tags: [
    "autocomplete",
    "combobox",
    "searchbar",
    "dropdown",
    "MUI",
    "validation",
    "forwardRef",
  ],

  propGroups: [
    {
      group: "Core Selection & Display",
      props: [
        {
          name: "label",
          type: "string",
          defaultVal: "''",
          required: false,
          description:
            "Floating label displayed above the Autocomplete input.",
          usage:
            "label='Country'",
        },

        {
          name: "defaultOption",
          type: "string",
          defaultVal: "'Select'",
          required: false,
          description:
            "Placeholder text displayed inside the input when no value is selected.",
          usage:
            "defaultOption='Select Country'",
        },

        {
          name: "prop",
          type: "string",
          defaultVal: "'Select'",
          required: false,
          description:
            "Key used by useSearchbarLogic to store selected values in form state.",
          usage:
            "prop='country'",
        },

        {
          name: "options",
          type: "array",
          defaultVal: "[]",
          required: false,
          description:
            "List of dropdown options rendered inside the Autocomplete menu.",
          usage:
            "options={[{ SequenceID: 1, OptionValue: 'India' }]}",
        },

        {
          name: "internalOptions",
          type: "array",
          defaultVal: "[]",
          required: false,
          description:
            "Internally processed options used by the Autocomplete component.",
          usage:
            "Managed automatically through useSearchbarLogic.",
        },

        {
          name: "inputValue",
          type: "string",
          defaultVal: "''",
          required: false,
          description:
            "Current typed text inside the Autocomplete input.",
          usage:
            "Managed internally through handleInputChange.",
        },
      ],
    },

    {
      group: "Selected Value Handling",
      props: [
        {
          name: "selectedOption",
          type: "object | string",
          defaultVal: "null",
          required: false,
          description:
            "Currently selected option from user interaction.",
          usage:
            "Handled internally by useSearchbarLogic.",
        },

        {
          name: "selectedBackendOption",
          type: "object | string",
          defaultVal: "null",
          required: false,
          description:
            "Preloaded option value mapped from backend response.",
          usage:
            "Used during edit mode to display saved selections.",
        },

        {
          name: "optionsFormat",
          type: "number",
          defaultVal: "—",
          required: false,
          description:
            "Determines how options are compared and rendered internally.",
          usage:
            "optionsFormat={3} for primitive string arrays.",
        },
      ],
    },

    {
      group: "Validation & Errors",
      props: [
        {
          name: "error",
          type: "boolean | string",
          defaultVal: "—",
          required: false,
          description:
            "External validation error passed from parent form.",
          usage:
            "error={errors.country}",
        },

        {
          name: "helperText",
          type: "string",
          defaultVal: "—",
          required: false,
          description:
            "Helper message shown below the field when no internal error exists.",
          usage:
            "helperText='Select your country'",
        },

        {
          name: "internalError",
          type: "string",
          defaultVal: "''",
          required: false,
          description:
            "Validation error generated internally by useSearchbarLogic.",
          usage:
            "Displayed automatically using FormHelperText.",
        },

        {
          name: "empty",
          type: "any",
          defaultVal: "—",
          required: false,
          description:
            "Fallback value used when the selected option is empty or undefined.",
          usage:
            "empty=''",
        },

        {
          name: "initialValidation",
          type: "any",
          defaultVal: "—",
          required: false,
          description:
            "Triggers validation logic during initial render.",
          usage:
            "initialValidation={true}",
        },
      ],
    },

    {
      group: "Visibility & Interaction",
      props: [
        {
          name: "visible",
          type: "boolean",
          defaultVal: "true",
          required: false,
          description:
            "Controls whether the component renders. Returns null when false.",
          usage:
            "visible={showCountryField}",
        },

        {
          name: "visibleState",
          type: "boolean",
          defaultVal: "true",
          required: false,
          description:
            "Internal visibility state managed through useSearchbarLogic.",
          usage:
            "Handled internally.",
        },

        {
          name: "readOnly",
          type: "boolean",
          defaultVal: "false",
          required: false,
          description:
            "Prevents editing while still allowing focus and text selection.",
          usage:
            "readOnly={true}",
        },

        {
          name: "enable",
          type: "boolean",
          defaultVal: "false",
          required: false,
          description:
            "Disables user interaction with the Autocomplete field.",
          usage:
            "enable={!isEditable}",
        },

        {
          name: "enableState",
          type: "boolean",
          defaultVal: "false",
          required: false,
          description:
            "Internal enable/disable state managed through useSearchbarLogic.",
          usage:
            "Handled internally.",
        },
      ],
    },

    {
      group: "Form Integration",
      props: [
        {
          name: "setFormValues",
          type: "function",
          defaultVal: "—",
          required: false,
          description:
            "Updates parent form state whenever selection changes.",
          usage:
            "setFormValues={setFormValues}",
        },

        {
          name: "setErrors",
          type: "function",
          defaultVal: "—",
          required: false,
          description:
            "Updates parent error state during validation.",
          usage:
            "setErrors={setErrors}",
        },

        {
          name: "mainExtension",
          type: "string",
          defaultVal: "—",
          required: false,
          description:
            "Module/form identifier used for scoped state handling.",
          usage:
            "mainExtension='customerForm'",
        },

        {
          name: "index",
          type: "string | number",
          defaultVal: "—",
          required: false,
          description:
            "Unique field identifier forwarded to useSearchbarLogic.",
          usage:
            "index='countryField'",
        },

        {
          name: "ElementList",
          type: "array",
          defaultVal: "[]",
          required: false,
          description:
            "List of related form elements used for dependency-based logic.",
          usage:
            "ElementList={formElements}",
        },
      ],
    },

    {
      group: "Event Handling",
      props: [
        {
          name: "onChange",
          type: "function",
          defaultVal: "—",
          required: false,
          description:
            "Callback triggered whenever the selected option changes.",
          usage:
            "onChange={(value) => console.log(value)}",
        },

        {
          name: "handleChange",
          type: "function",
          defaultVal: "—",
          required: false,
          description:
            "Internal handler for option selection updates.",
          usage:
            "Managed automatically through useSearchbarLogic.",
        },

        {
          name: "handleInputChange",
          type: "function",
          defaultVal: "—",
          required: false,
          description:
            "Handles typed input changes inside the Autocomplete field.",
          usage:
            "Triggered automatically while typing.",
        },

        {
          name: "validateEnterKey",
          type: "function",
          defaultVal: "—",
          required: false,
          description:
            "Validates or processes input when Enter key is pressed.",
          usage:
            "Attached to TextField onKeyDown.",
        },
      ],
    },

    {
      group: "Filtering & Option Utilities",
      props: [
        {
          name: "filterOptions",
          type: "function",
          defaultVal: "—",
          required: false,
          description:
            "Custom filter logic applied to dropdown options.",
          usage:
            "Used internally by MUI Autocomplete.",
        },

        {
          name: "filterValidOptions",
          type: "function",
          defaultVal: "—",
          required: false,
          description:
            "Filters valid selectable options before rendering.",
          usage:
            "Handled internally.",
        },

        {
          name: "dispatchoptions",
          type: "function",
          defaultVal: "—",
          required: false,
          description:
            "Dispatches updated option lists or async option state.",
          usage:
            "Used internally by useSearchbarLogic.",
        },
      ],
    },

    {
      group: "Styling",
      props: [
        {
          name: "style",
          type: "object",
          defaultVal: "{}",
          required: false,
          description:
            "Inline style overrides applied to the FormControl wrapper.",
          usage:
            "style={{ width: '300px' }}",
        },
      ],
    },
  ],
},
{
  id: "responsive-grid-component",
  name: "ResponsiveGrid",
  description:
    "A highly dynamic and reusable responsive grid system supporting multi-row forms, dynamic columns, validation, dependency-driven updates, unique column enforcement, accordion/card layouts, uploads, export payload generation, rowVar binding, and programmatic field control — powered by multiple grid utility hooks from @product/ui-logic.",

  tags: [
    "grid",
    "dynamic-form",
    "responsive-grid",
    "accordion",
    "card-upload",
    "validation",
    "dynamic-columns",
    "MUI",
    "forwardRef",
  ],

  propGroups: [
    {
      group: "Core Grid Configuration",
      props: [
        {
          name: "title",
          type: "string",
          defaultVal: "''",
          required: false,
          description:
            "Title displayed above the grid component.",
          usage:
            "title='Employee Details'",
        },

        {
          name: "rowtype",
          type: "array",
          defaultVal: "[]",
          required: false,
          description:
            "Defines the component type for each grid field.",
          usage:
            "rowtype={['textfield', 'dropdown', 'datepicker']}",
        },

        {
          name: "rowProperties",
          type: "array",
          defaultVal: "[]",
          required: false,
          description:
            "Configuration object for each field rendered in the grid.",
          usage:
            "rowProperties={[{ label: 'Name' }, { label: 'Role' }]}",
        },

        {
          name: "fieldsPerRow",
          type: "number",
          defaultVal: "fieldList.length",
          required: false,
          description:
            "Controls how many fields render per row using CSS grid.",
          usage:
            "fieldsPerRow={3}",
        },

        {
          name: "spacing",
          type: "number",
          defaultVal: "2",
          required: false,
          description:
            "Spacing between rendered grid fields.",
          usage:
            "spacing={2}",
        },

        {
          name: "visible",
          type: "boolean",
          defaultVal: "false",
          required: false,
          description:
            "Controls whether the component is hidden.",
          usage:
            "visible={false}",
        },
      ],
    },

    {
      group: "Dynamic Row & Data Binding",
      props: [
        {
          name: "rowVar",
          type: "array",
          defaultVal: "[]",
          required: false,
          description:
            "Initial row data used to populate the grid dynamically.",
          usage:
            "rowVar={[['John', 'Admin']]}",
        },

        {
          name: "Export_Names",
          type: "array",
          defaultVal: "[]",
          required: false,
          description:
            "Maps exported payload keys to grid fields.",
          usage:
            "Export_Names={['User_Id', 'Role_Id']}",
        },

        {
          name: "data",
          type: "string",
          defaultVal: "—",
          required: false,
          description:
            "Property key used for export payload handling.",
          usage:
            "data='$Bulkdata$'",
        },
   {
          name: "export",
          type: "string",
          defaultVal: "—",
          required: false,
          description:
            "Property key used for data export handling (only updated data).",
          usage:
            "export='$Bulkdata$'",
        },
        {
          name: "onChangeData",
          type: "function",
          defaultVal: "—",
          required: false,
          description:
            "Callback triggered whenever dirty grid data changes.",
          usage:
            "onChangeData={(data) => console.log(data)}",
        },

        {
          name: "Options_Input",
          type: "array",
          defaultVal: "[]",
          required: false,
          description:
            "Dynamic dropdown option input source for grid fields.",
          usage:
            "Options_Input={[[1,2], ['Admin','User']]}",
        },
      ],
    },

    {
      group: "Form Integration",
      props: [
        {
          name: "mainExtension",
          type: "string",
          defaultVal: "—",
          required: false,
          description:
            "Module/form identifier used for scoped Redux and validation handling.",
          usage:
            "mainExtension='employeeGrid'",
        },

        {
          name: "index",
          type: "string | number",
          defaultVal: "—",
          required: false,
          description:
            "Unique grid identifier used for Redux tracking.",
          usage:
            "index='employeeDetails'",
        },

        {
          name: "setFormValues",
          type: "function",
          defaultVal: "—",
          required: false,
          description:
            "Updates parent form state whenever grid values change.",
          usage:
            "setFormValues={setFormValues}",
        },
      ],
    },

    {
      group: "Validation & Dependency Handling",
      props: [
        {
          name: "dependencyFields",
          type: "number[]",
          defaultVal: "[]",
          required: false,
          description:
            "Indexes of fields that trigger dependent row updates.",
          usage:
            "dependencyFields={[0,1]}",
        },

        {
          name: "dependentIndexes",
          type: "number[]",
          defaultVal: "[]",
          required: false,
          description:
            "Indexes of dependent fields updated programmatically.",
          usage:
            "dependentIndexes={[2,3]}",
        },

        {
          name: "uniqueColumn",
          type: "number[]",
          defaultVal: "[2]",
          required: false,
          description:
            "Enforces uniqueness validation for specified column indexes.",
          usage:
            "uniqueColumn={[1]}",
        },

        {
          name: "ForcedValidation",
          type: "boolean",
          defaultVal: "false",
          required: false,
          description:
            "Redux-driven validation trigger state.",
          usage:
            "Handled internally.",
        },

        {
          name: "errors",
          type: "object",
          defaultVal: "{}",
          required: false,
          description:
            "Validation errors generated across grid fields.",
          usage:
            "Managed internally using useGridFormValues.",
        },
      ],
    },

    {
      group: "Layout Modes",
      props: [
        {
          name: "accordion",
          type: "boolean",
          defaultVal: "false",
          required: false,
          description:
            "Renders each row container inside a Material UI Accordion.",
          usage:
            "accordion={true}",
        },

        {
          name: "card",
          type: "boolean",
          defaultVal: "false",
          required: false,
          description:
            "Enables upload-card mode instead of normal grid rendering.",
          usage:
            "card={true}",
        },
      ],
    },

    {
      group: "Upload & Card Mode",
      props: [
        {
          name: "uploadedFiles",
          type: "object",
          defaultVal: "{}",
          required: false,
          description:
            "Stores uploaded file metadata in card mode.",
          usage:
            "Managed internally after uploads.",
        },

        {
          name: "uploadedPaths",
          type: "array",
          defaultVal: "[]",
          required: false,
          description:
            "Formatted upload payload containing document IDs and paths.",
          usage:
            "Returned through getProperty('uploads').",
        },

        {
          name: "cardErrors",
          type: "object",
          defaultVal: "{}",
          required: false,
          description:
            "Validation errors for required upload cards.",
          usage:
            "Displayed below upload cards.",
        },
      ],
    },

    {
      group: "Imperative Methods (ref)",
      props: [
        {
          name: "setProperty",
          type: "function",
          defaultVal: "—",
          required: false,
          description:
            "Programmatically updates grid properties such as rowVar, dependentRowvalue, or Options_Input.",
          usage:
            "gridRef.current.setProperty('rowVar', data)",
        },

        {
          name: "getProperty",
          type: "function",
          defaultVal: "—",
          required: false,
          description:
            "Returns grid properties such as export payload, uploads, dirtyValues, or displayValues.",
          usage:
            "gridRef.current.getProperty('export')",
        },

        {
          name: "setValue",
          type: "function",
          defaultVal: "—",
          required: false,
          description:
            "Programmatically updates a specific field value inside the grid.",
          usage:
            "gridRef.current.setValue('0_1', 'Admin')",
        },

        {
          name: "getValue",
          type: "function",
          defaultVal: "—",
          required: false,
          description:
            "Returns the current value of a specific grid field.",
          usage:
            "gridRef.current.getValue('0_1')",
        },

        {
          name: "getDisplayValues",
          type: "function",
          defaultVal: "—",
          required: false,
          description:
            "Returns all currently displayed field values.",
          usage:
            "gridRef.current.getDisplayValues()",
        },

        {
          name: "getDirtyValues",
          type: "function",
          defaultVal: "—",
          required: false,
          description:
            "Returns only modified field values.",
          usage:
            "gridRef.current.getDirtyValues()",
        },
      ],
    },

    {
      group: "Internal Grid State",
      props: [
        {
          name: "columns",
          type: "array",
          defaultVal: "[0]",
          required: false,
          description:
            "Tracks dynamically added grid column containers.",
          usage:
            "Managed internally through handleAddColumn.",
        },

        {
          name: "fieldRefs",
          type: "object",
          defaultVal: "{}",
          required: false,
          description:
            "Reference map for all dynamically rendered fields.",
          usage:
            "Used for programmatic set/get operations.",
        },

        {
          name: "columnSelectionMap",
          type: "object",
          defaultVal: "{}",
          required: false,
          description:
            "Tracks selected values per container for dependency handling.",
          usage:
            "Managed internally.",
        },
      ],
    },

    {
      group: "Styling & UI",
      props: [
        {
          name: "style",
          type: "object",
          defaultVal: "{}",
          required: false,
          description:
            "Custom style overrides for grid containers and fields.",
          usage:
            "style={{ marginTop: '10px' }}",
        },
      ],
    },
  ],
},
{
  id: "checkbox-component",
  name: "CheckboxComponent",
  description:
    "A reusable checkbox/toggle component supporting multiple selections, validation handling, boolean or custom value mapping, controlled form integration, and toggle-switch rendering — powered by useCheckboxLogic.",

  tags: [
    "checkbox",
    "toggle",
    "switch",
    "validation",
    "form",
    "forwardRef",
  ],

  propGroups: [
    {
      group: "Core Checkbox Configuration",
      props: [
        {
          name: "checkboxes",
          type: "array",
          defaultVal: "[]",
          required: false,
          description:
            "List of checkbox labels rendered by the component.",
          usage:
            "checkboxes={['Admin', 'User', 'Guest']}",
        },

        {
          name: "type",
          type: "string",
          defaultVal: "'checkbox'",
          required: false,
          description:
            "Determines whether the component renders normal checkboxes or toggle switches.",
          usage:
            "type='toggle'",
        },

        {
          name: "defaultValue",
          type: "array",
          defaultVal: "[]",
          required: false,
          description:
            "Initial checked state values for the checkbox list.",
          usage:
            "defaultValue={[true, false, true]}",
        },

        {
          name: "checkedList",
          type: "array",
          defaultVal: "[]",
          required: false,
          description:
            "Internally managed checked state for all checkboxes.",
          usage:
            "Managed automatically through useCheckboxLogic.",
        },
      ],
    },

    {
      group: "Form Integration",
      props: [
        {
          name: "mainExtension",
          type: "string",
          defaultVal: "—",
          required: false,
          description:
            "Module/form identifier used for scoped state management.",
          usage:
            "mainExtension='employeeForm'",
        },

        {
          name: "index",
          type: "string | number",
          defaultVal: "—",
          required: false,
          description:
            "Unique field identifier for checkbox tracking.",
          usage:
            "index='permissionsCheckbox'",
        },

        {
          name: "prop",
          type: "string",
          defaultVal: "'value'",
          required: false,
          description:
            "Key used by useCheckboxLogic to store checkbox values in form state.",
          usage:
            "prop='permissions'",
        },

        {
          name: "setFormValues",
          type: "function",
          defaultVal: "—",
          required: false,
          description:
            "Updates parent form state whenever checkbox values change.",
          usage:
            "setFormValues={setFormValues}",
        },

        {
          name: "setErrors",
          type: "function",
          defaultVal: "—",
          required: false,
          description:
            "Updates parent validation error state.",
          usage:
            "setErrors={setErrors}",
        },
      ],
    },

    {
      group: "Validation & Errors",
      props: [
        {
          name: "validation",
          type: "object",
          defaultVal: "{}",
          required: false,
          description:
            "Validation rules passed into useCheckboxLogic.",
          usage:
            "validation={{ required: true }}",
        },

        {
          name: "internalError",
          type: "string",
          defaultVal: "''",
          required: false,
          description:
            "Validation error message returned from useCheckboxLogic.",
          usage:
            "Displayed automatically below the checkbox field.",
        },
      ],
    },

    {
      group: "Value Handling",
      props: [
        {
          name: "valueType",
          type: "string",
          defaultVal: "'boolean'",
          required: false,
          description:
            "Defines how checkbox values are stored internally.",
          usage:
            "valueType='boolean'",
        },

        {
          name: "handleChange",
          type: "function",
          defaultVal: "—",
          required: false,
          description:
            "Handles checkbox state updates whenever a selection changes.",
          usage:
            "Triggered automatically on checkbox click.",
        },
      ],
    },

    {
      group: "Event Handling",
      props: [
        {
          name: "onChange",
          type: "function",
          defaultVal: "—",
          required: false,
          description:
            "Callback triggered whenever checkbox values change.",
          usage:
            "onChange={(values) => console.log(values)}",
        },

        {
          name: "events",
          type: "object",
          defaultVal: "{}",
          required: false,
          description:
            "Additional custom event handlers passed into the component.",
          usage:
            "events={{ onBlur: handleBlur }}",
        },
      ],
    },

    {
      group: "Styling & UI",
      props: [
        {
          name: "style",
          type: "object",
          defaultVal: "{}",
          required: false,
          description:
            "Inline style overrides applied to each checkbox wrapper.",
          usage:
            "style={{ marginTop: '10px' }}",
        },

        {
          name: "isToggle",
          type: "boolean",
          defaultVal: "false",
          required: false,
          description:
            "Internal flag used to determine toggle-switch rendering mode.",
          usage:
            "Automatically derived from type === 'toggle'.",
        },
      ],
    },

    {
      group: "Imperative Ref Support",
      props: [
        {
          name: "ref",
          type: "React.Ref",
          defaultVal: "null",
          required: false,
          description:
            "Forwarded ref used for programmatic property access and updates.",
          usage:
            "ref={checkboxRef}",
        },
      ],
    },
  ],
}
,
{
  id: "label-component",
  name: "LabelComponent",
  description:
    "A dynamic reusable label component with runtime text binding, placeholder replacement, visibility control, dynamic class updates, and imperative property handling using forwardRef.",

  tags: [
    "label",
    "dynamic-text",
    "input-label",
    "binding",
    "forwardRef",
    "MUI",
  ],

  propGroups: [
    {
      group: "Core Label Configuration",
      props: [
        {
          name: "children",
          type: "string | ReactNode",
          defaultVal: "''",
          required: false,
          description:
            "Default label content rendered inside the InputLabel.",
          usage:
            "children='Employee Name'",
        },

        {
          name: "values",
          type: "array",
          defaultVal: "[]",
          required: false,
          description:
            "Dynamic values used for placeholder replacement inside label text.",
          usage:
            "values={['John', 'Admin']}",
        },

        {
          name: "valuesState",
          type: "array",
          defaultVal: "[]",
          required: false,
          description:
            "Internal state storing formatted replacement values.",
          usage:
            "Managed internally through setProperty('values').",
        },

        {
          name: "internalLabel",
          type: "string",
          defaultVal: "''",
          required: false,
          description:
            "Internally bound label text updated programmatically.",
          usage:
            "Updated through setProperty('children', value).",
        },

        {
          name: "isBoundLabel",
          type: "boolean",
          defaultVal: "false",
          required: false,
          description:
            "Tracks whether the label text has been dynamically bound.",
          usage:
            "Used internally for conditional styling.",
        },
      ],
    },

    {
      group: "Dynamic Text Handling",
      props: [
        {
          name: "parseDynamicText",
          type: "function",
          defaultVal: "—",
          required: false,
          description:
            "Replaces placeholders like $0$, $1$ inside label text using provided values.",
          usage:
            "Label '$0$ Role' with values ['Admin'] becomes 'Admin Role'.",
        },

        {
          name: "values",
          type: "array",
          defaultVal: "[]",
          required: false,
          description:
            "Replacement values used by parseDynamicText.",
          usage:
            "values={['John Doe']}",
        },
      ],
    },

    {
      group: "Visibility & Styling",
      props: [
        {
          name: "visible",
          type: "boolean | array",
          defaultVal: "true",
          required: false,
          description:
            "Controls component visibility. Returns null when false.",
          usage:
            "visible={true}",
        },

        {
          name: "visibleState",
          type: "boolean",
          defaultVal: "true",
          required: false,
          description:
            "Internal visibility state derived from the visible prop.",
          usage:
            "Managed internally.",
        },

        {
          name: "className",
          type: "string",
          defaultVal: "''",
          required: false,
          description:
            "CSS class applied to the rendered label span.",
          usage:
            "className='form-label'",
        },

        {
          name: "dynamicClass",
          type: "string",
          defaultVal: "''",
          required: false,
          description:
            "Internal dynamic class state updated programmatically.",
          usage:
            "Updated through setProperty('className').",
        },

        {
          name: "style",
          type: "object",
          defaultVal: "{}",
          required: false,
          description:
            "Inline styles applied to the InputLabel and text span.",
          usage:
            "style={{ color: 'red' }}",
        },
      ],
    },

    {
      group: "Imperative Ref Methods",
      props: [
        {
          name: "setProperty",
          type: "function",
          defaultVal: "—",
          required: false,
          description:
            "Programmatically updates component properties such as children, values, className, or visible.",
          usage:
            "labelRef.current.setProperty('children', 'Updated Label')",
        },

        {
          name: "getProperty",
          type: "function",
          defaultVal: "—",
          required: false,
          description:
            "Returns current component properties such as children, style, visibility, or className.",
          usage:
            "labelRef.current.getProperty('children')",
        },

        {
          name: "ref",
          type: "React.Ref",
          defaultVal: "null",
          required: false,
          description:
            "Forwarded ref used for runtime property access.",
          usage:
            "ref={labelRef}",
        },
      ],
    },

    {
      group: "Property Handling",
      props: [
        {
          name: "setProperty('children')",
          type: "function",
          defaultVal: "—",
          required: false,
          description:
            "Updates the internal label text dynamically.",
          usage:
            "setProperty('children', 'Dynamic Title')",
        },

        {
          name: "setProperty('values')",
          type: "function",
          defaultVal: "—",
          required: false,
          description:
            "Updates replacement values used in dynamic text parsing.",
          usage:
            "setProperty('values', [['John']])",
        },

        {
          name: "setProperty('className')",
          type: "function",
          defaultVal: "—",
          required: false,
          description:
            "Updates the label CSS class dynamically.",
          usage:
            "setProperty('className', 'highlight-label')",
        },

        {
          name: "setProperty('visible')",
          type: "function",
          defaultVal: "—",
          required: false,
          description:
            "Shows or hides the component dynamically.",
          usage:
            "setProperty('visible', false)",
        },
      ],
    },

    {
      group: "Standalone Label Renderer",
      props: [
        {
          name: "labelCompoent",
          type: "function",
          defaultVal: "—",
          required: false,
          description:
            "Simplified standalone label renderer using InputLabel.",
          usage:
            "labelCompoent({ data: { children: 'Title' } })",
        },

        {
          name: "data",
          type: "object",
          defaultVal: "{}",
          required: false,
          description:
            "Configuration object used by labelCompoent.",
          usage:
            "data={{ children: 'Employee Name' }}",
        },
      ],
    },
  ],
},
{
  id: "graph-tabs-component",
  name: "GraphTabsComponent",
  description:
    "A reusable analytics dashboard component with tab-based chart switching, Chart.js visualizations, partner analytics, delinquency tracking, summary cards, and multi-chart rendering — powered by useGraphTabsLogic.",

  tags: [
    "charts",
    "dashboard",
    "analytics",
    "graph-tabs",
    "chartjs",
    "bar-chart",
    "line-chart",
    "donut-chart",
    "forwardRef",
  ],

  propGroups: [
    {
      group: "Core Tab Configuration",
      props: [
        {
          name: "finalTabs",
          type: "array",
          defaultVal: "[]",
          required: false,
          description:
            "List of tabs rendered in the chart navigation bar.",
          usage:
            "finalTabs={[{ label: 'Bar', chartType: 'bar', icon: 'GridView' }]}",
        },

        {
          name: "activeTab",
          type: "string",
          defaultVal: "'bar'",
          required: false,
          description:
            "Currently selected chart tab.",
          usage:
            "activeTab='donut'",
        },

        {
          name: "setActiveTab",
          type: "function",
          defaultVal: "—",
          required: false,
          description:
            "Updates the currently active chart tab.",
          usage:
            "setActiveTab('line')",
        },

        {
          name: "iconMap",
          type: "object",
          defaultVal: "{}",
          required: false,
          description:
            "Maps tab icon names to Material UI icons.",
          usage:
            "{ GridView: <GridViewRounded /> }",
        },
      ],
    },

    {
      group: "Bar Chart",
      props: [
        {
          name: "barData",
          type: "object",
          defaultVal: "{}",
          required: false,
          description:
            "Dataset configuration for the bar chart.",
          usage:
            "barData={{ labels: [], datasets: [] }}",
        },

        {
          name: "barOptions",
          type: "object",
          defaultVal: "{}",
          required: false,
          description:
            "Chart.js options for the bar chart.",
          usage:
            "barOptions={{ responsive: true }}",
        },
      ],
    },

    {
      group: "Line Chart",
      props: [
        {
          name: "lineData",
          type: "object",
          defaultVal: "{}",
          required: false,
          description:
            "Dataset configuration for the line chart.",
          usage:
            "lineData={{ labels: [], datasets: [] }}",
        },

        {
          name: "lineOptions",
          type: "object",
          defaultVal: "{}",
          required: false,
          description:
            "Chart.js options for the line chart.",
          usage:
            "lineOptions={{ responsive: true }}",
        },
      ],
    },

    {
      group: "Donut Chart",
      props: [
        {
          name: "donutData",
          type: "object",
          defaultVal: "{}",
          required: false,
          description:
            "Dataset configuration for the donut chart.",
          usage:
            "donutData={{ labels: [], datasets: [] }}",
        },

        {
          name: "donutOptions",
          type: "object",
          defaultVal: "{}",
          required: false,
          description:
            "Chart.js options for the donut chart.",
          usage:
            "donutOptions={{ cutout: '70%' }}",
        },
      ],
    },

    {
      group: "Multi Bar Chart (Cash Flow)",
      props: [
        {
          name: "multiBarDataProp",
          type: "object",
          defaultVal: "{}",
          required: false,
          description:
            "Metadata and summary configuration for the multi-bar section.",
          usage:
            "multiBarDataProp={{ title: 'Cash Flow', subTitle: 'Monthly Summary' }}",
        },

        {
          name: "multiBarData",
          type: "object",
          defaultVal: "{}",
          required: false,
          description:
            "Dataset configuration for the multi-bar chart.",
          usage:
            "multiBarData={{ labels: [], datasets: [] }}",
        },

        {
          name: "multiBarOptions",
          type: "object",
          defaultVal: "{}",
          required: false,
          description:
            "Chart.js options for the multi-bar chart.",
          usage:
            "multiBarOptions={{ responsive: true }}",
        },

        {
          name: "summaryCardsData",
          type: "array",
          defaultVal: "[]",
          required: false,
          description:
            "Values displayed in the summary cards below the chart.",
          usage:
            "summaryCardsData={[12000, 5000, 9000]}",
        },
      ],
    },

    {
      group: "Partners Analytics",
      props: [
        {
          name: "partnersDataProp",
          type: "object",
          defaultVal: "{}",
          required: false,
          description:
            "Partner analytics configuration including partner list and metrics.",
          usage:
            "partnersDataProp={{ partners: [] }}",
        },

        {
          name: "partnersChartOptions",
          type: "object",
          defaultVal: "{}",
          required: false,
          description:
            "Chart.js options for partner share progress bars.",
          usage:
            "partnersChartOptions={{ indexAxis: 'y' }}",
        },
      ],
    },

    {
      group: "Delinquency Analytics",
      props: [
        {
          name: "delinquencyDataProp",
          type: "object",
          defaultVal: "{}",
          required: false,
          description:
            "Configuration and metadata for delinquency charts.",
          usage:
            "delinquencyDataProp={{ title: 'Delinquency Overview' }}",
        },

        {
          name: "delinqView",
          type: "string",
          defaultVal: "'value'",
          required: false,
          description:
            "Current delinquency metric view.",
          usage:
            "delinqView='accounts'",
        },

        {
          name: "setDelinqView",
          type: "function",
          defaultVal: "—",
          required: false,
          description:
            "Updates the delinquency metric view.",
          usage:
            "setDelinqView('par')",
        },

        {
          name: "delinquencyBarData",
          type: "object",
          defaultVal: "{}",
          required: false,
          description:
            "Dataset configuration for delinquency charts.",
          usage:
            "delinquencyBarData={{ labels: [], datasets: [] }}",
        },

        {
          name: "delinquencyBarOptions",
          type: "object",
          defaultVal: "{}",
          required: false,
          description:
            "Chart.js options for delinquency charts.",
          usage:
            "delinquencyBarOptions={{ responsive: true }}",
        },
      ],
    },

    {
      group: "Chart Plugins & Utilities",
      props: [
        {
          name: "ChartDataLabels",
          type: "plugin",
          defaultVal: "disabled",
          required: false,
          description:
            "Chart.js datalabels plugin registered globally for chart rendering.",
          usage:
            "ChartDataLabels.defaults.display = false",
        },

        {
          name: "ChartJS.register",
          type: "function",
          defaultVal: "—",
          required: false,
          description:
            "Registers Chart.js scales, elements, and plugins.",
          usage:
            "ChartJS.register(CategoryScale, LinearScale)",
        },
      ],
    },

    {
      group: "Logic Integration",
      props: [
        {
          name: "useGraphTabsLogic",
          type: "hook",
          defaultVal: "—",
          required: false,
          description:
            "Centralized hook handling chart state, datasets, and tab switching.",
          usage:
            "useGraphTabsLogic(props, ref)",
        },

        {
          name: "ref",
          type: "React.Ref",
          defaultVal: "null",
          required: false,
          description:
            "Forwarded ref for external property access and control.",
          usage:
            "ref={graphTabsRef}",
        },
      ],
    },

    {
      group: "Styling & Layout",
      props: [
        {
          name: "style",
          type: "object",
          defaultVal: "{}",
          required: false,
          description:
            "Custom inline styling for charts and dashboard containers.",
          usage:
            "style={{ padding: '20px' }}",
        },
      ],
    },
  ],
},
{
  id: "main-schema-builder-component",
  name: "MainSchemaBuilder",
  description:
    "A highly dynamic schema-driven form engine capable of rendering layouts from JSON schema definitions, handling nested groups, server-triggered events, dynamic dropdown binding, calculations, validation, dependency propagation, runtime property updates, and schema-based UI generation.",

  tags: [
    "schema-builder",
    "dynamic-form",
    "json-schema",
    "validation",
    "dynamic-ui",
    "form-engine",
    "runtime-binding",
    "forwardRef",
    "redux",
  ],

  propGroups: [
    {
      group: "Core Schema Configuration",
      props: [
        {
          name: "data",
          type: "object | array",
          defaultVal: "{}",
          required: false,
          description:
            "Initial schema-bound data used for dynamic field population.",
          usage:
            "data={apiResponse}",
        },

        {
          name: "layout",
          type: "array",
          defaultVal: "[]",
          required: false,
          description:
            "Dynamic layout configuration describing containers/groups.",
          usage:
            "setProperty('layout', layoutJson)",
        },

        {
          name: "schema",
          type: "array",
          defaultVal: "[]",
          required: false,
          description:
            "Validation schema definition used for runtime validation.",
          usage:
            "setProperty('schema', schemaJson)",
        },

        {
          name: "finalLayout",
          type: "object",
          defaultVal: "{}",
          required: false,
          description:
            "Processed layout tree generated from layoutData.",
          usage:
            "Generated internally using FinalLayout().",
        },

        {
          name: "schemaData",
          type: "array",
          defaultVal: "[]",
          required: false,
          description:
            "Raw schema configuration before parsing.",
          usage:
            "Loaded dynamically using setProperty('schema').",
        },
      ],
    },

    {
      group: "Form State & Validation",
      props: [
        {
          name: "formValues",
          type: "object",
          defaultVal: "{}",
          required: false,
          description:
            "Stores all dynamically generated form field values.",
          usage:
            "Managed internally using setFormValues.",
        },

        {
          name: "errors",
          type: "object",
          defaultVal: "{}",
          required: false,
          description:
            "Validation error map for dynamically rendered fields.",
          usage:
            "errors[index]",
        },

        {
          name: "setErrors",
          type: "function",
          defaultVal: "—",
          required: false,
          description:
            "Updates validation errors across dynamic fields.",
          usage:
            "setErrors((prev) => ({ ...prev, 1: 'Required' }))",
        },

        {
          name: "ForcedValidation",
          type: "boolean",
          defaultVal: "false",
          required: false,
          description:
            "Redux-triggered forced validation flag.",
          usage:
            "Handled internally using Redux state.",
        },

        {
          name: "invalidTreeFields",
          type: "array",
          defaultVal: "[]",
          required: false,
          description:
            "Tracks schema tree fields failing validation.",
          usage:
            "Generated by buildSchemaTreeFromUI().",
        },
      ],
    },

    {
      group: "Dynamic Rendering",
      props: [
        {
          name: "groupTree",
          type: "object",
          defaultVal: "{}",
          required: false,
          description:
            "Hierarchical UI group structure generated from layout definitions.",
          usage:
            "Generated using GroupTreeFunction().",
        },

        {
          name: "fieldList",
          type: "array",
          defaultVal: "[]",
          required: false,
          description:
            "Flat list of all dynamically generated fields.",
          usage:
            "Generated internally from layout tree.",
        },

        {
          name: "containerMap",
          type: "object",
          defaultVal: "{}",
          required: false,
          description:
            "Maps layout group types to UI container components.",
          usage:
            "containerMap['section']",
        },

        {
          name: "componentMap",
          type: "object",
          defaultVal: "{}",
          required: false,
          description:
            "Maps field types to dynamically rendered React components.",
          usage:
            "componentMap['textfield']",
        },
      ],
    },

    {
      group: "Server Events & Dependency Handling",
      props: [
        {
          name: "eventState",
          type: "array",
          defaultVal: "[]",
          required: false,
          description:
            "Stores dynamically generated server-trigger events.",
          usage:
            "Managed internally during dependency updates.",
        },

        {
          name: "generatedParams",
          type: "string",
          defaultVal: "''",
          required: false,
          description:
            "Serialized payload used for server-triggered requests.",
          usage:
            "Returned through getProperty('servertriggred').",
        },

        {
          name: "serverData",
          type: "array",
          defaultVal: "[]",
          required: false,
          description:
            "Server response payload used to update dependent fields.",
          usage:
            "setProperty('triggredtoclient', response)",
        },

        {
          name: "dependenceIndex",
          type: "array",
          defaultVal: "[]",
          required: false,
          description:
            "Indexes of dependent fields updated after server response.",
          usage:
            "Managed internally.",
        },
      ],
    },

    {
      group: "Dropdown & Option Handling",
      props: [
        {
          name: "fetchAllDropdownOptions",
          type: "function",
          defaultVal: "—",
          required: false,
          description:
            "Fetches dropdown options dynamically from APIs.",
          usage:
            "Triggered automatically during initialization.",
        },

        {
          name: "fetchOptions",
          type: "function",
          defaultVal: "—",
          required: false,
          description:
            "API helper used for fetching dropdown options.",
          usage:
            "fetchOptions('InsuranceCompanies')",
        },

        {
          name: "resolveDropdownOptions",
          type: "function",
          defaultVal: "—",
          required: false,
          description:
            "Resolves dynamic option variables into usable dropdown arrays.",
          usage:
            "Handled internally before rendering fields.",
        },

        {
          name: "requestedOptions",
          type: "Set",
          defaultVal: "new Set()",
          required: false,
          description:
            "Prevents duplicate dropdown option fetch requests.",
          usage:
            "Managed internally.",
        },
      ],
    },

    {
      group: "Schema Binding & Calculations",
      props: [
        {
          name: "generatedTree",
          type: "object",
          defaultVal: "{}",
          required: false,
          description:
            "Final schema-bound object tree generated from UI values.",
          usage:
            "Returned through getProperty('data').",
        },

        {
          name: "resolveCalculations",
          type: "function",
          defaultVal: "—",
          required: false,
          description:
            "Executes runtime calculations and updates generated schema data.",
          usage:
            "resolveCalculations({ equations, generatedTree })",
        },

        {
          name: "buildSchemaTreeFromUI",
          type: "function",
          defaultVal: "—",
          required: false,
          description:
            "Builds nested schema structure from rendered form values.",
          usage:
            "buildSchemaTreeFromUI({ fields, schema, formValues })",
        },

        {
          name: "validateFieldByPath",
          type: "function",
          defaultVal: "—",
          required: false,
          description:
            "Performs schema-path based validation for a field.",
          usage:
            "validateFieldByPath({ schema, path, value })",
        },
      ],
    },

    {
      group: "Imperative Ref Methods",
      props: [
        {
          name: "setProperty",
          type: "function",
          defaultVal: "—",
          required: false,
          description:
            "Programmatically updates schema, layout, visibility, data, or server-triggered values.",
          usage:
            "schemaRef.current.setProperty('data', apiData)",
        },

        {
          name: "getProperty",
          type: "function",
          defaultVal: "—",
          required: false,
          description:
            "Returns generated schema data or server-trigger payloads.",
          usage:
            "schemaRef.current.getProperty('data')",
        },

        {
          name: "ref",
          type: "React.Ref",
          defaultVal: "null",
          required: false,
          description:
            "Forwarded ref for runtime schema interaction.",
          usage:
            "ref={schemaBuilderRef}",
        },
      ],
    },

    {
      group: "Visibility & UI Control",
      props: [
        {
          name: "visible",
          type: "boolean",
          defaultVal: "true",
          required: false,
          description:
            "Controls whether the generated form is displayed.",
          usage:
            "visible={true}",
        },

        {
          name: "visibleState",
          type: "boolean",
          defaultVal: "true",
          required: false,
          description:
            "Internal visibility state managed dynamically.",
          usage:
            "Updated through setProperty('visible').",
        },

        {
          name: "style",
          type: "object",
          defaultVal: "{}",
          required: false,
          description:
            "Custom inline styling for generated form containers.",
          usage:
            "style={{ padding: '20px' }}",
        },
      ],
    },

    {
      group: "Redux Integration",
      props: [
        {
          name: "SetUIChangedList",
          type: "Redux Action",
          defaultVal: "—",
          required: false,
          description:
            "Dispatches UI state updates whenever schema data changes.",
          usage:
            "dispatch(SetUIChangedList(...))",
        },

        {
          name: "SetvalidationformState",
          type: "Redux Action",
          defaultVal: "—",
          required: false,
          description:
            "Updates global validation state for the schema form.",
          usage:
            "dispatch(SetvalidationformState(...))",
        },

        {
          name: "setForcedValidation",
          type: "Redux Action",
          defaultVal: "—",
          required: false,
          description:
            "Triggers forced validation across all dynamic fields.",
          usage:
            "dispatch(setForcedValidation(...))",
        },
      ],
    },
  ],
},
{
  id: "radio-button-group-component",
  name: "RadioButtonGroup",
  description:
    "A reusable MUI radio button group component supporting dynamic option formats, validation handling, visibility control, enable/disable states, controlled form integration, and runtime option binding — powered by useRadioButtonLogic.",

  tags: [
    "radio-button",
    "radio-group",
    "selection",
    "MUI",
    "validation",
    "dynamic-options",
    "forwardRef",
  ],

  propGroups: [
    {
      group: "Core Selection & Display",
      props: [
        {
          name: "options",
          type: "array",
          defaultVal: "[]",
          required: false,
          description:
            "List of radio button options rendered inside the group.",
          usage:
            "options={[{ SequenceID: 1, OptionValue: 'Male' }]}",
        },

        {
          name: "internalOptions",
          type: "array",
          defaultVal: "[]",
          required: false,
          description:
            "Internally processed options used for rendering radio buttons.",
          usage:
            "Managed automatically through useRadioButtonLogic.",
        },

        {
          name: "selectedValue",
          type: "string",
          defaultVal: "''",
          required: false,
          description:
            "Currently selected radio button value.",
          usage:
            "Managed internally through handleChange.",
        },

        {
          name: "optionsFormat",
          type: "number",
          defaultVal: "—",
          required: false,
          description:
            "Determines how radio options are rendered and interpreted.",
          usage:
            "optionsFormat={3} for primitive string arrays.",
        },
      ],
    },

    {
      group: "Value Handling",
      props: [
        {
          name: "value",
          type: "string | number",
          defaultVal: "''",
          required: false,
          description:
            "Externally controlled selected value.",
          usage:
            "value='Male'",
        },

        {
          name: "id",
          type: "boolean",
          defaultVal: "true",
          required: false,
          description:
            "Controls whether SequenceID or OptionValue is used as the radio value.",
          usage:
            "id={false} — uses OptionValue instead of SequenceID.",
        },

        {
          name: "handleChange",
          type: "function",
          defaultVal: "—",
          required: false,
          description:
            "Handles radio selection changes.",
          usage:
            "Triggered automatically on selection.",
        },
      ],
    },

    {
      group: "Validation & Errors",
      props: [
        {
          name: "error",
          type: "boolean | string",
          defaultVal: "—",
          required: false,
          description:
            "External validation error passed from parent form.",
          usage:
            "error={errors.gender}",
        },

        {
          name: "helperText",
          type: "string",
          defaultVal: "''",
          required: false,
          description:
            "Helper message displayed below the radio group.",
          usage:
            "helperText='Select gender'",
        },

        {
          name: "internalError",
          type: "string",
          defaultVal: "''",
          required: false,
          description:
            "Validation error message generated internally.",
          usage:
            "Displayed automatically using FormHelperText.",
        },

        {
          name: "initialValidation",
          type: "any",
          defaultVal: "—",
          required: false,
          description:
            "Triggers validation logic during initial render.",
          usage:
            "initialValidation={true}",
        },
      ],
    },

    {
      group: "Visibility & Interaction",
      props: [
        {
          name: "visible",
          type: "boolean",
          defaultVal: "true",
          required: false,
          description:
            "Controls whether the component renders. Returns null when false.",
          usage:
            "visible={showGenderField}",
        },

        {
          name: "visibleState",
          type: "boolean",
          defaultVal: "true",
          required: false,
          description:
            "Internal visibility state managed through useRadioButtonLogic.",
          usage:
            "Handled internally.",
        },

        {
          name: "enable",
          type: "boolean",
          defaultVal: "false",
          required: false,
          description:
            "Disables all radio buttons when true.",
          usage:
            "enable={!isEditable}",
        },

        {
          name: "enableState",
          type: "boolean",
          defaultVal: "false",
          required: false,
          description:
            "Internal enable/disable state derived from props.",
          usage:
            "Managed internally.",
        },
      ],
    },

    {
      group: "Form Integration",
      props: [
        {
          name: "mainExtension",
          type: "string",
          defaultVal: "—",
          required: false,
          description:
            "Module/form identifier used for scoped state handling.",
          usage:
            "mainExtension='employeeForm'",
        },

        {
          name: "index",
          type: "string | number",
          defaultVal: "—",
          required: false,
          description:
            "Unique field identifier forwarded to useRadioButtonLogic.",
          usage:
            "index='genderField'",
        },

        {
          name: "setFormValues",
          type: "function",
          defaultVal: "—",
          required: false,
          description:
            "Updates parent form state whenever selection changes.",
          usage:
            "setFormValues={setFormValues}",
        },

        {
          name: "setErrors",
          type: "function",
          defaultVal: "—",
          required: false,
          description:
            "Updates parent validation error state.",
          usage:
            "setErrors={setErrors}",
        },

        {
          name: "ElementList",
          type: "array",
          defaultVal: "[]",
          required: false,
          description:
            "List of related form elements used for dependency logic.",
          usage:
            "ElementList={formElements}",
        },

        {
          name: "refs",
          type: "object",
          defaultVal: "{}",
          required: false,
          description:
            "Reference map used for focus management and runtime updates.",
          usage:
            "refs={fieldRefs}",
        },
      ],
    },

    {
      group: "Event Handling",
      props: [
        {
          name: "onChange",
          type: "function",
          defaultVal: "—",
          required: false,
          description:
            "Callback triggered whenever the selected radio value changes.",
          usage:
            "onChange={(value) => console.log(value)}",
        },
      ],
    },

    {
      group: "Styling & UI",
      props: [
        {
          name: "className",
          type: "string",
          defaultVal: "''",
          required: false,
          description:
            "Custom CSS class applied to the RadioGroup container.",
          usage:
            "className='horizontal-radio-group'",
        },
      ],
    },

    {
      group: "Imperative Ref Support",
      props: [
        {
          name: "ref",
          type: "React.Ref",
          defaultVal: "null",
          required: false,
          description:
            "Forwarded ref used for runtime property handling.",
          usage:
            "ref={radioGroupRef}",
        },
      ],
    },
  ],
},
{
  id: "map-component",
  name: "MapComponent",
  description:
    "A reusable Google Maps component with live GPS location fetching, coordinate tracking, marker rendering, runtime property updates, Redux integration, and imperative latitude/longitude access using forwardRef.",

  tags: [
    "google-map",
    "gps",
    "geolocation",
    "maps",
    "coordinates",
    "marker",
    "forwardRef",
    "redux",
  ],

  propGroups: [
    {
      group: "Core Map Configuration",
      props: [
        {
          name: "config",
          type: "object",
          defaultVal: "{}",
          required: false,
          description:
            "Configuration object used to customize map rendering properties such as height.",
          usage:
            "config={{ height: '500px' }}",
        },

        {
          name: "GOOGLE_MAPS_API_KEY",
          type: "string",
          defaultVal: "'AIza...'",
          required: false,
          description:
            "Google Maps API key used for loading the Google Maps SDK.",
          usage:
            "Defined internally using useJsApiLoader.",
        },

        {
          name: "MAP_CONTAINER_STYLE",
          type: "object",
          defaultVal: "{ width: '100%', height: '400px' }",
          required: false,
          description:
            "Default styling applied to the GoogleMap container.",
          usage:
            "Applied automatically during rendering.",
        },
      ],
    },

    {
      group: "Coordinate State",
      props: [
        {
          name: "coords",
          type: "object",
          defaultVal: "{ latitude: null, longitude: null }",
          required: false,
          description:
            "Stores the current map coordinates.",
          usage:
            "coords.latitude / coords.longitude",
        },

        {
          name: "coordsRef",
          type: "React.RefObject",
          defaultVal: "DEFAULT_COORDS",
          required: false,
          description:
            "Mutable reference storing the latest coordinate values without stale state issues.",
          usage:
            "coordsRef.current.latitude",
        },

        {
          name: "DEFAULT_COORDS",
          type: "object",
          defaultVal: "{ latitude: null, longitude: null }",
          required: false,
          description:
            "Fallback coordinate object used during initialization.",
          usage:
            "Used before GPS location loads.",
        },
      ],
    },

    {
      group: "Google Maps Integration",
      props: [
        {
          name: "useJsApiLoader",
          type: "hook",
          defaultVal: "—",
          required: false,
          description:
            "Loads the Google Maps JavaScript SDK dynamically.",
          usage:
            "useJsApiLoader({ googleMapsApiKey })",
        },

        {
          name: "isLoaded",
          type: "boolean",
          defaultVal: "false",
          required: false,
          description:
            "Indicates whether the Google Maps SDK has finished loading.",
          usage:
            "if (!isLoaded) return 'Loading Map...'",
        },

        {
          name: "GoogleMap",
          type: "component",
          defaultVal: "—",
          required: false,
          description:
            "Google Maps container component used for rendering the map.",
          usage:
            "<GoogleMap center={center} zoom={18} />",
        },

        {
          name: "Marker",
          type: "component",
          defaultVal: "—",
          required: false,
          description:
            "Displays a marker at the selected coordinates.",
          usage:
            "<Marker position={center} />",
        },
      ],
    },

    {
      group: "GPS & Location Handling",
      props: [
        {
          name: "updateCoords",
          type: "function",
          defaultVal: "—",
          required: false,
          description:
            "Updates coordinate state and dispatches Redux UI changes.",
          usage:
            "updateCoords({ latitude: 17.385, longitude: 78.4867 })",
        },

        {
          name: "navigator.geolocation.getCurrentPosition",
          type: "function",
          defaultVal: "—",
          required: false,
          description:
            "Fetches the user's current GPS coordinates from the browser.",
          usage:
            "Automatically triggered on component mount.",
        },

        {
          name: "center",
          type: "object",
          defaultVal: "{ lat, lng }",
          required: false,
          description:
            "Current Google Maps center coordinates derived from coords state.",
          usage:
            "center={{ lat: coords.latitude, lng: coords.longitude }}",
        },
      ],
    },

    {
      group: "Redux Integration",
      props: [
        {
          name: "dispatchAllCoord",
          type: "function",
          defaultVal: "—",
          required: false,
          description:
            "Dispatches Redux updates for latitude changes.",
          usage:
            "dispatchAllCoord()",
        },

        {
          name: "dispatchAllCoords",
          type: "function",
          defaultVal: "—",
          required: false,
          description:
            "Dispatches Redux updates for longitude changes.",
          usage:
            "dispatchAllCoords()",
        },

        {
          name: "SetUIChangedList",
          type: "Redux Action",
          defaultVal: "—",
          required: false,
          description:
            "Redux action used to notify UI state changes.",
          usage:
            "dispatch(SetUIChangedList(...))",
        },

        {
          name: "mainExtension",
          type: "string",
          defaultVal: "—",
          required: false,
          description:
            "Module/form identifier used for Redux tracking.",
          usage:
            "mainExtension='locationForm'",
        },

        {
          name: "index",
          type: "string | number",
          defaultVal: "—",
          required: false,
          description:
            "Unique field identifier used for Redux UI updates.",
          usage:
            "index='mapField'",
        },
      ],
    },

    {
      group: "Imperative Ref Methods",
      props: [
        {
          name: "setProperty",
          type: "function",
          defaultVal: "—",
          required: false,
          description:
            "Programmatically updates latitude, longitude, or full location coordinates.",
          usage:
            "mapRef.current.setProperty('latitude', 17.385)",
        },

        {
          name: "getProperty",
          type: "function",
          defaultVal: "—",
          required: false,
          description:
            "Returns latitude, longitude, or combined location object.",
          usage:
            "mapRef.current.getProperty('location')",
        },

        {
          name: "ref",
          type: "React.Ref",
          defaultVal: "null",
          required: false,
          description:
            "Forwarded ref used for runtime coordinate access.",
          usage:
            "ref={mapRef}",
        },
      ],
    },

    {
      group: "Property Handling",
      props: [
        {
          name: "setProperty('latitude')",
          type: "function",
          defaultVal: "—",
          required: false,
          description:
            "Updates only the latitude value.",
          usage:
            "setProperty('latitude', 17.385)",
        },

        {
          name: "setProperty('longitude')",
          type: "function",
          defaultVal: "—",
          required: false,
          description:
            "Updates only the longitude value.",
          usage:
            "setProperty('longitude', 78.4867)",
        },

        {
          name: "setProperty('location')",
          type: "function",
          defaultVal: "—",
          required: false,
          description:
            "Updates both latitude and longitude together using a location object.",
          usage:
            "setProperty('location', { Latitude: 17.385, Longitude: 78.4867 })",
        },

        {
          name: "getProperty('location')",
          type: "function",
          defaultVal: "—",
          required: false,
          description:
            "Returns the current coordinate object.",
          usage:
            "{ Latitude: 17.385, Longitude: 78.4867 }",
        },
      ],
    },

    {
      group: "Form Integration",
      props: [
        {
          name: "setFormValues",
          type: "function",
          defaultVal: "—",
          required: false,
          description:
            "Optional parent form state updater for coordinate values.",
          usage:
            "setFormValues((prev) => ({ ...prev, Latitude: lat }))",
        },
      ],
    },

    {
      group: "UI States",
      props: [
        {
          name: "Loading Map...",
          type: "string",
          defaultVal: "—",
          required: false,
          description:
            "Displayed while the Google Maps SDK is loading.",
          usage:
            "Shown when isLoaded === false.",
        },

        {
          name: "Getting GPS...",
          type: "string",
          defaultVal: "—",
          required: false,
          description:
            "Displayed while waiting for browser geolocation access.",
          usage:
            "Shown when coordinates are null.",
        },
      ],
    },
  ],
},
{
  id: "otp-component",
  name: "OTPComponent",
  description:
    "A reusable OTP verification component with resend timer, attempt tracking, multiple UI layouts, digit-wise OTP inputs, validation handling, Redux integration, and runtime OTP binding using forwardRef.",

  tags: [
    "otp",
    "verification",
    "authentication",
    "sms",
    "email-verification",
    "mui",
    "forwardRef",
    "redux",
  ],

  propGroups: [
    {
      group: "Core OTP Configuration",
      props: [
        {
          name: "source",
          type: "string",
          defaultVal: "''",
          required: false,
          description:
            "Target destination where the OTP is sent (mobile/email).",
          usage:
            "source='9876543210'",
        },

        {
          name: "initialTime",
          type: "number",
          defaultVal: "30",
          required: false,
          description:
            "Initial countdown timer duration for OTP resend.",
          usage:
            "initialTime={60}",
        },

        {
          name: "maxAttempts",
          type: "number",
          defaultVal: "3",
          required: false,
          description:
            "Maximum number of resend attempts allowed.",
          usage:
            "maxAttempts={5}",
        },

        {
          name: "layoutCase",
          type: "number",
          defaultVal: "1",
          required: false,
          description:
            "Controls which OTP UI layout is rendered.",
          usage:
            "layoutCase={2}",
        },
      ],
    },

    {
      group: "OTP State Handling",
      props: [
        {
          name: "otp",
          type: "array",
          defaultVal: "['', '', '', '', '', '']",
          required: false,
          description:
            "Stores digit-wise OTP input values.",
          usage:
            "Managed internally through handleOtpChange.",
        },

        {
          name: "internalOtp",
          type: "string",
          defaultVal: "''",
          required: false,
          description:
            "Combined OTP value generated from all OTP boxes.",
          usage:
            "Returned through getProperty(otpProp).",
        },

        {
          name: "fieldErrors",
          type: "array",
          defaultVal: "[false, false, false, false, false, false]",
          required: false,
          description:
            "Validation state for each OTP digit field.",
          usage:
            "Used internally for required validation.",
        },

        {
          name: "isOtpSent",
          type: "boolean",
          defaultVal: "false",
          required: false,
          description:
            "Tracks whether the OTP has been sent.",
          usage:
            "Controls OTP input visibility.",
        },
      ],
    },

    {
      group: "Timer & Attempts",
      props: [
        {
          name: "timeLeft",
          type: "number",
          defaultVal: "initialTime",
          required: false,
          description:
            "Current countdown timer value before resend is enabled.",
          usage:
            "Displayed as 'Resend OTP in X seconds'.",
        },

        {
          name: "attemptsLeft",
          type: "number",
          defaultVal: "maxAttempts",
          required: false,
          description:
            "Tracks remaining resend attempts.",
          usage:
            "Displayed below resend text.",
        },

        {
          name: "handleResendOTP",
          type: "function",
          defaultVal: "—",
          required: false,
          description:
            "Resets OTP state and dispatches resend request.",
          usage:
            "Triggered when resend timer reaches zero.",
        },
      ],
    },

    {
      group: "Redux Integration",
      props: [
        {
          name: "mainExtension",
          type: "string",
          defaultVal: "—",
          required: false,
          description:
            "Module/form identifier used for Redux tracking.",
          usage:
            "mainExtension='loginForm'",
        },

        {
          name: "index",
          type: "string | number",
          defaultVal: "—",
          required: false,
          description:
            "Unique field identifier used for Redux UI updates.",
          usage:
            "index='otpField'",
        },

        {
          name: "sendProp",
          type: "string",
          defaultVal: "'sendOTP'",
          required: false,
          description:
            "Redux property name dispatched when sending OTP.",
          usage:
            "sendProp='sendMobileOtp'",
        },

        {
          name: "verifyProp",
          type: "string",
          defaultVal: "'verifyOTP'",
          required: false,
          description:
            "Redux property name dispatched when verifying OTP.",
          usage:
            "verifyProp='verifyMobileOtp'",
        },

        {
          name: "otpProp",
          type: "string",
          defaultVal: "'otpvalue'",
          required: false,
          description:
            "Property name used for storing OTP values.",
          usage:
            "otpProp='mobileOtp'",
        },

        {
          name: "numberProp",
          type: "string",
          defaultVal: "'mobileNumber'",
          required: false,
          description:
            "Property name representing the source mobile/email field.",
          usage:
            "numberProp='phoneNumber'",
        },

        {
          name: "SetUIChangedList",
          type: "Redux Action",
          defaultVal: "—",
          required: false,
          description:
            "Redux action used to notify OTP-related UI updates.",
          usage:
            "dispatch(SetUIChangedList(...))",
        },
      ],
    },

    {
      group: "Event Handling",
      props: [
        {
          name: "onChange",
          type: "function",
          defaultVal: "() => {}",
          required: false,
          description:
            "Triggered when a complete 6-digit OTP is entered.",
          usage:
            "onChange={(otp) => console.log(otp)}",
        },

        {
          name: "onVerify",
          type: "function",
          defaultVal: "() => {}",
          required: false,
          description:
            "Triggered after OTP verification is requested.",
          usage:
            "onVerify={(otp) => verifyOtp(otp)}",
        },

        {
          name: "handleSendOTP",
          type: "function",
          defaultVal: "—",
          required: false,
          description:
            "Dispatches OTP send request and initializes OTP state.",
          usage:
            "Triggered on 'Send OTP' button click.",
        },

        {
          name: "handleVerifyOTP",
          type: "function",
          defaultVal: "—",
          required: false,
          description:
            "Validates OTP and dispatches verification request.",
          usage:
            "Triggered on 'Verify OTP' button click.",
        },

        {
          name: "handleOtpChange",
          type: "function",
          defaultVal: "—",
          required: false,
          description:
            "Handles digit-wise OTP input changes.",
          usage:
            "Triggered while typing OTP digits.",
        },

        {
          name: "handleKeyDown",
          type: "function",
          defaultVal: "—",
          required: false,
          description:
            "Handles backspace navigation between OTP fields.",
          usage:
            "Moves focus to previous input on backspace.",
        },
      ],
    },

    {
      group: "Validation & Errors",
      props: [
        {
          name: "error",
          type: "boolean",
          defaultVal: "false",
          required: false,
          description:
            "External validation error state.",
          usage:
            "error={hasOtpError}",
        },

        {
          name: "helperText",
          type: "string",
          defaultVal: "''",
          required: false,
          description:
            "Helper text displayed below OTP fields.",
          usage:
            "helperText='Invalid OTP'",
        },
      ],
    },

    {
      group: "Imperative Ref Methods",
      props: [
        {
          name: "setProperty",
          type: "function",
          defaultVal: "—",
          required: false,
          description:
            "Programmatically updates the OTP value.",
          usage:
            "otpRef.current.setProperty('otpvalue', '123456')",
        },

        {
          name: "getProperty",
          type: "function",
          defaultVal: "—",
          required: false,
          description:
            "Returns the currently entered OTP value.",
          usage:
            "otpRef.current.getProperty('otpvalue')",
        },

        {
          name: "unlock",
          type: "function",
          defaultVal: "—",
          required: false,
          description:
            "Unlocks OTP input updates after user typing restrictions.",
          usage:
            "otpRef.current.unlock()",
        },

        {
          name: "ref",
          type: "React.Ref",
          defaultVal: "null",
          required: false,
          description:
            "Forwarded ref used for runtime OTP control.",
          usage:
            "ref={otpRef}",
        },
      ],
    },

    {
      group: "UI Rendering",
      props: [
        {
          name: "renderOtpBoxes",
          type: "function",
          defaultVal: "—",
          required: false,
          description:
            "Renders reusable digit-wise OTP input fields.",
          usage:
            "renderOtpBoxes()",
        },

        {
          name: "layoutCase === 1",
          type: "layout",
          defaultVal: "simple",
          required: false,
          description:
            "Simple inline OTP UI with send button and OTP inputs.",
          usage:
            "Default layout rendering.",
        },

        {
          name: "layoutCase !== 1",
          type: "layout",
          defaultVal: "styled-card",
          required: false,
          description:
            "Styled card-based OTP verification layout.",
          usage:
            "Enhanced UI with banner and full-width verify button.",
        },
      ],
    },

    {
      group: "Formatting Utilities",
      props: [
        {
          name: "UseFetchedFormate",
          type: "function",
          defaultVal: "—",
          required: false,
          description:
            "Formats fetched OTP values before rendering.",
          usage:
            "Used internally during setProperty().",
        },

        {
          name: "hasUserTyped",
          type: "React.RefObject",
          defaultVal: "false",
          required: false,
          description:
            "Prevents overwriting OTP values after manual typing.",
          usage:
            "Managed internally.",
        },

        {
          name: "otpDispatched",
          type: "React.RefObject",
          defaultVal: "false",
          required: false,
          description:
            "Tracks whether OTP dispatch has already occurred.",
          usage:
            "Managed internally.",
        },
      ],
    },
  ],
},
{
  id: "custom-button-component",
  name: "CustomButton",
  description:
    "A reusable customizable button component with dynamic Material UI icons, loading states, verification indicators, pagination handling, event execution, command-based actions, and workflow integration — powered by useCustomButtonLogic.",

  tags: [
    "button",
    "action-button",
    "mui-icons",
    "workflow",
    "pagination",
    "event-handler",
    "forwardRef",
  ],

  propGroups: [
    {
      group: "Core Button Configuration",
      props: [
        {
          name: "label",
          type: "string",
          defaultVal: "'Next'",
          required: false,
          description:
            "Text displayed inside the button.",
          usage:
            "label='Save'",
        },

        {
          name: "iconType",
          type: "string",
          defaultVal: "''",
          required: false,
          description:
            "Icon name mapped dynamically from the ICON_MAP object.",
          usage:
            "iconType='save'",
        },

        {
          name: "index",
          type: "string | number",
          defaultVal: "—",
          required: false,
          description:
            "Unique button identifier.",
          usage:
            "index='submitBtn'",
        },

        {
          name: "type",
          type: "string",
          defaultVal: "'button'",
          required: false,
          description:
            "HTML button type used during rendering.",
          usage:
            "type='submit'",
        },
      ],
    },

    {
      group: "Dynamic Icons",
      props: [
        {
          name: "ICON_MAP",
          type: "object",
          defaultVal: "{}",
          required: false,
          description:
            "Maps icon keywords to Material UI icon components.",
          usage:
            "ICON_MAP['save'] → MuiIcons.Save",
        },

        {
          name: "IconComponent",
          type: "React.Component",
          defaultVal: "null",
          required: false,
          description:
            "Resolved Material UI icon component rendered inside the button.",
          usage:
            "Rendered automatically from iconType.",
        },

        {
          name: "verified",
          type: "boolean",
          defaultVal: "false",
          required: false,
          description:
            "Displays a green verification icon after successful actions.",
          usage:
            "Managed internally through useCustomButtonLogic.",
        },
      ],
    },

    {
      group: "Workflow & Navigation",
      props: [
        {
          name: "command",
          type: "string",
          defaultVal: "''",
          required: false,
          description:
            "Command/action identifier used for workflow execution.",
          usage:
            "command='SAVE_AND_NEXT'",
        },

        {
          name: "pagenation",
          type: "boolean",
          defaultVal: "false",
          required: false,
          description:
            "Enables pagination-related workflow handling.",
          usage:
            "pagenation={true}",
        },

        {
          name: "skipPagenation",
          type: "boolean",
          defaultVal: "false",
          required: false,
          description:
            "Skips pagination logic during button execution.",
          usage:
            "skipPagenation={true}",
        },

        {
          name: "skip",
          type: "boolean",
          defaultVal: "false",
          required: false,
          description:
            "Skips specific validation or workflow stages.",
          usage:
            "skip={true}",
        },

        {
          name: "stageLevel",
          type: "number",
          defaultVal: "0",
          required: false,
          description:
            "Current workflow stage level used during action execution.",
          usage:
            "stageLevel={2}",
        },
      ],
    },

    {
      group: "Action & Event Handling",
      props: [
        {
          name: "handleNext",
          type: "function",
          defaultVal: "—",
          required: false,
          description:
            "Main click handler executed when the button is pressed.",
          usage:
            "Triggered automatically onClick.",
        },

        {
          name: "events",
          type: "object | array",
          defaultVal: "{}",
          required: false,
          description:
            "Custom event configuration executed during button actions.",
          usage:
            "events={{ onSuccess: callback }}",
        },

        {
          name: "eventbutton",
          type: "string",
          defaultVal: "''",
          required: false,
          description:
            "Additional event-specific CSS class names.",
          usage:
            "eventbutton='primary-action-btn'",
        },

        {
          name: "ActionsType",
          type: "string",
          defaultVal: "''",
          required: false,
          description:
            "Defines the type of workflow action triggered by the button.",
          usage:
            "ActionsType='submit'",
        },
      ],
    },

    {
      group: "Validation & Form Handling",
      props: [
        {
          name: "ForcedValidation",
          type: "boolean",
          defaultVal: "false",
          required: false,
          description:
            "Triggers forced validation before action execution.",
          usage:
            "ForcedValidation={true}",
        },

        {
          name: "Dirty",
          type: "boolean",
          defaultVal: "false",
          required: false,
          description:
            "Indicates whether the form contains modified values.",
          usage:
            "Dirty={true}",
        },

        {
          name: "clear",
          type: "boolean",
          defaultVal: "false",
          required: false,
          description:
            "Clears form state after successful action execution.",
          usage:
            "clear={true}",
        },

        {
          name: "Assign_value",
          type: "object",
          defaultVal: "{}",
          required: false,
          description:
            "Dynamic value assignments triggered during workflow execution.",
          usage:
            "Assign_value={{ status: 'approved' }}",
        },
      ],
    },

    {
      group: "File System & Mode Handling",
      props: [
        {
          name: "FileSystem",
          type: "boolean | object",
          defaultVal: "false",
          required: false,
          description:
            "Enables file-system related processing during button execution.",
          usage:
            "FileSystem={true}",
        },

        {
          name: "mode",
          type: "string",
          defaultVal: "''",
          required: false,
          description:
            "Controls operational mode for the button workflow.",
          usage:
            "mode='edit'",
        },
      ],
    },

    {
      group: "Logic Integration",
      props: [
        {
          name: "useCustomButtonLogic",
          type: "hook",
          defaultVal: "—",
          required: false,
          description:
            "Centralized hook managing loading state, verification state, and workflow execution.",
          usage:
            "useCustomButtonLogic(props, ref)",
        },

        {
          name: "loading",
          type: "boolean",
          defaultVal: "false",
          required: false,
          description:
            "Disables the button and shows loading state during async actions.",
          usage:
            "Managed internally.",
        },

        {
          name: "mainExtension",
          type: "string",
          defaultVal: "—",
          required: false,
          description:
            "Module/form identifier used for workflow tracking.",
          usage:
            "mainExtension='customerWorkflow'",
        },
      ],
    },

    {
      group: "Styling & UI",
      props: [
        {
          name: "style",
          type: "object",
          defaultVal: "{}",
          required: false,
          description:
            "Inline style overrides applied to the button.",
          usage:
            "style={{ backgroundColor: '#1976d2' }}",
        },

        {
          name: "className",
          type: "string",
          defaultVal: "''",
          required: false,
          description:
            "Additional CSS classes applied to the button.",
          usage:
            "className='primary-btn'",
        },
      ],
    },

    {
      group: "Imperative Ref Support",
      props: [
        {
          name: "ref",
          type: "React.Ref",
          defaultVal: "null",
          required: false,
          description:
            "Forwarded ref used for runtime button interaction.",
          usage:
            "ref={buttonRef}",
        },
      ],
    },
  ],
},
{
  id: "action-component",
  name: "ActionComponent",
  description:
    "A workflow-driven action button component supporting dynamic modes, WebSocket command execution, validation handling, pagination, Redux integration, file-service handling, runtime property updates, and async command orchestration using forwardRef.",

  tags: [
    "action-button",
    "workflow",
    "commands",
    "websocket",
    "redux",
    "pagination",
    "validation",
    "forwardRef",
  ],

  propGroups: [
    {
      group: "Core Button Configuration",
      props: [
        {
          name: "label",
          type: "string",
          defaultVal: "'Next'",
          required: false,
          description:
            "Text displayed inside the default action button.",
          usage:
            "label='Save'",
        },

        {
          name: "command",
          type: "string",
          defaultVal: "''",
          required: false,
          description:
            "Workflow command executed when the button is clicked.",
          usage:
            "command='InsertData'",
        },

        {
          name: "index",
          type: "string | number",
          defaultVal: "—",
          required: false,
          description:
            "Unique button identifier.",
          usage:
            "index='submitBtn'",
        },

        {
          name: "mode",
          type: "string",
          defaultVal: "''",
          required: false,
          description:
            "Runtime mode controlling which buttons are rendered.",
          usage:
            "mode='add'",
        },

        {
          name: "lowermode",
          type: "string",
          defaultVal: "''",
          required: false,
          description:
            "Lowercase version of mode used for rendering logic.",
          usage:
            "lowermode === 'edit'",
        },
      ],
    },

    {
      group: "Mode-Based Rendering",
      props: [
        {
          name: "renderCancelbutton",
          type: "function",
          defaultVal: "—",
          required: false,
          description:
            "Renders the cancel button.",
          usage:
            "Shown in add/edit/view modes.",
        },

        {
          name: "renderSubmitbutton",
          type: "function",
          defaultVal: "—",
          required: false,
          description:
            "Renders the submit button.",
          usage:
            "Shown in add mode.",
        },

        {
          name: "renderUpdatebutton",
          type: "function",
          defaultVal: "—",
          required: false,
          description:
            "Renders the update button.",
          usage:
            "Shown in edit mode.",
        },

        {
          name: "renderLabelbutton",
          type: "function",
          defaultVal: "—",
          required: false,
          description:
            "Renders the default standalone action button.",
          usage:
            "Shown when no mode exists.",
        },

        {
          name: "isModeSet",
          type: "boolean",
          defaultVal: "false",
          required: false,
          description:
            "Prevents rendering until mode is received through setProperty.",
          usage:
            "if (!isModeSet) return null;",
        },
      ],
    },

    {
      group: "Validation & Workflow Handling",
      props: [
        {
          name: "ForcedValidation",
          type: "boolean",
          defaultVal: "false",
          required: false,
          description:
            "Triggers global validation before command execution.",
          usage:
            "ForcedValidation={true}",
        },

        {
          name: "Dirty",
          type: "boolean",
          defaultVal: "false",
          required: false,
          description:
            "Triggers dirty-state Redis synchronization after submit.",
          usage:
            "Dirty={true}",
        },

        {
          name: "validatedlistmain",
          type: "array",
          defaultVal: "[]",
          required: false,
          description:
            "Validation state array retrieved from Redux.",
          usage:
            "validationformState",
        },

        {
          name: "isValid",
          type: "boolean",
          defaultVal: "false",
          required: false,
          description:
            "Determines whether workflow execution is allowed.",
          usage:
            "valuesArray.every(v => v === true)",
        },
      ],
    },

    {
      group: "Command Execution",
      props: [
        {
          name: "executeCommands",
          type: "function",
          defaultVal: "—",
          required: false,
          description:
            "Centralized command execution engine handling API calls, pagination, inserts, deletes, and refresh actions.",
          usage:
            "executeCommands('commands', payload)",
        },

        {
          name: "handleNext",
          type: "function",
          defaultVal: "—",
          required: false,
          description:
            "Main workflow handler triggered on button click.",
          usage:
            "onClick={(e) => handleNext(e, mode, 'submit')}",
        },

        {
          name: "payload",
          type: "object",
          defaultVal: "{}",
          required: false,
          description:
            "Payload object sent to executeCommands.",
          usage:
            "{ command, mainExtension, Dirty }",
        },

        {
          name: "Assign_value",
          type: "object",
          defaultVal: "{}",
          required: false,
          description:
            "Dynamic value assignments passed during command execution.",
          usage:
            "Assign_value={{ status: 'Approved' }}",
        },
      ],
    },

    {
      group: "WebSocket Handling",
      props: [
        {
          name: "getWebSocket",
          type: "function",
          defaultVal: "—",
          required: false,
          description:
            "Returns the active WebSocket instance.",
          usage:
            "const ws = getWebSocket();",
        },

        {
          name: "eventBus",
          type: "object",
          defaultVal: "—",
          required: false,
          description:
            "Global event bus used for partial WebSocket responses.",
          usage:
            "eventBus.on('WS_PARTIAL_MESSAGE', handler)",
        },

        {
          name: "insertTriggeredRef",
          type: "React.RefObject",
          defaultVal: "false",
          required: false,
          description:
            "Tracks whether insert/delete events succeeded.",
          usage:
            "insertTriggeredRef.current = true",
        },

        {
          name: "activeRequestRef",
          type: "React.RefObject",
          defaultVal: "null",
          required: false,
          description:
            "Tracks the currently active async request.",
          usage:
            "Managed internally.",
        },
      ],
    },

    {
      group: "Redux Integration",
      props: [
        {
          name: "mainExtension",
          type: "string",
          defaultVal: "—",
          required: false,
          description:
            "Redux container/module identifier.",
          usage:
            "mainExtension='employeeForm'",
        },

        {
          name: "SetserviceCallingState",
          type: "Redux Action",
          defaultVal: "—",
          required: false,
          description:
            "Updates file-service loading state.",
          usage:
            "dispatch(SetserviceCallingState(...))",
        },

        {
          name: "SetCommandsCalling",
          type: "Redux Action",
          defaultVal: "—",
          required: false,
          description:
            "Updates command refresh counters after workflow completion.",
          usage:
            "dispatch(SetCommandsCalling(...))",
        },

        {
          name: "batchClearState",
          type: "Redux Action",
          defaultVal: "—",
          required: false,
          description:
            "Clears validation and group tree state after completion.",
          usage:
            "dispatch(batchClearState(...))",
        },

        {
          name: "setForcedValidation",
          type: "Redux Action",
          defaultVal: "—",
          required: false,
          description:
            "Triggers validation across all fields.",
          usage:
            "dispatch(setForcedValidation(...))",
        },

        {
          name: "removeContainer",
          type: "Redux Action",
          defaultVal: "—",
          required: false,
          description:
            "Removes the Redux container after successful delete/cancel.",
          usage:
            "dispatch(removeContainer(mainExtension))",
        },
      ],
    },

    {
      group: "Pagination & Navigation",
      props: [
        {
          name: "pagenation",
          type: "object",
          defaultVal: "{}",
          required: false,
          description:
            "Pagination metadata used for page navigation commands.",
          usage:
            "pagenation={{ CurrentPage: 1, Module: 'Users' }}",
        },

        {
          name: "pages",
          type: "string",
          defaultVal: "'refreshdata'",
          required: false,
          description:
            "Refresh page command identifier.",
          usage:
            "executeCommands('datarefresh', { pages })",
        },

        {
          name: "useLocation",
          type: "hook",
          defaultVal: "—",
          required: false,
          description:
            "Provides current router location during workflow execution.",
          usage:
            "const location = useLocation();",
        },
      ],
    },

    {
      group: "File System Handling",
      props: [
        {
          name: "FileSystem",
          type: "string",
          defaultVal: "''",
          required: false,
          description:
            "Enables file upload/download workflow handling.",
          usage:
            "FileSystem='File'",
        },

        {
          name: "handleDownload",
          type: "function",
          defaultVal: "—",
          required: false,
          description:
            "Handles file downloads during workflow execution.",
          usage:
            "Imported from config utilities.",
        },

        {
          name: "checkServiceType",
          type: "function",
          defaultVal: "—",
          required: false,
          description:
            "Processes service-type based API responses.",
          usage:
            "checkServiceType(ServiceType, location, response)",
        },
      ],
    },

    {
      group: "Toast Notifications",
      props: [
        {
          name: "toast.success",
          type: "function",
          defaultVal: "—",
          required: false,
          description:
            "Displays success notifications after workflow completion.",
          usage:
            "toast.success('Saved Successfully')",
        },

        {
          name: "toast.error",
          type: "function",
          defaultVal: "—",
          required: false,
          description:
            "Displays failure notifications when commands fail.",
          usage:
            "toast.error('Something Went Wrong')",
        },

        {
          name: "ToastContainer",
          type: "component",
          defaultVal: "—",
          required: false,
          description:
            "Toast notification container from react-toastify.",
          usage:
            "<ToastContainer />",
        },
      ],
    },

    {
      group: "Imperative Ref Methods",
      props: [
        {
          name: "setProperty",
          type: "function",
          defaultVal: "—",
          required: false,
          description:
            "Programmatically updates runtime properties such as mode.",
          usage:
            "actionRef.current.setProperty('mode', ['edit'])",
        },

        {
          name: "getProperty",
          type: "function",
          defaultVal: "—",
          required: false,
          description:
            "Reserved property getter for runtime access.",
          usage:
            "actionRef.current.getProperty('mode')",
        },

        {
          name: "ref",
          type: "React.Ref",
          defaultVal: "null",
          required: false,
          description:
            "Forwarded ref used for runtime workflow interaction.",
          usage:
            "ref={actionRef}",
        },
      ],
    },
  ],
}
 
];

export const ALL_TYPES = ["boolean", "string", "array", "object", "function", "number", "any"];
