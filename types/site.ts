export type NavItem = {
  href: string;
  label: string;
};

export type SiteConfig = {
  name: string;
  description: string;
  url: string;
  nav: NavItem[];
};
