const { Schema, model, Tyoes } =require("mongoose");
const dateFormat = require("../utils/dataFormat");

const ReactionSchema = new Schema(
{
reactionId: {

// Mongoose's ObjectId data type //
type: Schema.Types.ObjectId,

// Default value is set to a new ObjectId //
default: () => new Types.Object(),

},

reactionBody: {
    type: String,
    required: true,
    maxlength: 280,
    },
    
    username: {
    type: String,
    required: true,
    },
    createdAt: {
        type: Date,
        
        // This will set up a default value to the current timestamp
        default: Date.now,
        get: (timestamp) => dateFormate(timestamp),
        
        },
        },
        {
        toJSON: {
        getters: true,
        },
        id: false,
        }
        );
        const ThoughtSchema = new Schema(
            {
            thoughtText: {
            type: String,
            required: "Thought is Required",
            minlength: 1,
            maxlength: 280,
            },
            
            createdAt: {
            type: Date,
            default: Date.now,
            get: (timestamp) => dateFormat(timestamp)
            },
            username: {
            type: String,
            required: true,
            },

            // Array with reactionSchema //

reactions:[ReactionsSchema],
},
{
toJSON: {
virtuals: true,
getters: true,
},
id:false,
}
);

ThoughtSchema.virtual("reactionCount").get(function () {
return this.reactions.length;
});

const Thought = model("Thought", ThoughtSchema);

module.exports = Thought;