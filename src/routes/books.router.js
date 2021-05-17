const router = require("express").Router();
const controller = require("./../controllers/books.controller");
const methodNotAllowed = require("./../errors/methodNotAllowed");

router
  .route("/:bookId")
  .get(controller.read)
  .put(controller.update)
  .delete(controller.destroy)
  .all(methodNotAllowed);

router.route("/")
  .get(controller.list)
  .post(controller.create)
  .all(methodNotAllowed);

module.exports = router;