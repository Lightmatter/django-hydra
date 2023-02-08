import AlpineInstance, { AlpineComponent } from "alpinejs";
import { AlpineDataCallback } from "../../static_source/js";

const password = (eventName: unknown, value: unknown, type: unknown): AlpineComponent => ({
  eventName,
  value,
  type,
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
