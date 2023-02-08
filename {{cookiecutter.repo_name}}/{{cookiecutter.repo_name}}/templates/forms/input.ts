import AlpineInstance, { AlpineComponent } from "alpinejs";
import { AlpineDataCallback } from "../../static_source/js";

const input = (eventName: string, value: string): AlpineComponent => ({
  eventName,
  value,
  init() {
    if (this.value === "None") {
      this.value = "";
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
