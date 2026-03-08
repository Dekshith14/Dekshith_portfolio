import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Code2, Server, Cloud, Database, Wrench, Cpu } from "lucide-react";

const skillCategories = [
  {
    title: "Languages",
    icon: Code2,
    skills: ["Python", "Java", "JavaScript", "C", "C++", "Go"],
    accent: "from-primary/20 to-primary/5",
  },
  {
    title: "Frameworks & Libraries",
    icon: Server,
    skills: ["Node.js", "React", "Express", "Flask"],
    accent: "from-emerald-500/20 to-emerald-500/5",
  },
  {
    title: "Cloud & DevOps",
    icon: Cloud,
    skills: ["AWS", "Azure", "GCP", "Docker"],
    accent: "from-teal-500/20 to-teal-500/5",
  },
  {
    title: "Databases",
    icon: Database,
    skills: ["MySQL", "PostgreSQL", "MongoDB"],
    accent: "from-cyan-500/20 to-cyan-500/5",
  },
  {
    title: "Tools & Platforms",
    icon: Wrench,
    skills: ["Git", "GitHub", "Linux", "VS Code", "Postman"],
    accent: "from-green-500/20 to-green-500/5",
  },
  {
    title: "Core Concepts",
    icon: Cpu,
    skills: ["Distributed Systems", "System Design", "Data Structures & Algorithms", "API Design"],
    accent: "from-primary/20 to-emerald-400/5",
  },
];

const SkillsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="section-padding bg-card/30" ref={ref}>
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-2">
            <span className="text-gradient font-mono text-lg md:text-xl">02.</span>{" "}
            Skills & Tech Stack
          </h2>
          <div className="w-20 h-1 bg-primary rounded-full mb-10" />
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, i) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group relative p-6 rounded-xl glass glow-border hover:glow transition-all duration-500 overflow-hidden"
            >
              {/* Gradient background on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${category.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl`} />
              
              {/* Decorative corner accent */}
              <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-primary/10 to-transparent rounded-bl-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-5">
                  <div className="p-2.5 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 group-hover:shadow-lg group-hover:shadow-primary/20">
                    <category.icon size={20} />
                  </div>
                  <h3 className="font-mono text-primary text-sm font-semibold uppercase tracking-wider">
                    {category.title}
                  </h3>
                </div>
                
                <div className="flex flex-wrap gap-2.5">
                  {category.skills.map((skill, j) => (
                    <motion.span
                      key={skill}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ duration: 0.3, delay: i * 0.1 + j * 0.05 }}
                      className="px-3.5 py-2 text-sm rounded-lg bg-secondary/80 text-secondary-foreground font-medium border border-border/50 hover:bg-primary/15 hover:text-primary hover:border-primary/30 hover:shadow-md hover:shadow-primary/5 transition-all duration-300 cursor-default"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
