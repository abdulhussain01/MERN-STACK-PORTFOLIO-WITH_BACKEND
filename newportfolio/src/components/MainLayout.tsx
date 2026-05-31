import App from '@/App';
import Sidebar from '@/components/Sidebar';
import FloartingMenu from '@/components/FloatingMenu';
import Profile from '@/components/Profile';
import { useAppDispatch } from '@/hooks/hooks';
import { getUser } from '@/store/slices/user.slice';
import { useEffect } from 'react';
import { getProject } from '@/store/slices/project.slice';

import { getAllSkill } from '@/store/slices/skill.slice';
import { getAllTimeline } from '@/store/slices/timeline.slice';
import { getAllSoftwareApplication } from '@/store/slices/software.slice';





const MainLayout = () => {


  const dispatch = useAppDispatch();

  useEffect(() => {
      dispatch(getUser());
      dispatch(getProject());
      dispatch(getAllSkill());
      dispatch(getAllTimeline());
      dispatch(getAllSoftwareApplication());
    }, [dispatch]);
  
 
    


  return (
    <div className='min-h-screen lg:flex lg:justify-center lg:items-start lg:gap-10'>
      <Sidebar />
      <Profile />
      <FloartingMenu />
      <App />
    </div>
  );
};

export default MainLayout;
