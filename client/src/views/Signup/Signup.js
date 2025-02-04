import React, { useState } from "react";
import axios from "axios";
import SignupImg from "./../img/signup-img/signup.png";
import Input from "./../../components/input/input.js";
import { Link } from "react-router-dom";
import toast,{Toaster} from "react-hot-toast"
import Button from "./../../components/button/button.js";

function Signup() {
  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    password: "",
    rePassword: "",
  });

  const [error, setError] = useState("");

  const processSignup=async()=>{
     toast.loading("Please Wait...");

     try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/signup`,
        signupData
      );
      toast.dismiss();

      toast.success(response.data.message);

      setSignupData({
        name: "",
        email: "",
        phone: "",
        address: "",
        password: "",
        rePassword: "",
      });


    setTimeout(()=>{
      window.location.href = "/login";
    }, 3000);

  } catch (err) {
    toast.dismiss();
    setError(err?.response?.data?.message);
    toast.error(err?.response?.data?.message);
  }

  }

  return (
    <div className="flex flex-row justify-center mt-[50px] p-7">
      <div className=" w-[350px] h-[430px] bg-[linear-gradient(-225deg,_#5D9FFF_0%,_#B8DCFF_48%,_#6BBBFF_100%)]">
        <img
          src={SignupImg}
          className="w-[300px] h-[300px] block mx-auto mt-16 shadow-xl"
        />
      </div>

      <div
        className=" w-[400px] h-[430px] <div
     bg-[linear-gradient(109.6deg,_rgba(204,228,247,1)_11.2%,_rgba(237,246,250,1)_100.2%)] px-10 py-5"
      >

        <h2 className="text-center text-xl"><b>Signup</b></h2>
        <input
          type="text"
          placeholder="Name"
          value={signupData.name}
          onChange={(value) => {
            setSignupData({ ...signupData, name: value });
            setError("");
          }}
          className="pt-3 block mx-auto w-full my-3 px-2 focus-outline-none"
        />

        {/* bg-[radial-gradient(circle_farthest-corner_at_10%_20%,_rgba(234,249,249,0.67)_0.1%,_rgba(239,249,251,0.63)_90.1%)] */}

        {/* bg-[radial-gradient(circle_1224px_at_10.6%_8.8%,_rgba(255,255,255,1)_0%,_rgba(153,202,251,1)_100.2%)] */}

        <Input
          type="text"
          placeholder="Email"
          value={signupData.email}
          onChange={(value) => {
            setSignupData({ ...signupData, email: value });
            setError("");
          }}
          className="pt-3 block mx-auto w-full my-3 px-2"
        />

        <Input
          type="text"
          placeholder="Phone"
          value={signupData.phone}
          onClick={(value) => {
            setSignupData({ ...signupData, phone: value });
            setError("");
          }}
          className="pt-3 block mx-auto w-full my-3 px-2"
        />

        <Input
          type="text"
          placeholder="Address"
          value={signupData.address}
          onClick={(value) => {
            setSignupData({ ...signupData, address: value });
            setError("");
          }}
          className="pt-3 block mx-auto w-full my-3 px-2"
        />

        <Input
          type="text"
          placeholder="Password"
          value={signupData.password}
          onClick={(value) => {
            setSignupData({ ...signupData, password: value });
            setError("");
          }}
          className="pt-3 block mx-auto w-full my-3 px-2"
        />

        <Input
          type="text"
          placeholder="RePassword"
          value={signupData.rePassword}
          onClick={(value) => {
            setSignupData({ ...signupData, rePassword: value });
            setError("");
          }}
          className="pt-3 block mx-auto w-full my-3 px-2"
        />

        <p className="text-red-500 text-xs mt-2">{error}</p>

        <p>
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500">
            Login
          </Link>
        </p>

        <div className="flex justify-around mt-3">
         
          <Button
            label="signup"
            onClick={() => processSignup()}
            variant={"primary"}
          />
        </div>

        <Toaster/>
      </div>

      {/* bg-[linear-gradient(to_top,_#e6e9f0_0%,_#eef1f5_100%)] white */}
    </div>
  );
}

export default Signup;
