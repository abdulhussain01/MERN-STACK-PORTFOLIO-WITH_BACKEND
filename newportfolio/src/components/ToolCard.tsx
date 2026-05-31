//

import { motion } from 'framer-motion';
import { fadeUp } from '@/lib/animations';
import type { ToolsType } from '@/types';

const ToolCard = ({ tool }: { tool: ToolsType }) => {
  return (
    <motion.div
      variants={fadeUp}
      className=' border border-neutral-700 rounded-md flex justify-center items-center flex-col py-4'
    >
      <img
        src={tool?.svg?.url ?? tool?.imgSrc ?? ''}
        alt={tool?.title ?? tool?.label ?? tool?.name ?? ''}
        className='w-16 h-16'
      />

      <p className='font-bold mt-2'>{tool?.title ?? tool?.label ?? tool?.name ?? ''}</p>
    </motion.div>
  );
};

export default ToolCard;
