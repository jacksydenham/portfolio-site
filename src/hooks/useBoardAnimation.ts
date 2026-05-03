import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";
import { useScroll } from "@react-three/drei";
import { useRef } from "react";
import {
  BOARD_REF_WIDTH_UNITS,
  CONTACT_Y_OFFSET_PX,
  HERO_Y_OFFSET_PX,
  SCROLL_BREAKS,
} from "../config/config";
import {
  getHeroTargets,
  getProjectTargets,
  getShowcaseTargets,
  getContactTargets,
  HERO_BOARD_ENTRANCE_DELAY_SEC,
} from "../config/animationConfig";

export function useBoardAnimation(
  boardGroup: React.RefObject<THREE.Group | null>,
  anchorRef: React.RefObject<HTMLDivElement | null>
) {
  const { viewport } = useThree();
  const scroll = useScroll();

  const pxToWorld = (px: number) => (px / window.innerHeight) * viewport.height;

  const boardAnimTime = useRef(0);
  const idleTime = useRef(0);
  const showStartRef = useRef<number | null>(null);
  const wasInProjects = useRef(false);

  const projectSpinRate = THREE.MathUtils.degToRad(15);
  const spinTargetY = Math.PI * 1.2;
  const heroBaseY = viewport.height / 2 - pxToWorld(HERO_Y_OFFSET_PX) - 0.55;
  const projectsBaseY = 0;

  useFrame(({ clock }, dt) => {
    if (!boardGroup.current) return;

    // Initialize position on first frame to start from far right
    if (boardAnimTime.current === 0) {
      boardGroup.current.position.set(viewport.width, heroBaseY, 0);
    }

    const scale = viewport.width / BOARD_REF_WIDTH_UNITS;
    boardGroup.current.scale.setScalar(scale);

    boardAnimTime.current += dt;
    idleTime.current += dt;

    const scrollY = scroll.offset;
    const inHero = scrollY < SCROLL_BREAKS.heroEnd;
    const inProjects = scrollY >= SCROLL_BREAKS.heroEnd && scrollY < SCROLL_BREAKS.projectsEnd;
    const inShowcase = scrollY >= SCROLL_BREAKS.projectsEnd && scrollY < SCROLL_BREAKS.showcaseEnd;
    const inContact = scrollY >= SCROLL_BREAKS.showcaseEnd;

    // Window bridge updates
    (window as any).inProjects = inProjects;
    (window as any).inHero = inHero;

    // Handle project transitions
    if (inProjects && !wasInProjects.current) {
      (window as any).section2EntryTime = clock.getElapsedTime();
      setTimeout(() => (window as any).setActiveProject?.("KeyDocs"), 100);
      idleTime.current = 0;
    } else if (!inProjects && wasInProjects.current) {
      delete (window as any).section2EntryTime;
      (window as any).resetActiveProject?.();
    }
    wasInProjects.current = inProjects;

    let target;
    const w = viewport.width;

    if (inHero) {
      const heroPhaseT = Math.max(0, boardAnimTime.current - HERO_BOARD_ENTRANCE_DELAY_SEC);
      target = getHeroTargets(w, heroBaseY, heroPhaseT);
      if (boardAnimTime.current < HERO_BOARD_ENTRANCE_DELAY_SEC) {
        target.pos.set(w, heroBaseY, 0);
      }
    } else if (inProjects) {
      target = getProjectTargets(w, projectsBaseY, idleTime.current);
      // Continuous spin logic
      const fade = THREE.MathUtils.clamp(idleTime.current / 2, 0, 1);
      boardGroup.current.rotation.y = THREE.MathUtils.damp(boardGroup.current.rotation.y, spinTargetY, 4, dt);
      boardGroup.current.rotation.y += projectSpinRate * dt * fade;
      target.rot.y = boardGroup.current.rotation.y;
    } else if (inShowcase) {
      target = getShowcaseTargets();
      const elapsed = clock.getElapsedTime();
      if (showStartRef.current === null) showStartRef.current = elapsed;
      const sinceShow = Math.min(elapsed - showStartRef.current, 1);
      
      const initialSpeed = -1.6;
      const finalSpeed = -0.04;
      const easeOutQuad = 1 - (1 - sinceShow) * (1 - sinceShow);
      const spinSpeed = initialSpeed + (finalSpeed - initialSpeed) * easeOutQuad;

      boardGroup.current.rotation.y += dt * spinSpeed;
      target.rot.y = boardGroup.current.rotation.y;
    } else if (inContact && anchorRef.current) {
      const contactY = -viewport.height / 2 + pxToWorld(CONTACT_Y_OFFSET_PX) + 0.32;
      target = getContactTargets(w, contactY);
    }

    if (target) {
      // Apply damping to position
      boardGroup.current.position.x = THREE.MathUtils.damp(boardGroup.current.position.x, target.pos.x, target.dampingPos, dt);
      boardGroup.current.position.y = THREE.MathUtils.damp(boardGroup.current.position.y, target.pos.y, target.dampingPos, dt);
      boardGroup.current.position.z = THREE.MathUtils.damp(boardGroup.current.position.z, target.pos.z, target.dampingPos, dt);

      // Apply damping to rotation
      boardGroup.current.rotation.x = THREE.MathUtils.damp(boardGroup.current.rotation.x, target.rot.x, target.dampingRot, dt);
      boardGroup.current.rotation.y = THREE.MathUtils.damp(boardGroup.current.rotation.y, target.rot.y, target.dampingRot, dt);
      boardGroup.current.rotation.z = THREE.MathUtils.damp(boardGroup.current.rotation.z, target.rot.z, target.dampingRot, dt);
    }
  });

  return {
    inHero: scroll.offset < SCROLL_BREAKS.heroEnd,
    inProjects: scroll.offset >= SCROLL_BREAKS.heroEnd && scroll.offset < SCROLL_BREAKS.projectsEnd,
    inContact: scroll.offset >= SCROLL_BREAKS.showcaseEnd,
    pxToWorld
  };
}
