import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import chroma from 'chroma-js'
import {
  Palette, Type, Grid, Eye, Moon, Sun, Download, Upload,
  Plus, Trash2, Copy, Check, Sparkles, Search, Layers,
  Home, Settings, ChevronRight, AlertCircle, Box,
  Zap, Circle, Move, Code, FileJson, Figma
} from 'lucide-react'
import './App.css'

function App() {
  // Current view state
  const [currentView, setCurrentView] = useState('palette')
  const [theme, setTheme] = useState('dark')

  // Palette state with shades
  const [colors, setColors] = useState([
    { 
      id: 1, 
      name: 'Primary', 
      hex: '#A855F7', 
      role: 'primary',
      shades: {}
    },
    { 
      id: 2, 
      name: 'Secondary', 
      hex: '#34D399', 
      role: 'secondary',
      shades: {}
    },
    { 
      id: 3, 
      name: 'Accent', 
      hex: '#F59E0B', 
      role: 'accent',
      shades: {}
    },
    { 
      id: 4, 
      name: 'Success', 
      hex: '#10B981', 
      role: 'success',
      shades: {}
    },
    { 
      id: 5, 
      name: 'Warning', 
      hex: '#F59E0B', 
      role: 'warning',
      shades: {}
    },
    { 
      id: 6, 
      name: 'Error', 
      hex: '#EF4444', 
      role: 'error',
      shades: {}
    },
    { 
      id: 7, 
      name: 'Info', 
      hex: '#3B82F6', 
      role: 'info',
      shades: {}
    }
  ])
  
  const [selectedColor, setSelectedColor] = useState(colors[0])
  const [aiPrompt, setAiPrompt] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)

  // Typography tokens
  const [baseSize, setBaseSize] = useState(16)
  const [scaleRatio, setScaleRatio] = useState(1.25)
  const [typographyScale, setTypographyScale] = useState([])
  const [fontFamilies, setFontFamilies] = useState({
    heading: 'Inter, system-ui, sans-serif',
    body: 'Inter, system-ui, sans-serif',
    mono: 'Menlo, Monaco, monospace'
  })
  const [fontWeights, setFontWeights] = useState({
    thin: 100,
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    black: 900
  })
  const [lineHeights, setLineHeights] = useState({
    none: 1,
    tight: 1.25,
    snug: 1.375,
    normal: 1.5,
    relaxed: 1.625,
    loose: 2
  })
  const [letterSpacing, setLetterSpacing] = useState({
    tighter: '-0.05em',
    tight: '-0.025em',
    normal: '0em',
    wide: '0.025em',
    wider: '0.05em',
    widest: '0.1em'
  })

  // Spacing tokens
  const [baseUnit, setBaseUnit] = useState(8)
  const [spacingScale, setSpacingScale] = useState([])

  // Shadow tokens
  const [shadows, setShadows] = useState({
    none: 'none',
    xs: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    sm: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
    '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.05)'
  })

  // Border radius tokens
  const [borderRadius, setBorderRadius] = useState({
    none: '0px',
    sm: '0.125rem',
    md: '0.375rem',
    lg: '0.5rem',
    xl: '0.75rem',
    '2xl': '1rem',
    '3xl': '1.5rem',
    full: '9999px'
  })

  // Border width tokens
  const [borderWidth, setBorderWidth] = useState({
    0: '0px',
    1: '1px',
    2: '2px',
    4: '4px',
    8: '8px'
  })

  // Opacity tokens
  const [opacity, setOpacity] = useState({
    0: '0',
    5: '0.05',
    10: '0.1',
    20: '0.2',
    25: '0.25',
    30: '0.3',
    40: '0.4',
    50: '0.5',
    60: '0.6',
    70: '0.7',
    75: '0.75',
    80: '0.8',
    90: '0.9',
    95: '0.95',
    100: '1'
  })

  // Z-index tokens
  const [zIndex, setZIndex] = useState({
    0: '0',
    10: '10',
    20: '20',
    30: '30',
    40: '40',
    50: '50',
    auto: 'auto',
    dropdown: '1000',
    sticky: '1020',
    fixed: '1030',
    modal: '1040',
    popover: '1050',
    tooltip: '1060'
  })

  // Transition tokens
  const [transitions, setTransitions] = useState({
    none: 'none',
    all: 'all 150ms cubic-bezier(0.4, 0, 0.2, 1)',
    colors: 'background-color 150ms cubic-bezier(0.4, 0, 0.2, 1), border-color 150ms cubic-bezier(0.4, 0, 0.2, 1), color 150ms cubic-bezier(0.4, 0, 0.2, 1)',
    opacity: 'opacity 150ms cubic-bezier(0.4, 0, 0.2, 1)',
    shadow: 'box-shadow 150ms cubic-bezier(0.4, 0, 0.2, 1)',
    transform: 'transform 150ms cubic-bezier(0.4, 0, 0.2, 1)'
  })

  const [easings, setEasings] = useState({
    linear: 'cubic-bezier(0, 0, 1, 1)',
    'ease-in': 'cubic-bezier(0.4, 0, 1, 1)',
    'ease-out': 'cubic-bezier(0, 0, 0.2, 1)',
    'ease-in-out': 'cubic-bezier(0.4, 0, 0.2, 1)'
  })

  const [durations, setDurations] = useState({
    75: '75ms',
    100: '100ms',
    150: '150ms',
    200: '200ms',
    300: '300ms',
    500: '500ms',
    700: '700ms',
    1000: '1000ms'
  })

  // Breakpoints
  const [breakpoints, setBreakpoints] = useState({
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px'
  })

  // Grid state
  const [columns, setColumns] = useState(12)
  const [gutter, setGutter] = useState(24)
  const [margin, setMargin] = useState(24)

  // Export state
  const [copied, setCopied] = useState(false)
  const [exportFormat, setExportFormat] = useState('css')

  // Update body class when theme changes
  useEffect(() => {
    if (theme === 'light') {
      document.body.classList.add('light-mode')
    } else {
      document.body.classList.remove('light-mode')
    }
  }, [theme])

  // Generate color shades (50-900 like Tailwind)
  const generateShades = (hex) => {
    try {
      const color = chroma(hex)
      return {
        50: chroma(hex).brighten(2.5).hex(),
        100: chroma(hex).brighten(2).hex(),
        200: chroma(hex).brighten(1.5).hex(),
        300: chroma(hex).brighten(1).hex(),
        400: chroma(hex).brighten(0.5).hex(),
        500: hex, // Base color
        600: chroma(hex).darken(0.5).hex(),
        700: chroma(hex).darken(1).hex(),
        800: chroma(hex).darken(1.5).hex(),
        900: chroma(hex).darken(2).hex()
      }
    } catch {
      return {}
    }
  }



  // Update shades when colors change
  useEffect(() => {
    const updatedColors = colors.map(color => ({
      ...color,
      shades: generateShades(color.hex)
    }))
    setColors(updatedColors)
  }, [])

  // Generate typography scale
  useEffect(() => {
    const scales = []
    const steps = [-2, -1, 0, 1, 2, 3, 4, 5, 6]
    steps.forEach(step => {
      const size = Math.round(baseSize * Math.pow(scaleRatio, step))
      scales.push({
        name: step === 0 ? 'base' : step > 0 ? `${step + 2}xl` : `${step === -1 ? 'sm' : 'xs'}`,
        size: size,
        pixels: `${size}px`,
        rem: `${(size / 16).toFixed(3)}rem`
      })
    })
    setTypographyScale(scales.reverse())
  }, [baseSize, scaleRatio])

  // Generate spacing scale
  useEffect(() => {
    const scales = []
    const multipliers = [0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 5, 6, 7, 8, 9, 10, 11, 12, 14, 16, 20, 24, 28, 32, 36, 40, 44, 48, 52, 56, 60, 64, 72, 80, 96]
    
    multipliers.forEach(mult => {
      const value = baseUnit * mult
      scales.push({
        name: mult === 0 ? '0' : `${mult}`,
        value: value,
        pixels: `${value}px`,
        rem: `${(value / 16).toFixed(3)}rem`
      })
    })
    setSpacingScale(scales)
  }, [baseUnit])

  // Add color
  const addColor = () => {
    const newColor = {
      id: Date.now(),
      name: `Color ${colors.length + 1}`,
      hex: chroma.random().hex(),
      role: 'custom',
      shades: {}
    }
    newColor.shades = generateShades(newColor.hex)
    setColors([...colors, newColor])
  }

  // Update color
  const updateColor = (id, updates) => {
    setColors(colors.map(c => {
      if (c.id === id) {
        const updated = { ...c, ...updates }
        if (updates.hex) {
          updated.shades = generateShades(updates.hex)
        }
        return updated
      }
      return c
    }))
    if (selectedColor.id === id) {
      const updated = { ...selectedColor, ...updates }
      if (updates.hex) {
        updated.shades = generateShades(updates.hex)
      }
      setSelectedColor(updated)
    }
  }

  // Delete color
  const deleteColor = (id) => {
    setColors(colors.filter(c => c.id !== id))
    if (selectedColor.id === id) {
      setSelectedColor(colors[0])
    }
  }

  // Generate AI palette
  const generateAIPalette = () => {
    setIsGenerating(true)
    
    setTimeout(() => {
      const baseHue = Math.random() * 360
      const generatedColors = [
        { id: Date.now() + 1, name: 'Primary', hex: chroma.hsl(baseHue, 0.7, 0.5).hex(), role: 'primary' },
        { id: Date.now() + 2, name: 'Secondary', hex: chroma.hsl((baseHue + 60) % 360, 0.6, 0.55).hex(), role: 'secondary' },
        { id: Date.now() + 3, name: 'Accent', hex: chroma.hsl((baseHue + 180) % 360, 0.8, 0.6).hex(), role: 'accent' },
        { id: Date.now() + 4, name: 'Success', hex: chroma.hsl(140, 0.6, 0.5).hex(), role: 'success' },
        { id: Date.now() + 5, name: 'Warning', hex: chroma.hsl(45, 0.9, 0.6).hex(), role: 'warning' },
        { id: Date.now() + 6, name: 'Error', hex: chroma.hsl(0, 0.7, 0.55).hex(), role: 'error' },
        { id: Date.now() + 7, name: 'Info', hex: chroma.hsl(210, 0.7, 0.6).hex(), role: 'info' }
      ].map(color => ({
        ...color,
        shades: generateShades(color.hex)
      }))
      
      setColors(generatedColors)
      setSelectedColor(generatedColors[0])
      setIsGenerating(false)
    }, 1500)
  }

  // Check contrast ratio
  const getContrastRatio = (color1, color2) => {
    try {
      return chroma.contrast(color1, color2).toFixed(2)
    } catch {
      return '0.00'
    }
  }

  // Export functions
  const exportCSS = () => {
    let css = ':root {\n  /* Colors */\n'
    colors.forEach(color => {
      const name = color.name.toLowerCase().replace(/\s+/g, '-')
      Object.entries(color.shades).forEach(([shade, hex]) => {
        css += `  --color-${name}-${shade}: ${hex};\n`
      })
    })
    
    css += '\n  /* Typography */\n'
    typographyScale.forEach(scale => {
      css += `  --font-size-${scale.name}: ${scale.rem};\n`
    })
    
    Object.entries(fontFamilies).forEach(([name, value]) => {
      css += `  --font-family-${name}: ${value};\n`
    })
    
    Object.entries(fontWeights).forEach(([name, value]) => {
      css += `  --font-weight-${name}: ${value};\n`
    })
    
    Object.entries(lineHeights).forEach(([name, value]) => {
      css += `  --line-height-${name}: ${value};\n`
    })
    
    Object.entries(letterSpacing).forEach(([name, value]) => {
      css += `  --letter-spacing-${name}: ${value};\n`
    })
    
    css += '\n  /* Spacing */\n'
    spacingScale.forEach(scale => {
      css += `  --space-${scale.name}: ${scale.rem};\n`
    })
    
    css += '\n  /* Shadows */\n'
    Object.entries(shadows).forEach(([name, value]) => {
      css += `  --shadow-${name}: ${value};\n`
    })
    
    css += '\n  /* Border Radius */\n'
    Object.entries(borderRadius).forEach(([name, value]) => {
      css += `  --radius-${name}: ${value};\n`
    })
    
    css += '\n  /* Border Width */\n'
    Object.entries(borderWidth).forEach(([name, value]) => {
      css += `  --border-${name}: ${value};\n`
    })
    
    css += '\n  /* Opacity */\n'
    Object.entries(opacity).forEach(([name, value]) => {
      css += `  --opacity-${name}: ${value};\n`
    })
    
    css += '\n  /* Z-Index */\n'
    Object.entries(zIndex).forEach(([name, value]) => {
      css += `  --z-${name}: ${value};\n`
    })
    
    css += '\n  /* Transitions */\n'
    Object.entries(transitions).forEach(([name, value]) => {
      css += `  --transition-${name}: ${value};\n`
    })
    
    Object.entries(durations).forEach(([name, value]) => {
      css += `  --duration-${name}: ${value};\n`
    })
    
    css += '\n  /* Breakpoints */\n'
    Object.entries(breakpoints).forEach(([name, value]) => {
      css += `  --breakpoint-${name}: ${value};\n`
    })
    
    css += '}'
    return css
  }

  const exportTailwind = () => {
    const config = {
      theme: {
        extend: {
          colors: {},
          fontSize: {},
          fontFamily: fontFamilies,
          fontWeight: fontWeights,
          lineHeight: lineHeights,
          letterSpacing: letterSpacing,
          spacing: {},
          boxShadow: shadows,
          borderRadius: borderRadius,
          borderWidth: borderWidth,
          opacity: opacity,
          zIndex: zIndex,
          transitionProperty: transitions,
          transitionDuration: durations,
          transitionTimingFunction: easings,
          screens: breakpoints
        }
      }
    }
    
    colors.forEach(color => {
      const name = color.name.toLowerCase().replace(/\s+/g, '')
      config.theme.extend.colors[name] = color.shades
    })
    
    typographyScale.forEach(scale => {
      config.theme.extend.fontSize[scale.name] = scale.rem
    })
    
    spacingScale.forEach(scale => {
      config.theme.extend.spacing[scale.name] = scale.rem
    })
    
    return `module.exports = ${JSON.stringify(config, null, 2)}`
  }

  const exportJSON = () => {
    return JSON.stringify({
      colors: colors.map(c => ({
        name: c.name,
        hex: c.hex,
        role: c.role,
        shades: c.shades
      })),
      typography: {
        scale: typographyScale,
        families: fontFamilies,
        weights: fontWeights,
        lineHeights: lineHeights,
        letterSpacing: letterSpacing
      },
      spacing: spacingScale,
      shadows: shadows,
      borderRadius: borderRadius,
      borderWidth: borderWidth,
      opacity: opacity,
      zIndex: zIndex,
      transitions: transitions,
      easings: easings,
      durations: durations,
      breakpoints: breakpoints,
      grid: { columns, gutter, margin }
    }, null, 2)
  }

  const exportFigma = () => {
    // Figma Design Tokens format
    const figmaTokens = {
      global: {
        colors: {},
        typography: {},
        spacing: {},
        effects: {},
        radii: {}
      }
    }
    
    colors.forEach(color => {
      const name = color.name.toLowerCase().replace(/\s+/g, '-')
      Object.entries(color.shades).forEach(([shade, hex]) => {
        figmaTokens.global.colors[`${name}-${shade}`] = {
          value: hex,
          type: 'color'
        }
      })
    })
    
    typographyScale.forEach(scale => {
      figmaTokens.global.typography[scale.name] = {
        value: {
          fontSize: scale.pixels,
          fontFamily: fontFamilies.body
        },
        type: 'typography'
      }
    })
    
    spacingScale.forEach(scale => {
      figmaTokens.global.spacing[scale.name] = {
        value: scale.pixels,
        type: 'spacing'
      }
    })
    
    Object.entries(shadows).forEach(([name, value]) => {
      figmaTokens.global.effects[name] = {
        value: value,
        type: 'boxShadow'
      }
    })
    
    Object.entries(borderRadius).forEach(([name, value]) => {
      figmaTokens.global.radii[name] = {
        value: value,
        type: 'borderRadius'
      }
    })
    
    return JSON.stringify(figmaTokens, null, 2)
  }

  const exportSCSS = () => {
    let scss = '// Colors\n'
    colors.forEach(color => {
      const name = color.name.toLowerCase().replace(/\s+/g, '-')
      Object.entries(color.shades).forEach(([shade, hex]) => {
        scss += `$color-${name}-${shade}: ${hex};\n`
      })
    })
    
    scss += '\n// Typography\n'
    typographyScale.forEach(scale => {
      scss += `$font-size-${scale.name}: ${scale.rem};\n`
    })
    
    scss += '\n// Spacing\n'
    spacingScale.slice(0, 20).forEach(scale => {
      scss += `$space-${scale.name}: ${scale.rem};\n`
    })
    
    scss += '\n// Shadows\n'
    Object.entries(shadows).forEach(([name, value]) => {
      scss += `$shadow-${name}: ${value};\n`
    })
    
    return scss
  }

  const getExportCode = () => {
    switch (exportFormat) {
      case 'css': return exportCSS()
      case 'tailwind': return exportTailwind()
      case 'json': return exportJSON()
      case 'figma': return exportFigma()
      case 'scss': return exportSCSS()
      default: return exportCSS()
    }
  }

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // Import design system
  const importDesignSystem = (event) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const imported = JSON.parse(e.target.result)
        if (imported.colors) {
          setColors(imported.colors.map((c, i) => ({
            ...c,
            id: Date.now() + i,
            shades: c.shades || generateShades(c.hex)
          })))
        }
        if (imported.typography) {
          if (imported.typography.scale) setTypographyScale(imported.typography.scale)
          if (imported.typography.families) setFontFamilies(imported.typography.families)
          if (imported.typography.weights) setFontWeights(imported.typography.weights)
        }
        if (imported.spacing) setSpacingScale(imported.spacing)
        if (imported.shadows) setShadows(imported.shadows)
        if (imported.borderRadius) setBorderRadius(imported.borderRadius)
        if (imported.breakpoints) setBreakpoints(imported.breakpoints)
        
        alert('Design system imported successfully!')
      } catch (error) {
        alert('Error importing file. Please check the format.')
      }
    }
    reader.readAsText(file)
  }

  // Navigation items
  const navItems = [
    { id: 'palette', icon: Palette, label: 'Colors' },
    { id: 'typography', icon: Type, label: 'Typography' },
    { id: 'spacing', icon: Move, label: 'Spacing' },
    { id: 'effects', icon: Layers, label: 'Effects' },
    { id: 'layout', icon: Grid, label: 'Layout' },
    { id: 'preview', icon: Eye, label: 'Preview' },
    { id: 'export', icon: Download, label: 'Export' }
  ]

  return (
    <div className={`app ${theme}`}>
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <h1 className="logo">
            STORIES
            <span className="triangle">▲</span>
          </h1>
          <p className="tagline">Design System Builder</p>
          <p className="tribute">In memory of Avicii</p>
        </div>

        <nav className="nav">
          {navItems.map(item => (
            <motion.button
              key={item.id}
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setCurrentView(item.id)}
              className={`nav-item ${currentView === item.id ? 'active' : ''}`}
            >
              <item.icon size={20} />
              <span>{item.label}</span>
              {currentView === item.id && <ChevronRight size={16} />}
            </motion.button>
          ))}
        </nav>

        <div className="sidebar-footer">
          <input
            type="file"
            accept=".json"
            onChange={importDesignSystem}
            style={{ display: 'none' }}
            id="import-input"
          />
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => document.getElementById('import-input').click()}
            className="import-button"
          >
            <Upload size={18} />
            <span>Import</span>
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="theme-toggle"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            <span>{theme === 'dark' ? 'Light' : 'Dark'}</span>
          </motion.button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <AnimatePresence mode="wait">
          {/* PALETTE VIEW */}
{currentView === 'palette' && (
  <motion.div
    key="palette"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    className="view"
  >
    <div className="view-header">
      <div>
        <h2 className="view-title">Color System</h2>
        <p className="view-description">Complete color palette with automatic shade generation</p>
      </div>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={addColor}
        className="btn-primary"
      >
        <Plus size={18} />
        Add Color
      </motion.button>
    </div>

    {/* AI Generator */}
    <div className="glass card">
      <div className="card-header">
        <Sparkles size={20} className="icon-accent" />
        <h3>AI Palette Generator</h3>
      </div>
      <div className="ai-generator">
        <input
          type="text"
          placeholder="Describe your brand (e.g., 'Modern tech startup with purple vibes')"
          value={aiPrompt}
          onChange={(e) => setAiPrompt(e.target.value)}
          className="ai-input"
        />
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={generateAIPalette}
          disabled={isGenerating}
          className="btn-secondary"
        >
          {isGenerating ? 'Generating...' : 'Generate'}
        </motion.button>
      </div>
    </div>

    {/* Color Grid */}
    <div className="colors-section">
      {colors.map(color => (
        <div key={color.id} className="color-section">
          <div className="color-section-header">
            <div className="color-section-info">
              <input
                type="text"
                value={color.name}
                onChange={(e) => updateColor(color.id, { name: e.target.value })}
                className="color-section-name"
              />
              <div className="color-controls">
                <input
                  type="color"
                  value={color.hex}
                  onChange={(e) => updateColor(color.id, { hex: e.target.value })}
                  className="color-picker-small"
                />
                <input
                  type="text"
                  value={color.hex}
                  onChange={(e) => updateColor(color.id, { hex: e.target.value })}
                  className="color-hex-input"
                />
                {colors.length > 1 && (
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => deleteColor(color.id)}
                    className="btn-icon"
                  >
                    <Trash2 size={16} />
                  </motion.button>
                )}
              </div>
            </div>
          </div>
          
          <div className="shades-grid">
            {Object.entries(color.shades).map(([shade, hex]) => (
              <motion.div
                key={shade}
                whileHover={{ scale: 1.05, y: -4 }}
                className="shade-card"
                style={{ background: hex }}
                onClick={() => copyToClipboard(hex)}
              >
                <div className="shade-overlay">
                  <span className="shade-name">{shade}</span>
                  <span className="shade-hex">{hex}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      ))}
    </div>

    {/* Accessibility Checker */}
    {selectedColor && (
      <div className="glass card">
        <div className="card-header">
          <AlertCircle size={20} />
          <h3>Accessibility Check</h3>
        </div>
        <div className="accessibility-grid">
          {colors.filter(c => c.id !== selectedColor.id).map(color => {
            const ratio = getContrastRatio(selectedColor.hex, color.hex)
            const isAAA = parseFloat(ratio) >= 7
            const isAA = parseFloat(ratio) >= 4.5
            
            return (
              <div key={color.id} className="contrast-item">
                <div className="contrast-colors">
                  <div 
                    className="contrast-swatch"
                    style={{ background: selectedColor.hex }}
                  />
                  <span className="contrast-vs">vs</span>
                  <div 
                    className="contrast-swatch"
                    style={{ background: color.hex }}
                  />
                </div>
                <div className="contrast-info">
                  <span className="contrast-ratio">{ratio}:1</span>
                  <span className={`contrast-badge ${isAAA ? 'success' : isAA ? 'warning' : 'error'}`}>
                    {isAAA ? 'AAA' : isAA ? 'AA' : 'Fail'}
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )}
  </motion.div>
)}

{/* TYPOGRAPHY VIEW */}
{currentView === 'typography' && (
  <motion.div
    key="typography"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    className="view"
  >
    <div className="view-header">
      <div>
        <h2 className="view-title">Typography System</h2>
        <p className="view-description">Complete typographic scale with font families and weights</p>
      </div>
    </div>

    {/* Font Families */}
    <div className="glass card">
      <div className="card-header">
        <Type size={20} />
        <h3>Font Families</h3>
      </div>
      <div className="token-grid">
        {Object.entries(fontFamilies).map(([name, value]) => (
          <div key={name} className="token-item">
            <label>{name}</label>
            <input
              type="text"
              value={value}
              onChange={(e) => setFontFamilies({ ...fontFamilies, [name]: e.target.value })}
              className="token-input"
            />
            <div className="token-preview" style={{ fontFamily: value }}>
              The quick brown fox
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Font Sizes */}
    <div className="glass card">
      <div className="card-header">
        <Type size={20} />
        <h3>Font Size Scale</h3>
      </div>
      <div className="scale-controls">
        <div className="control-group">
          <label>Base Size: {baseSize}px</label>
          <input
            type="range"
            min="12"
            max="20"
            value={baseSize}
            onChange={(e) => setBaseSize(Number(e.target.value))}
            className="slider"
          />
        </div>
        <div className="control-group">
          <label>Scale Ratio: {scaleRatio.toFixed(2)}</label>
          <input
            type="range"
            min="1.1"
            max="1.5"
            step="0.05"
            value={scaleRatio}
            onChange={(e) => setScaleRatio(Number(e.target.value))}
            className="slider"
          />
        </div>
      </div>
      <div className="type-scale-preview">
        {typographyScale.map((scale, index) => (
          <div key={index} className="type-scale-item">
            <div 
              className="type-sample"
              style={{ fontSize: scale.pixels }}
            >
              The quick brown fox jumps
            </div>
            <div className="type-info">
              <span className="type-name">{scale.name}</span>
              <span className="type-size">{scale.pixels} / {scale.rem}</span>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Font Weights */}
    <div className="glass card">
      <div className="card-header">
        <Type size={20} />
        <h3>Font Weights</h3>
      </div>
      <div className="weights-grid">
        {Object.entries(fontWeights).map(([name, value]) => (
          <div key={name} className="weight-item">
            <div className="weight-preview" style={{ fontWeight: value }}>
              The quick brown fox
            </div>
            <div className="weight-info">
              <span className="weight-name">{name}</span>
              <span className="weight-value">{value}</span>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Line Heights */}
    <div className="glass card">
      <div className="card-header">
        <Type size={20} />
        <h3>Line Heights</h3>
      </div>
      <div className="line-height-grid">
        {Object.entries(lineHeights).map(([name, value]) => (
          <div key={name} className="line-height-item">
            <div className="line-height-preview" style={{ lineHeight: value }}>
              The quick brown fox jumps over the lazy dog. The quick brown fox jumps over the lazy dog.
            </div>
            <div className="line-height-info">
              <span className="line-height-name">{name}</span>
              <span className="line-height-value">{value}</span>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Letter Spacing */}
    <div className="glass card">
      <div className="card-header">
        <Type size={20} />
        <h3>Letter Spacing</h3>
      </div>
      <div className="letter-spacing-grid">
        {Object.entries(letterSpacing).map(([name, value]) => (
          <div key={name} className="letter-spacing-item">
            <div className="letter-spacing-preview" style={{ letterSpacing: value }}>
              THE QUICK BROWN FOX
            </div>
            <div className="letter-spacing-info">
              <span className="letter-spacing-name">{name}</span>
              <span className="letter-spacing-value">{value}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  </motion.div>
)}

{/* SPACING VIEW */}
{currentView === 'spacing' && (
  <motion.div
    key="spacing"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    className="view"
  >
    <div className="view-header">
      <div>
        <h2 className="view-title">Spacing System</h2>
        <p className="view-description">Consistent spacing scale for layouts</p>
      </div>
    </div>

    <div className="glass card">
      <div className="card-header">
        <Move size={20} />
        <h3>Spacing Scale</h3>
      </div>
      <div className="scale-controls">
        <div className="control-group">
          <label>Base Unit: {baseUnit}px</label>
          <input
            type="range"
            min="4"
            max="16"
            value={baseUnit}
            onChange={(e) => setBaseUnit(Number(e.target.value))}
            className="slider"
          />
        </div>
      </div>
      <div className="spacing-scale-preview">
        {spacingScale.map((scale, index) => (
          <div key={index} className="spacing-scale-item">
            <div 
              className="spacing-visual"
              style={{ width: scale.pixels }}
            />
            <div className="spacing-info">
              <span className="spacing-name">{scale.name}</span>
              <span className="spacing-size">{scale.pixels} / {scale.rem}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  </motion.div>
)}

{/* EFFECTS VIEW */}
{currentView === 'effects' && (
  <motion.div
    key="effects"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    className="view"
  >
    <div className="view-header">
      <div>
        <h2 className="view-title">Effects & Tokens</h2>
        <p className="view-description">Shadows, borders, opacity, and more</p>
      </div>
    </div>

    {/* Shadows */}
    <div className="glass card">
      <div className="card-header">
        <Layers size={20} />
        <h3>Box Shadows</h3>
      </div>
      <div className="shadows-grid">
        {Object.entries(shadows).map(([name, value]) => (
          <motion.div
            key={name}
            whileHover={{ y: -4 }}
            className="shadow-item glass"
            style={{ boxShadow: value }}
          >
            <div className="shadow-name">{name}</div>
            <div className="shadow-value">{value}</div>
          </motion.div>
        ))}
      </div>
    </div>

    {/* Border Radius */}
    <div className="glass card">
      <div className="card-header">
        <Circle size={20} />
        <h3>Border Radius</h3>
      </div>
      <div className="radius-grid">
        {Object.entries(borderRadius).map(([name, value]) => (
          <div key={name} className="radius-item">
            <div 
              className="radius-preview glass"
              style={{ borderRadius: value }}
            />
            <div className="radius-info">
              <span className="radius-name">{name}</span>
              <span className="radius-value">{value}</span>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Border Width */}
    <div className="glass card">
      <div className="card-header">
        <Box size={20} />
        <h3>Border Width</h3>
      </div>
      <div className="border-width-grid">
        {Object.entries(borderWidth).map(([name, value]) => (
          <div key={name} className="border-width-item">
            <div 
              className="border-width-preview"
              style={{ 
                borderWidth: value,
                borderStyle: 'solid',
                borderColor: 'var(--primary)'
              }}
            />
            <div className="border-width-info">
              <span className="border-width-name">{name}</span>
              <span className="border-width-value">{value}</span>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Opacity */}
    <div className="glass card">
      <div className="card-header">
        <Eye size={20} />
        <h3>Opacity Scale</h3>
      </div>
      <div className="opacity-grid">
        {Object.entries(opacity).map(([name, value]) => (
          <div key={name} className="opacity-item">
            <div 
              className="opacity-preview"
              style={{ 
                opacity: value,
                background: 'var(--primary)'
              }}
            />
            <div className="opacity-info">
              <span className="opacity-name">{name}</span>
              <span className="opacity-value">{Math.round(parseFloat(value) * 100)}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Z-Index */}
    <div className="glass card">
      <div className="card-header">
        <Layers size={20} />
        <h3>Z-Index Scale</h3>
      </div>
      <div className="token-grid">
        {Object.entries(zIndex).map(([name, value]) => (
          <div key={name} className="token-display">
            <span className="token-display-name">{name}</span>
            <span className="token-display-value">{value}</span>
          </div>
        ))}
      </div>
    </div>

    {/* Transitions */}
    <div className="glass card">
      <div className="card-header">
        <Zap size={20} />
        <h3>Transitions</h3>
      </div>
      <div className="transitions-section">
        <h4 className="subsection-title">Durations</h4>
        <div className="token-grid">
          {Object.entries(durations).map(([name, value]) => (
            <div key={name} className="token-display">
              <span className="token-display-name">{name}</span>
              <span className="token-display-value">{value}</span>
            </div>
          ))}
        </div>

        <h4 className="subsection-title">Easing Functions</h4>
        <div className="token-grid">
          {Object.entries(easings).map(([name, value]) => (
            <div key={name} className="token-display">
              <span className="token-display-name">{name}</span>
              <span className="token-display-value">{value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </motion.div>
)}

{/* LAYOUT VIEW */}
{currentView === 'layout' && (
  <motion.div
    key="layout"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    className="view"
  >
    <div className="view-header">
      <div>
        <h2 className="view-title">Layout System</h2>
        <p className="view-description">Grid and breakpoint configuration</p>
      </div>
    </div>

    {/* Grid System */}
    <div className="glass card">
      <div className="card-header">
        <Grid size={20} />
        <h3>Grid Configuration</h3>
      </div>
      <div className="grid-controls">
        <div className="control-group">
          <label>Columns: {columns}</label>
          <input
            type="range"
            min="4"
            max="16"
            value={columns}
            onChange={(e) => setColumns(Number(e.target.value))}
            className="slider"
          />
        </div>
        <div className="control-group">
          <label>Gutter: {gutter}px</label>
          <input
            type="range"
            min="8"
            max="48"
            step="4"
            value={gutter}
            onChange={(e) => setGutter(Number(e.target.value))}
            className="slider"
          />
        </div>
        <div className="control-group">
          <label>Margin: {margin}px</label>
          <input
            type="range"
            min="8"
            max="64"
            step="4"
            value={margin}
            onChange={(e) => setMargin(Number(e.target.value))}
            className="slider"
          />
        </div>
      </div>
      <div className="grid-preview">
  <div 
    className="grid-container"
    style={{ 
      padding: `0 ${margin}px`,
      gap: `${gutter}px`,
      gridTemplateColumns: `repeat(${columns}, 1fr)`
    }}
  >
    {Array.from({ length: columns }).map((_, i) => (
      <div key={i} className="grid-column" />
    ))}
  </div>
</div>
    </div>

    {/* Breakpoints */}
    <div className="glass card">
      <div className="card-header">
        <Grid size={20} />
        <h3>Breakpoints</h3>
      </div>
      <div className="breakpoints-grid">
        {Object.entries(breakpoints).map(([name, value]) => (
          <div key={name} className="breakpoint-item glass">
            <div className="breakpoint-name">{name}</div>
            <div className="breakpoint-value">{value}</div>
            <div className="breakpoint-description">
              {name === 'sm' && 'Mobile landscape'}
              {name === 'md' && 'Tablets'}
              {name === 'lg' && 'Desktop'}
              {name === 'xl' && 'Large desktop'}
              {name === '2xl' && 'Extra large'}
            </div>
          </div>
        ))}
      </div>
    </div>
  </motion.div>
)}

{/* PREVIEW VIEW */}
{currentView === 'preview' && (
  <motion.div
    key="preview"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    className="view"
  >
    <div className="view-header">
      <div>
        <h2 className="view-title">Component Preview</h2>
        <p className="view-description">See your design system in action</p>
      </div>
    </div>

    <div className="preview-grid">
      {/* Buttons */}
      <div className="glass card">
        <h3 className="card-title">Buttons</h3>
        <div className="component-preview">
          <button 
            className="preview-button"
            style={{ 
              background: colors[0]?.shades[500],
              borderRadius: borderRadius.md,
              boxShadow: shadows.md
            }}
          >
            Primary Button
          </button>
          <button 
            className="preview-button secondary"
            style={{ 
              background: 'transparent',
              border: `2px solid ${colors[0]?.shades[500]}`,
              color: colors[0]?.shades[500],
              borderRadius: borderRadius.md
            }}
          >
            Secondary
          </button>
          <button 
            className="preview-button"
            style={{ 
              background: colors[1]?.shades[500],
              borderRadius: borderRadius.lg
            }}
          >
            Success
          </button>
        </div>
      </div>

      {/* Cards */}
      <div className="glass card">
        <h3 className="card-title">Cards</h3>
        <div 
          className="preview-card"
          style={{ 
            borderColor: colors[0]?.shades[500],
            borderRadius: borderRadius.xl,
            boxShadow: shadows.lg
          }}
        >
          <div className="preview-card-header">
            <h4>Card Title</h4>
          </div>
          <p className="preview-card-text">
            This is a preview of how cards will look with your design system tokens applied.
          </p>
          <button 
            className="preview-button small"
            style={{ 
              background: colors[0]?.shades[500],
              borderRadius: borderRadius.md
            }}
          >
            Action
          </button>
        </div>
      </div>

      {/* Inputs */}
      <div className="glass card">
        <h3 className="card-title">Form Inputs</h3>
        <div className="component-preview">
          <input
            type="text"
            placeholder="Text input"
            className="preview-input"
            style={{ 
              borderColor: colors[0]?.shades[300],
              borderRadius: borderRadius.md
            }}
          />
          <select 
            className="preview-input"
            style={{ 
              borderColor: colors[0]?.shades[300],
              borderRadius: borderRadius.md
            }}
          >
            <option>Select option</option>
            <option>Option 1</option>
            <option>Option 2</option>
          </select>
          <textarea
            placeholder="Textarea"
            className="preview-input"
            rows={3}
            style={{ 
              borderColor: colors[0]?.shades[300],
              borderRadius: borderRadius.md
            }}
          />
        </div>
      </div>

      {/* Typography */}
      <div className="glass card">
        <h3 className="card-title">Typography</h3>
        <div className="typography-preview">
          {typographyScale.slice(0, 6).map((scale, i) => (
            <div 
              key={i}
              style={{ 
                fontSize: scale.pixels,
                fontWeight: i === 0 ? fontWeights.black : i < 3 ? fontWeights.bold : fontWeights.normal,
                marginBottom: spacingScale[2]?.pixels
              }}
            >
              {scale.name}: The quick brown fox jumps
            </div>
          ))}
        </div>
      </div>

      {/* Alerts */}
      <div className="glass card">
        <h3 className="card-title">Alerts</h3>
        <div className="component-preview">
          <div 
            className="alert"
            style={{ 
              background: `${colors[3]?.shades[500]}20`,
              borderLeft: `4px solid ${colors[3]?.shades[500]}`,
              borderRadius: borderRadius.md,
              padding: spacingScale[4]?.pixels
            }}
          >
            <strong>Success:</strong> Your action was completed successfully!
          </div>
          <div 
            className="alert"
            style={{ 
              background: `${colors[4]?.shades[500]}20`,
              borderLeft: `4px solid ${colors[4]?.shades[500]}`,
              borderRadius: borderRadius.md,
              padding: spacingScale[4]?.pixels
            }}
          >
            <strong>Warning:</strong> Please check your input.
          </div>
          <div 
            className="alert"
            style={{ 
              background: `${colors[5]?.shades[500]}20`,
              borderLeft: `4px solid ${colors[5]?.shades[500]}`,
              borderRadius: borderRadius.md,
              padding: spacingScale[4]?.pixels
            }}
          >
            <strong>Error:</strong> Something went wrong!
          </div>
        </div>
      </div>

      {/* Badges */}
      <div className="glass card">
        <h3 className="card-title">Badges</h3>
        <div className="component-preview" style={{ flexDirection: 'row', gap: spacingScale[2]?.pixels, flexWrap: 'wrap' }}>
          {colors.slice(0, 5).map((color, i) => (
            <span
              key={i}
              className="badge"
              style={{
                background: color.shades[500],
                color: '#fff',
                padding: `${spacingScale[1]?.pixels} ${spacingScale[3]?.pixels}`,
                borderRadius: borderRadius.full,
                fontSize: typographyScale[typographyScale.length - 2]?.pixels,
                fontWeight: fontWeights.semibold
              }}
            >
              {color.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  </motion.div>
)}

{/* EXPORT VIEW */}
{currentView === 'export' && (
  <motion.div
    key="export"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    className="view"
  >
    <div className="view-header">
      <div>
        <h2 className="view-title">Export Design System</h2>
        <p className="view-description">Export your tokens in multiple formats</p>
      </div>
    </div>

    {/* Format Selector */}
    <div className="export-formats">
      {[
        { id: 'css', label: 'CSS Variables', icon: Code },
        { id: 'tailwind', label: 'Tailwind Config', icon: Code },
        { id: 'json', label: 'JSON', icon: FileJson },
        { id: 'figma', label: 'Figma Tokens', icon: Figma },
        { id: 'scss', label: 'SCSS Variables', icon: Code }
      ].map(format => (
        <motion.button
          key={format.id}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setExportFormat(format.id)}
          className={`export-format-btn ${exportFormat === format.id ? 'active' : ''}`}
        >
          <format.icon size={20} />
          <span>{format.label}</span>
        </motion.button>
      ))}
    </div>

    {/* Export Code */}
    <div className="glass card">
      <div className="card-header">
        <h3>
          {exportFormat === 'css' && 'CSS Variables'}
          {exportFormat === 'tailwind' && 'Tailwind Configuration'}
          {exportFormat === 'json' && 'JSON Design Tokens'}
          {exportFormat === 'figma' && 'Figma Design Tokens'}
          {exportFormat === 'scss' && 'SCSS Variables'}
        </h3>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => copyToClipboard(getExportCode())}
          className="btn-primary"
        >
          {copied ? <Check size={18} /> : <Copy size={18} />}
          {copied ? 'Copied!' : 'Copy'}
        </motion.button>
      </div>
      <pre className="export-code">
        <code>{getExportCode()}</code>
      </pre>
    </div>

    {/* Export Info */}
    <div className="export-info glass card">
      <h4>How to use:</h4>
      {exportFormat === 'css' && (
        <p>Copy the CSS variables and paste them into your stylesheets. Use them like: <code>background: var(--color-primary-500);</code></p>
      )}
      {exportFormat === 'tailwind' && (
        <p>Copy this configuration into your <code>tailwind.config.js</code> file to extend Tailwind with your design tokens.</p>
      )}
      {exportFormat === 'json' && (
        <p>This JSON format contains all your design tokens and can be imported back into STORIES or used in other tools.</p>
      )}
      {exportFormat === 'figma' && (
        <p>Use this with Figma Tokens plugin to sync your design system with Figma designs.</p>
      )}
      {exportFormat === 'scss' && (
        <p>Copy these SCSS variables into your <code>_variables.scss</code> file and use them like: <code>background: $color-primary-500;</code></p>
      )}
    </div>
  </motion.div>
)} 
        </AnimatePresence>
      </main>
    </div>
  )
}

export default App