import { motion } from 'motion/react';

import { fadeUp } from '@/lib/animations';

import type { ProjectType } from '@/types';

const ProjectCard = ({ imgSrc, projectLink, tags, title }: ProjectType) => {
  return (
    <motion.div
      variants={fadeUp}
      className='relative '
    >
      <a
        className=''
        href={projectLink ?? '#'}
        target='_blank'
      >
        <figure className='overflow-hidden rounded-md relative'>
          <img
            src={imgSrc ?? ''}
            alt={title ?? ''}
            className='rounded-md transition duration-500 hover:scale-110 w-full'
          />
          <h2 className='w-full absolute text-center bottom-0 text-sm bg-[#0a0a0ae3] rounded-b-md p-1'>{title?.toUpperCase() ?? ''}</h2>
        </figure>
        <div className='justify-center my-2 flex gap-1 flex-wrap'>
          {tags?.map((tag, i) => (
            <span
              key={i}
              className='bg-neutral-900 hover:bg-primary hover:text-black py-1 px-2 rounded-sm text-sm cursor-pointer'
            >
              {tag}
            </span>
          ))}
        </div>
      </a>
    </motion.div>
  );
};

export default ProjectCard;
