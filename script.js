var nunjucks = require("nunjucks");

console.log(
  nunjucks.render("index.njk", {
    dinner: "Pizza",
    animals: "TURTLES",
    items: ["item 1", "item 2", "item 3"]
  })
);
