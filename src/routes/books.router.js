const router = require("express").Router();
const controller = require("./../controllers/books.controller");
const methodNotAllowed = require("./../errors/methodNotAllowed");
const { authenticateUser, checkIfAdmin } = require("./../middleware/authentication");

router
  .route("/:bookId")
  .get(authenticateUser, controller.read)
  .put(authenticateUser, controller.update)
  .delete(authenticateUser, controller.destroy)
  .all(methodNotAllowed);

router.route("/")
  .get(authenticateUser, controller.list)
  .post(authenticateUser, checkIfAdmin, controller.create)
  .all(methodNotAllowed);

module.exports = router;