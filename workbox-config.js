module.exports = {
  "globDirectory": "build/",
  "globPatterns": [
    "**/!(service-worker)*.js",
    "**/*.{html,css,icon,png,jpg}",
    "**/manifest.json"
  ],
  "swDest": "build\\sw.js",
  "swSrc": "public\\sw.js"
};