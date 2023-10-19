import AlpineInstance, { AlpineComponent } from "alpinejs";
import inputListener from "./common";

interface Password {
  //callback requires indexing to string and symbol
  [key: string]: unknown;
  [key: symbol]: unknown;
  //real types
  eventName: string;
  value: unknown;
  type: unknown;
  active: boolean;
}

const password = (...args: unknown[]): AlpineComponent<Password> => {
  const [eventName, value, type] = args as [string, unknown, unknown];
  return {
    eventName,
    value,
    type,
    active: false,
    inputListener,

    init() {
      inputListener.call(this);

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
