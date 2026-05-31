import { useAppSelector } from '@/hooks/hooks';
import { Button } from './ui/button';
import { Facebook, Github, Instagram, Linkedin, Twitter } from 'lucide-react';



const Profile = () => {


  const { user } = useAppSelector((state) => state.user);

  const socialLinks = [
    { icon: Linkedin, label: 'Linkedin', link: user?.linkedInUrl || '/#' },
    { icon: Facebook, label: 'Facebook', link: user?.facebookUrl || '/#' },
    { icon: Instagram, label: 'Instagram', link: user?.instagramUrl || '/#' },
    { icon: Twitter, label: 'Twitter', link: user?.twitterUrl || '/#' },
    { icon: Github, label: 'Github', link: user?.githubUrl || '/#' },
  ];



  return (
    <aside className='max-w-3xl border m-6 border-neutral-600 bg-neutral-900 text-white p-6 rounded-lg lg:sticky lg:left-0 lg:top-6 lg:w-96 ' >
      <div className='flex flex-col gap-4'>
        <div className='flex items-center justify-between gap-x-10 flex-col sm:flex-row'>
          <h1 className='text-2xl sm:text-3xl font-bold'>{user && user?.fullName}</h1>
          <p className='text-sm'>Full Stack Developer</p>
        </div>
        <img
          src={user?.avatar?.url ?? undefined}
          alt='abdulhussain'
          className='lg:w-96 rounded-2xl object-cover'
        />

        <div className='mt-6'>
          <p className='text-sm text-neutral-300'>Specialization:</p>
          <p className='text-lg capitalize'>FrontEnd & Backend Development</p>
        </div>
        <div className='mt-6'>
          <p className='text-sm text-neutral-300'>Based in:</p>
          <p className='text-lg capitalize'>Salmiyah, Kuwait</p>
        </div>

        <div className='flex justify-center gap-3 pt-2 text-neutral-50'>
          {socialLinks.map((social, i) => {
            const Icon = social.icon;

            return (
              <a
                key={i}
                href={social.link}
                target='_blank'
                className='hover:text-primary border-2 border-neutral-500 p-2 rounded-full hover:border-primary transition duration-200'
              >
                <Icon className='size-6' />
              </a>
            );
          })}
        </div>
        <Button className='mt-2' size={"lg"}>Let's Work</Button>
      </div>
    </aside>
  );
};

export default Profile;
