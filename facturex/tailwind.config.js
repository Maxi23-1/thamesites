module.exports = {
    darkMode: "media",
    content: ["./index.html"],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: '#3B82F6',
                    hover: '#2563EB',
                    light: '#DBEAFE',
                    dark: '#1E3A8A'
                },
                background: {
                    light: '#F8FAFC',
                    dark: '#0F172A'
                },
                surface: {
                    light: '#FFFFFF',
                    dark: '#1E293B'
                }
            },
            fontFamily: {
                display: ["Plus Jakarta Sans", "sans-serif"]
            },
            boxShadow: {
                'glow': '0 0 20px rgba(59, 130, 246, 0.4)',
                'glow-lg': '0 0 40px rgba(59, 130, 246, 0.6)'
            }
        },
    },
    plugins: [
        require('@tailwindcss/forms'),
        require('@tailwindcss/container-queries')
    ],
}
