// import React from "react"; 

import { useSelector } from "react-redux";

const About = () => {
    const features = [
    "Create and organize notes with ease",
    "Pin and mark important notes",
    "Archive Notes",
    "Trash bin with restore option",
    "Responsive and clean UI",
    "Powered by Redux for state management",
    "Make quick edits anytime"
];
const isDark = useSelector(state=>state.darkMode.isDark)
const techStack = ["React", "Redux", "Tailwind CSS", "Material UI"];
return (
    <div className={`min-h-screen px-6 py-10 sm:px-12 md:px-24 mt-[64px] flex flex-col ${
    isDark ? "bg-[#10142c]" : "bg-white"
  }`}>
      <div className={`text-3xl font-bold ${isDark ? "text-gray-300" : "text-gray-800"} mb-2 text-center`}>About NoteWise</div>

      <p className={`text-lg ${isDark ? "text-gray-300" : "text-gray-600"} mb-8`}>
        <b>NoteWise</b> is a powerful yet simple note-taking app that helps
        you capture, organize, and manage your ideas effectively. Whether you're
        jotting down quick thoughts or planning something big, NoteWise offers
        a clean and intuitive experience.
      </p>

      <div className={`text-2xl font-semibold mb-4 ${isDark ? "text-gray-300" : "text-gray-700"}`}>🚀 Features</div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
        {features.map((feature,idx)=>{
          return <div key={feature} className="border-gray-200 border-1 rounded-xl text-center p-4 shadow-xl hover:scale-97 hover:cursor-pointer">{feature}</div>
        })}
      </div>

      <div className={`text-2xl font-semibold mb-4 ${isDark ? "text-gray-300" : "text-gray-700"}`}>🛠️ Tech Stack</div>
      <div className="flex flex-wrap gap-4 mb-10">
        {techStack.map((tech, idx) => (
          <span
            key={idx}
            className="bg-gray-100 px-4 py-1 rounded-full text-sm text-gray-600">
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
};

export default About;
