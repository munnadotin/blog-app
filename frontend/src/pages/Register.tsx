import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { EyeIcon, EyeOff, Info, Mail, Lock, Loader2, User } from 'lucide-react';
import type { RegisterData } from '../types/auth.type';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../app/store';
import { registerUser } from '../features/auth/authSlice';

const register = () => {
    const [showPassword, setShowPassword] = useState(false);
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<RegisterData>();
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    const onSubmit = (data: RegisterData) => {
        dispatch(registerUser(data));
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="max-w-md w-full">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back!</h2>
                    <p className="text-gray-600">Please create your account</p>
                </div>

                {/* Login Card */}
                <div className="bg-white rounded-lg border-2 border-slate-200 p-8">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        {/* Name Field */}
                        <div className="space-y-2">
                            <label
                                htmlFor="name"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Name
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <User className='h-4 w-5 text-gray-400' />
                                </div>
                                <input
                                    type="text"
                                    id="name"
                                    placeholder="John Doe"
                                    {...register("name", {
                                        required: "Name is required",
                                        minLength: {
                                            value: 2,
                                            message: "Name must be at least 2 characters"
                                        }
                                    })}
                                    className={`w-full pl-10 pr-4 py-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 ${errors.email ? 'border-red-500 bg-red-50' : 'border-gray-200'
                                        }`}
                                />
                            </div>
                            {errors.name && (
                                <p className="text-red-500 text-sm flex items-center gap-1 mt-1">
                                    <Info className='h-4 w-4' />
                                    {errors.name.message}
                                </p>
                            )}
                        </div>

                        {/* Email Field */}
                        <div className="space-y-2">
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Email Address
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Mail className='h-5 w-5 text-gray-400' />
                                </div>
                                <input
                                    type="email"
                                    id="email"
                                    placeholder="john.doe@example.com"
                                    {...register("email", {
                                        required: "Email is required",
                                        pattern: {
                                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                            message: "Please enter a valid email address"
                                        }
                                    })}
                                    className={`w-full pl-10 pr-4 py-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 ${errors.email ? 'border-red-500 bg-red-50' : 'border-gray-200'
                                        }`}
                                />
                            </div>
                            {errors.email && (
                                <p className="text-sm text-red-500 flex items-center gap-1 mt-1">
                                    <Info className='h-4 w-4' />
                                    {errors.email.message}
                                </p>
                            )}
                        </div>

                        {/* Password Field */}
                        <div className="space-y-2">
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Password
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className='h-5 w-5 text-gray-400' />
                                </div>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    placeholder="Enter your password"
                                    {...register("password", {
                                        required: "Password is required",
                                        minLength: {
                                            value: 8,
                                            message: "Password must be at least 8 characters"
                                        }
                                    })}
                                    className={`w-full pl-10 pr-12 py-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 ${errors.password ? 'border-red-500 bg-red-50' : 'border-gray-200'
                                        }`}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                                >
                                    {showPassword ? (
                                        <EyeOff className="h-5 w-5" />
                                    ) : (
                                        <EyeIcon className="h-5 w-5" />
                                    )}
                                </button>
                            </div>
                            {errors.password && (
                                <p className="text-sm text-red-500 flex items-center gap-1 mt-1">
                                    <Info className='h-4 w-4' />
                                    {errors.password.message}
                                </p>
                            )}
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-blue-700 text-white py-3 rounded font-semibold hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                        >
                            {isSubmitting ? (
                                <div className="flex items-center justify-center gap-2">
                                    <Loader2 className='h-4 w-4 animate-spin' />
                                </div>
                            ) : (
                                "Sign In"
                            )}
                        </button>

                        {/* Sign Up Link */}
                        <p className="text-center text-sm text-gray-600">
                            Don't have an account?{' '}
                            <button
                                onClick={() => navigate("/auth/login")}
                                type="button"
                                className="text-blue-600 hover:text-blue-800 font-semibold hover:underline transition-all"
                            >
                                Sign up here
                            </button>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default register;