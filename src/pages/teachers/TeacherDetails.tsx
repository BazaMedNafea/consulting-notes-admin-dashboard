import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams, useNavigate } from "react-router-dom";
import {
  getTeacherById,
  updateTeacher,
  deleteTeacher,
} from "../../services/teacher";

interface Teacher {
  teacherId: string;
  userId: string;
  user: {
    userId: string;
    email: string;
    firstName: string;
    lastName: string;
  };
  subjects: string[];
  bio: string;
}

const TeacherDetails = () => {
  const { t } = useTranslation("common");
  const { teacherId } = useParams<{ teacherId: string }>();
  const [teacher, setTeacher] = useState<Teacher | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    subjects: [] as string[],
    bio: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTeacher = async () => {
      try {
        if (!teacherId) {
          throw new Error("Teacher ID is missing");
        }
        const data = await getTeacherById(teacherId);
        setTeacher(data);
        setFormData({
          email: data.user.email,
          firstName: data.user.firstName,
          lastName: data.user.lastName,
          subjects: data.subjects,
          bio: data.bio,
        });
      } catch (err) {
        setError("Failed to fetch teacher details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchTeacher();
  }, [teacherId]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name === "subjects") {
      setFormData({
        ...formData,
        subjects: value.split(",").map((s) => s.trim()),
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSave = async () => {
    if (!teacherId) {
      alert("Teacher ID is missing");
      return;
    }

    try {
      await updateTeacher(teacherId, {
        email: formData.email,
        firstName: formData.firstName,
        lastName: formData.lastName,
        subjects: formData.subjects,
        bio: formData.bio,
      });
      alert("Teacher updated successfully!");
      setEditMode(false);
    } catch (err) {
      alert("Failed to update teacher. Please try again.");
    }
  };

  const handleDeleteTeacher = async () => {
    if (!teacherId) {
      alert("Teacher ID is missing");
      return;
    }

    if (window.confirm("Are you sure you want to delete this teacher?")) {
      try {
        await deleteTeacher(teacherId);
        alert("Teacher deleted successfully!");
        navigate("/admin/teachers");
      } catch (err) {
        alert("Failed to delete teacher. Please try again.");
      }
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (!teacher) {
    return <p>Teacher not found.</p>;
  }

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6">{t("teacherDetails")}</h1>

      {editMode ? (
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              {t("email")}
            </label>
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
              value={formData.subjects.join(", ")}
              onChange={handleInputChange}
              className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-700"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">{t("bio")}</label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleInputChange}
              className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-700"
            />
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
            >
              {t("save")}
            </button>
            <button
              onClick={() => setEditMode(false)}
              className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
            >
              {t("cancel")}
            </button>
          </div>
        </form>
      ) : (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">
            {teacher.user.firstName} {teacher.user.lastName}
          </h2>
          <p className="text-gray-700 dark:text-white mb-4">
            <strong>{t("email")}:</strong> {teacher.user.email}
          </p>
          <p className="text-gray-700 dark:text-white mb-4">
            <strong>{t("subjects")}:</strong> {teacher.subjects.join(", ")}
          </p>
          <p className="text-gray-700 dark:text-white mb-6">
            <strong>{t("bio")}:</strong> {teacher.bio}
          </p>

          <div className="flex gap-4">
            <button
              onClick={() => setEditMode(true)}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
            >
              {t("edit")}
            </button>
            <button
              onClick={handleDeleteTeacher}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
            >
              {t("delete")}
            </button>
            <button
              onClick={() => navigate("/admin/teachers")}
              className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
            >
              {t("back")}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeacherDetails;
