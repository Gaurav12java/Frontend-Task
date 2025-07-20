import React, { useState } from "react";

const fieldTypes = ["string", "number", "boolean", "nested"];

const App = () => {
  const [fields, setFields] = useState([]);

  // Add a new field
  const addField = (parentIndex = null) => {
    const newField = { name: "", type: "string", nested: [] };
    if (parentIndex !== null) {
      const updated = [...fields];
      updated[parentIndex].nested.push({ ...newField });
      setFields(updated);
    } else {
      setFields([...fields, newField]);
    }
  };

  // Update a field
  const updateField = (index, key, value, parentIndex = null) => {
    const updated = [...fields];
    if (parentIndex !== null) {
      updated[parentIndex].nested[index][key] = value;
    } else {
      updated[index][key] = value;
    }
    setFields(updated);
  };

  // Delete a field
  const deleteField = (index, parentIndex = null) => {
    const updated = [...fields];
    if (parentIndex !== null) {
      updated[parentIndex].nested.splice(index, 1);
    } else {
      updated.splice(index, 1);
    }
    setFields(updated);
  };

  // Convert fields to JSON
  const buildJson = (fieldsArr) => {
    const obj = {};
    fieldsArr.forEach((field) => {
      if (field.type === "nested") {
        obj[field.name || ""] = buildJson(field.nested);
      } else {
        obj[field.name || ""] = field.type;
      }
    });
    return obj;
  };

  const inputStyle = {
    width: "180px",
    padding: "6px 8px",
    marginRight: "8px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    fontSize: "14px",
  };

  const buttonStyle = {
    padding: "6px 10px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "14px",
  };

  return (
    <div style={{ display: "flex", gap: "20px", padding: "20px" }}>
      <div style={{ flex: 1 }}>
        {fields.map((field, index) => (
          <div
            key={index}
            style={{
              marginBottom: "12px",
              display: "flex",
              flexDirection: "column",
              gap: "8px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <input
                type="text"
                placeholder="Field Name"
                value={field.name}
                onChange={(e) => updateField(index, "name", e.target.value)}
                style={inputStyle}
              />
              <select
                value={field.type}
                onChange={(e) => updateField(index, "type", e.target.value)}
                style={inputStyle}
              >
                {fieldTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              <button
                onClick={() => deleteField(index)}
                style={{ ...buttonStyle, background: "red", color: "white" }}
              >
                X
              </button>
            </div>

            {field.type === "nested" && (
              <div style={{ marginLeft: "20px", marginTop: "8px" }}>
                {field.nested.map((nestedField, nestedIndex) => (
                  <div
                    key={nestedIndex}
                    style={{ display: "flex", alignItems: "center", marginBottom: "5px" }}
                  >
                    <input
                      type="text"
                      placeholder="Field Name"
                      value={nestedField.name}
                      onChange={(e) =>
                        updateField(nestedIndex, "name", e.target.value, index)
                      }
                      style={inputStyle}
                    />
                    <select
                      value={nestedField.type}
                      onChange={(e) =>
                        updateField(nestedIndex, "type", e.target.value, index)
                      }
                      style={inputStyle}
                    >
                      {fieldTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                    <button
                      onClick={() => deleteField(nestedIndex, index)}
                      style={{ ...buttonStyle, background: "red", color: "white" }}
                    >
                      X
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => addField(index)}
                  style={{
                    ...buttonStyle,
                    background: "#007bff",
                    color: "white",
                    marginTop: "5px",
                  }}
                >
                  + Add Nested Field
                </button>
              </div>
            )}
          </div>
        ))}

        <button
          onClick={() => addField()}
          style={{
            ...buttonStyle,
            background: "#007bff",
            color: "white",
            marginTop: "10px",
          }}
        >
          + Add Field
        </button>
        <button
          style={{
            ...buttonStyle,
            background: "green",
            color: "white",
            display: "block",
            marginTop: "10px",
          }}
        >
          Submit
        </button>
      </div>

      <div
        style={{
          flex: 1,
          background: "#070707",
          color: "white",
          padding: "10px",
          borderRadius: "5px",
        }}
      >
        <pre>{JSON.stringify(buildJson(fields), null, 2)}</pre>
      </div>
    </div>
  );
};

export default App;
