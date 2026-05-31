import { motion} from 'motion/react';

import { fadeUp, staggerContainer } from '@/lib/animations';

import SectionHeader from './SectionHeader';


import ToolCard from './ToolCard';
import ExpCard from './ExpCard';

// import { education, experience, tools } from '@/constants';
import { useAppSelector } from '@/hooks/hooks';

const Resume = () => {


const {timeline} = useAppSelector(state=>state.timeline);
const {skill} = useAppSelector(state=>state.skill);
const {softwareApplication} = useAppSelector(state=>state.softwares);






  return (
    <motion.section
      initial='hidden'
      whileInView='visible'
      viewport={{ once: true, amount: 0.3 }}
      variants={staggerContainer(0.6)}
      className='mt-30 scroll-mt-10'
      id='resume'
    >
      <SectionHeader
        subtitle='resume'
        title='Education and Practical Experience'
      />

     
      <div className='grid gap-x-10 my-16 md:grid-cols-2'>
        <motion.div
        variants={fadeUp}
        className='mb-16 md:mb-0'
        >
            <h2 className='text-3xl font-semibold mb-8'>
                Education
            </h2>
            
            <div className=" space-y-8 border-l border-neutral-700 pl-6">
                {timeline?.map((item, i)=>(
                    item?.type === "Education" &&  
                    <ExpCard key={i} item={item}/>
                ))}
            </div>
        </motion.div>

        <motion.div
        variants={fadeUp}
      
        >
            <h2 className='text-3xl font-semibold mb-8'>
                Work Experience
            </h2>
            
            <div className=" space-y-8 border-l border-border pl-6">
                {timeline?.map((item, i)=>(
                    item?.type === "Work" && <ExpCard key={i} item={item}/>
                ))}
            </div>
        </motion.div>
      </div>

      <div className="my-16">
        <motion.h2
        variants={fadeUp}
        className='text-3xl font-semibold mb-8 capitalize'
        >
          My Skills
        </motion.h2>

        <motion.div
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerContainer(0.2)}
        className='grid  gap-5
         grid-cols-2 sm:grid-cols-3 md:grid-cols-5'
        > 
        {
          skill?.map((tool, i)=>(
            <ToolCard key={i} tool={tool}/>
          ))
        }

        </motion.div>

      </div>

      <div className="my-16">
        <motion.h2
        variants={fadeUp}
        className='text-3xl font-semibold mb-8 capitalize'
        >
          My Favourite tools
        </motion.h2>

        <motion.div
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerContainer(0.2)}
        className='grid  gap-5
         grid-cols-2 sm:grid-cols-3 md:grid-cols-5'
        > 
        {
          softwareApplication?.map((tool, i)=>(
            <ToolCard key={i} tool={tool}/>
          ))
        }

        </motion.div>

      </div>
    </motion.section>
  );
};

export default Resume;
