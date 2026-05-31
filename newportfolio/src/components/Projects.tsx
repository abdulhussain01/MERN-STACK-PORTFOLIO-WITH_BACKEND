import { motion } from 'motion/react';
import { fadeUp, staggerContainer } from '@/lib/animations';
import SectionHeader from './SectionHeader';
import ProjectCard from '@/components/ProjectCard';
import { useAppSelector } from '@/hooks/hooks';


const Projects = () => {


  const { projects } = useAppSelector((state) => state.project);





  return (
    <motion.section
      initial='hidden'
      whileInView='visible'
      viewport={{ once: true, amount: 0.3 }}
      variants={staggerContainer(0)}
      className='mt-20'
      id='projects'
    >
      <SectionHeader
        title='My featured projects'
        subtitle='Projects'
      />
<motion.div
        className='grid md:grid-cols-2 gap-10 mt-10'
        initial='visible'
        viewport={{  amount: 0.2 }}
        variants={fadeUp}
      >
        {projects?.map((project, i) => (
          <ProjectCard
            key={i}
            imgSrc={project?.projectBanner?.url ?? project?.imgSrc}
            projectLink={project?.projectLink}
            tags={project?.technologies?.trim().split(" ") ?? project?.tags ?? []}
            title={project?.title ?? ''}
          />
        ))}
      </motion.div>
    </motion.section>
  );
};

export default Projects;
