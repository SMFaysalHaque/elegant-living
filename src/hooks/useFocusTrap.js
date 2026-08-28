import { useEffect, useRef } from "react";

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea, input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * Lightweight dialog focus management for a mounted modal/drawer.
 *
 * On mount it captures the currently-focused element (the trigger), moves focus
 * into the container, and traps Tab / Shift+Tab within it. `Escape` invokes the
 * latest `onEscape` callback. On unmount it returns focus to the trigger.
 *
 * The keydown listener is attached to the container element itself, so nested
 * sibling dialogs (rendered outside each other's DOM subtree) do not interfere.
 *
 * `backgroundToInert` (optional) is a DOM element marked `inert` while the dialog
 * is active, hiding background/page content from keyboard and assistive tech. It
 * is toggled inside this effect — after focus has moved into the dialog and
 * before focus is restored — so it never blurs the captured trigger element.
 */
export function useFocusTrap(containerRef, onEscape, backgroundToInert = null) {
  const onEscapeRef = useRef(onEscape);
  onEscapeRef.current = onEscape;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const previouslyFocused = document.activeElement;

    const getFocusable = () =>
      Array.from(container.querySelectorAll(FOCUSABLE_SELECTOR));

    // Move focus into the dialog once it is mounted/visible.
    const focusable = getFocusable();
    if (focusable.length > 0) {
      focusable[0].focus();
    } else {
      container.setAttribute("tabindex", "-1");
      container.focus();
    }

    // Focus is now inside the dialog, so inerting the background cannot blur it.
    if (backgroundToInert) {
      backgroundToInert.setAttribute("inert", "");
    }

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        event.stopPropagation();
        onEscapeRef.current?.();
        return;
      }

      if (event.key !== "Tab") return;

      const items = getFocusable();
      if (items.length === 0) {
        event.preventDefault();
        container.focus();
        return;
      }

      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement;

      if (event.shiftKey) {
        if (active === first || !container.contains(active)) {
          event.preventDefault();
          last.focus();
        }
      } else if (active === last || !container.contains(active)) {
        event.preventDefault();
        first.focus();
      }
    };

    container.addEventListener("keydown", handleKeyDown);

    return () => {
      container.removeEventListener("keydown", handleKeyDown);
      // Remove inert before restoring focus so the trigger is focusable again.
      if (backgroundToInert) {
        backgroundToInert.removeAttribute("inert");
      }
      if (previouslyFocused && typeof previouslyFocused.focus === "function") {
        previouslyFocused.focus();
      }
    };
  }, [containerRef, backgroundToInert]);
}
