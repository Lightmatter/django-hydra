import AlpineInstance, { AlpineComponent } from "alpinejs";
import { AlpineDataCallback } from "../../static_source/js";

const input = (eventName: string, value: string): AlpineComponent => ({
  eventName,
  value,
  active: false,
  updateFlag() {
    const childInput:HTMLInputElement|null = this.$refs.input.querySelector("input, textarea");
    if (!childInput) {
      return;
    }
    if (!childInput.value) {
      this.active = !this.active;
    }
  },
  init() {
    if (this.value === "None") {
      this.value = "";
    } else if (this.$refs !== undefined && "input" in this.$refs) {
      // Toggle the focused state on an input label when an initial value is set.
      this.active = !this.active;
    }
    if (this.eventName !== "input") {
      this.$watch("value", () => {
        this.$dispatch(
          this.eventName,
          { value: this.value },
        );
      });
    }
  },
});

AlpineInstance.data("input", input as AlpineDataCallback);
