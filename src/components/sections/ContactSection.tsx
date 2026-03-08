import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Mail, Github, Linkedin, Send, MessageSquare, User, AtSign, Loader2 } from "lucide-react";
import { toast } from "sonner";

const ContactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    try {
      // POST to a serverless function (Netlify: /api/send-email, Vercel: /api/send-email)
      // If you don't have a serverless function configured, this will gracefully fall back.
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: form.name, email: form.email, message: form.message }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error ?? `Server error ${res.status}`);
      }

      toast.success("Message sent! I'll get back to you soon.");
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      console.error(err);
      toast.error(
        "Failed to send message. Please email me directly at dekshith.m1404@gmail.com"
      );
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" className="section-padding" ref={ref}>
      <div className="max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-2">
            <span className="text-gradient font-mono text-lg md:text-xl">05.</span>{" "}
            Get In Touch
          </h2>
          <div className="w-20 h-1 bg-primary rounded-full mb-6 mx-auto" />
          <p className="text-muted-foreground text-lg mb-10 max-w-lg mx-auto">
            I'm always open to new opportunities, collaborations, and interesting projects.
            Feel free to reach out!
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          onSubmit={handleSubmit}
          className="group/form relative glass glow-border hover:glow rounded-2xl p-6 md:p-8 text-left space-y-5 overflow-hidden transition-all duration-500"
        >
          {/* Decorative gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover/form:opacity-100 transition-opacity duration-500 rounded-2xl" />
          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-primary/10 to-transparent rounded-bl-[4rem] opacity-0 group-hover/form:opacity-100 transition-opacity duration-500" />

          <div className="relative z-10 space-y-5">
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="text-sm font-medium mb-2 flex items-center gap-2 text-foreground">
                  <User size={14} className="text-primary" />
                  Name
                </label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-secondary/80 border border-border/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/30 transition-all duration-300"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 flex items-center gap-2 text-foreground">
                  <AtSign size={14} className="text-primary" />
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-secondary/80 border border-border/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/30 transition-all duration-300"
                  placeholder="your@email.com"
                />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium mb-2 flex items-center gap-2 text-foreground">
                <MessageSquare size={14} className="text-primary" />
                Message
              </label>
              <textarea
                required
                rows={5}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full px-4 py-3 rounded-lg bg-secondary/80 border border-border/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/30 transition-all duration-300 resize-none"
                placeholder="What's on your mind?"
              />
            </div>
            <button
              type="submit"
              disabled={sending}
              className="w-full sm:w-auto px-8 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 disabled:opacity-50"
            >
              {sending ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
              {sending ? "Sending..." : "Send Message"}
            </button>
          </div>
        </motion.form>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex items-center justify-center gap-5 mt-10"
        >
          <a
            href="mailto:dekshith.m1404@gmail.com"
            className="group flex items-center gap-2 px-4 py-2.5 rounded-lg glass glow-border hover:glow text-muted-foreground hover:text-primary transition-all duration-300 text-sm"
          >
            <Mail size={18} />
            dekshith.m1404@gmail.com
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
    </section>
  );
};

export default ContactSection;
