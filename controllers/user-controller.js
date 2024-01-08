const { User, Thought } =require("../models");

const userController = {

// Get all users
getAllUser(req, res) {
User.find({})
.populate({
path: "friends",
select: "-__v",
})
.select("-__v")
.sort({ _id: -1 })
.then((dbUserData) => res.json(dbUserData))
.catch((err) => {
console.log(err);
res.sendStatus(400);
});

},

// Get one user by id //
getUserById({ params }, res) {
    User.findOne({ _id: params.id })
    .populate({
    path: "thoughts",
    select: "-__v",
    })
    .populate({
    path: "friends",
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

        // Create User //
createUser({ body }, res) {
    User.create(body)
    .then((dbUserData) => res.json(dbUserData))
    .catch((err) => res.json(err));
    
    },
    
    // Update user by Id //
    updateUser({ params, body }, res) {
    User.findOneAndUpdate({ _id: params.id }, body, {
    new: true,
    runValidtors: true,
    })
    .then((dbUserData) => {
        if (!dbUserData) {
        res.status(404).json({ message: "No user found with this id!" });
        return;
        }
        res.json(dbUserData);
        })
        .catch((err) => res.json(err));
        },

        // Delete user

deleteUser({ params }, res) {
    User.findOneAndDelete({ _id: params.id })
    .then((dbUser Data) => {
    if (!dbUserData) {
    return res.status(404).json({ message: "No user with this id!" });
    }
    
    // BONUS "Test" getting rid of user Ids and thoughts with deletion 
    
    return Thought.deleteMant({ _ id: { $in: dbUserData.thoughts } });
    })
    .then(() => {
    res.json({ message: "User and associated thoughts deleted!" });
    })
    .catch((err) => res.json(err));
    
    },

    // Add friend //
addFriend({ params }, res) {
    User.findOneandUpdate(
    { _id: params.userId },
    { $addToSet: { friends: params.friendId } },
    { new: true, runValidators: true }
    )
    .then((dbUserData) => {
    of (!dbUserData) {
    res.status(404).json({ message: "No user with this id" });
    return;
    }
    res.json(dbUserData);
    })
    .catch((err) => res.json(err));
    },
    