import AlpineInstance, { AlpineComponent } from "alpinejs";

const password = (...args: unknown[]): AlpineComponent => ({
  // Props
  eventName: args[0] as string,
  value: args[1] as string,
  type: args[2] as string,
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

AlpineInstance.data("password", password);
