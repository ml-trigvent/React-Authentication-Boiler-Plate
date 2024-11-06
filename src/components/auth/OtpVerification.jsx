import { useRef } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { OtpVerificationNumber } from '../../services/api';
import { useNavigate } from 'react-router-dom';

const OtpVerification = () => {
    const navigate = useNavigate();
    const inputRefs = useRef([]);

    // Formik configuration
    const formik = useFormik({
        initialValues: { otp: ["", "", "", "", "", ""] },
        validationSchema: Yup.object({
            otp: Yup.array()
                .of(
                    Yup.string()
                        .length(1, "Each box should contain a single digit")
                        .matches(/^[0-9]$/, "Only numbers are allowed")
                )
                .min(6, "Please complete the 6-digit OTP")
                .max(6, "Please complete the 6-digit OTP"),
        }),
        onSubmit: async (values) => {
            const otpString = values.otp.join(""); // Join OTP array into a string
            try {
                const response = await OtpVerificationNumber({ otp: otpString });
                if (response.status) {
                    navigate('/reset/password', { state: { otp: otpString } });
                } else {
                    formik.setFieldError("otp", "OTP Verification Failed. Please try again.");
                }
            } catch (error) {
                console.error("OTP Verification Failed:", error);
                formik.setFieldError("otp", "OTP Verification Failed. Please try again.");
            }
        },
    });

    const handleChange = (e, index) => {
        const { value } = e.target;
        if (value.length > 1) return;

        // Update OTP in Formik values
        const newOtp = [...formik.values.otp];
        newOtp[index] = value;
        formik.setFieldValue("otp", newOtp);

        // Clear errors when input changes
        formik.setFieldError("otp", "");

        // Move to the next input
        if (value && index < 5) {
            inputRefs.current[index + 1].focus();
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 to-purple-500 font-sans px-4">
            <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">OTP Verification</h2>
                <p className="text-gray-600 text-center mb-6 max-w-xs mx-auto">
                    Enter the 6-digit OTP sent to your email or phone:
                </p>

                {/* Display error if validation fails */}
                {formik.errors.otp && (
                    <p className="text-red-500 text-center mb-4">{formik.errors.otp}</p>
                )}

                <form onSubmit={formik.handleSubmit}>
                    <div className="flex justify-center space-x-2 mb-6">
                        {formik.values.otp.map((_, index) => (
                            <input
                                key={index}
                                type="text"
                                maxLength="1"
                                value={formik.values.otp[index]}
                                onChange={(e) => handleChange(e, index)}
                                ref={(el) => (inputRefs.current[index] = el)}
                                className="w-12 h-12 text-lg font-semibold text-center border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                        ))}
                    </div>

                    <button
                        type="submit"
                        className="w-full py-3 text-lg font-semibold text-white bg-purple-600 hover:bg-purple-700 rounded-lg shadow-md transition duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                        Verify OTP
                    </button>
                </form>
            </div>
        </div>
    );
};

export default OtpVerification;
