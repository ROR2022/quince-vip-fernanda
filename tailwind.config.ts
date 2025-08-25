import type { Config } from "tailwindcss";

// all in fixtures is set to tailwind v3 as interims solutions

const config: Config = {
    darkMode: ["class"],
    content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
  	extend: {
  		colors: {
  			// 🌟 Paleta Aurora Pastel para XV Años
  			aurora: {
  				rosa: '#FFB3D9',
  				lavanda: '#E6D9FF',
  				oro: '#FFF2CC',
  				'plata-brillo': '#F0F0F5',
  				perla: '#F8F6F0'
  			},
  			// 🎨 Colores base complementarios
  			'blanco-seda': '#FDFCFC',
  			'crema-suave': '#FAF8F5',
  			// 🎭 Gradientes como colores directos
  			'aurora-gradient': 'linear-gradient(180deg, #FFB3D9 0%, #E6D9FF 28%, #FFF2CC 56%, #F0F0F5 84%, #F8F6F0 100%)',
  			
  			// 🏆 Sistema de colores UI (shadcn/ui)
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			},
  			sidebar: {
  				DEFAULT: 'hsl(var(--sidebar-background))',
  				foreground: 'hsl(var(--sidebar-foreground))',
  				primary: 'hsl(var(--sidebar-primary))',
  				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
  				accent: 'hsl(var(--sidebar-accent))',
  				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
  				border: 'hsl(var(--sidebar-border))',
  				ring: 'hsl(var(--sidebar-ring))'
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		keyframes: {
  			// 🌟 Animaciones Aurora Pastel
  			'shimmer-aurora': {
  				'0%': { 
  					backgroundPosition: '-200% 0',
  					filter: 'brightness(1)'
  				},
  				'50%': { 
  					backgroundPosition: '200% 0',
  					filter: 'brightness(1.1)'
  				},
  				'100%': { 
  					backgroundPosition: '-200% 0',
  					filter: 'brightness(1)'
  				}
  			},
  			'pulse-aurora': {
  				'0%, 100%': { 
  					boxShadow: '0 0 0 0 #FFB3D9, 0 0 20px #FFF2CC'
  				},
  				'50%': { 
  					boxShadow: '0 0 0 10px transparent, 0 0 30px #E6D9FF'
  				}
  			},
  			'float-aurora': {
  				'0%, 100%': { 
  					transform: 'translateY(0px) rotate(0deg)',
  					filter: 'drop-shadow(0 5px 15px #FFF2CC)'
  				},
  				'33%': { 
  					transform: 'translateY(-10px) rotate(1deg)',
  					filter: 'drop-shadow(0 10px 25px #FFB3D9)'
  				},
  				'66%': { 
  					transform: 'translateY(-5px) rotate(-1deg)',
  					filter: 'drop-shadow(0 15px 35px #E6D9FF)'
  				}
  			},
  			'gradient-flow-aurora': {
  				'0%': { backgroundPosition: '0% 50%' },
  				'50%': { backgroundPosition: '100% 50%' },
  				'100%': { backgroundPosition: '0% 50%' }
  			},
  			'twinkle-aurora': {
  				'0%, 100%': { opacity: '0.3', transform: 'scale(1)' },
  				'50%': { opacity: '1', transform: 'scale(1.2)' }
  			},
  			
  			// 🏆 Animaciones base de shadcn/ui
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			}
  		},
  		animation: {
  			// 🌟 Animaciones Aurora Pastel
  			'shimmer-aurora': 'shimmer-aurora 3s ease-in-out infinite',
  			'pulse-aurora': 'pulse-aurora 2s ease-in-out infinite',
  			'float-aurora': 'float-aurora 6s ease-in-out infinite',
  			'gradient-flow-aurora': 'gradient-flow-aurora 8s ease infinite',
  			'twinkle-aurora': 'twinkle-aurora 2s ease-in-out infinite',
  			
  			// 🏆 Animaciones base de shadcn/ui
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
