import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { axiosDelete } from "../../services/apiServices";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";
import Modal from "../Modal/Modal";

const PTList = ({
  ptDetail,
  fetchRecords,
  formType,
  clearForm,
  setSelectedRecord,
  selectedRecord,
}) => {
  const [openDeleteConfirm, setDeleteConfirm] = useState(false);

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

  const handleDelete = (id) => {
    clearForm();
    axiosDelete(`${formType}/${id}`)
      .then((res) => {
        notyf.success("Record deleted successfully");
        fetchRecords();
      })
      .catch((e) => notyf.error("Something went wrong please try again"));
  };

  return (
    <section
      className={`bg-[#E0E0E0] cursor-pointer rounded-md flex items-center justify-between transition-all select-none ${selectedRecord === ptDetail._id ? "bg-blue-200" : ""
        }`}
      onClick={() => {
        selectedRecord !== ptDetail._id && clearForm();
        setSelectedRecord(ptDetail._id);
      }}
    >
      {formType === "players" ? (
        <section className="p-2">
          <section className="flex flex-row items-center gap-2">
            <section className="w-20 h-20 overflow-hidden relative rounded-full">
              <img
                src={`http://localhost:3000/playerPic/${ptDetail.photo}`}
                loading="lazy"
                alt={ptDetail.name}
                className="w-full h-full object-cover object-center"
              />
            </section>
            <section className="flex flex-col gap-1 items-center">
              <section className="flex gap-2 items-center">
                <h4 className="text-md font-bold">{ptDetail.name}</h4>
                <span>|</span>
                <p className="text-sm">{ptDetail.gender}</p>
                <span>|</span>
                <p className="font-bold text-green-700">
                  &#x20b9;{ptDetail.basePrice}
                </p>
              </section>
              <section className="flex gap-4 items-center text-sm">
                <p>{ptDetail.location}</p>
                <p>{ptDetail.contact}</p>
              </section>
            </section>

          </section>

        </section>
      ) : (
        <section className="p-2">
          <section className="flex gap-1 items-center">
            <h4 className="text-md font-bold">{ptDetail.name}</h4>
            <span>|</span>
            <p className="font-bold text-green-700">
              &#x20b9;{ptDetail.purseValue}{" "}
              <span className="text-gray-700 text-[10px] font-light">{`[Purse Value]`}</span>
            </p>
          </section>
          <section className="flex gap-4 items-center text-sm">
            <p>{ptDetail.owner}</p>
          </section>
        </section>
      )}
      <button
        title="Delete the record"
        className="bg-red-200 active:bg-red-500 text-1xl text-red-400 h-full w-10 flex items-center justify-center rounded-r-md cursor-pointer"
        onClick={() => setDeleteConfirm(true)}
      >
        <AiOutlineClose />
      </button>
      {openDeleteConfirm && (
        <Modal onClose={() => setDeleteConfirm(false)}>
          <section className="flex justify-center flex-col gap-2">
            <h1 className="font-semibold text-2xl text-gray-700">
              Confirm Delete
            </h1>
            <p className="font-light text-sm text-gray-500">
              Are you sure you want to delete this record?
            </p>
          </section>
          <section className="flex items-center justify-between mt-6">
            <button
              onClick={() => setDeleteConfirm(false)}
              className="bg-blue-200 active:bg-blue-400 text-blue-500 rounded p-2"
            >
              Cancel
            </button>
            <button
              className="bg-red-200 active:bg-red-300 text-red-400 rounded p-2"
              onClick={() => handleDelete(ptDetail._id)}
            >
              Proceed
            </button>
          </section>
        </Modal>
      )}
    </section>
  );
};

export default PTList;
