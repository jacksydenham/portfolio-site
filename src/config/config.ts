// Application-wide configuration constants

// === ScrollScene layout offsets (in px) ===
export const HERO_Y_OFFSET_PX = 320;
export const CONTACT_Y_OFFSET_PX = 0;
export const PROJECT_LABEL_POS = { x: 180, y: 80 };
export const HERO_LABEL_POS    = { x: -375, y: 20 };

// === Board grid layout ===
export const BOARD_REF_WIDTH_UNITS = 14;

// === Section breakpoints (Scroll offset) ===
export const SCROLL_BREAKS = {
  heroEnd:     0.05,
  projectsEnd: 0.95,
};

// === Slide textures ===
export const SLIDE_TEXTURE_PATHS = [
  "/textures/mgs3.png",
  "/textures/aintnoway.png",
];

// === Star field settings ===
export const STARFIELD_SETTINGS = {
  spawnRate: 0.000003,
  maxSpeed:  20,
  maxSize:   2.5,
};
