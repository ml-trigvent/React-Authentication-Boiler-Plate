import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { SentOtp } from "../../services/api";

function SentEmail() {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
    }),
    onSubmit: async (values) => {
      const payload = { email: values.email };
      const sendOtp = await SentOtp(payload);
      if (sendOtp.status) {
        navigate('/otp/verification');
      } 
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 p-6">
      <div className="bg-white rounded-lg p-8 shadow-lg max-w-md w-full">
        <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">Forgot Password</h1>
        <p className="text-sm text-gray-600 text-center mb-8">
          We’ll send you an email with instructions to reset your password.
          <br />
          <span className="font-semibold">If your account is not registered, you will not receive an email.</span>
        </p>
        <form onSubmit={formik.handleSubmit} className="space-y-6">
          <div>
            <input
              type="text"
              id="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Enter your email"
              className={`w-full px-4 py-2 rounded-lg bg-gray-100 border ${
                formik.touched.email && formik.errors.email ? "border-red-500" : "border-gray-300"
              } focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:outline-none`}
            />
            {formik.touched.email && formik.errors.email && (
              <div className="text-red-500 text-sm mt-1">{formik.errors.email}</div>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition duration-300"
          >
            {formik.isSubmitting ? "Sending..." : "Send Email"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default SentEmail;
