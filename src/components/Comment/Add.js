import React, { useRef, useState } from "react";
// import { useNavigate } from "react-router-dom";
import Loader from "../Common/Loader";
import Api from "../Common/Api";
import "./Comment.css";
// import URLhdl from "../Common/Handler";
const CreateCC_temp = () => {
    // const handler = URLhdl();
    // const navigate = useNavigate();
    const createCCApi = Api();
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [_com, setCC] = useState({
        id: "",
        userID: "",
        title: "",
        body: "",
    });
    const { userID, title, body } = _com;
    const inputRf = useRef([]);

    const isVaild = (t) => {
        if (t.length >= 1) return true;
        return false;
    };

    var isChanged = false;

    const handleInput = (event) => {
        event.preventDefault();
        const { name, value } = event.target;
        if (value) {
            isChanged = true;
        }
        // console.log(name, value);
        setCC({ ..._com, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        // console.log(_com);
        var isOk = 1;
        if (!isVaild(userID)) {
            isOk = 0;
            inputRf.current[0].focus();
        }
        if (!isVaild(title)) {
            isOk = 0;
            inputRf.current[1].focus();
        }
        if (!isVaild(body)) {
            isOk = 0;
            inputRf.current[2].focus();
        }
        if (!isOk) {
            return 0;
        }

        try {
            setIsLoading(true);

            const response2 = await fetch(createCCApi, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(_com),
            });

            if (response2.ok) {
                // console.log("Form submitted successfully!");
                setCC({
                    id: "",
                    userID: "",
                    title: "",
                    body: "",
                });
                // navigate(handler["list"]["link"]);
                window.location.replace("/");
            } else {
                // console.error("Form submission failed!");
            }
        } catch (error) {
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <div className="_com-form">
                <div className="heading">
                    {isLoading && <Loader />}
                    {error && <p>Error: {error}</p>}
                    <p>Add Comment</p>
                </div>
                <form className="form_add" onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="userID" className="form-label">
                            User ID
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="userID"
                            name="userID"
                            value={_com.userID}
                            onChange={handleInput}
                            ref={(e) => (inputRf.current[0] = e)}
                        />
                        {isChanged && !isVaild(userID) ? (
                            <span>Please check your User ID.</span>
                        ) : null}
                    </div>
                    <div className="mb-3 mt-3">
                        <label htmlFor="title" className="form-label">
                            Title
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="title"
                            name="title"
                            value={_com.title}
                            onChange={handleInput}
                            ref={(e) => (inputRf.current[1] = e)}
                        />
                        {isChanged && !isVaild(userID) ? (
                            <span>Please check your Title.</span>
                        ) : null}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="body" className="form-label">
                            Comment
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="body"
                            name="body"
                            value={_com.body}
                            onChange={handleInput}
                            ref={(e) => (inputRf.current[2] = e)}
                        />
                        {isChanged && !isVaild(userID) ? (
                            <span>Please check your Comment.</span>
                        ) : null}
                    </div>
                    <button
                        type="submit"
                        className="btn btn-primary submit-btn"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </>
    );
};

export default CreateCC_temp;
