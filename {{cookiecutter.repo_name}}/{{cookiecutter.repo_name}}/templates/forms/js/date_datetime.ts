import AlpineInstance, { AlpineComponent } from "alpinejs";
import flatpickr from "flatpickr";
import "flatpickr/dist/themes/light.css";
import { AlpineDataCallback } from "../../../static_source/js";
import inputListener from "./common";

const dateTime = (
  eventName: string,
  value: string,
  enableTime: boolean,
  enableCalendar: boolean
): AlpineComponent => ({
  eventName,
  value,
  enableTime,
  picker: null,
  active: false,
  init() {
    inputListener.call(this);

    if (this.value === "None") {
      this.value = null;
    }

    // see https://flatpickr.js.org/formatting/
    const dateFormat = enableTime ? "m/d/Y H:i" : "m/d/Y";

    this.picker = flatpickr(this.$refs.picker, {
      mode: "single",
      enableTime,
      dateFormat,
      defaultDate: value,
      noCalendar: !enableCalendar,
      onChange: (_, dateString) => {
        this.value = dateString;
      },
    });

    this.$watch("value", () => {
      this.picker.setDate(this.value);
      if (this.eventName !== "") this.$dispatch(this.eventName, { value: this.value });
    });

    if (this.value) {
      this.active = true;
    }
  },
});

AlpineInstance.data("dateTime", dateTime as AlpineDataCallback);
