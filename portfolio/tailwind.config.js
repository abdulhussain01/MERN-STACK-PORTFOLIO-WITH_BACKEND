/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        commonwhite: "var(--common-white)",
        commonwhitetwo: "var(--common-white-two)",
        commonblack: "var(--common-black)",
        themeprimary: "var(--theme-primary)",
        themesecondary: "var(--theme-secondary)",
        bodytext: "var( --body-text)",
        bodyheading: "var( --body-heading)",
        headingblack: "var( --heading-black)",
        lightwhite: "var(--light-white)",
        lightwhitetwo: "var(--light-white-2)",
        prink: "var(--prink)",
        catkrill: "var(--catkrill)",
      },
    },
  },

  plugins: [],
};
