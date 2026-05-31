import { useAppSelector } from '@/hooks/hooks';
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

// components
import { Button } from '@/components/ui/button';

/*assest*/
import { Github, Linkedin, MenuIcon } from 'lucide-react';

// Constants
import { navLinks } from '@/constants';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Facebook, Instagram, Twitter } from 'lucide-react';

const Sidebar = () => {
  const { user } = useAppSelector((state) => state.user);

  const socialLinks = [
    { icon: Linkedin, label: 'Linkedin', link: user?.linkedInUrl || '/#' },
    { icon: Facebook, label: 'Facebook', link: user?.facebookUrl || '/#' },
    { icon: Instagram, label: 'Instagram', link: user?.instagramUrl || '/#' },
    { icon: Twitter, label: 'Twitter', link: user?.twitterUrl || '/#' },
    { icon: Github, label: 'Github', link: user?.githubUrl || '/#' },
  ];



  const [active, setActive] = useState('#hero');

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant='ghost'
          size='icon'
          className='m-4 fixed top-4 right-4 z-50 border-2 hover:
        border-primary bg-neutral-800 py-5 px-5 rounded-full hover:text-primary cursor-pointer'
        >
          <MenuIcon size={30} />
        </Button>
      </SheetTrigger>
      <SheetContent
        side='right'
        className='w-84 bg-neutral-900 text-white py-6 pl-10'
      >
        <SheetTitle className='text-lg font-semibold'>Menu</SheetTitle>

        <nav className='flex flex-col gap-4'>
          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <a
                key={link.label}
                href={link.link}
                target='_blank'
                className={cn(
                  'text-neutral-300 flex items-center gap-2 hover:text-primary transition-colors duration-200 text-base',
                  active === link.link && 'text-primary',
                )}
                onClick={() => setActive(link.link)}
              >
                <Icon className='size-4' />
                {link.label}
              </a>
            );
          })}
        </nav>

        <div className='mt-30'>
          <p className='pb-2'>Socials</p>
          <div className='flex gap-3 text-neutral-500'>
            {socialLinks.map((socials, i) => {
              const Icon = socials.icon;
              return (
                <a
                  href={socials.link}
                  key={i}
                  className='hover:text-primary border-2 border-neutral-500 p-2 rounded-full hover:border-primary transition duration-200'
                >
                  <Icon className='size-4' />
                </a>
              );
            })}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default Sidebar;
