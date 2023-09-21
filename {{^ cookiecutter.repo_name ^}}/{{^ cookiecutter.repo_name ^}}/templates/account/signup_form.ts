import AlpineInstance, { AlpineComponent } from "alpinejs";

const signup = (): AlpineComponent => ({
  password1: "",
  password2: "",
  pMatchError: "Passwords must match",
  p2OriginalError: "",
  get passwordMatch(): boolean {
    return (this.password1 === "" || this.password2 === "")
      || this.password1 === this.password2;
  },
  toggleError() {
    const p2 = this.$el.querySelector("#id_password2");
    const p2Field = p2?.closest(".field");
    const p2ErrorIcon = p2?.closest(".input-box")?.querySelector(".right-icon");
    const p2ErrorLabel = p2Field?.parentElement?.querySelector("div.text-error");

    if (this.passwordMatch) {
      if (p2ErrorLabel) {
        p2ErrorLabel.innerHTML = this.p2OriginalError;
      }
      p2Field?.classList?.remove("error");
      p2ErrorIcon?.classList?.add("hidden");
      p2ErrorLabel?.classList?.add("hidden");
    } else {
      if (p2ErrorLabel) {
        p2ErrorLabel.innerHTML = this.pMatchError;
      }
      p2Field?.classList?.add("error");
      p2ErrorIcon?.classList?.remove("hidden");
      p2ErrorLabel?.classList?.remove("hidden");
    }
  },
  init() {
    this.$watch("passwordMatch", () => {
      this.toggleError();
    });
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    this.p2OriginalError = this.$el.querySelector("#id_password2")!
      .closest(".field")!
      .parentElement!
      .querySelector("div.text-error")!
      .innerHTML;
  },
});

AlpineInstance.data("signup", signup);
