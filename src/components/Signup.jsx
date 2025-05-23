import React,{useState} from 'react'
import AuthService, { authService } from '../appwrite/auth'
import {Link, useNavigate} from 'react-router-dom'
import { login } from '../store/authSlice'
import {Button, Input, Logo } from "./index"
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'


const Signup = () => {
    const navigate  = useNavigate()//to navigate programmatically
    const dispatch = useDispatch()
    const [error, setError] = useState("")
    const {register, handleSubmit} = useForm()
    //register and handlesubmit: methods from useForm 

    const create = async(data)=>{
        setError("")//error ko khtam kartay hai
        try {
            const userData = await authService.createAccount(data)
            if(userData){
               const userData = await authService.getCurrentUser()
               //update store
               if(userData) dispatch(login(userData));
               navigate("/")
            }
        } catch (error) {
           setError(error.message)    
        }
    }

    return (
        <div className="flex items-center justify-center">
            <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
                <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                </span>
            </div>
            
            <h2 className="text-center text-2xl font-bold leading-tight">Sign up to create account</h2>
                
                <p className="mt-2 text-center text-base text-black/60">
                    Already have an account?&nbsp;
                    <Link
                        to="/login"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign In
                    </Link>
                </p>

                {/* if errors display it */}
                {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
                
                <form onSubmit={handleSubmit(create)}>
                    <div className='space-y-5'>

                        <Input
                         label = "Full name"
                         placeholder = "Enter your full name"
                         {...register("name",{
                            required: true
                         })}

                        />

                        <Input
                        label="Email"
                        placeholder="Enter your email"
                        type="email"
                        {...register("email",{
                            required: true,
                            validate: {
                                matchPatern:(value)=> /^(?:(?:[\w`~!#$%^&*\-=+;:{}'|,?\/]+(?:(?:\.(?:"(?:\\?[\w`~!#$%^&*\-=+;:{}'|,?\/\.()<>\[\] @]|\\"|\\\\)*"|[\w`~!#$%^&*\-=+;:{}'|,?\/]+))*\.[\w`~!#$%^&*\-=+;:{}'|,?\/]+)?)|(?:"(?:\\?[\w`~!#$%^&*\-=+;:{}'|,?\/\.()<>\[\] @]|\\"|\\\\)+"))@(?:[a-zA-Z\d\-]+(?:\.[a-zA-Z\d\-]+)*|\[\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\])$/.test(value) ||
                                "Email address must be a valid address"

                            }
                        })}
                        />

                        <Input
                        label="Password"
                        type="password"
                        placeholder="Enter your password"
                        {...register("password",{
                            required: true,
                            minLength: 8
 
                        })}
                        />
                        <Button type="submit" className="w-full">
                            Create account
                        </Button>
                    </div>
                </form>
        </div>
    )
}

export default Signup