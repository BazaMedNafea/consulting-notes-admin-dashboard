// src/pages/teachers/AllTeachers.tsx
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { getTeachers } from "../../services/teacher";

interface Teacher {
  teacherId: string;
  userId: string;
  proofFile: string;
  approved: boolean;
  createdAt: string;
  updatedAt: string;
  user: {
    userId: string;
    email: string;
    fullName: string;
    role: string;
    createdAt: string;
    updatedAt: string;
  };
  subjects: string[];
}

const AllTeachers = () => {
  const { t } = useTranslation("common");
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch teachers when the component mounts
  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const data = await getTeachers();
        setTeachers(data);
      } catch (err) {
        setError("Failed to fetch teachers. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchTeachers();
  }, []);

  if (loading) {
    return <p>Loading...</p>; // Add a loading spinner or skeleton loader
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6">{t("allTeachers")}</h1>

      {/* Teachers Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white dark:bg-gray-800 rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-700">
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 dark:text-white">
                {t("name")}
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 dark:text-white">
                {t("email")}
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 dark:text-white">
                {t("subjects")}
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 dark:text-white">
                {t("status")}
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 dark:text-white">
                {t("createdAt")}
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 dark:text-white">
                {t("updatedAt")}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {teachers.map((teacher) => (
              <tr
                key={teacher.teacherId}
                className="hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                {/* Teacher Name */}
                <td className="px-6 py-4 text-sm text-gray-700 dark:text-white">
                  {teacher.user.fullName}
                </td>

                {/* Teacher Email */}
                <td className="px-6 py-4 text-sm text-gray-700 dark:text-white">
                  {teacher.user.email}
                </td>

                {/* Subjects */}
                <td className="px-6 py-4 text-sm text-gray-700 dark:text-white">
                  {teacher.subjects.join(", ")}
                </td>

                {/* Approval Status */}
                <td className="px-6 py-4 text-sm text-gray-700 dark:text-white">
                  {teacher.approved ? (
                    <span className="text-green-500">{t("approved")}</span>
                  ) : (
                    <span className="text-yellow-500">{t("pending")}</span>
                  )}
                </td>

                {/* Created At */}
                <td className="px-6 py-4 text-sm text-gray-700 dark:text-white">
                  {new Date(teacher.createdAt).toLocaleDateString()}
                </td>

                {/* Updated At */}
                <td className="px-6 py-4 text-sm text-gray-700 dark:text-white">
                  {new Date(teacher.updatedAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllTeachers;
