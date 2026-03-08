import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ExternalLink, Github, Layers } from "lucide-react";

const projects = [
  {
    title: "Serverless Function Execution Platform",
    description:
      "A cloud-based serverless function execution platform that enables users to deploy, manage, and execute functions on demand without provisioning or managing underlying infrastructure.",
    tech: ["Python", "Docker", "REST API", "Cloud"],
    github: "https://github.com/Dekshith14/-Serverless-Function-Execution-Platform",
    highlights: [
      "On-demand function deployment without infrastructure management",
      "Container-based isolation using Docker",
      "Scalable REST APIs with execution management",
    ],
    accent: "from-primary/20 to-primary/5",
  },
  {
    title: "Person Re-Identification using Videos",
    description:
      "Modern Re-ID capstone project using semantic features & multi-dimensional embeddings for identifying people across camera views with gait, appearance, and body ratio analysis.",
    tech: ["Python", "OpenCV", "Deep Learning", "CNN", "Jupyter"],
    github: "https://github.com/Dekshith14/Person_RE-ID",
    highlights: [
      "Gait + Appearance + Body Ratios feature extraction",
      "Multi-dimensional embedding matching pipeline",
      "Cross-camera view person identification",
    ],
    accent: "from-cyan-500/20 to-cyan-500/5",
  },
  {
    title: "Realtime Collaboration Editor",
    description:
      "A responsive real-time code editor where users can write, edit, and view code instantly. Built with Node.js, Socket.io, and deployable via Docker.",
    tech: ["Node.js", "JavaScript", "Socket.io", "Docker"],
    github: "https://github.com/Dekshith14/Realtime_collab_editor",
    highlights: [
      "Collaborative editing with live cursors",
      "Instant real-time updates via WebSockets",
      "Containerized deployment with Docker",
    ],
    accent: "from-emerald-500/20 to-emerald-500/5",
  },
  {
    title: "Collaborative Drawing Canvas",
    description:
      "A live drawing canvas where multiple users draw together in real time using HTML5 Canvas and WebSockets.",
    tech: ["JavaScript", "Socket.io", "HTML5 Canvas", "Node.js"],
    github: "https://github.com/Dekshith14/collaborative_canvas",
    highlights: [
      "Multi-user real-time drawing",
      "WebSocket-powered live synchronization",
      "HTML5 Canvas rendering engine",
    ],
    accent: "from-teal-500/20 to-teal-500/5",
  },
  {
    title: "Supply Chain Monitoring Dashboard",
    description:
      "A Streamlit + Python dashboard for centralized supply chain monitoring including inventory, order tracking, supplier performance, and demand forecasting.",
    tech: ["Python", "Streamlit", "Pandas", "Data Visualization"],
    github: "https://github.com/Dekshith14/Centralized_Supply_Chain_Dashboard",
    highlights: [
      "Inventory monitoring & order/shipment tracking",
      "Supplier performance analytics",
      "Demand forecasting with visualization",
    ],
    accent: "from-green-500/20 to-green-500/5",
  },
];

const ProjectsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="projects" className="section-padding" ref={ref}>
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-2">
            <span className="text-gradient font-mono text-lg md:text-xl">03.</span>{" "}
            Projects
          </h2>
          <div className="w-20 h-1 bg-primary rounded-full mb-10" />
        </motion.div>

        <div className="grid gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="group relative p-6 md:p-8 rounded-xl glass glow-border hover:glow transition-all duration-500 overflow-hidden"
            >
              {/* Gradient hover bg */}
              <div className={`absolute inset-0 bg-gradient-to-br ${project.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl`} />
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-primary/10 to-transparent rounded-bl-[3rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative z-10">
                <div className="flex items-start justify-between mb-4">
                  <div className="p-2.5 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 group-hover:shadow-lg group-hover:shadow-primary/20">
                    <Layers size={24} />
                  </div>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-300"
                  >
                    <Github size={20} />
                  </a>
                </div>

                <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  {project.description}
                </p>

                <ul className="space-y-2 mb-5">
                  {project.highlights.map((h, j) => (
                    <motion.li
                      key={j}
                      initial={{ opacity: 0, x: -10 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.3, delay: i * 0.12 + j * 0.05 }}
                      className="text-sm text-muted-foreground flex items-start gap-2"
                    >
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                      {h}
                    </motion.li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="px-3 py-1.5 text-xs font-mono rounded-lg bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 transition-colors duration-300"
                    >
                      {t}
                    </span>
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

export default ProjectsSection;
