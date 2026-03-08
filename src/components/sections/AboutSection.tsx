import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Cloud, Server, Brain, Code2 } from "lucide-react";

const highlights = [
  { icon: Cloud, title: "Cloud & DevOps", desc: "AWS, Azure, GCP, Docker, Serverless", accent: "from-teal-500/20 to-teal-500/5" },
  { icon: Server, title: "Backend & Systems", desc: "Node.js, Express, Flask, REST APIs", accent: "from-emerald-500/20 to-emerald-500/5" },
  { icon: Brain, title: "Data & ML", desc: "Deep Learning, Computer Vision, Analytics", accent: "from-cyan-500/20 to-cyan-500/5" },
  { icon: Code2, title: "Full Stack", desc: "React, JavaScript, Python, Go, Java", accent: "from-primary/20 to-primary/5" },
];

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="section-padding" ref={ref}>
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-2">
            <span className="text-gradient font-mono text-lg md:text-xl">01.</span>{" "}
            About Me
          </h2>
          <div className="w-20 h-1 bg-primary rounded-full mb-10" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-5"
          >
            <p className="text-muted-foreground leading-relaxed text-lg">
              I'm a Computer Science graduate from <span className="text-foreground font-medium">PES University, Bangalore (Class of 2026)</span> with a strong
              interest in Distributed Systems, Cloud Computing, ML, and Real-time Applications.
            </p>
            <p className="text-muted-foreground leading-relaxed text-lg">
              Currently working on <span className="text-foreground font-medium">Person Re-Identification using Videos</span> as my major project,
              while exploring System Design principles, Deep Learning for video-based identification, and Cloud Deployments (Docker → AWS ECS).
            </p>
            <p className="text-muted-foreground leading-relaxed text-lg">
              Actively seeking <span className="text-foreground font-medium">SDE, Business Analytics, and Data Analytics roles</span>.
              I love building real-time collaborative tools and scalable cloud platforms.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="grid gap-4"
          >
            {highlights.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                className="group relative p-5 rounded-xl glass glow-border hover:glow transition-all duration-500 overflow-hidden"
              >
                {/* Gradient hover bg */}
                <div className={`absolute inset-0 bg-gradient-to-br ${item.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl`} />
                <div className="absolute top-0 right-0 w-14 h-14 bg-gradient-to-bl from-primary/10 to-transparent rounded-bl-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative z-10 flex items-start gap-4">
                  <div className="p-2.5 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 group-hover:shadow-lg group-hover:shadow-primary/20">
                    <item.icon size={22} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
