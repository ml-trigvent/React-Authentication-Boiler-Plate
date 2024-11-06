import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { SetNewPassword } from "../../services/api";

function ResetPassword() {
  const [message, setMessage] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const otp = location.state?.otp;

  // Formik setup with validation schema
  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .matches(/[a-z]/, "Password must contain at least one lowercase letter")
        .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
        .matches(/[0-9]/, "Password must contain at least one number")
        .required("Password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords must match")
        .required("Please confirm your password"),
    }),
    onSubmit: async (values) => {
      const payload = { otp, password: values.password };
      try {
        const response = await SetNewPassword(payload);
        if (response.status) {
          setMessage("Password reset successfully!");
          navigate("/");
        } else {
          formik.setFieldError("confirmPassword", "An error occurred. Please try again.");
        }
      } catch (error) {
        console.error("Password reset error:", error);
        formik.setFieldError("confirmPassword", "An error occurred. Please try again later.");
      }
    },
  });

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-500 to-blue-500 px-4">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Reset Password </h2>
        
        {message && <p className="text-green-500 text-center mb-4">{message}</p>}

        <form onSubmit={formik.handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="password" className="block text-gray-700 font-semibold">
              New Password <span className='text-red-500'> *</span>
            </label>
            <input
              type="password"
              id="password"
              {...formik.getFieldProps("password")}
              className="w-full mt-2 py-2 px-4 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 focus:ring focus:ring-indigo-200"
              placeholder="Enter new password"
            />
            {formik.touched.password && formik.errors.password ? (
              <p className="text-red-500 mt-1">{formik.errors.password}</p>
            ) : null}
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-gray-700 font-semibold">
              Confirm New Password <span className='text-red-500'> *</span>
            </label>
            <input
              type="password"
              id="confirmPassword"
              {...formik.getFieldProps("confirmPassword")}
              className="w-full mt-2 py-2 px-4 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 focus:ring focus:ring-indigo-200"
              placeholder="Confirm new password"
            />
            {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
              <p className="text-red-500 mt-1">{formik.errors.confirmPassword}</p>
            ) : null}
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition duration-300"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;
