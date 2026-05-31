import { motion } from 'motion/react';

import { fadeUp, staggerContainer } from '@/lib/animations';

import SectionHeader from './SectionHeader';

import { Button } from './ui/button';



import { useAppSelector } from '@/hooks/hooks';

const About = () => {
  const { user } = useAppSelector((state) => state.user);


  return (
    <motion.section
      initial='hidden'
      whileInView='visible'
      viewport={{ once: true, amount: 0.3 }}
      variants={staggerContainer(0.6)}
      className='mt-30 scroll-mt-10'
      id='about'
    >
      <SectionHeader
        subtitle='About'
        title='Transforming complexity into effortless'
      />

      <motion.p
        variants={fadeUp}
        className='mt-4 text-neutral-300'
      >
        {user && user?.about}
      </motion.p>   

      <motion.div
      variants={fadeUp}
      transition={{delay:0.2}}

      >
        <Button
        className='mt-5'
        >
            Contact Me
        </Button>
      </motion.div>
    </motion.section>
  );
};

export default About;
