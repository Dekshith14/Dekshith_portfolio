import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Briefcase, GraduationCap, Award, ExternalLink } from "lucide-react";

const timeline = [
  {
    type: "experience" as const,
    title: "Software Engineering Intern",
    org: "Xevyte",
    orgLink: "https://xevyte.com/",
    date: "Jan 2025 – Jun 2025",
    description:
      "Building scalable products including an AI-powered interviewer application. Working across full-stack development, AI/ML integration, and product engineering at a global digital engineering firm.",
    accent: "from-blue-500/20 to-blue-500/5",
  },
  {
    type: "education" as const,
    title: "B.Tech, Computer Science",
    org: "PES University",
    date: "2022 – 2026",
    description: "Computer Science graduate with focus on backend systems, ML, system design, and cloud computing.",
    accent: "from-primary/20 to-primary/5",
  },
  {
    type: "experience" as const,
    title: "Software Engineering Intern",
    org: "Hindustan Aeronautics Limited (HAL) – MRO Division",
    date: "Internship",
    description:
      "Developed Python-based backend scripts, data pipelines, and a predictive aircraft engine failure analysis system. Contributed to safety-critical software.",
    accent: "from-emerald-500/20 to-emerald-500/5",
  },
  {
    type: "education" as const,
    title: "Pre-University",
    org: "Deeksha PU College, Yelahanka",
    date: "2020 – 2022",
    description: "Completed pre-university education with focus on science and mathematics.",
    accent: "from-teal-500/20 to-teal-500/5",
  },
  {
    type: "education" as const,
    title: "Secondary Education",
    org: "Rashtrotthana Vidya Kendra",
    date: "– 2020",
    description: "Completed secondary school education with strong academic foundation.",
    accent: "from-cyan-500/20 to-cyan-500/5",
  },
];

const certifications = [
  { title: "Machine Learning Specialization", org: "Andrew Ng (DeepLearning.AI, Coursera)", link: "https://www.coursera.org/account/accomplishments/verify/GU18MCHUHUJ6" },
  { title: "Problem Solving (Intermediate)", org: "HackerRank", link: "https://www.hackerrank.com/certificates/c4152c7a357f" },
  { title: "Get Started with Jira Work Management", org: "Atlassian" },
  { title: "Introduction to Supply Chain Management", org: "Alison (CPD Certified)" },
];

const iconMap = {
  experience: Briefcase,
  education: GraduationCap,
};

const ExperienceSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="experience" className="section-padding bg-card/30" ref={ref}>
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-2">
            <span className="text-gradient font-mono text-lg md:text-xl">04.</span>{" "}
            Experience & Education
          </h2>
          <div className="w-20 h-1 bg-primary rounded-full mb-10" />
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          <div className="absolute left-4 md:left-6 top-0 bottom-0 w-px bg-gradient-to-b from-primary/60 via-primary/20 to-transparent" />

          <div className="space-y-8">
            {timeline.map((item, i) => {
              const Icon = iconMap[item.type];
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: i * 0.12 }}
                  className="relative pl-12 md:pl-16"
                >
                  {/* Timeline dot */}
                  <div className="absolute left-1.5 md:left-3.5 top-1 w-5 h-5 rounded-full bg-background border-2 border-primary flex items-center justify-center shadow-lg shadow-primary/20">
                    <div className="w-2 h-2 rounded-full bg-primary animate-pulse-glow" />
                  </div>

                  <div className={`group relative p-5 rounded-xl glass glow-border hover:glow transition-all duration-500 overflow-hidden`}>
                    {/* Gradient hover bg */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${item.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl`} />
                    <div className="absolute top-0 right-0 w-14 h-14 bg-gradient-to-bl from-primary/10 to-transparent rounded-bl-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    <div className="relative z-10">
                      <div className="flex items-center gap-2.5 mb-2">
                        <div className="p-1.5 rounded-md bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                          <Icon size={14} />
                        </div>
                        <span className="font-mono text-xs text-primary uppercase tracking-wider font-semibold">
                          {item.type}
                        </span>
                        <span className="ml-auto text-xs text-muted-foreground font-mono">{item.date}</span>
                      </div>
                      <h3 className="text-lg font-bold group-hover:text-primary transition-colors duration-300">{item.title}</h3>
                      <p className="text-sm text-primary/80 font-medium mb-2">
                        {'orgLink' in item && item.orgLink ? (
                          <a href={item.orgLink} target="_blank" rel="noopener noreferrer" className="hover:underline inline-flex items-center gap-1">
                            {item.org} <ExternalLink size={12} />
                          </a>
                        ) : item.org}
                      </p>
                      <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-14"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-primary/10 text-primary">
              <Award size={20} />
            </div>
            <h3 className="text-xl font-bold">Certifications</h3>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {certifications.map((cert, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.5 + i * 0.08 }}
                className="group relative p-4 rounded-xl glass glow-border hover:glow transition-all duration-500 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/15 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl" />
                <div className="relative z-10">
                  <p className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors duration-300 mb-1">
                    {'link' in cert && cert.link ? (
                      <a href={cert.link} target="_blank" rel="noopener noreferrer" className="hover:underline inline-flex items-center gap-1">
                        {cert.title} <ExternalLink size={12} />
                      </a>
                    ) : cert.title}
                  </p>
                  <p className="text-xs text-muted-foreground">{cert.org}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ExperienceSection;
