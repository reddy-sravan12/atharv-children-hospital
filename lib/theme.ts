// lib/theme.ts
import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    primary: {
      main: '#0B5394',
      light: '#1A73C8',
      dark: '#073B6F',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#00B4D8',
      light: '#90E0EF',
      dark: '#0077B6',
      contrastText: '#FFFFFF',
    },
    background: {
      default: '#FFFFFF',
      paper: '#F8FAFD',
    },
    text: {
      primary: '#1E2B36',
      secondary: '#4A6274',
    },
    success: {
      main: '#2E7D32',
    },
    error: {
      main: '#C62828',
    },
  },
  typography: {
    fontFamily: '"DM Sans", system-ui, -apple-system, sans-serif',
    h1: {
      fontFamily: '"Playfair Display", Georgia, serif',
      fontWeight: 700,
    },
    h2: {
      fontFamily: '"Playfair Display", Georgia, serif',
      fontWeight: 700,
    },
    h3: {
      fontFamily: '"Playfair Display", Georgia, serif',
      fontWeight: 600,
    },
    h4: {
      fontFamily: '"Playfair Display", Georgia, serif',
      fontWeight: 600,
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
      letterSpacing: '0.02em',
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '50px',
          padding: '12px 28px',
          fontFamily: '"DM Sans", sans-serif',
          fontWeight: 600,
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        },
        containedPrimary: {
          background: 'linear-gradient(135deg, #1A73C8 0%, #0B5394 100%)',
          boxShadow: '0 4px 20px rgba(11, 83, 148, 0.35)',
          '&:hover': {
            background: 'linear-gradient(135deg, #0B5394 0%, #073B6F 100%)',
            boxShadow: '0 8px 28px rgba(11, 83, 148, 0.45)',
            transform: 'translateY(-2px)',
          },
        },
        outlinedPrimary: {
          borderWidth: '2px',
          '&:hover': {
            borderWidth: '2px',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: '10px',
            fontFamily: '"DM Sans", sans-serif',
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: '#1A73C8',
              borderWidth: '2px',
            },
          },
          '& .MuiInputLabel-root.Mui-focused': {
            color: '#1A73C8',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '20px',
          boxShadow: '0 4px 24px rgba(11, 83, 148, 0.08)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontFamily: '"DM Sans", sans-serif',
          fontWeight: 500,
        },
      },
    },
  },
})

export default theme
