import AlpineInstance, { AlpineComponent } from "alpinejs";

function input(eventName: string, value: string): AlpineComponent {
  return {
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
  };
}

AlpineInstance.data("input", input);
