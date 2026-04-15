import { TECHNOLOGIES } from "../constants";
import { SectionWrapper } from "../hoc";
import { styles } from "../styles";
import { motion } from "framer-motion";
import { fadeIn, textVariant } from "../utils/motion";

export const Tech = () => {
  return (
    <SectionWrapper idName="tech">
      <div className="flex flex-col lg:flex-row gap-10">
        <div className="flex-1">
          <motion.div variants={textVariant()}>
            <p className={styles.sectionSubText}>My technical skills</p>
            <h2 className={styles.sectionHeadText}>Teck Stack.</h2>
          </motion.div>
          
          <motion.p
            variants={fadeIn(undefined, undefined, 0.1, 1)}
            className="mt-4 text-secondary text-[17px] max-w-3xl leading-[30px]"
          >
            I specialize in a variety of languages, frameworks, and tools that
            allow me to build robust and scalable applications.
          </motion.p>
        </div>

        <div className="flex-[1.5] flex flex-col gap-6">
          <div className="bg-tertiary p-8 rounded-2xl border border-white/10 shadow-lg backdrop-blur-md">
            <h3 className="text-white text-[24px] font-bold mb-6 border-b border-white/10 pb-2">
              Skills.
            </h3>
            
            <div className="flex flex-col gap-8">
              {TECHNOLOGIES.map((category) => (
                <div key={category.category} className="flex flex-col md:flex-row md:items-center gap-4">
                  <span className="text-secondary font-medium min-w-[150px]">
                    {category.category}:
                  </span>
                  <div className="flex flex-wrap gap-4">
                    {category.skills.map((skill) => (
                      <div 
                        key={skill.name}
                        className="flex items-center gap-2 bg-black-200 px-3 py-1.5 rounded-full hover:bg-black-100 transition-colors cursor-pointer group"
                      >
                        <img 
                          src={skill.icon} 
                          alt={skill.name}
                          className="w-6 h-6 object-contain group-hover:scale-110 transition-transform" 
                        />
                        <span className="text-white text-sm">{skill.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
};
