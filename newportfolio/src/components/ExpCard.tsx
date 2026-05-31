import type { ExperienceType } from '@/types';

const ExpCard = ({ item }: { item: ExperienceType }) => {
  return (
    <div className='relative group'>
      <div className='absolute -left-7.5 top-2 size-3 bg-muted-foreground group-hover:bg-primary rounded-full transition duration-300'></div>

      <span className='text-neutral-400 lining-nums group-hover:text-primary transition duration-300'>
        {item?.timeline?.from ?? ''} - {item?.timeline?.to ?? ''}
      </span>

      <h3 className='text-lg font-bold mt-1'>{item?.jobTitle}</h3>
      <p className='text-sm text-neutral-400 mb-1'>
        {item?.type === 'Work' ? ' ' : 'Course by '}
        <span className='font-medium text-foreground whitespace-pre-wrap italic '>
          {item?.company}
        </span>
      </p>

      <hr className='border-dashed my-2'/>
      <p className='text-sm text-neutral-400 mb-1'>
        <span className=' text-foreground whitespace-pre-wrap'>
          {item?.description ?? item?.desc}
        </span>
      </p>

      <p className='text-sm text-neutral-400'>{item?.desc}</p>
    </div>
  );
};

export default ExpCard;
