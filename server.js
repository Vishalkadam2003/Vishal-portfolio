// server.js
const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

const POSTS_PATH = path.join(__dirname, 'data', 'posts.json');
const TEMPLATE_PATH = path.join(__dirname, 'blog-detail.html');
const BLOG_DIR = path.join(__dirname, 'blog');

// Serve static files
app.use(express.static(__dirname));
app.use('/blog', express.static(BLOG_DIR));

// Load posts
let posts = [];
try {
  posts = JSON.parse(fs.readFileSync(POSTS_PATH, 'utf-8'));
} catch (err) {
  console.error("Could not load posts.json", err);
}

// Generate blog detail pages
function generateBlogPages() {
  if (!fs.existsSync(BLOG_DIR)) fs.mkdirSync(BLOG_DIR);

  const template = fs.readFileSync(TEMPLATE_PATH, 'utf-8');

  posts.forEach(post => {
    let html = template
      .replace(/{{title}}/g, post.title)
      .replace(/{{date}}/g, post.date)
      .replace(/{{image}}/g, post.image)
      .replace(/{{content}}/g, post.content.join(''));

    const filePath = path.join(BLOG_DIR, `${post.slug}.html`);
    fs.writeFileSync(filePath, html);
    console.log(`Generated: /blog/${post.slug}.html`);
  });
}

// API: Get all posts (for blog.html listing)
app.get('/api/posts', (req, res) => {
  res.json(posts);
});

// Regenerate on startup
generateBlogPages();

// Optional: Watch for changes (dev)
if (process.env.NODE_ENV !== 'production') {
  fs.watch(POSTS_PATH, () => {
    console.log("posts.json changed → regenerating...");
    posts = JSON.parse(fs.readFileSync(POSTS_PATH, 'utf-8'));
    generateBlogPages();
  });
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Blog live at http://localhost:${PORT}`);
  console.log(`Visit: http://localhost:${PORT}/blog.html`);
});