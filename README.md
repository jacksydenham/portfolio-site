# Interactive 3D Portfolio

An interactive 3D portfolio built with React Three Fiber to showcase my projects and technical skills in a dynamic and engaging way.

### ✨ Always live at https://www.jacksydenham.dev/ ✨

## About The Project

This project moves beyond a traditional 2D website by creating an interactive 3D space for users to explore my work. The goal was to demonstrate advanced front-end capabilities, particularly in performance optimization and state management within a complex, real-time rendering environment.

## Key Features

* **Efficient Object Rendering:** Utilizes Three.js instancing and React memoization to render 20x more objects than a standard approach without performance degradation.
* **Centralized State Management:** Employs Zustand to seamlessly synchronize state across more than 25 individual 3D and UI components, ensuring a consistent and predictable user experience.
* **Custom Asset Pipeline:** All 3D models were created and optimized in Blender for performant use on the web.
* **Automated Deployment:** All valid commites go straight to prod via vercel upon merging. With no backend, this process is low risk and keeps uptime at ~100%.

## Tech Stack

* **Front-End:** React, TypeScript
* **3D Rendering:** React Three Fiber (r3f), Three.js
* **State Management:** Zustand
* **3D Modeling:** Blender

## Future Improvements

* **Full-Stack Backend Implementation:** I'd always prefer to have a backend with a dedicated database and a secure REST API to enable advanced features, user authentication, and data persistence, but since this is built on Vite, I'd first need to refactor to using Next.js.
