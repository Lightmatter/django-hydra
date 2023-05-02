import AlpineInstance, { AlpineComponent } from "alpinejs";
import { AlpineDataCallback } from "../../static_source/js";

const input = (eventName: string, value: string): AlpineComponent => ({
  eventName,
  value,
  active: false,
  updateFlag(e:Event) {
    const currentInput:HTMLInputElement|null = this.$refs.input as HTMLInputElement;

    // escape hatch for if the function's been attached to something that isn't an input
    // (this should never happen!)
    if (!currentInput) {
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
        if (!currentInput.value) {
          this.active = false;
        } else {
          this.active = true;
        }
        break;
      default:
    }

    if (currentInput.classList.contains("autofilled")) {
      currentInput.classList.remove("autofilled");
    }
  },
  init() {
    // We're using the animationstart event to detect when the browser has autofilled
    const currentInput = this.$refs.input as HTMLInputElement;
    currentInput.addEventListener("animationstart", (e) => {
      switch (e.animationName) {
        case "autofill-start":
          this.active = true;
          currentInput.classList.add("autofilled");
          break;
        case "autofill-cancel":
          if (document.activeElement === currentInput) {
            this.active = true;
          } else if (this.value === "") {
            this.active = false;
          }
          if (!currentInput.value) {
            currentInput.classList.remove("autofilled");
          }
          break;
        default:
      }
    });

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
