const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const complaintSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    body: {
      type: String,
      required: true,
      trim: true,
    },
    issuerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tourist",
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Resolved"],
      default: "Pending",
      required: true,
    },
    reply: {
      type: String,
      trim: true,
      validate: {
        validator: function (value) {
          return (
            this.status !== "Resolved" || (this.status === "Resolved" && value)
          );
        },
        message: "Reply is required when the complaint status is 'Resolved'.",
      },
    },
  },
  { timestamps: true }
);

complaintSchema.index({ title: "text", body: "text" });

const Complaint = mongoose.model("Complaint", complaintSchema);
module.exports = Complaint;
