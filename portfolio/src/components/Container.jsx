const Container = ({children}) => {
  return (
    <div className="flex flex-col h-full w-full rounded-3xl bg-commonwhite p-5 lg:p-10 xl:p-20  text-commonblack lg:max-h-[calc(100vh_-4rem)] overflow-y-auto ">
      {children}
    </div>
  );
};

export default Container;
