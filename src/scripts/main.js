document.addEventListener("DOMContentLoaded", () => {

  // get the app mode from the localStorage
  getAppMode();

  // toggle the app mode
  window._toggleAppMode = toggleAppMode;

  // manage elements focus style
  (() => {
    const appInner = document.getElementById("app-inner");
    const classes = appInner.classList;

    appInner.addEventListener("click", () => classes.remove("enable-focus-style"));
    appInner.addEventListener("keyup", (e) => e.key === "Tab" && classes.add("enable-focus-style"));
  })();
});

// get the app mode
function getAppMode() {
  // get saved mode from localStorage
  const savedMode = localStorage.getItem("uiTaskSavedMode");

  // Check if there a saved mode
  if (savedMode) {
    setAppMode(savedMode);
  } else {
    // So, try to get the browser default mode or make your own default

    // Check if Media-Queries are supported
    if (window.matchMedia) {
      // Check if the dark-mode Media-Query matches
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        setAppMode("dark");
      } else {
        setAppMode("light");
      }
    } else {
      // Default (when Media-Queries are not supported)
      setAppMode();
    }
  }
}

// set the app mode
function setAppMode(mode = "light") {

  // use the mode
  document.documentElement.dataset.mode = mode;

  // save the mode in localStorage
  localStorage.setItem("uiTaskSavedMode", mode);
}

// toggle the app mode
function toggleAppMode(e) {
  e.preventDefault();
  
  const mode = document.documentElement.dataset.mode === "light" ? "dark" : "light";

  // set the app mode
  setAppMode(mode);
}
