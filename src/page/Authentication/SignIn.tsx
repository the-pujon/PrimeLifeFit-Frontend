import { Button } from '@/components/ui/button';
import React from 'react';
import Google from "@/assets/icons/Google";
import Github from '@/assets/icons/Github';
import { UserPlus } from 'lucide-react';
import { SubmitHandler,useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
//import Loading from '@/components/ui/Loading';
import { useAppDispatch } from '@/redux/hook';
import { setUser } from '@/redux/features/auth/authSlice';
import { useSigninMutation } from '@/redux/features/auth/authApi';
import Loading from '@/components/ui/Loading';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

type Inputs = {
    email: string;
    password: string;
};

const SignIn: React.FC = () => {

    const navigate = useNavigate();
    const [signin,{ isLoading,isError,error }] = useSigninMutation();
    const dispatch = useAppDispatch();
    const { register,handleSubmit,formState: { errors } } = useForm<Inputs>({
        mode: 'onBlur',
        defaultValues: {
            email: 'web@programming-hero1.com',
            password: 'ph-password',
        },
    });

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        const toastId = toast.loading('Logging in');

        try {

            const res = await signin(data).unwrap();
            dispatch(setUser({ user: res.data,token: res.token }));
            toast.success('Successfully Logged in',{ id: toastId,duration: 2000 });
            navigate('/');


        } catch (err) {
            console.error(err)
            toast.error('Something went wrong',{ id: toastId,duration: 2000 });
        }
    };


    if (isError) {
        console.error(error);
        const apiError = error as { data?: { message?: string } };
        toast.error(apiError.data?.message || "Something went wrong");
    }

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                duration: 0.5,
                when: "beforeChildren",
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20,opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { type: 'spring',stiffness: 300,damping: 24 }
        }
    };

    return (
        <div className="relative min-h-screen bg-foreground text-gray-900 flex justify-center items-center px-4 sm:px-6 lg:px-8">
            {isLoading && <Loading />}
            <motion.div
                className="w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-4xl bg-primary shadow rounded-lg flex flex-col lg:flex-row justify-center overflow-hidden"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <div className="w-full lg:w-1/2 p-8 lg:p-12">
                    <motion.div variants={itemVariants}>
                        <p className='text-white text-center text-3xl sm:text-4xl lg:text-5xl font-bold mb-6'>Car Service</p>
                    </motion.div>
                    <div className="flex flex-col items-center">
                        <motion.h1 variants={itemVariants} className="text-2xl sm:text-3xl font-extrabold mb-6">Sign in</motion.h1>
                        <div className="w-full">
                            <div className="flex flex-col items-center space-y-4">
                                <motion.button
                                    variants={itemVariants}
                                    className="w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-background text-black flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline"
                                >
                                    <div className="bg-white p-2 rounded-full">
                                        <Google />
                                    </div>
                                    <span className="ml-4">Sign In with Google</span>
                                </motion.button>

                                <motion.button
                                    variants={itemVariants}
                                    className="w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-background text-black flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline"
                                >
                                    <div className="bg-white p-1 rounded-full">
                                        <Github />
                                    </div>
                                    <span className="ml-4">Sign In with GitHub</span>
                                </motion.button>
                            </div>

                            <motion.div variants={itemVariants} className="my-8 text-center">
                                <div className="leading-none px-2 inline-block text-sm text-gray-200 tracking-wide font-medium bg-primary transform translate-y-1/2">
                                    Or sign in with e-mail
                                </div>
                            </motion.div>

                            <motion.form variants={itemVariants} onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                                <Input className='backdrop-blur-sm w-full text-black' required type="email" placeholder="Email" id="email" {...register('email',{ required: true })} />
                                {errors.email && <div className="text-red-500 text-sm">Email is required.</div>}
                                <Input className='backdrop-blur-sm w-full text-black' required type="password" placeholder="Password" id="password" {...register('password',{ required: true })} />
                                {errors.password && <div className="text-red-500 text-sm">Password is required.</div>}
                                <Button
                                    className="w-full tracking-wide font-semibold bg-foreground text-gray-100 py-4 rounded-lg hover:text-black hover:bg-white transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                                >
                                    <UserPlus className="w-5 h-5 mr-2" />
                                    <span>Sign In</span>
                                </Button>
                                <motion.p variants={itemVariants} className="text-xs text-gray-600 text-center">
                                    I agree to abide by Car Service's{' '}
                                    <a href="#" className="border-b border-gray-500 border-dotted">
                                        Terms of Service
                                    </a>{' '}
                                    and its{' '}
                                    <a href="#" className="border-b border-gray-500 border-dotted">
                                        Privacy Policy
                                    </a>
                                </motion.p>
                                <motion.p variants={itemVariants} className="text-sm text-gray-600 text-center">
                                    Don't have an account?{' '}
                                    <Link to="/auth/signup" className="font-medium text-primary-600 hover:underline">
                                        Sign up
                                    </Link>
                                </motion.p>
                            </motion.form>
                        </div>
                    </div>
                </div>
                <div className="hidden lg:flex lg:w-1/2 bg-primary items-center justify-center">
                    <div
                        className="w-full h-full bg-contain bg-center bg-no-repeat"
                        style={{
                            backgroundImage:
                                "url('https://storage.googleapis.com/devitary-image-host.appspot.com/15848031292911696601-undraw_designer_life_w96d.svg')",
                        }}
                    ></div>
                </div>
            </motion.div>
        </div>
    );
};

export default SignIn;