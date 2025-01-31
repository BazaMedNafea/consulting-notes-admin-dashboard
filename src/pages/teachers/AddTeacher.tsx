// src/pages/teachers/AddTeacher.tsx
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { addTeacher } from "../../services/teacher";
import { useNavigate } from "react-router-dom";

const AddTeacher = () => {
  const { t } = useTranslation("common");
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    subjects: [] as string[],
  });
  const [subjectsInput, setSubjectsInput] = useState(""); // New state for raw input
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubjectsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSubjectsInput(value); // Update raw input value

    // Split by commas, trim each subject, and filter out empty strings
    const subjectsArray = value
      .split(",")
      .map((s) => s.trim())
      .filter((s) => s.length > 0);
    setFormData({ ...formData, subjects: subjectsArray }); // Update formData.subjects
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Validate input
    if (
      !formData.email ||
      !formData.password ||
      !formData.firstName ||
      !formData.lastName ||
      formData.subjects.length === 0
    ) {
      setError("Missing required fields");
      setLoading(false);
      return;
    }

    try {
      await addTeacher({
        email: formData.email,
        password: formData.password,
        firstName: formData.firstName,
        lastName: formData.lastName,
        subjects: formData.subjects,
      });
      alert("Teacher added successfully!");
      navigate("/admin/teachers");
    } catch (err) {
      setError("Failed to add teacher. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl md:text-3xl font-bold mb-6">{t("addTeacher")}</h1>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">{t("email")}</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-700"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            {t("password")}
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-700"
            required
          />
        </div>

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
            {t("subjects")}
          </label>
          <input
            type="text"
            name="subjects"
            value={subjectsInput} // Use raw input value
            onChange={handleSubjectsChange}
            className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-700"
            placeholder="Math, Science, History"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full md:w-auto bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          disabled={loading}
        >
          {loading ? t("addingTeacher") : t("addTeacher")}
        </button>
      </form>
    </div>
  );
};

export default AddTeacher;
