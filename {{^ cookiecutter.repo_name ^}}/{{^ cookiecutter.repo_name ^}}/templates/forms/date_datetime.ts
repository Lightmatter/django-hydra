import AlpineInstance, { AlpineComponent } from "alpinejs";
import flatpickr from "flatpickr";
import "flatpickr/dist/themes/light.css";
import { AlpineDataCallback } from "../../static_source/js";

const dateTime = (eventName: string, value: string, enableTime: boolean): AlpineComponent => ({
  eventName,
  value,
  enableTime,
  init() {
    if (this.value === "None") {
      this.value = null;
    }

    // see https://flatpickr.js.org/formatting/
    const dateFormat = enableTime ? "m/d/Y H:i" : "m/d/Y";

    const picker = flatpickr(this.$refs.picker, {
      mode: "single",
      enableTime,
      dateFormat,
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
