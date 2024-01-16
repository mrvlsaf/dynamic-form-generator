import "./App.css";
import { message } from "antd";
import { useState } from "react";
import Header from "./components/Header";
import Preview from "./components/Preview";
import JsonToForm from "./components/JsonToForm";
import FieldOptions from "./components/FieldOptions";
import ModalContainer from "./components/ModalContainer";

function App() {
  const [formData, setFormData] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const handleInput = (event, index) => {
    const { name, value } = event.target;
    const updatedForm = [...formData];
    updatedForm[index].name = value;
    setFormData(updatedForm);
  };

  const handleLabel = (event, index) => {
    const { name, value } = event.target;
    const updatedForm = [...formData];
    updatedForm[index].label = value;
    setFormData(updatedForm);
  };

  const addBox = (index, type) => {
    let updatedForm = [...formData];
    if (type == "checkbox") {
      updatedForm[index].options = [
        ...updatedForm[index].options,
        { label: "", value: "" },
      ];
    } else if (type == "radio") {
      updatedForm[index].options = [
        ...updatedForm[index].options,
        { label: "", value: "", selected: false },
      ];
    } else {
      updatedForm[index].options = [
        ...updatedForm[index].options,
        { label: "", value: "", selected: "" },
      ];
    }
    setFormData(updatedForm);
  };

  const handleInputBox = (e, index, ind, type) => {
    const { name, value } = e.target;

    const updatedForm = [...formData];
    const updatedOptions = [...updatedForm[index]?.options];
    updatedOptions[ind].label = value;
    if (type == "select") {
      updatedOptions[ind].value = value;
    }
    setFormData(updatedForm);
  };

  const handleSelectedCheckBox = (e, index, ind) => {
    const updatedForm = [...formData];
    const updatedOptions = [...updatedForm[index]?.options];
    updatedOptions[ind].checked = !updatedOptions[ind].checked;
    setFormData(updatedForm);
  };

  const handleSelectedRadio = (e, index, ind) => {
    const { name, value } = e.target;

    const updatedForm = [...formData];
    const updatedOptions = [...updatedForm[index]?.options];
    updatedOptions?.map((each) => (each.selected = false));
    updatedOptions[ind].selected = true;
    setFormData(updatedForm);
  };

  const handleDropdownChange = (value, index, ind) => {
    const updatedForm = [...formData];
    const updatedOptions = [...updatedForm[index]?.options];
    const a = updatedOptions.find((each) => each.value === value);
    a.selected = true;
    setFormData(updatedForm);
  };

  const handleDelete = (index) => {
    const updatedForm = [...formData];
    updatedForm.splice(index, 1);
    setFormData(updatedForm);
  };

  return (
    <>
      {contextHolder}
      <Header />
      <div className="row align-center justify-content-around m-2 w-100">
        <FieldOptions
          setFormData={setFormData}
          formData={formData}
        />
        <Preview
          formData={formData}
          messageApi={messageApi}
          setFormData={setFormData}
          handleInput={handleInput}
          handleLabel={handleLabel}
          addBox={addBox}
          handleInputBox={handleInputBox}
          handleSelectedCheckBox={handleSelectedCheckBox}
          handleSelectedRadio={handleSelectedRadio}
          handleDelete={handleDelete}
          setOpenModal={setOpenModal}
        />
        <JsonToForm
          setFormData={setFormData}
        />
      </div>

      <ModalContainer
        formData={formData}
        openModal={openModal}
        messageApi={messageApi}
        handleInput={handleInput}
        setFormData={setFormData}
        setOpenModal={setOpenModal}
        handleSelectedRadio={handleSelectedRadio}
        handleDropdownChange={handleDropdownChange}
        handleSelectedCheckBox={handleSelectedCheckBox}
      />
    </>
  );
}

export default App;
