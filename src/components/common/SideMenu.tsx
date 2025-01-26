import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useDarkMode } from "../../contexts/DarkModeContext";
import LanguageSwitcher from "./LanguageSwitcher";
import { useState } from "react";

interface SideMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const SideMenu = ({ isOpen, onClose }: SideMenuProps) => {
  const { t, i18n } = useTranslation("common");
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const [isAdminMenuOpen, setIsAdminMenuOpen] = useState(false);

  const toggleAdminMenu = () => {
    setIsAdminMenuOpen(!isAdminMenuOpen);
  };

  return (
    <>
      {/* Overlay for Mobile (only visible when menu is open) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 lg:hidden"
          onClick={onClose}
        ></div>
      )}

      {/* Side Menu */}
      <div
        className={`fixed inset-y-0 ${
          i18n.language === "ar" ? "right-0" : "left-0"
        } w-64 lg:w-72 bg-white dark:bg-gray-800 flex flex-col transform transition-transform duration-300 ease-in-out ${
          isOpen
            ? "translate-x-0"
            : i18n.language === "ar"
            ? "translate-x-full lg:translate-x-0"
            : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Language Switcher and Close Button */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center h-16">
          {/* Language Switcher */}
          <LanguageSwitcher />

          {/* Close Button (Mobile Only) */}
          <button
            onClick={onClose}
            className="text-gray-700 dark:text-white hover:text-gray-900 lg:hidden"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
        </div>

        {/* Dark Mode Toggle */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <label className="flex items-center cursor-pointer justify-between">
            {/* Toggle Label */}
            <div className="text-gray-700 dark:text-white">{t("darkMode")}</div>

            {/* Toggle Switch */}
            <div className="relative">
              {/* Toggle Input */}
              <input
                type="checkbox"
                className="sr-only"
                checked={isDarkMode}
                onChange={toggleDarkMode}
              />
              {/* Toggle Track */}
              <div
                className={`w-10 h-6 rounded-full shadow-inner transition-colors ${
                  isDarkMode ? "bg-blue-600" : "bg-gray-300"
                }`}
              ></div>
              {/* Toggle Thumb */}
              <div
                className={`absolute w-6 h-6 bg-white rounded-full shadow-md transform transition-transform ${
                  isDarkMode
                    ? i18n.language === "ar"
                      ? "-translate-x-4"
                      : "translate-x-4"
                    : "translate-x-0"
                }`}
                style={{
                  top: "0",
                  left: i18n.language === "ar" ? "calc(100% - 22px)" : "-2px",
                }}
              ></div>
            </div>
          </label>
        </div>

        {/* Scrollable Menu Items */}
        <div className="flex-grow overflow-y-auto">
          <ul className="space-y-2 p-4">
            {/* Home */}
            <li>
              <Link
                to="/"
                className="block p-2 text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={onClose}
              >
                {t("home")}
              </Link>
            </li>

            {/* Admin Menu */}
            <li>
              <button
                onClick={toggleAdminMenu}
                className="w-full flex justify-between items-center p-2 text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <span>{t("admin")}</span>
                <svg
                  className={`w-4 h-4 transform transition-transform ${
                    isAdminMenuOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </button>
              {/* Nested Admin Links */}
              {isAdminMenuOpen && (
                <ul
                  className={`pl-4 mt-2 space-y-2 ${
                    i18n.language === "ar" ? "pr-4 pl-0" : ""
                  }`}
                >
                  <li>
                    <Link
                      to="/admin/pending-registrations"
                      className="block p-2 text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                      onClick={onClose}
                    >
                      {t("pendingRegistrations")}
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/admin/teachers"
                      className="block p-2 text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                      onClick={onClose}
                    >
                      {t("allTeachers")}
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/admin/add-teacher"
                      className="block p-2 text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                      onClick={onClose}
                    >
                      {t("addTeacher")}
                    </Link>
                  </li>
                </ul>
              )}
            </li>

            {/* Teacher Menu */}
            <li>
              <Link
                to="/teacher/grades"
                className="block p-2 text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={onClose}
              >
                {t("gradeManagement")}
              </Link>
            </li>

            {/* Parent Menu */}
            <li>
              <Link
                to="/parent/grades"
                className="block p-2 text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={onClose}
              >
                {t("viewGrades")}
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default SideMenu;
