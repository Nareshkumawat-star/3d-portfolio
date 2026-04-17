import { motion } from "framer-motion";

import { TESTIMONIALS } from "../constants";
import { SectionWrapper } from "../hoc";
import { styles } from "../styles";
import { cn } from "../utils/lib";
import { fadeIn, textVariant } from "../utils/motion";

type FeedbackCardProps = {
  index: number;
  testimonial: string;
  name: string;
  designation: string;
  company: string;
  image: string;
};

// Feedback Card
const FeedbackCard = ({
  index,
  testimonial,
  name,
  designation,
  company,
  image,
}: FeedbackCardProps) => (
  <motion.div
    variants={fadeIn(undefined, "spring", index * 0.5, 0.75)}
    className="bg-black-200 p-6 sm:p-10 rounded-3xl w-full xs:w-[320px]"
  >
    {/* Quote " */}
    <p className="text-white font-black text-[36px] sm:text-[48px]">"</p>

    <div className="mt-1">
      {/* Testimonial */}
      <p className="text-white tracking-wider text-[14px] sm:text-[18px] leading-[22px] sm:leading-[28px]">{testimonial}</p>

      <div className="mt-5 sm:mt-7 flex justify-between items-center gap-1">
        <div className="flex-1 flex flex-col">
          {/* Name */}
          <p className="text-white font-medium text-[14px] sm:text-[16px]">
            <span className="blue-text-gradient">@</span> {name}
          </p>
          <p className="mt-1 text-secondary text-[11px] sm:text-[12px]">
            {designation} of {company}
          </p>
        </div>

        {/* User Image */}
        <img
          src={image}
          alt={`feedback-by-${name}`}
          className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover"
        />
      </div>
    </div>
  </motion.div>
);

// Feedbacks
export const Feedbacks = () => {
  return (
    <SectionWrapper>
      <div className="mt-8 sm:mt-12 bg-black-100 rounded-[20px]">
        <div
          className={cn(
            styles.padding,
            "bg-tertiary rounded-2xl min-h-[200px] sm:min-h-[300px]"
          )}
        >
          {/* Title */}
          <motion.div variants={textVariant()}>
            <p className={styles.sectionSubText}>What others say</p>
            <h2 className={styles.sectionHeadText}>Testimonials.</h2>
          </motion.div>
        </div>

        {/* Feedback Cards - responsive */}
        <div
          className={cn(styles.paddingX, "-mt-16 sm:-mt-20 pb-10 sm:pb-14 flex flex-wrap justify-center gap-5 sm:gap-7")}
        >
          {TESTIMONIALS.map((testimonial, i) => (
            <FeedbackCard key={testimonial.name} index={i} {...testimonial} />
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
};
