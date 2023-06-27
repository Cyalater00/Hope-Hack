const express = require("express");
const path = require("path"); //
const PORT = 5555;
const fetch = require("node-fetch");

const app = express();
let publicPath = path.join(__dirname, "public");
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  // The next line sets the "Access-Control-Allow-Methods" header, which specifies the HTTP methods that are allowed for the request. In this case, the value is set to "GET, POST, PUT, DELETE, OPTIONS", meaning that these methods are permitted.
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  // The third line sets the "Access-Control-Allow-Headers" header, which defines the allowed headers for the request. In this case, the "Content-Type" and "Authorization" headers are allowed.
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});
// const publicPath = path.join(__dirname, "public"); // creates a path to acesses the public folder

// app.use(express.static("public"));
// path ways to connect the front end to the back end

// ====================================== Random Facts API

app.get("/randomfacts", (req, res) => {
  const url =
    "https://numbersapi.p.rapidapi.com/random/trivia?min=10&max=20&fragment=true&json=true";
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "149c53b18cmsh86a3344921d867bp1c8b53jsn52fb896d19de",
      "X-RapidAPI-Host": "numbersapi.p.rapidapi.com",
    },
  };
  // The fetch() function is used to make the actual API request. It takes the url and options as parameters and returns a Promise that resolves to the response.
  const randomFacts = fetch(url, options)
    .then((response) => response.json())
    // The response is then handled using Promise chaining. The response.json() method is called to parse the response data as JSON.
    .then((data) => {
      // The next .then() block is executed, which receives the parsed JSON data as data. Inside this block, it checks if the data variable is truthy. If it is truthy, it logs the trivia fact and the corresponding number to the console and sends the data as a JSON response to the client using res.json(data). If the data variable is falsy, it means something went wrong, so it sends a "Bad Request" response with a status code of 400.
      if (data) {
        console.log(data.text);
        console.log(data.number);
        res.json(data);
      } else {
        res.status(400).send("Bad Request");
      }
    })
    .catch((error) => {
      console.error(error);
    });
});
// This code demonstrates how to create a server-side endpoint that fetches a random fact from an external API and sends it as a response to the client.

// ====================================== Random Math Facts API

app.get("/mathFact/:number", (req, res) => {
  const number = req.params.number;
  const url = `https://numbersapi.p.rapidapi.com/${number}/math?fragment=true&json=true`;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "fbeb36f02dmshc031c9db38cab60p1d5940jsn432ffc6c97c4",
      "X-RapidAPI-Host": "numbersapi.p.rapidapi.com",
    },
  };
  const randomMathFact = fetch(url, options)
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        res.json(data);
      } else {
        res.status(400).send("Bad Request");
      }
    })
    .catch((error) => {
      console.error(error);
    });
});

// ========================== Random Date Fact

app.get("/year", (req, res) => {
  const url =
    "https://numbersapi.p.rapidapi.com/6/21/date?fragment=true&json=true";
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "222f5b18eemshb0f33bab03a19ccp14cf1ajsnb64c43c65f90",
      "X-RapidAPI-Host": "numbersapi.p.rapidapi.com",
    },
  };
  const randomyear = fetch(url, options)
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        console.log(data.text);
        console.log(data.year);
        res.json(data);
      } else {
        res.status(400).send("Bad Request");
      }
    })
    .catch((error) => {
      console.error(error);
    });
});

app.get("/triviafact/:number", (req, res) => {
  const number = req.params.number;
  const url = `https://numbersapi.p.rapidapi.com/${number}/trivia?fragment=true&notfound=floor&json=true`;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "149c53b18cmsh86a3344921d867bp1c8b53jsn52fb896d19de",
      "X-RapidAPI-Host": "numbersapi.p.rapidapi.com",
    },
  };

  const triviaFact = fetch(url, options)
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        res.json(data);
      } else {
        res.status(400).send("Bad Request");
      }
    })
    .catch((error) => {
      console.error(error);
    });
});
// endpoints
// app.get("/", (req, res) => {
//   res.sendFile(`${publicPath}/index.html`);
// });
// app.get("/randomfact", (req, res) => {
//   res.sendFile(`${publicPath}/randomfact.html`);
// });
// app.get("/mathFact", (req, res) => {
//   res.sendFile(`${publicPath}/mathFact.html`);
// });
// app.get("/yearfact", (req, res) => {
//   res.sendFile(`${publicPath}/year.html`);
// });
// app.get("/triviafact", (req, res) => {
//   res.sendFile(`${publicPath}/triviafact.html`);
// });
// app.get("/team", (req, res) => {
//   res.sendFile(`${publicPath}/team.html`);
// });
// app.get("/contact", (req, res) => {
//   res.sendFile(`${publicPath}/.html`);
// });

app.listen(PORT, () => {
  console.log(`Listening on local host ${PORT}`);
});
