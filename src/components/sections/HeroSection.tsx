import { motion } from "framer-motion";
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden section-padding pt-28">
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="font-mono text-primary text-sm md:text-base mb-4 tracking-wider">
            Hi, my name is
          </p>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold mb-4 tracking-tight"
        >
          Dekshith <span className="text-gradient">M</span>
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-2xl md:text-4xl font-semibold text-muted-foreground mb-6"
        >
          Software Developer | Cloud | ML | Full Stack
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Computer Science graduate from PES University, Bangalore. Passionate about
          Distributed Systems, Cloud Computing, ML, and Real-time Applications.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-4 mb-12"
        >
          <a
            href="#projects"
            className="group relative px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold overflow-hidden transition-all duration-300 shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30"
          >
            <span className="relative z-10">View Projects</span>
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </a>
          <a
            href="/Resume_2025.pdf"
            download="Resume_Dekshith_M.pdf"
            className="group relative px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold overflow-hidden transition-all duration-300 shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30"
          >
            <span className="relative z-10">Download Resume</span>
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </a>
          <a
            href="#contact"
            className="group relative px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold overflow-hidden transition-all duration-300 shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30"
          >
            <span className="relative z-10">Contact Me</span>
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex items-center justify-center gap-4"
        >
          <a
            href="mailto:dekshith.m1404@gmail.com"
            className="p-2.5 rounded-lg glass glow-border hover:glow text-muted-foreground hover:text-primary transition-all duration-300"
          >
            <Mail size={20} />
          </a>
          <a
            href="https://www.linkedin.com/in/dekshith-m-68b09719b/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-lg glass glow-border hover:glow text-muted-foreground hover:text-primary transition-all duration-300"
          >
            <Linkedin size={20} />
          </a>
          <a
            href="https://github.com/Dekshith14"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-lg glass glow-border hover:glow text-muted-foreground hover:text-primary transition-all duration-300"
          >
            <Github size={20} />
          </a>
        </motion.div>
      </div>

      {/* Arrow down - positioned relative to section, not the inner div */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10"
      >
        <a href="#about" className="text-muted-foreground hover:text-primary transition-colors animate-float">
          <ArrowDown size={24} />
        </a>
      </motion.div>
    </section>
  );
};

export default HeroSection;
