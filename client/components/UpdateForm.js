import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Addupdate from "./AddupdateUI";

import Web3 from "web3";
import Project from "../artifacts/contracts/Project.sol/Project.json";
import { addUpdate } from "../redux/interactions";
import { unixToDate } from "../helper/helper";

const UpdateForm = () => {
    const [description, setDescription] = useState("");
    // const [timeStamp, setTimeStamp] = useState("");
    const [updateCreator, setUpdateCreator] = useState("");

    const crowdFundingContract = useSelector(
        (state) => state.fundingReducer.contract
    );
    const account = useSelector((state) => state.web3Reducer.account);
    const web3 = useSelector((state) => state.web3Reducer.connection);
    const dispatch = useDispatch();

    const [btnLoading, setBtnLoading] = useState(false);

    async function handleUpdate(e) {
        e.preventDefault();
        setBtnLoading(true);
        const onError = (error) => {
            setBtnLoading(false);
            toastError(error);
        };

        const onSuccess = () => {
            setBtnLoading(false);
            setDescription("");
            toastSuccess("Update on project is posted 🎉");
        };
        const data = {
            updateDesc: description,
            // updateTime: Number(unixToDate),
            creator: updateCreator,
        };

        addUpdate(
            web3,
            crowdFundingContract,
            data,
            onSuccess,
            onError,
            dispatch
        );

        
    }

    return (
        <form
            className="card relative overflow-hidden my-4"
            onSubmit={(e) => handleUpdate(e)}
        >
            <div className="form-control my-1">
                <label className="text-sm text-gray-700">Description :</label>
                <textarea
                    placeholder="Type here"
                    className="form-control-input border-neutral-400 focus:ring-neutral-200"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                ></textarea>
            </div>

            <button
                className="p-2 w-full bg-[#F56D91] text-white rounded-md hover:bg-[#d15677]"
                disabled={btnLoading}
            >
                {btnLoading ? "Loading..." : "add Update"}
            </button>
        </form>
    );
};

export default UpdateForm;
