import { Github, Linkedin, Mail } from "lucide-react";

const Footer = () => (
  <footer className="py-10 px-4 border-t border-border/50">
    <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
      <p className="text-sm text-muted-foreground font-mono">
        Built by <span className="text-primary font-semibold">Dekshith M</span> · {new Date().getFullYear()}
      </p>
      <div className="flex items-center gap-3">
        <a
          href="mailto:dekshith.m1404@gmail.com"
          className="p-2 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-300"
        >
          <Mail size={16} />
        </a>
        <a
          href="https://www.linkedin.com/in/dekshith-m-68b09719b/"
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-300"
        >
          <Linkedin size={16} />
        </a>
        <a
          href="https://github.com/Dekshith14"
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-300"
        >
          <Github size={16} />
        </a>
      </div>
    </div>
  </footer>
);

export default Footer;
