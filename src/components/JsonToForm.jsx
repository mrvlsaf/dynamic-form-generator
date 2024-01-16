import React from 'react';
import TextArea from "antd/es/input/TextArea";

export default function JsonToForm({ setFormData }) {
    return (
        <div
            className="col-md-3 rounded border"
            style={{ height: "83vh", boxShadow: "1px 1px 5px lightgrey", padding: "0.5em 1em" }}
        >
            <h5>JSON to Form Convertor</h5>
            <TextArea
                showCount
                placeholder="Paste the JSON here..."
                style={{
                    height: "90%",
                    resize: "none",
                }}
                onChange={(e) => {
                    setFormData(JSON.parse(e.target.value));
                }}
            />
        </div>
    )
}
