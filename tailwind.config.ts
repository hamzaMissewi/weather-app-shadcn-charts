import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
	],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
        borderRadius: {
            lg: "var(--radius)",
            md: "calc(var(--radius) - 2px)",
            sm: "calc(var(--radius) - 4px)",
        },
        keyframes: {
            "accordion-down": {
                from: { height: "0" },
                to: { height: "var(--radix-accordion-content-height)" },
            },
            "accordion-up": {
                from: { height: "var(--radix-accordion-content-height)" },
                to: { height: "0" },
            },
        },
        animation: {
            "accordion-down": "accordion-down 0.2s ease-out",
            "accordion-up": "accordion-up 0.2s ease-out",
        },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        // primary: {
        //   DEFAULT: "hsl(var(--primary))",
        //   foreground: "hsl(var(--primary-foreground))",
        // },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },

      //     new
          header_bg: '#141417',
          primary: {
              DEFAULT: '#0f061f',
              green: '#061d1f',
              blue_dark: '#020f10',
              old: '#1c1c22',
              mauve: '#49125b',
              // '#393A47',
          },
          matrix: {1: '#36ba01',2: '#009a22',3: '#00ff2b'},
          primary_blue: { DEFAULT: '#080823', secondary: '#121e5b' },
          accent_blue: { DEFAULT: '#a1f0ff', hover: '#0a618c' },
          accent_green: { DEFAULT: '#00ff99', hover: '#00e187' },
          accent_red: '#F13024',
          blue_light: '#6aeaf3'
      },
        // new from another project ethan
        backgroundImage: {
            explosion: 'url("/bg/bg.png")',
        },
        fontFamily: {
            poppins: [`var(--font-poppins)`, 'sans-serif'],
            sora: [`var(--font-sora)`, 'sans-serif']
        }
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config