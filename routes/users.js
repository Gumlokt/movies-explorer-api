const router = require("express").Router();

const { authorizedRequestsValidation } = require("../middlewares/validation");
const { getUserProfile, updateUserProfile } = require("../controllers/users");

router.get("/users/me", authorizedRequestsValidation, getUserProfile);
router.patch("/users/me", authorizedRequestsValidation, updateUserProfile);

module.exports = router;
