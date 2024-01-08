const { Thought, User } = require("../models");

const thoughtController = {
// This will get all thoughts //

getAllThought(req,res) {
Thought.find({})
.populate({
path: "reactions",
select: "-__v",
})
.select("-__v")
.sort({_id: -1 })
.then((dbThoughtData) => res.json(dbThoughtData))
.catch((err) => {
console.log(err);
res.sendStatus(400);
});

},

// Get one Thought by Id //
getThoughtById({ params }, res) {
    Thought.findOne({_id: params.id })
    .populate({
     path: "reactions",
     select: "-__v",
    })
    .select("-__v")
    .then((dbThoughtData) => {
        if (!dbThoughtData) {
        return res.status(404).json({ message: "No thought with this id!" });
        }
        res.json(dbThoughtData);
        })
        .catch((err) => {
        console.log(err);
        res.sendStatus(400);
        });
        },

        // Create Thought//
createThought({ params, body }, res) {
    Thought.create(body)
    .then(({_id }) => {
    return User.findOneAndUpdate(
    { _id: body.userId },
    { $push: { thoughts: _id } },
    { new: true }
    );
    })
    /then((dbUserData) => {
    if (!dbUserData) {
    return res
    .status (404)
    .json({ message: "Thought created but no user with this id!" });
    }
    
    res.json({ message: "Thought created sucessfully!" });
    })
    .catch((err) => res.json(err));
    },

    // Update Thought by id //
updateThought({ params, body }, res) {
    Thought.findOneandUpdate({ _id: params.id }, body, {
    new: true,
    runValidators: true,
    
    })
    .then((dbThoughtData) => {
    if (!dbThoughtData) {
    res.status(404).json({ message: "No thought was found with this id!" });
    return;
    }
    res.json(dbThoughtData);
    })
    .catch(err) => res.json(err));
    },

    // Delete Thought //
deleteThought({ params }, res) {
    Thought.findOneAndDelete({ _id: params.id })
    .then((dbThoughtData) => {
    if (!dbThoughtData) {
    return res.status(404).json({ message: "No thought with this id!" });
    }
    
    // Remove thought id from user //
    return User.findOneAndUpdate(
    {thoughts: params.id },
    { $pull: {thoughts: params.id } },
    {new: true}
    );
    })
    .then ((dbUserData) => {
    if (!dbUserData) {
    return res
    .status(404)
    .json({ message: "Thought created byt no user with this id!" });
    }
    res.json ({message: "Thought sucessfully deleted!" });
    })
    .catch ((err) => res.json(err));
    },
    
    // Add reaction //

addReaction({ params, body }, res) {
    Thought.findOneandUpdate(
    {_id: params.thoughtId },
    { $addToSet: { reactions: body } },
    {new: true, runValidators: true }
    )
    .then((dbThoughtData) => {
    if (!dbThoughtData) {
    res.status(404).json({ message: "No thought with this id" });
    return;
    }
    res.json(dbThoughtData);
    })
    .catch((err) => res.json(err));
    },

    // Delete reaction //
removeReaction({ params }, res) {
    Thought.findOneAndUpdate(
    {_id: params.thoughtId },
    {pull: {reactions: { reactionId: params.reactionId } } },
    { new: true }
    )
    .then((dbThoughtData) => res.json(dbThoughtData))
    .catch((err) => res.json(err));
    
    },
    };

    
module.exports = thoughtController;
    