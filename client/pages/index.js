import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { connectWithWallet } from "../helper/helper";
import { loadAccount } from "../redux/interactions";

export default function Home() {
    const router = useRouter();
    const dispatch = useDispatch();
    const web3 = useSelector((state) => state.web3Reducer.connection);

    const connect = () => {
        const onSuccess = () => {
            loadAccount(web3, dispatch);
            router.push("/dashboard");
        };
        connectWithWallet(onSuccess);
    };

    useEffect(() => {
        (async () => {
            if (web3) {
                const account = await loadAccount(web3, dispatch);
                if (account.length > 0) {
                    router.push("/dashboard");
                }
            }
        })();
    }, [web3]);

    return (
        <div className="w-screen h-screen bg-[conic-gradient(at_right,_var(--tw-gradient-stops))] from-indigo-200 via-slate-600 to-indigo-200">
            <div className="flex bg- flex-col items-center justify-center ">
                <button
                    className="p-4 my-10 text-lg font-bold text-white rounded-md w-56 bg-[#434c5e] drop-shadow-[0_25px_25px_rgba(0,0,0,0.55)] hover:bg-[#6f7789] hover:drop-shadow-[0_25px_25px_rgba(0,0,0,1)]"
                    onClick={() => connect()}
                >
                    Connect to MetaMask
                </button>
                {/* {active ? <span>Connected with <b>{account}</b></span> : <span>Not connected</span>} */}
            </div>
        </div>
    );
}
