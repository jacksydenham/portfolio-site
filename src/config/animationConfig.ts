import * as THREE from "three";

export interface AnimationTarget {
  pos: THREE.Vector3;
  rot: THREE.Euler;
  dampingPos: number;
  dampingRot: number;
}

/** Hold the board off-screen / idle before hero slide + tilt (eases first-frame GPU + DOM contention). */
export const HERO_BOARD_ENTRANCE_DELAY_SEC = 0.32;

export const getHeroTargets = (w: number, heroBaseY: number, boardAnimTime: number): AnimationTarget => {
  let targetTiltX = THREE.MathUtils.degToRad(70);
  if (boardAnimTime < 1.8) {
    const t = boardAnimTime / 1.8;
    const eased = t < 0.5 ? 1.8 * t * t : -1 + (4 - 2 * t) * t;
    targetTiltX = THREE.MathUtils.lerp(THREE.MathUtils.degToRad(0), THREE.MathUtils.degToRad(70), eased);
  }

  return {
    pos: new THREE.Vector3(-w * 0.26, heroBaseY, 0),
    rot: new THREE.Euler(targetTiltX, 0, 0),
    dampingPos: 4,
    dampingRot: 3,
  };
};

export const getProjectTargets = (w: number, projectsBaseY: number, idleTime: number): AnimationTarget => {
  const fade = THREE.MathUtils.clamp(idleTime / 2, 0, 1);
  const liftY = 0.5 * fade;
  const bobY = Math.sin(idleTime * 1.8) * 0.035 * fade;
  const bobZ = Math.sin(idleTime * 1.6) * THREE.MathUtils.degToRad(1) * fade;

  return {
    pos: new THREE.Vector3(w * 0.18, projectsBaseY + liftY + bobY, 1),
    rot: new THREE.Euler(0.1, 0, bobZ), // y is handled separately for continuous spin
    dampingPos: 4,
    dampingRot: 4,
  };
};

export const getShowcaseTargets = (): AnimationTarget => {
  return {
    pos: new THREE.Vector3(0.75, 0, 2),
    rot: new THREE.Euler(0, 0, 0), // y is handled separately
    dampingPos: 4,
    dampingRot: 6,
  };
};

export const getContactTargets = (w: number, contactY: number): AnimationTarget => {
  return {
    pos: new THREE.Vector3(w * -0.282, contactY, 0.4),
    rot: new THREE.Euler(1.25, 6.28, THREE.MathUtils.degToRad(180)),
    dampingPos: 4,
    dampingRot: 3,
  };
};
