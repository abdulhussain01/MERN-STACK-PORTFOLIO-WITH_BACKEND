import { motion } from 'motion/react';

import { fadeUp, staggerContainer } from '@/lib/animations';

import { Button } from './ui/button';
import { SparkleIcon } from 'lucide-react';

import { useAppSelector } from '@/hooks/hooks';

const Hero = () => {
  const { user } = useAppSelector((state) => state.user);


  


  return (
    <motion.section
      initial='hidden'
      whileInView='visible'
      viewport={{ once: true, amount: 0.3 }}
      variants={staggerContainer(0)}
      className='pt-20'
      id='hero'
    >
      <motion.p
        variants={fadeUp}
        className='flex items-center justify-center py-1 gap-2
      border border-neutral-600 rounded-sm w-32 '
      >
        <SparkleIcon
          className=''
          size={15}
        />
        <span>Introduction</span>
      </motion.p>

      <motion.h1
        variants={fadeUp}
        className='text-4xl md:text-5xl lg:text-6xl font-semibold capitalize mt-2 max-w-3xl md:leading-16'
      >
        I'm <span className='text-primary'>{user?.fullName}</span> Fullstack Web
        Developer
      </motion.h1>

      <motion.div
        variants={fadeUp}
        className='mt-5 flex gap-2'
      >
        <Button
          asChild
          className='cursor-pointer'
        >
          <a href='#projects'>My Projects</a>
        </Button>


        <a className="cursor-pointer" 
        
        href={user?.resume?.url}
        download="resume.pdf" >
          
        <Button
        variant='outline' className='cursor-pointer' >Download CV</Button>
        </a>
      </motion.div>
    </motion.section>
  );
};

export default Hero;
