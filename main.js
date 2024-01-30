import "./src/style.css";

document.addEventListener("DOMContentLoaded", async () => {
	const btn = document.querySelectorAll(".cc_settings");
	if (btn.length > 0) {
		for (const el of btn) {
			el.dataset.cc = "c-settings";
		}
	}
	await import("./src/cookie-consent-settings.js");
});
