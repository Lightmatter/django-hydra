import AlpineInstance, { AlpineComponent } from "alpinejs";
import flatpickr from "flatpickr";
import { AlpineDataCallback } from "../../static_source/js";

const date = (eventName: string, value: string): AlpineComponent => ({
  eventName,
  value,
  init() {
    if (this.value === "None") {
      this.value = null;
    }

    const picker = flatpickr(this.$refs.picker, {
      mode: "single",
      dateFormat: "m/d/Y", // see https://flatpickr.js.org/formatting/,
      defaultDate: value,
      onChange: (_, dateString) => {
        this.value = dateString;
      },
    });

    this.$watch("value", () => {
      picker.setDate(this.value);
      if (this.eventName !== "") this.$dispatch(this.eventName, { value: this.value });
    });
  },
});

AlpineInstance.data("date", date as AlpineDataCallback);
