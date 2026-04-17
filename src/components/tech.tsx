import { TECHNOLOGIES } from "../constants";
import { SectionWrapper } from "../hoc";
import { styles } from "../styles";
import { motion } from "framer-motion";
import { fadeIn, textVariant } from "../utils/motion";

export const Tech = () => {
  return (
    <SectionWrapper idName="tech">
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-10">
        {/* Left side - Title and description */}
        <div className="flex-1">
          <motion.div variants={textVariant()}>
            <p className={styles.sectionSubText}>My technical skills</p>
            <h2 className={styles.sectionHeadText}>Tech Stack.</h2>
          </motion.div>
          
          <motion.p
            variants={fadeIn(undefined, undefined, 0.1, 1)}
            className="mt-4 text-secondary text-[15px] sm:text-[17px] max-w-3xl leading-[26px] sm:leading-[30px]"
          >
            I specialize in a variety of languages, frameworks, and tools that
            allow me to build robust and scalable applications.
          </motion.p>
        </div>

        {/* Right side - Skill categories */}
        <div className="flex-[1.5] flex flex-col gap-4 sm:gap-6">
          <div className="bg-tertiary p-4 sm:p-6 md:p-8 rounded-2xl border border-white/10 shadow-lg backdrop-blur-md">
            <h3 className="text-white text-[20px] sm:text-[24px] font-bold mb-4 sm:mb-6 border-b border-white/10 pb-2">
              Skills.
            </h3>
            
            <div className="flex flex-col gap-5 sm:gap-8">
              {TECHNOLOGIES.map((category, catIdx) => (
                <motion.div 
                  key={category.category} 
                  variants={fadeIn("up", "spring", catIdx * 0.2, 0.75)}
                  className="flex flex-col gap-3"
                >
                  {/* Category label */}
                  <span className="text-secondary font-medium text-[14px] sm:text-[16px]">
                    {category.category}:
                  </span>

                  {/* Skill pills */}
                  <div className="flex flex-wrap gap-2 sm:gap-3 md:gap-4">
                    {category.skills.map((skill) => (
                      <div 
                        key={skill.name}
                        className="flex items-center gap-1.5 sm:gap-2 bg-black-200 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full hover:bg-black-100 transition-colors cursor-pointer group"
                      >
                        <img 
                          src={skill.icon} 
                          alt={skill.name}
                          className="w-5 h-5 sm:w-6 sm:h-6 object-contain group-hover:scale-110 transition-transform" 
                        />
                        <span className="text-white text-[12px] sm:text-sm">{skill.name}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
};
