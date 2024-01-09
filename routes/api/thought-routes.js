const router = require("express").Router();
const {

getAllThought,
getThoughtById,
createThought,
updateThought,
deleteThought,
addReaction,
removeReaction,

} = require("../../controllers/thought-controller");

// Api Thoughts //
router.route("/").get(getAllThought).post(createThought);

// api thoughts/:id //
router

.route("/:id")
.get(getThoughtById)
.put(updateThought)
.delete(deleteThought);

// Api/thoughts/"thoughtId/reactions
router.route("/:thoughtId/reactions").post(addReaction);

// /Api/thoughts/:thoughtId/reactions/:reactionId").delete(removeReaction);

module.exports = router;