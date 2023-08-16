const registerController = {
    homepage: async (req, res) => {
        res.status(200).send("You've reach the API homepage")
    }
}

// Export du module
module.exports = registerController;