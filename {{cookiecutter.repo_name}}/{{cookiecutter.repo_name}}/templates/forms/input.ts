import AlpineInstance, { AlpineComponent } from "alpinejs";

const input = (...args: unknown[]): AlpineComponent => ({
  // Props
  eventName: args[0] as string,
  value: args[1] as string,
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

AlpineInstance.data("input", input);
