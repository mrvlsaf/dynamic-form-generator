import React from 'react';
import TextArea from "antd/es/input/TextArea";
import { Button, Input, Modal, Checkbox, Radio, Select } from "antd";

export default function ModalContainer({
    formData,
    openModal,
    messageApi,
    handleInput,
    setFormData,
    setOpenModal,
    handleSelectedRadio,
    handleDropdownChange,
    handleSelectedCheckBox,
}) {

    const handleSubmit = () => {
        let success = true;
        console.log(formData)
        formData.map((item) => {
            if (item.required && !item.name.length) success = false;
        })
        if (success) {
            setFormData([]);
            setOpenModal(false);
            messageApi.success("Form submitted successfully")
        }
        else messageApi.error("Fill all required fields.")
    }

    const handleAttachment = (event, index) => {
        const maxFileSizeInBytes = 5 * 1024 * 1024;
        const file = event.target.files[0];

        if (file.size > maxFileSizeInBytes) {
            messageApi.error("File size exceeds the limit of 5MB.");
            event.target.value = "";
            return;
        }
        const updatedForm = [...formData];
        updatedForm[index].attachment = file.name;
        setFormData(updatedForm);
    }

    return (
        <Modal
            open={openModal}
            title={"Form"}
            width={"50%"}
            height={"100px"}
            onOk={() => setOpenModal(false)}
            onCancel={() => setOpenModal(false)}
            footer={[
                <Button
                    key="back"
                    onClick={handleSubmit}
                >
                    Submit form for validation
                </Button>,
            ]}
        >
            <div className="row align-items-center justify-content-center">
                <div className="col-md-12" style={{ maxHeight: "350px", overflowY: "auto" }}>
                    <form >
                        {formData?.map((each, index) => (
                            <div
                                className="d-flex flex-column my-2 p-2 border rounded"
                                key={index + each}
                                style={{ background: "#e6f8da" }}
                            >
                                <div className="d-flex flex-column align-items-start">
                                    <div className="w-80 d-flex">
                                        <label>{each?.label}</label>
                                        <div className='text-danger ml-1'>{each.required ? "*" : ""}</div>
                                        {each?.type === "file" && <div className='ml-1'>(images supported. Max Size : 5MB)</div>}
                                    </div>
                                    {["text"]?.includes(each?.type) && (
                                        <Input
                                            required={each?.required}
                                            name={each?.name}
                                            type={each?.type}
                                            placeholder="Enter Field Value"
                                            onChange={(e) => handleInput(e, index)}
                                            size="medium"
                                            className="w-100"
                                        />
                                    )}
                                    {["textarea"]?.includes(each?.type) && (
                                        <TextArea
                                            required={each?.required}
                                            name={each?.name}
                                            placeholder="Enter Field Value"
                                            style={{
                                                height: "90%",
                                                resize: "none",
                                            }}
                                            onChange={(e) => handleInput(e, index)}
                                        />
                                    )}
                                    {["file"]?.includes(each?.type) && (
                                        <Input
                                            required={each?.required}
                                            name={each?.name}
                                            type={each?.type}
                                            accept="image/*"
                                            placeholder="Enter Field Value"
                                            onChange={(e) => handleAttachment(e, index)}
                                            size="medium"
                                            className="w-100"
                                        />
                                    )}
                                    {["checkbox", "radio"]?.includes(each?.type) && (
                                        <>
                                            {each?.options?.map((item, ind) => (
                                                <div className="d-flex align-items-center">
                                                    {each?.type == "checkbox" && (
                                                        <Checkbox
                                                            required={each?.required}
                                                            checked={item?.checked}
                                                            onChange={(e) =>
                                                                handleSelectedCheckBox(e, index, ind)
                                                            }
                                                        />
                                                    )}
                                                    {each?.type == "radio" && (
                                                        <Radio
                                                            required={each?.required}
                                                            checked={item?.selected}
                                                            value={item?.label}
                                                            name={item?.name}
                                                            onChange={(e) =>
                                                                handleSelectedRadio(e, index, ind)
                                                            }
                                                        />
                                                    )}
                                                    <p className="m-0 px-1">{item?.label}</p>
                                                </div>
                                            ))}
                                        </>
                                    )}
                                    {each?.type == "select" && (
                                        <Select
                                            required={each?.required}
                                            style={{
                                                width: 120,
                                            }}
                                            options={each?.options}
                                            value={each?.selected}
                                            onChange={(e) => {
                                                handleDropdownChange(e, index);
                                            }}
                                        />
                                    )}
                                </div>
                            </div>
                        ))}
                    </form>
                </div>
            </div>
        </Modal>
    )
}
