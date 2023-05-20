import Web3 from "web3";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import FundRiserCard from "../../components/FundRiserCard";
import AddUpdate from "../../components/AddupdateUI";
import Loader from "../../components/Loader";
import WithdrawRequestCard from "../../components/WithdrawRequestCard";
import UpdateForm from "../../components/UpdateForm";
import authWrapper from "../../helper/authWrapper";
import {
    getAllUpdates,
    getAllWithdrawRequest,
    getContributors,
} from "../../redux/interactions";

import Project from "../../artifacts/contracts/Project.sol/Project.json";

const ProjectDetails = () => {
    const router = useRouter();
    const { id } = router.query;
    const web3 = useSelector((state) => state.web3Reducer.connection);
    const projectsList = useSelector((state) => state.projectReducer.projects);
    const filteredProject = projectsList?.filter((data) => data.address === id);
    // console.log(filteredProject[0]);
    const [contributors, setContributors] = useState(null);
    const [withdrawReq, setWithdrawReq] = useState(null);
    const [updates, setUpdates] = useState(null);

    useEffect(() => {
        if (id) {
            const onSuccess = (data) => {
                setContributors(data);
            };
            const onError = (error) => {
                console.log(error);
            };

            getContributors(web3, id, onSuccess, onError);

            const loadWithdrawRequests = (data) => {
                setWithdrawReq(data);
            };

            const loadUpdates = (data) => {
                setUpdates(data);
            };
            getAllWithdrawRequest(web3, id, loadWithdrawRequests);
            getAllUpdates(web3, id, loadUpdates);
        }
    }, [id]);

    const pushWithdrawRequests = (data) => {
        if (withdrawReq) {
            setWithdrawReq([...withdrawReq, data]);
        } else {
            setWithdrawReq([data]);
        }
    };

    //  updates?.map((data, i) => {console.log(data, i)})

    return (
        <div className="px-2 py-4 flex flex-col lg:px-12 lg:flex-col bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-gray-200 via-gray-400 to-gray-600">
            <div className="flex flex-row ">
                <div className="lg:w-1/2 h-[300px] my-2 lg:my-0 lg:mx-2">
                    {filteredProject ? (
                        <FundRiserCard
                            props={filteredProject[0]}
                            pushWithdrawRequests={pushWithdrawRequests}
                        />
                    ) : (
                        <Loader />
                    )}
                </div>
                {/* <div className="lg:w-7/12 my-2 lg:my-0 lg:mx-2"> */}
                <div className="lg:w-1/2 h-[300px] my-2 lg:my-0 lg:mx-2">
                    {filteredProject ? (
                        <UpdateForm props={filteredProject[0]} />
                    ) : (
                        <Loader />
                    )}
                </div>
            </div>
            <div className="card flex flex-row content-between justify-between place-content-between">
                <div className="card lg:w-1/2 h-vh*0.5 my-4 overflow-y-hidden hover:overflow-y-auto">
                    <h1 className="font-sans font-bold text-xl">
                        All contributors
                    </h1>
                    {contributors ? (
                        contributors.length > 0 ? (
                            contributors.map((data, i) => (
                                <div
                                    className="inner-card my-2 flex flex-row"
                                    key={i}
                                >
                                    <div className="lg:w-1/5">
                                        <div className="p-6 w-8 h-8 mx-auto my-auto rounded-md bg-slate-300 "></div>
                                    </div>
                                    <div className="lg:w-4/5">
                                        <p className="text-md font-bold text-gray-800 w-40 truncate ">
                                            {data.contributor}
                                        </p>
                                        <p className="text-sm font-bold text-gray-500">
                                            {data.amount} ETH
                                        </p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>Contributors not found</p>
                        )
                    ) : (
                        <Loader />
                    )}
                </div>
                <div className=" p-4 lg:w-1/2 mx-4 w-[vw*0.5] lg:h-fit overflow-y-hidden hover:overflow-y-auto">
                    {withdrawReq ? (
                        withdrawReq.length > 0 ? (
                            <div>
                                <h1 className="font-sans text-xl text-gray font-semibold">
                                    Withdraw requests
                                </h1>
                                {withdrawReq.map((data, i) => (
                                    <WithdrawRequestCard
                                        props={data}
                                        withdrawReq={withdrawReq}
                                        setWithdrawReq={setWithdrawReq}
                                        contractAddress={id}
                                        key={i}
                                    />
                                ))}
                            </div>
                        ) : (
                            <p>Withdraw requests not found</p>
                        )
                    ) : (
                        <Loader />
                    )}
                </div>
                {/* <div className="flex flex-col"> */}
            </div>
            <div className="card lg:w/2 h-vh*0.5 my-4 overflow-y-hidden hover:overflow-y-auto">
                <h1 className="font-sans font-bold text-xl">
                    All updates on projects:
                </h1>
                {updates && updates.length > 0 ? (
                    updates.map((data, i) => (
                        <AddUpdate
                            key={i}
                            description={data.description}
                            time={data.time}
                        />
                    ))
                ) : (
                    <p>No updates made by creator</p>
                )}
            </div>
            {/* </div> */}
        </div>
    );
};

export default authWrapper(ProjectDetails);
