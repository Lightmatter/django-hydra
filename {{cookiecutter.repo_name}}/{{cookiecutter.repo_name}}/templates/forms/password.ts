import AlpineInstance, { AlpineComponent } from "alpinejs";

function password(eventName: string, value: string, type: string): AlpineComponent {
  return {
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
  };
}

AlpineInstance.data("password", password);
