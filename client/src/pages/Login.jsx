import React, { useState } from 'react'
import { CustomButton, Loading, TextInput } from '../components'
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { BgImage } from "../assets"
import { BsShare } from "react-icons/bs"
import { ImConnection } from "react-icons/im"
import { AiOutlineInteraction } from "react-icons/ai"
import { apiRequest } from '../utils';
import { UserLogin } from '../redux/userSlice';
import { FaShoppingCart } from "react-icons/fa";
import { TiSocialGithub } from "react-icons/ti";
import { BgImage2 } from '../assets';
import { LoginBg } from '../assets';
import { LoginBg2 } from '../assets';

const Login = () => {

  const [errMsg, setErrMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch();

  const { register, handleSubmit, formState: { errors } } = useForm({ mode: "onChange" });

  const onSubmit = async (data) => {
    setIsSubmitting(true);

    try{

      const res = await apiRequest({
        url: "/auth/login",
        data: data,
        method: "POST"
      });

      if(res?.status === "failed"){
        setErrMsg(res);
      } else{
        setErrMsg("");
        const newData = { token: res?.token, ...res?.user };
        dispatch(UserLogin(newData));
        window.location.replace("/");
      }
      setIsSubmitting(false);
    } catch(error) {
      console.log(error);
      setIsSubmitting(false);
    }
  }

  return (
    <div className=' bg-gradient-to-r from-[#7005ad] to-[#000] w-full h-[100vh] flex items-center justify-center p-6'>
      <div className='w-full md:w-2/3 h-fit lg:h-full 2xl:h-5/6 py-8 lg:py-0 bg-primary rounded-xl overflow-hidden shadow-xl flex justify-center items-center'>
        {/* Left */}
        <div className='w-full lg:w-1/2 h-full p-10 2xl:px-20 flex flex-col justify-center font-serif'>
          <div className='w-full flex gap-2 items-center mb-6'>
            <div className='p-2 bg-white rounded text-white'>
              <TiSocialGithub color='#471563' size={30}/>
            </div>
            <span className='text-2xl text-[#a829f0]'>Click&Connect</span>
          </div>

          <p className='text-ascent-1 font-semibold text-2xl'>
            Log in to your account
          </p>
          <form action="" className='py-8 flex flex-col gap-5' onSubmit={handleSubmit(onSubmit)}>
            <TextInput name="email" placeholder="Enter your Email Address" label="Email Address" type="email" register={register("email", { required: "Email address is required" })} styles="w-full" labelStyle = 'ml-2' error={errors.email ? errors.email.message : ""}/>

            <TextInput name="password" placeholder="Enter your Password" label="Password" type="password" register={register("password", { required: "Password is required" })} styles="w-full" labelStyle='ml-2' error={errors.password ? errors.password?.message : ""} />

            {
              errMsg?.message && (
                <span className={`text-sm ${errMsg?.status === "failed" ? "text-red" : "text-blue"} mt-0.5`}>
                  {errMsg?.message}
                </span>
              )
            }

            {
              isSubmitting ? <Loading /> : <CustomButton type="submit" containerStyles={"inline-flex justify-center rounded-md bg-[#a829f0] px-8 py-3 text-sm font-medium text-white outline-none"} title={"Login"} />
            }
          </form>

          <p className='text-ascent-2 text-sm text-center'>
            Do not have an account?
            <Link
              to='/register'
              className='text-[#a829f0] font-semibold ml-2 cursor-pointer'
            >
              Register Account
            </Link>
          </p>
        </div>
        {/* Right */}
        <div className='hidden w-1/2 h-full lg:flex flex-col items-center justify-center bg-[#471563] font-serif'>  
            <div className='relative w-full flex items-center justify-center'>
              <img src={BgImage} alt="Bg" className='w-48 2xl:w-64 h-48 2xl:h-64 rounded-full object-cover'/>
            <div className='absolute flex items-center gap-1 bg-[#000] text-white right-10 top-10 py-2 px-2 rounded-full'>
              {/* <BsShare size={14} />
              <span className='text-xs font-medium'>Share</span> */}
              <img src={LoginBg} alt="Bg" className='w-18 2xl:w-16 h-18 2xl:h-16 rounded-full object-cover' />
            </div>

            <div className='absolute flex items-center gap-1 bg-[#000] text-white left-10 top-6 py-2 px-2 rounded-full'>
              {/* <ImConnection /> */}
              <img src={BgImage2} alt="Bg" className='w-18 2xl:w-16 h-18 2xl:h-16 rounded-full object-cover' />
              {/* <span className='text-xs font-medium'>Connect</span> */}
            </div>

            <div className='absolute flex items-center gap-1 bg-[#000] text-white left-12 bottom-6 py-2 px-2 rounded-full'>
              {/* <AiOutlineInteraction />
              <span className='text-xs font-medium'>Interact</span> */}
              <img src={LoginBg2} alt="Bg" className='w-18 2xl:w-16 h-18 2xl:h-16 rounded-full object-cover' />
            </div>
          </div>

          <div className='mt-16 text-center'>
            <p className='text-white text-base'>
              Get in touch with your closed ones and have fun
            </p>
            <span className='text-sm text-white/80'>
              Post your memories and explore others
            </span>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Login