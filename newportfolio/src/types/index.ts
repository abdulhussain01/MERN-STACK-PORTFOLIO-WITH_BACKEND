


export type UserType = {
  fullName?: string;
  about?: string;
  resume?: {
    url?: string;
  };
  linkedInUrl?: string;
  facebookUrl?: string;
  instagramUrl?: string;
  twitterUrl?: string;
  githubUrl?: string;
  avatar?: {
    url?: string;
  };
  [key: string]: any;
};

export type ProjectType = {
  imgSrc: string;
  title: string;
  tags?: string[];
  projectLink?: string;
  projectBanner?: {
    url?: string;
  };
  technologies?: string;
};

export type ExperienceType = {
  year?: string;
  title?: string;
  institute?: string;
  desc?: string;
  description?: string;
  type?: string;
  timeline?: {
    from?: string;
    to?: string;
  };
};

export type ServiceType = {
  title: string;
  desc: string;
  projects: string;
  icon: React.ElementType;
};

export type ToolsType = {
  imgSrc?: string;
  label?: string;
  svg?: {
    url?: string;
  };
  title?: string;
  name?: string;
};

export type StatsType = {
  number: string;
  label: string;
};

export type TestimonialsType = {
  name: string;
  role: string;
  image: string;
  text: string;
  link: string;
};

export type LinksType = {
  label: string;
  link: string;
  icon: React.ElementType;
};