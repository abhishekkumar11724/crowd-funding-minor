import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Addupdate from "./AddupdateUI";

import Web3 from "web3";
import Project from "../artifacts/contracts/Project.sol/Project.json";
import { addUpdate } from "../redux/interactions";
import { unixToDate } from "../helper/helper";

const UpdateForm = ( { props} ) => {
    const [description, setDescription] = useState("");
    const dispatch = useDispatch();
    const projectId = props.address;
    //provides the account address of the current user
    const account = useSelector((state) => state.web3Reducer.account);
    const web3 = useSelector((state) => state.web3Reducer.connection);
    
    const [btnLoading, setBtnLoading] = useState(false);

    async function handleUpdate() {
        setBtnLoading(true);
        console.log(projectId);
    
        const data = {
            updateDesc: description,
            account: account,
        };
        const onSuccess = (data) => {
            setBtnLoading(false);
            setDescription("");
            toastSuccess("Update on project is posted 🎉");
        };

        const onError = (error) => {
            setBtnLoading(false);
            toastError(error);
        };

        addUpdate(web3,projectId,data,dispatch,onSuccess,onError);

        
    }

    return (
        <div
            className="card relative overflow-hidden my-4"
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
                onClick={()=> handleUpdate()}
            >
                {btnLoading ? "Loading..." : "add Update"}
            </button>
        </div>
    );
};

export default UpdateForm;
