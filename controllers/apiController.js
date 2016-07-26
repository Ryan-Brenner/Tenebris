function index(req, res) {
 res.json({
    message: "Welcome to the Astropol api! Here's what you need to know!",
    documentation_url: "https://github.com/Ryan-Brenner/SGProject01_api/README.md", // CHANGE ME
    base_url: "http://astropol.herokuapp.com", // CHANGE ME
    endpoints: [
        { method: "GET", path: "/api", description: "Describes all available endpoints"},
        { method: "GET", path: "/", description: "Homepage"},
        { method: "GET", path: "/astrologs", description: "Logs posted by users"},
        { method: "POST", path: "/astrologs", description: "post a new log"}
        ]
    });
};

module.exports.index = index;
