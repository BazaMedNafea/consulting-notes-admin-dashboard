import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { addTeacher } from "../../services/teacher";
import { getSubjectsByLevel } from "../../services/subject";

interface Subject {
  subjectId: string;
  name: string;
  level: "PRIMARY" | "MIDDLE" | "SECONDARY";
  stream: "SCIENCES" | "MATHEMATICS" | "LITERATURE" | "TECHNICAL" | null;
}

const LEVELS = ["PRIMARY", "MIDDLE", "SECONDARY"] as const;
const STREAMS = ["SCIENCES", "MATHEMATICS", "LITERATURE", "TECHNICAL"] as const;

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
  const [allSubjects, setAllSubjects] = useState<Record<string, Subject[]>>({});
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchAllSubjects = async () => {
      try {
        const subjectsByLevel: Record<string, Subject[]> = {};
        await Promise.all(
          LEVELS.map(async (level) => {
            const data = await getSubjectsByLevel(level);
            subjectsByLevel[level] = data;
          })
        );
        setAllSubjects(subjectsByLevel);
      } catch (err) {
        console.error("Failed to fetch subjects:", err);
      }
    };

    fetchAllSubjects();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const toggleSubject = (subjectName: string) => {
    setFormData((prev) => {
      const subjects = prev.subjects.includes(subjectName)
        ? prev.subjects.filter((s) => s !== subjectName)
        : [...prev.subjects, subjectName];
      return { ...prev, subjects };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (
      !formData.email ||
      !formData.password ||
      !formData.firstName ||
      !formData.lastName ||
      formData.subjects.length === 0
    ) {
      alert("Missing required fields");
      setLoading(false);
      return;
    }

    try {
      await addTeacher(formData);
      alert("Teacher added successfully!");
      navigate("/admin/teachers");
    } catch (err) {
      alert("Failed to add teacher. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const getFilteredSubjects = () => {
    const filtered: Record<string, Subject[]> = {};

    LEVELS.forEach((level) => {
      const levelSubjects = allSubjects[level] || [];
      const filteredLevelSubjects = levelSubjects.filter((subject) =>
        subject.name.toLowerCase().includes(searchTerm.toLowerCase())
      );

      if (filteredLevelSubjects.length > 0) {
        filtered[level] = filteredLevelSubjects;
      }
    });

    return filtered;
  };

  const groupSubjectsByStream = (subjects: Subject[]) => {
    const grouped: Record<string, Subject[]> = {
      NO_STREAM: subjects.filter((s) => !s.stream),
    };

    STREAMS.forEach((stream) => {
      const streamSubjects = subjects.filter((s) => s.stream === stream);
      if (streamSubjects.length > 0) {
        grouped[stream] = streamSubjects;
      }
    });

    return grouped;
  };

  const filteredSubjects = getFilteredSubjects();

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl md:text-3xl font-bold mb-6">{t("addTeacher")}</h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-6 bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg"
      >
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              {t("firstName")}
            </label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600"
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
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">{t("email")}</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600"
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
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            {t("subjects")}
          </label>
          <input
            type="text"
            placeholder="Search subjects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 border rounded mb-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600"
          />

          <div className="mb-4">
            <div className="flex flex-wrap gap-2">
              {formData.subjects.map((subject) => (
                <span
                  key={subject}
                  className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center gap-2"
                >
                  {subject}
                  <button
                    type="button"
                    onClick={() => toggleSubject(subject)}
                    className="hover:text-red-500"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div className="max-h-96 overflow-y-auto border rounded p-4 space-y-4">
            {Object.entries(filteredSubjects).map(([level, subjects]) => (
              <div key={level} className="space-y-2">
                <h3 className="font-semibold text-lg border-b pb-2">
                  {t(level.toLowerCase())}
                </h3>

                {Object.entries(groupSubjectsByStream(subjects)).map(
                  ([stream, streamSubjects]) => (
                    <div key={stream} className="ml-4 space-y-1">
                      {stream !== "NO_STREAM" && (
                        <h4 className="font-medium text-sm text-gray-600 dark:text-gray-400">
                          {t(stream.toLowerCase())}
                        </h4>
                      )}
                      <div className="grid grid-cols-2 gap-1">
                        {streamSubjects.map((subject) => (
                          <button
                            key={subject.subjectId}
                            type="button"
                            onClick={() => toggleSubject(subject.name)}
                            className={`p-2 text-left rounded transition-colors ${
                              formData.subjects.includes(subject.name)
                                ? "bg-blue-100 text-blue-800 hover:bg-blue-200"
                                : "hover:bg-gray-100 dark:hover:bg-gray-700"
                            }`}
                          >
                            {subject.name}
                          </button>
                        ))}
                      </div>
                    </div>
                  )
                )}
              </div>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="w-full md:w-auto bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={loading}
        >
          {loading ? t("addingTeacher") : t("addTeacher")}
        </button>
      </form>
    </div>
  );
};

export default AddTeacher;
