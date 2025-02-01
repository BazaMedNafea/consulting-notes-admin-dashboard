import { useState } from "react";
import { useTranslation } from "react-i18next";
import { addStudent } from "../../services/student";
import { useNavigate, useLocation } from "react-router-dom";

const AddStudent = () => {
  const { t } = useTranslation("common");
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: searchParams.get("lastName") || "",
    className: "",
    parentEmail: searchParams.get("email") || "",
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Validate input
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.className ||
      !formData.parentEmail
    ) {
      setError("Missing required fields");
      setLoading(false);
      return;
    }

    try {
      await addStudent({
        firstName: formData.firstName,
        lastName: formData.lastName,
        className: formData.className,
        parentEmail: formData.parentEmail,
      });
      alert("Student added successfully!");
      navigate("/admin/students");
    } catch (err: any) {
      if (err.response?.status === 409) {
        setError(
          "A student with the same name already exists for this parent."
        );
      } else {
        setError("Failed to add student. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl md:text-3xl font-bold mb-6">{t("addStudent")}</h1>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">
            {t("firstName")}
          </label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-700"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            {t("lastName")}
          </label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-700"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            {t("className")}
          </label>
          <input
            type="text"
            name="className"
            value={formData.className}
            onChange={handleInputChange}
            className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-700"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            {t("parentEmail")}
          </label>
          <input
            type="email"
            name="parentEmail"
            value={formData.parentEmail}
            onChange={handleInputChange}
            className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-700"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full md:w-auto bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          disabled={loading}
        >
          {loading ? t("addingStudent") : t("addStudent")}
        </button>
      </form>
    </div>
  );
};

export default AddStudent;
