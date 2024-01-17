import React from 'react';
import { useNavigate } from 'react-router-dom';

const Verifysuccess = () => {

    const navigate = useNavigate()
    const Goback = () => {
        navigate("/users")
    }

    return (
        <>
            <div className="nk-body bg-white npc-default pg-error">
                <div className="nk-app-root">
                    {/* main @s */}
                    <div className="nk-main ">
                        {/* wrap @s */}
                        <div className="nk-wrap nk-wrap-nosidebar">
                            {/* content @s */}
                            <div className="nk-content ">
                                <div className="nk-block nk-block-middle wide-xs mx-auto">
                                    <div className="nk-block-content nk-error-ld text-center" height="60">
                                        {/* <h1 className="nk-error-head">404</h1>      */}
                                        <img className="logo-light logo-img nk-error-head" src="./images/minilogo.png" srcSet="./images/minilogo.png" alt="logo" style={{ maxHeight: '90px' }} /><br></br>
                                        <h3 className="nk-error-title">Email verified successfully!</h3>
                                        <p className="nk-error-text">Thank you for verifying your email. You can now continue using our services.</p>
                                        <a className="btn btn-lg btn-primary mt-2" onClick={Goback} style={{ backgroundColor: "#163300", color: "#ffffff" }} >Back To Home</a>
                                    </div>
                                </div>{/* .nk-block */}
                            </div>
                            {/* wrap @e */}
                        </div>
                        {/* content @e */}
                    </div>
                    {/* main @e */}
                </div>
            </div>
        </>
    );
}

export default Verifysuccess;
