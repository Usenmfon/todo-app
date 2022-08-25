const mongoose = require("mongoose");
const { PaginatePlugin } = require("../config/paginate");

const TodoSchema = mongoose.Schema(
  {
    title: { type: String, required: [true, "enter the title"] },
    description: { type: String, required: [true, "enter the description"] },
    status: { type: Boolean, default: false}
  },
  {
    timestamps: true,
  }
);

TodoSchema.plugin(PaginatePlugin);
const Todo = mongoose.model("Todo", TodoSchema);

module.exports = Todo;
