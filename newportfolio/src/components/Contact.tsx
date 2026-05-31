import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';

import { Form, FormControl, FormField, FormItem, FormMessage } from './ui/form';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import SectionHeader from '@/components/SectionHeader';
import { fadeUp } from '@/lib/animations';


import { sendMessage,resetMessage } from '@/store/slices/message.slice';
import { useAppDispatch, useAppSelector } from '@/hooks/hooks';
import { useEffect } from 'react';

type ContactFormValues = {
  senderName: string;
  email: string;
  message: string;
  subject: string;
};

const Contact = () => {
  const dispatch = useAppDispatch();


  const form = useForm<ContactFormValues>({
    defaultValues: {
      senderName: '',
      email: '',
      message: '',
      subject: '',
    },
  });
  const { resmessage} = useAppSelector((state) => state.message);
  
 


  const handleSubmitForm = (data: ContactFormValues) => {
    dispatch(sendMessage(data));
    
    form.reset();
    
  };
 useEffect(() => {
     if (resmessage) {
      alert(resmessage);
       // You can use a toast notification library here to show the success message
       dispatch(resetMessage()); // Replace this with your toast notification
     }
  },[dispatch,resmessage])



  return (
    <motion.section
      initial='hidden'
      whileInView='visible'
      viewport={{ once: true, amount: 0.3 }}
      variants={fadeUp}
      className='mt-20 scroll-mt-10'
      id='contact'
    >
      <SectionHeader
        subtitle='Contact'
        title="Let's work together"
      />

      <Form {...form}>
        <form
          className='w-full mx-auto space-y-4 mt-10'
          onSubmit={form.handleSubmit((data) => handleSubmitForm(data))}
        >
          <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
            <FormField
              control={form.control}
              name='senderName'
              render={({ field }) => (
                <FormItem className='w-full'>
                  <FormControl>
                    <Input
                      placeholder='Your name'
                      {...field}
                      className='border-0'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem className='w-full'>
                  <FormControl>
                    <Input
                      placeholder='Your email'
                      {...field}
                      className='border-0'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='subject'
              render={({ field }) => (
                <FormItem className='w-full'>
                  <FormControl>
                    <Input
                      
                      placeholder='Subject'
                      {...field}
                      className='border-0'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name='message'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormControl>
                  <Textarea
                    placeholder='Your message'
                    {...field}
                    className=' h-36 border-0'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type='submit'
            size="lg"
            className='bg-primary hover:bg-primary/90 transition duration-300 cursor-pointer'
          > Send Message</Button>
         
        </form>
      </Form>
    </motion.section>
  );
};

export default Contact;
