import AlpineInstance, { AlpineComponent } from "alpinejs";
import { AlpineDataCallback } from "../../../static_source/js";
import inputListener from "./common";

const input = (eventName: string, value: string): AlpineComponent => ({
  eventName,
  value,
  active: false,
  init() {
    inputListener.call(this);

    if (this.value === "None") {
      this.value = "";
    } else if (this.$refs !== undefined && "input" in this.$refs) {
      // Toggle the focused state on an input when an initial value is set.
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
