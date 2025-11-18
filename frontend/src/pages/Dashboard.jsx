import PostForm from "../components/PostForm";
import { motion } from "framer-motion";
import { LineChart } from "lucide-react";
import PostList from "../components/PostList";

export default function Dashboard() {
  return (
    <div className="max-w-3xl mx-auto mt-10 px-6">
      <motion.div 
        initial={{ opacity: 0, y: -10 }} 
        animate={{ opacity: 1, y: 0 }} 
        className="mb-8 text-center"
      >
        <div className="flex items-center justify-center gap-3">
          <motion.div 
            animate={{ rotate: 360 }} 
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }} 
            className="p-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 shadow-md"
          >
            <LineChart className="w-6 h-6 text-white" />
          </motion.div>
          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text">
            Dashboard
          </h1>
        </div>
        <p className="text-gray-600 mt-2 text-lg">
          Welcome back! Create a new post below.
        </p>
      </motion.div>

      <div className="space-y-6">
        <PostForm />
        <PostList />
      </div>
    </div>
  );
}
