// Application-wide configuration constants

// === ScrollScene layout offsets (in px) ===
export const HERO_Y_OFFSET_PX = 352;
export const CONTACT_Y_OFFSET_PX = 265;
export const PROJECT_LABEL_POS = { x: 180, y: 80 };
export const HERO_LABEL_POS = { x: -375, y: 20 };

// === Board grid layout ===
export const BOARD_REF_WIDTH_UNITS = 14;


export const hHeight = 100;  // hero
export const pHeight = 1200;  // projects
export const sHeight = 1696;  // showcase
export const cHeight = 100;  // contact
export const tHeight = hHeight + pHeight + sHeight + cHeight;
export const SCROLL_BREAKS = {
  heroEnd:      hHeight / tHeight,
  projectsEnd: (hHeight + pHeight) / tHeight,
  showcaseEnd:(hHeight + pHeight + sHeight) / tHeight,  // ← use sHeight here
  contactEnd:   1,
};


// === Slide textures ===
export const SLIDE_TEXTURE_PATHS = [
  "/textures/mgs3.png",
  "/textures/aintnoway.png",
];

// === Star field settings ===
export const STARFIELD_SETTINGS = {
  spawnRate: 0.000003,
  maxSpeed: 20,
  maxSize: 2.5,
};
