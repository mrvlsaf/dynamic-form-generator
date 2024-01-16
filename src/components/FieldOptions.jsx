import React from "react";
import { Button, Input } from "antd";
const FieldOptions = ({ setFormData, formData }) => {
  return (
    <div
      className="col-md-3 rounded border"
      style={{ height: "83vh", boxShadow: "1px 1px 5px lightgrey", padding: "0.5em 1em" }}
    >
      <div className="">
        <h5> Select Field Options</h5>
        <div
          className="d-flex flex-column rounded py-5"
          style={{
            boxShadow: "1px 1px 5px lightgray",
          }}
        >
          <Button
            onClick={() => {
              setFormData([
                ...formData,
                { name: "", type: "text", label: "Label Name", required: false, attachment: "", },
              ]);
            }}
            className="m-2"
          >
            Text Input
          </Button>

          <Button
            onClick={() => {
              setFormData([
                ...formData,
                { name: "", type: "textarea", label: "Label Name", required: false, attachment: "", },
              ]);
            }}
            className="m-2"
          >
            TextArea Input
          </Button>

          <Button
            onClick={() => {
              setFormData([
                ...formData,
                {
                  name: "",
                  type: "select",
                  label: "Label Name",
                  options: [{ label: "Label Name", value: "", selected: false }],
                  required: false,
                  attachment: "",
                },
              ]);
            }}
            className="m-2"
          >
            DropDown
          </Button>

          <Button
            onClick={() => {
              setFormData([
                ...formData,
                {
                  name: "",
                  type: "checkbox",
                  label: "Label Name",
                  options: [{ label: "Label Name", checked: false }],
                  required: false,
                  attachment: "",
                },
              ]);
            }}
            className="m-2"
          >
            Checkbox
          </Button>

          <Button
            onClick={() => {
              setFormData([
                ...formData,
                {
                  name: "",
                  type: "radio",
                  label: "Label Name",
                  options: [{ label: "Label Name", value: "", selected: false }],
                  required: false,
                  attachment: "",
                },
              ]);
            }}
            className="m-2"
          >
            Radio Button
          </Button>

          <Button
            onClick={() => {
              setFormData([
                ...formData,
                {
                  name: "",
                  type: "file",
                  label: "Label Name",
                  required: false,
                  attachment: "",
                },
              ]);
            }}
            className="m-2"
          >
            File Upload
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FieldOptions;
