import { Brain, Briefcase, Cloud, Code, User } from "lucide-react";

export const AboutSection = () => {
  return (
    <section id="about" className="py-24 px-4 relative">
      {" "}
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          About <span className="text-primary"> Me</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold">
              Passionate Artificial Intelligence and Machine Learning Developer.
            </h3>

            <p className="text-muted-foreground">
             I am a passionate and results-driven software developer with a strong foundation in Data Structures and Algorithms (DSA) and a growing expertise in Artificial Intelligence and Machine Learning (AI/ML). With a problem-solving mindset and a deep interest in computational thinking, I have honed my skills by solving hundreds of algorithmic challenges and competitive programming problems across various platforms.
            </p>

            <p className="text-muted-foreground">
              I'm passionate about creating elegant solutions to complex
              problems, and I'm constantly learning new technologies and
              techniques to stay at the forefront of the ever-evolving web
              landscape.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center">
              <a href="#contact" className="cosmic-button">
                {" "}
                Get In Touch
              </a>

              <a
                href="https://drive.google.com/file/d/1xu1RgYh3669pG_MeMDJT8afhwVBvDyPJ/view?usp=drivesdk"
                className="px-6 py-2 rounded-full border border-primary text-primary hover:bg-primary/10 transition-colors duration-300"
              >
                Download CV
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6">
            <div className="gradient-border p-6 card-hover">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <Brain className="h-6 w-6 text-primary" />
                </div>
                <div className="text-left">
                  <h4 className="font-semibold text-lg"> AIML Development</h4>
                  <p className="text-muted-foreground">
                    Creating advanced AI models and machine learning
                    algorithms to solve real-world problems.
                  </p>
                </div>
              </div>
            </div>
            <div className="gradient-border p-6 card-hover">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <Code className="h-6 w-6 text-primary" />
                </div>
                <div className="text-left">
                  <h4 className="font-semibold text-lg">Data Structures and algorithms(DSA).</h4>
                  <p className="text-muted-foreground">
                    Proficient in DSA with a focus on problem-solving and
                    algorithmic thinking.
                  </p>
                </div>
              </div>
            </div>
            <div className="gradient-border p-6 card-hover">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <Cloud className="h-6 w-6 text-primary" />
                </div>

                <div className="text-left">
                  <h4 className="font-semibold text-lg">Cloud Networking.</h4>
                  <p className="text-muted-foreground">
                    Experienced in cloud networking solutions, ensuring
                    scalable and secure deployments.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
