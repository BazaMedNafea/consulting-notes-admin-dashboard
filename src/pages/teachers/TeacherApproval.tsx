// src/pages/teachers/TeacherApproval.tsx
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { getTeachers, approveTeacher } from "../../services/teacher";

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

const TeacherApproval = () => {
  const { t } = useTranslation("common");
  const [pendingTeachers, setPendingTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch pending teachers when the component mounts
  useEffect(() => {
    const fetchPendingTeachers = async () => {
      try {
        const teachers = await getTeachers();
        // Explicitly type the `teacher` parameter in the filter method
        const pending = teachers.filter(
          (teacher: Teacher) => !teacher.approved
        ); // Filter pending teachers
        setPendingTeachers(pending);
      } catch (err) {
        setError("Failed to fetch pending teachers. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchPendingTeachers();
  }, []);

  // Handle teacher approval
  const handleApprove = async (teacherId: string) => {
    try {
      await approveTeacher(teacherId);
      // Update the list of pending teachers after approval
      setPendingTeachers((prev) =>
        prev.filter((teacher) => teacher.teacherId !== teacherId)
      );
      alert("Teacher approved successfully!");
    } catch (err) {
      console.error("Failed to approve teacher:", err);
      alert("Failed to approve teacher. Please try again.");
    }
  };

  if (loading) {
    return <p>Loading...</p>; // Add a loading spinner or skeleton loader
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6">{t("pendingTeachers")}</h1>

      {/* Pending Teachers Table */}
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
                {t("actions")}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {pendingTeachers.map((teacher) => (
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

                {/* Approve Button */}
                <td className="px-6 py-4 text-sm text-gray-700 dark:text-white">
                  <button
                    onClick={() => handleApprove(teacher.teacherId)}
                    className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
                  >
                    {t("approve")}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TeacherApproval;
