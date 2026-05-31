import { motion } from 'motion/react';

import { fadeUp, staggerContainer } from '@/lib/animations';

import SectionHeader from './SectionHeader';

import ServiceseCard from './ServiceCard';

import { services } from '@/constants';

const Services = () => {
  return (
    <motion.section
      initial='hidden'
      whileInView='visible'
      viewport={{ once: true, amount: 0.3 }}
      variants={staggerContainer(0.6)}
      className='mt-30 scroll-mt-10'
      id='services'
    >
      <SectionHeader
        subtitle='services'
        title='Transforming complexity into effortless'
      />

      <motion.div 
      initial='hidden'
      whileInView='visible'
      viewport={{ once: true, amount: 0.3 }}
      variants={staggerContainer(0.5)}
      className='grid md:grid-cols-2 mt-10
       gap-10'
      >{
        services.map((service)=>(

          <motion.div
            key={service.title}
            variants={fadeUp}
          >
            <ServiceseCard  service={service}/>

  

          </motion.div>
        ))
      }

      </motion.div>
    </motion.section>
  );
};

export default Services;
