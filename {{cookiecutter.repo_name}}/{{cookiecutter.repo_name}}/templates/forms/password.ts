import AlpineInstance, { AlpineComponent } from "alpinejs";
import { AlpineDataCallback } from "../../static_source/js";

const password = (eventName: unknown, value: unknown, type: unknown): AlpineComponent => ({
  eventName,
  value,
  type,
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
    }
    if (this.eventName !== "") {
      this.$watch("value", () => {
        this.$dispatch(
          this.eventName,
          { value: this.value },
        );
      });
    }
  },
});

AlpineInstance.data("password", password as AlpineDataCallback);
