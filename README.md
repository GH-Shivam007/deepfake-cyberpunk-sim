
# Deepfake Cyberpunk Simulation

An immersive, visually stunning, and educational website that simulates deepfake detection with cyberpunk aesthetics.

## Project Overview

This project creates an interactive experience combining neon cyberpunk visuals with educational content about deepfake technology. The simulation allows users to "upload" a video and see a simulated deepfake detection process with random results.

### Key Features

- **Immersive Cyberpunk Aesthetics**: Neon colors, glowing elements, and a futuristic interface
- **Interactive Elements**: Animated upload section, hoverable information cards
- **Scroll Animations**: Content reveals and transitions as users scroll down the page
- **3D Spaceship Animation**: A 3D scene with a rotating spaceship that responds to scroll position
- **Educational Content**: Information about deepfakes and how to protect yourself
- **Detection Simulation**: A simulated analysis process that randomly determines if a video is authentic or fake

## Technologies Used

- React + TypeScript
- Three.js for 3D animations
- GSAP for scroll-triggered animations
- TailwindCSS for styling
- Custom components for cyberpunk UI elements

## Project Structure

The project is organized into reusable components:

- **UI Components**
  - `GlitchText`: Text with cyberpunk glitch effects
  - `NeonButton`: Glowing buttons with hover effects
  - `NeonCard`: Cards with neon borders and hover animations
  - `GlitchImage`: Images with glitch effects

- **Three.js Components**
  - `SpaceshipScene`: 3D scene with animated spaceship that responds to scroll

- **Sections**
  - `LandingSection`: Introduction with animated titles
  - `UploadSection`: Video upload and analysis simulation
  - `EducationalSection`: Information cards about deepfakes
  - `OutroSection`: Final message and call-to-action

## Visual Design

The project uses a carefully crafted cyberpunk color palette:

- **Neon Purple** (#9b4dff): Primary accent color
- **Electric Cyan** (#00ffff): Secondary accent color
- **Hot Pink** (#ff00ff): Highlight color
- **Deep Black** (#1a1a1a): Background color
- **Dark Grey** (#333333): Secondary background color

## Key Interactions

1. **Title Animation**: Text reveals with glitch effects on load
2. **Scroll Animation**: Content appears and animates as the user scrolls
3. **File Upload**: Simulated upload interface with drag-and-drop support
4. **Detection Simulation**: Animated scanning process with a random result
5. **Hover Effects**: Interactive cards and buttons with glow effects
6. **Return to Top**: Button to restart the experience

## Future Enhancements

- Add actual deepfake detection functionality
- Implement more complex 3D scenes and animations
- Create a mobile-optimized version
- Add user accounts to save detection history

## Getting Started

1. Clone the repository
2. Install dependencies with `npm install`
3. Start the development server with `npm run dev`
4. Open your browser to the local development URL

## Credits

This project was created as a demonstration of combining modern web technologies with educational content in an engaging, visually appealing format.
