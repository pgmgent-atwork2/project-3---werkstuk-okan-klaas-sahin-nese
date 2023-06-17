export const getPersonalData = async (req, res) => {
    const avatars = getAvatars();
  
    res.render("personalData", {
      user: req.user,
      avatars,
    });
  };
  