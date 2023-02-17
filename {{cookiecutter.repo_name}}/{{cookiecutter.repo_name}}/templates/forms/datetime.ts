import AlpineInstance, { AlpineComponent } from "alpinejs";
import flatpickr from "flatpickr";
import "flatpickr/dist/themes/light.css";
import { AlpineDataCallback } from "../../static_source/js";

const dateTime = (eventName: string, value: string): AlpineComponent => ({
  eventName,
  value,
  init() {
    if (this.value === "None") {
      this.value = null;
    }

    const picker = flatpickr(this.$refs.picker, {
      mode: "single",
      enableTime: true,
      dateFormat: "m/d/Y H:i", // see https://flatpickr.js.org/formatting/,
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

AlpineInstance.data("dateTime", dateTime as AlpineDataCallback);
