[build]
  command = "npm run build"
  publish = "build"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[build.environment]
  NODE_VERSION = "18"

[build.processing]
  skip_processing = false

[build.processing.html]
  pretty_urls = true