import DataSource from "../lib/DataSource.js";

export const home = async (req, res) => {
   res.render("home", {
      user: req.user,
    });
  };