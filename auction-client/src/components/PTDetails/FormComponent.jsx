import React, { useState } from "react";
import formConfig from "../../config/formConfig";
import { axiosPost, axiosPut } from "../../services/apiServices";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";
import { VscClearAll } from "react-icons/vsc";
import { CiEdit } from "react-icons/ci";

const FormComponent = ({
  formType,
  formData,
  onChange,
  clearForm,
  fetchRecords,
  setSelectedRecord,
  selectedRecord,
}) => {
  const formSettings = formConfig[formType];
  const notyf = new Notyf({
    duration: 1000,
    position: {
      x: "right",
      y: "top",
    },
    types: [
      {
        type: "success",
        background: "MediumSeaGreen",
        duration: 2000,
        dismissible: true,
      },
      {
        type: "error",
        background: "indianred",
        duration: 2000,
        dismissible: true,
      },
    ],
  });
  const [enableEdit, setEnableEdit] = useState(false);
  const isEditable = !enableEdit && selectedRecord !== null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const missingFields = formSettings.fields
      .filter((field) => field.required && !formData[field.name])
      .map((field) => field.label);
    if (missingFields.length) {
      alert(`Please fill out: ${missingFields.join(", ")}`);
      return;
    }
    if (selectedRecord === null) {
      axiosPost(`${formType}`, formData)
        .then((res) => {
          notyf.success("Successfully Submitted");
          clearForm();
          fetchRecords();
        })
        .catch((e) => notyf.error("Something went wrong please try again"));
    } else if (selectedRecord !== null) {
      axiosPut(`${formType}/${selectedRecord}`, formData)
        .then((res) => {
          notyf.success("Successfully updated");
          setSelectedRecord(null);
          clearForm();
          fetchRecords();
        })
        .catch((e) => notyf.error("Something went wrong please try again"));
    }
  };

  if (!formSettings) {
    return <div>Invalid Form</div>;
  }
  return (
    <section className="p-4 w-xl ">
      <section className="flex items-start justify-between mb-2">
        <h2 className="text-lg font-semibold">
          {isEditable ? "View " : "Edit "}
          {formSettings.title}
        </h2>
        <section className="flex gap-2">
          {/* Edit the existing user details button */}
          {selectedRecord && (
            <button
              title={`${!isEditable ? "Disable" : "Enable"} edit`}
              className="bg-orange-200 active:bg-orange-300 text-orange-400 rounded-md p-2 text-lg"
              onClick={() => setEnableEdit((prev) => !prev)}
            >
              <CiEdit />
            </button>
          )}
          {/* Clear form button */}
          <button
            title="Clear the form"
            className="bg-red-200 active:bg-red-300 text-red-400 rounded-md p-2 text-lg"
            onClick={() => {
              clearForm();
              setSelectedRecord(null);
            }}
          >
            <VscClearAll />
          </button>
        </section>
      </section>
      <form className="space-y-2" onSubmit={handleSubmit}>
        {formSettings.fields.map(({ name, label, type, required, options }) => (
          <div key={name}>
            <label className="block text-gray-700 text-sm font-light mb-1">
              {label}
            </label>
            {type === "radio" && options ? (
              <div className="flex gap-4">
                {options.map((option) => (
                  <label key={option} className="flex gap-4 select-none">
                    <input
                      type="radio"
                      name={name}
                      value={option}
                      checked={formData[name] === option}
                      disabled={isEditable}
                      // onChange={(e) => onChange(e.target.value, name)}
                      onChange={(e) => {
                        const value = e.target.value;
                        if (name === "category") {
                          const selected = formData[name] || [];
                          const updated = selected.includes(value)
                            ? selected.filter((v) => v !== value)
                            : [...selected, value];
                          onChange(updated, name);
                        } else {
                          onChange(e.target.value, name);
                        }
                      }}
                      className="hidden"
                    />
                    {/* <span
                      className={`px-3  py-1 rounded-md text-sm font-light cursor-pointer transition-all ${
                        formData[name] === option
                          ? "bg-blue-200 text-blue-500 font-normal"
                          : "bg-[#E0E0E0]"
                      }`}
                    > */}
                    <span
                      className={`px-3  py-1 rounded-md text-sm font-light cursor-pointer transition-all ${
                        name === "category"
                          ? formData[name]?.includes(option)
                            ? "bg-blue-200 text-blue-500 font-normal"
                            : "bg-[#E0E0E0]"
                          : formData[name] === option
                          ? "bg-blue-200 text-blue-500 font-normal"
                          : "bg-[#E0E0E0]"
                      }`}
                    >
                      {option}
                    </span>
                  </label>
                ))}
              </div>
            ) : type === "date" ? (
              <input
                type="date"
                name={name}
                value={formData[name] || ""}
                onChange={(e) => onChange(e.target.value, name)}
                disabled={isEditable}
                required={required}
                className={`${
                  isEditable ? "bg-[#E0E0E0]" : "bg-white"
                } border-1 p-2 rounded-md w-full border-[#E0E0E0] focus:outline-none focus:border-blue-200 focus:ring focus:ring-blue-400`}
              />
            ) : type === "text" || type === "number" || type === "email" ? (
              <input
                type={type}
                name={name}
                value={formData[name] || ""}
                onChange={(e) => onChange(e.target.value, name)}
                required={required}
                disabled={isEditable}
                className={`${
                  isEditable ? "bg-[#E0E0E0]" : "bg-white"
                } border-1 border-[#E0E0E0] p-2  rounded-md w-full  focus:outline-none focus:border-blue-200 focus:ring focus:ring-blue-400 `}
              />
            ) : null}
          </div>
        ))}
        <button className="bg-[#CCFFCC] text-green-700 rounded-md font-semibold p-2 text-sm mt-4 w-32 active:scale-95">
          {selectedRecord === null ? "Submit" : "Update"}
        </button>
      </form>
    </section>
  );
};

export default FormComponent;
