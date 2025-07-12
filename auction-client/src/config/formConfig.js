import { PLAYERCATEGORY } from "../constants/PlayerCategory";

const formConfig = {
  players: {
    title: "Player Form",
    fields: [
      {
        name: "gender",
        label: "Gender",
        type: "radio",
        options: ["Male", "Female"],
        required: true,
      },
      {
        name: "name",
        label: "Player Name [Full Name]",
        type: "text",
        required: true,
      },
      {
        name: "email",
        label: "Email",
        type: "email",
        required: false,
      },
      {
        name: "location",
        label: "Place [Native]",
        type: "text",
        required: true,
      },
      {
        name: "houseName",
        label: "Current Place of Residency",
        type: "text",
        required: true,
      },
      {
        name: "photo",
        label: "Photo [paste the image path from local]",
        type: "text",
        required: true,
      },
      {
        name: "dob",
        label: "Date of Birth [dd-mm-yyyy]",
        type: "text",
        required: true,
      },
      {
        name: "age",
        label: "Age",
        type: "number",
        required: true,
        min: 6,
        max: 100,
      },
      {
        name: "contact",
        label: "Contact Number",
        type: "number",
        required: true,
      },
      {
        name: "hand",
        label: "Please Indicate Dominant Hand in Badminton",
        type: "radio",
        options: ["Left hand", "Right hand"],
        required: true,
      },

      {
        name: "expertice",
        label: "Rate yourself [1-10]",
        type: "radio",
        //options: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
        options: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        required: true,
      },

      {
        name: "basePrice",
        label: "Price",
        type: "number",
        required: true,
      },

      {
        name: "category",
        label: "Category [Multi-Select]",
        type: "radio",
        options: PLAYERCATEGORY.map((category)=>{
          return category.value
        }),
        required: true,
      },
    ],
  },
  teams: {
    title: "Team Form",
    fields: [
      { name: "name", label: "Team Name", type: "text", required: true },
      { name: "owner", label: "Owner Name", type: "text", required: true },
      {
        name: "logo",
        label: "Logo [paste the image path from local]",
        type: "text",
        required: true,
      },
    ],
  },
};

export default formConfig;
