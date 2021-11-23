module.exports = {
  mode: "jit",
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: "#4257B2",
        formbg: "#5568BA",
        footer: "#3B4C9B",
        card: "#1A1D28",
        "primary-dark":"#13141B",
      },
      backgroundPosition: {
        'pos-0': '0% 0%',
        'pos-100': '100% 100%',
      },

      backgroundImage: {
        "hero-pattern": "url('/hero-pattern.svg')",
        "google-icon": "url('/google-icon.svg')",
        circle:
          "url(https://assets.quizlet.com/a/j/dist/app/i/prismic/scribble.6c75e80726e3401.svg)",
      },
      backgroundSize: {
        130: "130%",
        'size-200': '200% 200%',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
