import React from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export default function Home() {
  return (
    <div className="max-w-5xl mx-auto mt-16 px-6">
      <motion.div initial={{ opacity: 0, y: -15 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-3 mb-8">
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }} className="p-3 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 shadow-md">
          <Sparkles className="w-7 h-7 text-white" />
        </motion.div>

        <h1 className="text-4xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text">Home</h1>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white/70 backdrop-blur-lg p-8 rounded-3xl shadow-xl border border-indigo-200/40">
        <h2 className="text-2xl font-semibold text-gray-800">Welcome to your Social Dashboard!</h2>
        <p className="text-gray-600 mt-2 leading-relaxed">
          This is your home base — explore posts, create content, manage your profile, and enjoy the smooth, modern UI experience powered by animations and gradients.
        </p>
      </motion.div>
    </div>
  );
}
