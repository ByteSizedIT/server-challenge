const express = require("express");

const server = express();

// Challenge 1
server.get("/", (request, response) => {
  response.send("<h1>Hello Express</h1>");
});

// Challenge 2
// Doesnt work with inline css
// server.get("/colour", (request, response) => {
//   const hex = request.query.hex || "ffffff";
//   const html = `
//   <body style="background-color: ${hex}">
//   <form>
//          <label for="hex">Enter hex</label>
//         <input name="hex" value="${hex}">
//       </form>
//   </body>
//   `;
//   response.send(html);
// });

// Works with internal style tag: https://www.w3schools.com/htmL/html_css.asp
// server.get("/colour", (request, response) => {
//   const hex = request.query.hex || "ffffff";
//   const html = `
//         <style>
//         body {background-color: #${hex};}
//         </style>
//         `;
//   response.send(html);
// });
// Solution
// server.get("/colour", (req, res) => {
//   const hex = req.query.hex || "ffffff"; // defaults to white
//   const html = `
//       <style>
//         body {
//           background-color: #${hex};
//         }
//       </style>
//   <form>
//     <label for="hex">Enter hex</label>
//     <input name="hex" value="${hex}">
//   </form>
//     `;
//   res.send(html);
// });

// Challenge 3

server.get("/colour", (request, response) => {
  const hex = request.query.hex || "ffffff";
  const html = `
    <style>
        body {background-color: #${hex};}
    </style>
    <body>
        <form>
            <label for="hex">Enter hex</label>
            <input name="hex" value="${hex}">
        </form>
    </body>
    `;
  response.send(html);
});

// Challenge 4
// & Challenge 5: Amend the GET /cheese handler to render a list of cheese ratings that have been submitted.
server.get("/cheese", (request, response) => {
  const htmlList = cheeseRatings
    .map((item) => `<li>${item.name}: ${item.rating}</li>`)
    .join("");
  const html = `
        <body>
            <form method="POST">
                <label for="cheese" placeholder="Enter Cheese Name">
                 Choose Cheese
                </label>
                <input id="cheese" name="name">
                </input>
                <label for="rating">
                 Cheese Rating
                </label>
                <input type="range" max="5" min="0" id="rating" name="rating">
                <button>Submit</button>
            </form>
            <ul>
                ${htmlList}
            </ul>
        </body>
    `;
  response.send(html);
});

// Challenge 5

// Hint: you can dynamically create an HTML list from an array by looping over it with for..of or .map().join("") to create a string. E.g.

// const nums = [1, 2, 3];
// const list = nums.map((num) => `<li>${num}</li>`);
// const html = `<ul>${list.join("")}</ul>`;
// Submitting the form should result in the page reloading and displaying the newly added cheese in the list.
const bodyParser = express.urlencoded();

const cheeseRatings = [];

server.post("/cheese", bodyParser, (request, response) => {
  //   const entry = { name: request.body.name, rating: request.body.rating };
  //   cheeseRatings.push(entry);
  const { name, rating } = request.body;
  cheeseRatings.push({ name, rating });
  console.log({ cheeseRatings });
  response.redirect("/cheese");
});

module.exports = server;
