import React, { useEffect, useState } from "react";
import PTList from "./PTList";
import FormComponent from "./FormComponent";
import formConfig from "../../config/formConfig";
import { axiosGet } from "../../services/apiServices";
import { MdOutlineClose } from "react-icons/md";

const PTManagement = ({ formType }) => {
  const [formData, setFormData] = useState({});
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [filterString, setFilterString] = useState("");
  const filteredList = list?.filter((item) =>
    item.name.toLowerCase().includes(filterString.toLowerCase())
  );

  const fetchRecords = async () => {
    setLoading(true);
    try {
      const res = await axiosGet(`/${formType}`);
      setList(res.data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const fetchIndividualRecord = async (id) => {
    try {
      const res = await axiosGet(`${formType}/${selectedRecord}`);
      let record = res.data;

      if (record.dob) {
        const [day, month, year] = record.dob.split(/[/-]/);
        record.dob = `${year}-${month}-${day}`;
      }

      setFormData(record);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    setList(null);
    setSelectedRecord(null);
    clearForm();
    fetchRecords();
  }, [formType]);

  useEffect(() => {
    if (selectedRecord !== null) {
      fetchIndividualRecord(selectedRecord);
    }
  }, [selectedRecord]);

  const handleFormDataChange = (value, fieldName) => {
    let parsedValue = value;
    // if (fieldName === "dob") {
    //   // const date = new Date(value);
    //   // parsedValue = date.toISOString().split("T")[0];
    // } else if (fieldName === "expertice") {
    //   parsedValue = Number(value);
    // }
    setFormData((prev) => ({ ...prev, [fieldName]: parsedValue }));
  };

  const clearForm = () => {
    setFormData(
      formConfig[formType]?.fields?.reduce((acc, field) => {
        if (field.type === "checkbox") {
          acc[field.type] = false;
        } else if (field.type === "radio") {
          if (field.name === "category") {
            acc[field.name] = [];
          } else {
            acc[field.name] = "";
          }
        } else {
          acc[field.name] = "";
        }
        return acc;
      }, {})
    );
  };

  return (
    <section className="flex gap-8">
      <section className="p-4 rounded-md w-xl">
        <section className="flex items-center justify-between mb-4">
          <h1 className="text-lg font-semibold ">
            {formType === "players" ? "Player" : "Team"} List (
            {filteredList?.length})
          </h1>
          <section className="flex items-center gap-1">
            {filterString?.length > 0 && (
              <button
                title="Clear the search field"
                className="text-red-500 cursor-pointer"
                onClick={() => setFilterString("")}
              >
                <MdOutlineClose />
              </button>
            )}
            <input
              type="text"
              placeholder="Search using name"
              value={filterString}
              onChange={(e) => setFilterString(e.target.value)}
              className={
                " border-b-1 border-[#E0E0E0] py-2 px-1  w-60 h-6  focus:outline-none"
              }
            />
          </section>
        </section>
        {loading ? (
          <p>Loading...</p>
        ) : filteredList === null || filteredList?.length === 0 ? (
          <p>No Record found</p>
        ) : (
          <section className="flex gap-2 flex-col overflow-scroll h-screen hide-scrollbar">
            {filteredList?.map((item) => (
              <PTList
                key={item._id}
                ptDetail={item}
                fetchRecords={fetchRecords}
                formType={formType}
                setSelectedRecord={setSelectedRecord}
                selectedRecord={selectedRecord}
                clearForm={clearForm}
              />
            ))}
          </section>
        )}
      </section>
      <FormComponent
        formType={formType}
        formData={formData}
        onChange={handleFormDataChange}
        clearForm={clearForm}
        fetchRecords={fetchRecords}
        setSelectedRecord={setSelectedRecord}
        selectedRecord={selectedRecord}
      />
    </section>
  );
};

export default PTManagement;
