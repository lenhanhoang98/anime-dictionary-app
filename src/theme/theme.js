import { createTheme } from "@mui/material";

const commonSettings = {
    typography: {
        fontFamily: "'Inter', 'Roboto', 'Helvetica', 'Arial', sans-serif",
        h1: { fontWeight: 700 },
        h2: { fontWeight: 700 },
        h3: { fontWeight: 700 },
        h4: { fontWeight: 600 },
        h5: { fontWeight: 600 },
        h6: { fontWeight: 600 },
    },
    shape: {
        borderRadius: 12,
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'none',
                    fontWeight: 600,
                    borderRadius: 8,
                    padding: '8px 16px',
                },
                contained: {
                    boxShadow: 'none',
                    '&:hover': {
                        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.15)',
                    },
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: 16,
                    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.05)',
                    transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                    '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: '0px 8px 30px rgba(0, 0, 0, 0.12)',
                    },
                },
            },
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    boxShadow: 'none',
                    backdropFilter: 'blur(8px)',
                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                    color: '#1e293b',
                },
            },
        },
    },
};

export const lightTheme = createTheme({
    ...commonSettings,
    palette: {
        mode: "light",
        primary: {
            main: "#6366f1", // Indigo
        },
        secondary: {
            main: "#ec4899", // Pink
        },
        background: {
            default: "#f8fafc",
            paper: "#ffffff",
        },
        text: {
            primary: "#1e293b",
            secondary: "#64748b",
        },
    },
});

export const darkTheme = createTheme({
    ...commonSettings,
    palette: {
        mode: "dark",
        primary: {
            main: "#818cf8",
        },
        secondary: {
            main: "#f472b6",
        },
        background: {
            default: "#0f172a",
            paper: "#1e293b",
        },
        text: {
            primary: "#f8fafc",
            secondary: "#94a3b8",
        },
    },
    components: {
        ...commonSettings.components,
        MuiAppBar: {
            styleOverrides: {
                root: {
                    boxShadow: 'none',
                    backdropFilter: 'blur(8px)',
                    backgroundColor: 'rgba(15, 23, 42, 0.8)',
                    color: '#f8fafc',
                },
            },
        },
    }
});