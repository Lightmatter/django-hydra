import Alpine from "alpinejs";
import { ComponentBase } from "..";

interface SpecBut extends ComponentBase {
  toggle(): void;
}

const specbut = (): SpecBut => ({
  toggle() {
    console.log('triggered')
  },
});
Alpine.data("specbut", specbut);
