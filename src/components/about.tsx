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
      {/* Main content - stacks on mobile, side-by-side on lg */}
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-center lg:items-start">
        {/* Left side - Text */}
        <div className="flex-1 w-full">
          {/* Title */}
          <motion.div variants={textVariant()}>
            <p className={styles.sectionSubText}>Introduction</p>
            <h2 className={styles.sectionHeadText}>Overview.</h2>
          </motion.div>

          {/* Body */}
          <motion.p
            variants={fadeIn(undefined, undefined, 0.1, 1)}
            className="mt-4 text-secondary text-[16px] sm:text-[18px] max-w-3xl leading-[28px] sm:leading-[32px]"
          >
            Expertise in software development and Data Structures & Algorithms
            with a strong focus on writing efficient and scalable code.
            Proficient in solving complex problems using optimized approaches and
            clean coding practices. Experienced in building reliable and
            high-performance applications across different domains.
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            variants={fadeIn(undefined, undefined, 0.2, 1)}
            className="mt-8 flex flex-wrap gap-4 sm:gap-6"
          >
            <a
              href="/Naresh_Kumawat_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-tertiary border border-white-100 py-3 px-8 rounded-xl outline-none w-fit text-white font-bold shadow-md shadow-primary hover:bg-white hover:text-tertiary transition-all duration-300 transform hover:scale-105"
            >
              Resume
            </a>
            <a
              href="#contact"
              className="bg-[#915EFF] py-3 px-8 rounded-xl outline-none w-fit text-white font-bold shadow-md shadow-primary hover:bg-white hover:text-[#915EFF] transition-all duration-300 transform hover:scale-105"
            >
              Connect
            </a>
          </motion.div>
        </div>

        {/* Right side - 3D Avatar */}
        <div className="flex-1 w-full h-[450px] sm:h-[500px] lg:h-[700px] relative">
          {/* Lighter backdrop glow */}
          <div className="absolute -inset-10 sm:-inset-20 bg-gradient-to-t from-violet-500/30 to-violet-500/5 rounded-full blur-[80px] sm:blur-[120px] -z-[1]" />

          {/* 3D Man Animation */}
          <AvatarCanvas />
        </div>
      </div>

      {/* Service Cards - responsive grid */}
      <div className="mt-10 sm:mt-20 flex flex-wrap justify-center gap-6 sm:gap-10">
        {SERVICES.map((service, i) => (
          <ServiceCard key={service.title} index={i} {...service} />
        ))}
      </div>
    </SectionWrapper>
  );
};
