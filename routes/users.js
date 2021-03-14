const router = require("express").Router();

const {
  userNameValidation,
  userEmailValidation,
} = require("../middlewares/validation");
const { getUserProfile, updateUserProfile } = require("../controllers/users");

router.get("/users/me", getUserProfile);
router.patch(
  "/users/me",
  userNameValidation,
  userEmailValidation,
  updateUserProfile
);

module.exports = router;
