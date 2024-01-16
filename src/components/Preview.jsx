import React from "react";
import { DeleteFilled } from "@ant-design/icons";
import { Checkbox, Input, Radio, Tooltip, Button } from "antd";

const Preview = ({
  formData,
  messageApi,
  setFormData,
  handleInput,
  handleLabel,
  addBox,
  handleInputBox,
  handleSelectedCheckBox,
  handleSelectedRadio,
  handleDelete,
  setOpenModal,
}) => {

  const handleCopyClick = (textToCopy) => {
    const textarea = document.createElement("textarea");
    textarea.value = textToCopy;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
    messageApi.success('Text copied to clipboard!');
  };

  const handleRequiredCheckBox = (event, index) => {
    const updatedForm = [...formData];
    updatedForm[index].required = event.target.checked;
    setFormData(updatedForm);
  }

  return (
    <>
      <div
        className="col-md-5 rounded border mx-2"
        style={{ height: "83vh", boxShadow: "1px 1px 5px lightgrey", padding: "0.5em 1em" }}
      >
        {formData?.length > 0 ? (
          <>
            <div
              className="d-flex flex-column"
              style={{ height: "90%", overflowY: "auto" }}
            >
              {formData?.map((each, index) => (
                <div
                  className="d-flex flex-column my-2 p-2 border rounded"
                  key={index + each}
                  style={{ background: "#e6f8da" }}
                >
                  <div className="d-flex flex-column align-items-start">
                    <div className="w-100 d-flex justify-content-between">
                      <Input
                        name={each?.name}
                        placeholder="Label Name"
                        type="text"
                        onChange={(e) => handleLabel(e, index)}
                        className="mb-1 w-50"
                        size="small"
                      />{" "}
                      {["text", "textarea"]?.includes(each?.type) && (<div className="d-flex align-items-center justify-content-center">
                        <Checkbox
                          checked={each?.required}
                          onChange={(e) => handleRequiredCheckBox(e, index)}
                          className="mr-1 mb-1"
                        /><span style={{ fontSize: "0.8em" }}>required</span>
                      </div>
                      )}
                      <div
                        style={{ background: "#d3d3d3", padding: "0 0.5em" }}
                        className="border rounded">
                        {each.type}
                      </div>
                    </div>
                    {["checkbox", "radio"]?.includes(each?.type) && (
                      <>
                        {each?.options?.map((item, ind) => (
                          <div className="d-flex align-items-center">
                            {each?.type == "checkbox" && (
                              <Checkbox
                                checked={item?.checked}
                                onChange={(e) => handleSelectedCheckBox(e, index, ind)}
                                disabled
                              />
                            )}
                            {each?.type == "radio" && (
                              <Radio
                                disabled
                                checked={item?.selected}
                                value={item?.label}
                                name={item?.name}
                                onChange={(e) => handleSelectedRadio(e, index, ind)}
                              />
                            )}
                            <Input
                              name={item?.name}
                              type={"text"}
                              placeholder="Enter Field Value"
                              onChange={(e) => handleInputBox(e, index, ind)}
                              size="medium"
                              className="w-100 m-1"
                            />
                            {ind === each?.options?.length - 1 && (
                              <div className="d-flex w-100 justify-content-end">
                                <div
                                  className="rounded border p-1 bg-white th-pointer"
                                  style={{ cursor: "pointer" }}
                                  onClick={() => {
                                    each?.type == "checkbox"
                                      ? addBox(index, "checkbox")
                                      : addBox(index, "radio");
                                  }}
                                >
                                  Add Choice +
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                      </>
                    )}
                    {each?.type == "select" && (
                      <>
                        {each?.options?.map((item, ind) => (
                          <div className="d-flex align-items-center">
                            <Input
                              name={item?.name}
                              type={"text"}
                              placeholder="Enter Option"
                              onChange={(e) => handleInputBox(e, index, ind, "select")}
                              size="medium"
                              className="w-100 m-1"
                            />
                            {ind === each?.options?.length - 1 && (
                              <div className="d-flex w-100 justify-content-end">
                                <div
                                  className="rounded border p-1 bg-white th-pointer"
                                  style={{ cursor: "pointer" }}
                                  onClick={() => {
                                    addBox(index, "select");
                                  }}
                                >
                                  Add Choice +
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                      </>
                    )}
                  </div>
                  <div className="d-flex text-danger justify-content-end mt-2">
                    <DeleteFilled
                      style={{ cursor: "pointer" }}
                      onClick={() => handleDelete(index)}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div
              className="d-flex w-100 justify-content-between my-1"
              style={{}}
            >
              <p className="p-0 m-0">{`${formData?.length} Count`}</p>
              <Tooltip
                title="Copy the JSON to generate it once again by pasting it in right panel"
                trigger="hover"
              >
                <Button
                  onClick={() => {
                    handleCopyClick(JSON.stringify(formData));
                    setOpenModal(false);
                  }}
                >
                  Copy JSON
                </Button>
              </Tooltip>
              <Button onClick={() => setOpenModal(true)}>
                Fill Form
              </Button>
            </div>
          </>) : <div className="h-100 d-flex align-items-center justify-content-center">Add a Field from left panel to generate a form</div>}
      </div>
    </>
  );
};

export default Preview;
