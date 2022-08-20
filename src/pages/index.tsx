import { useTheme } from "next-themes";

const IndexPage = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div className="h-screen w-full bg-white dark:bg-gray-900">
      <h1 className="text-3xl text-gray-900 dark:text-pink-500">
        Welcome to Your App
      </h1>

      <button
        type="button"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className="text-gray-500 dark:text-gray-400"
      >
        <h1 className="text-3xl text-gray-900 dark:text-pink-500">버튼</h1>
      </button>
    </div>
  );
};

export default IndexPage;
