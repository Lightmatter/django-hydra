import AlpineInstance, { AlpineComponent } from "alpinejs";
import { AlpineDataCallback } from "../../static_source/js";

const password = (eventName: unknown, value: unknown, type: unknown): AlpineComponent => ({
  eventName,
  value,
  type,
  active: false,
  updateFlag(e:Event) {
    const childInput:HTMLInputElement|null = this.$refs.input.querySelector("input, textarea");
    // escape hatch for if the function's been attached to something that isn't an input
    // (this should never happen!)

    if (!childInput) {
      return;
    }

    // if the input is focused, or has a value, set the active flag to true
    // otherwise, set it to false
    switch (e.type) {
      case "focus":
      case "input":
        this.active = true;
        break;
      case "blur":
        if (!childInput.value) {
          this.active = false;
        } else {
          this.active = true;
        }
        break;
      default:
    }
  },
  init() {
    const childInput:HTMLInputElement|null = this.$refs.input.querySelector("input, textarea");
    if (childInput) {
      this.$refs.input.addEventListener("animationstart", (e) => {
        switch (e.animationName) {
          case "autofill-start":
            this.active = true;
            this.$refs.input.classList.add("autofilled");
            break;
          case "autofill-cancel":
            if (childInput === document.activeElement) {
              this.active = true;
            } else {
              this.active = false;
            }
            if (!childInput.value) {
              childInput.classList.remove("autofilled");
            }
            break;
          default:
        }
      });
    }

    // We're using the animationstart event to detect when the browser has autofilled
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
