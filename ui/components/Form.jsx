"use client";
import { useState } from "react";
import axios from "axios";

export default function SoilForm() {
  const [formData, setFormData] = useState({
    N: "",
    P: "",
    K: "",
    temperature: "",
    humidity: "",
    ph: "",
    rainfall: "",
  });

  const [responseData, setResponseData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value || "" // Ensure value is never undefined
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Convert string values to numbers
      const jsonData = Object.entries(formData).reduce((acc, [key, value]) => {
        acc[key] = parseFloat(value) || 0;
        return acc;
      }, {});

      const response = await axios.post("https://api-crop.onrender.com/predict", jsonData);
      setResponseData(response.data);
      console.log("Prediction Response:", response.data);
    } catch (error) {
      console.error("Error making prediction:", error);
      alert("Error making prediction. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-[#f8fdf0] p-6">
      <div className="w-full max-w-md">
        <h2 className="text-center text-2xl font-bold text-gray-900 mb-6">
          Soil and Environmental Parameters
        </h2>

        {responseData ? (
          <div className="bg-white shadow-md rounded-lg p-6">
            <div className="text-center mb-6">
              <h3 className="font-semibold text-2xl text-green-800 mb-2">
                Recommended Crop: {responseData.recommended_crop.ml_prediction}
              </h3>
              <p className="text-gray-600">
                Based on ML Prediction and Agricultural Rules
              </p>
            </div>

            <div className="mb-6">
              <h4 className="font-semibold text-lg text-gray-800 mb-3">Parameter Modifications</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(responseData.recommended_crop.parameter_modifications).map(([param, suggestion]) => (
                  <div key={param} className="bg-gray-50 p-4 rounded-lg hover:shadow-md transition-shadow duration-300">
                    <p className="font-medium text-gray-700 capitalize font-['Poppins']">{param}</p>
                    <p className="text-sm text-gray-600 font-['Inter'] mt-1">{suggestion}</p>
                  </div>
                ))}
              </div>
            </div>

            {responseData.recommended_crop.rule_suggestions.length > 0 && (
              <div className="mb-6">
                <h4 className="font-semibold text-lg text-gray-800 mb-3">Rule-Based Suggestions</h4>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <ul className="list-disc list-inside">
                    {responseData.recommended_crop.rule_suggestions.map((crop, index) => (
                      <li key={index} className="text-gray-700">{crop}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            <button
              onClick={() => setResponseData(null)}
              className="mt-6 bg-gray-600 text-white px-6 py-3 rounded-lg w-full hover:bg-gray-700 transition duration-300 font-['Inter'] font-medium"
            >
              Try Another Prediction
            </button>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="bg-white shadow-xl rounded-xl p-6 sm:p-8"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {["N", "P", "K", "temperature", "humidity", "ph", "rainfall"].map((field) => (
                <div key={field} className="mb-4">
                  <label className="block text-gray-700 font-semibold capitalize font-['Poppins']">
                    {field}
                  </label>
                  <input
                    type="text"
                    name={field}
                    value={formData[field]}
                    onChange={handleChange}
                    className="mt-1 w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-green-500 font-['Inter']"
                    placeholder={`(${field === "temperature" ? "Celsius" : field === "humidity" ? "%" : field === "ph" ? "pH" : field === "rainfall" ? "cm" : "kg/ha" })`}
                    required
                  />
                </div>
              ))}
            </div>

            <button
              type="submit"
              className="bg-green-500 text-white font-bold py-3 px-4 w-full rounded-lg hover:bg-green-600 transition duration-300"
              disabled={loading}
            >
              {loading ? "Processing..." : "Get Recommendations"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
