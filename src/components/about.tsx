import { Tilt } from "react-tilt";
import { motion } from "framer-motion";

import { SERVICES } from "../constants";
import { SectionWrapper } from "../hoc";
import { styles } from "../styles";
import { fadeIn, textVariant } from "../utils/motion";

type ServiceCardProps = {
  index: number;
  title: string;
  icon: string;
};

// Service Card
const ServiceCard = ({ index, title, icon }: ServiceCardProps) => {
  return (
    <Tilt
      options={{
        max: 45,
        scale: 1,
        speed: 450,
      }}
      className="xs:w-[250px] w-full"
    >
      <motion.div
        variants={fadeIn("right", "spring", 0.5 * index, 0.75)}
        className="w-full green-pink-gradient p-[1px] rounded-[20px] shadow-card"
      >
        <div className="bg-tertiary rounded-[20px] py-5 px-12 min-h-[280px] flex justify-evenly items-center flex-col">
          <img src={icon} alt={title} className="w-16 h-16 object-contain" />
          <h3 className="text-white text-[20px] font-bold text-center">
            {title}
          </h3>
        </div>
      </motion.div>
    </Tilt>
  );
};

import { AvatarCanvas } from "./canvas";

// About
export const About = () => {
  return (
    <SectionWrapper idName="about">
      <div className="flex flex-col lg:flex-row gap-10">
        <div className="flex-1">
          {/* Title */}
          <motion.div variants={textVariant()}>
            <p className={styles.sectionSubText}>Introduction</p>
            <h2 className={styles.sectionHeadText}>Overview.</h2>
          </motion.div>

          {/* Body */}
          <motion.p
            variants={fadeIn(undefined, undefined, 0.1, 1)}
            className="mt-4 text-secondary text-[17px] max-w-3xl leading-[30px]"
          >
            Expertise in software development and Data Structures & Algorithms
            with a strong focus on writing efficient and scalable code.
            Proficient in solving complex problems using optimized approaches and
            clean coding practices. Experienced in building reliable and
            high-performance applications across different domains. Continuously
            improving skills by practicing problem-solving and exploring new
            technologies.
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            variants={fadeIn(undefined, undefined, 0.2, 1)}
            className="mt-8 flex gap-4"
          >
            <a
              href="/Naresh_Kumawat_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-tertiary border border-white-100 py-3 px-8 rounded-xl outline-none w-fit text-white font-bold shadow-md shadow-primary hover:bg-white hover:text-tertiary transition-colors"
            >
              Resume
            </a>
            <a
              href="#contact"
              className="bg-[#915EFF] py-3 px-8 rounded-xl outline-none w-fit text-white font-bold shadow-md shadow-primary hover:bg-white hover:text-[#915EFF] transition-colors"
            >
              Connect
            </a>
          </motion.div>
        </div>

        <div className="flex-1 w-full h-[450px] lg:h-[550px] relative z-[7]">
          {/* Lighter backdrop glow behind man to help him stand out */}
          <div className="absolute inset-0 bg-gradient-to-t from-violet-500/30 to-violet-500/10 rounded-full blur-3xl -z-[1]" />
          
          {/* 3D Man Animation */}
          <AvatarCanvas />
        </div>
      </div>

      {/* Service Card */}
      <div className="mt-20 flex flex-wrap gap-10">
        {SERVICES.map((service, i) => (
          <ServiceCard key={service.title} index={i} {...service} />
        ))}
      </div>
    </SectionWrapper>
  );
};
