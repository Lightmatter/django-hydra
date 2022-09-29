import Alpine from "alpinejs";
import { ComponentBase } from "..";

interface FlyOut extends ComponentBase {
  open: boolean;
  toggle(): void;
  close(): void;
}

const flyout = (): FlyOut => ({
  open: false,
  toggle() {
    if (this.open) {
      this.close();
    }
    this.open = true;
  },
  close(focusAfter?: HTMLElement) {
    if (!this.open) return;
    this.open = false;
    if (focusAfter) {
      focusAfter.focus();
    }
  },
});
Alpine.data("flyout", flyout);
