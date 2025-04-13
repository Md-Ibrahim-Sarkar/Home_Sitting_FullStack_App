import mongoose from "mongoose";



const AddressDetails = new mongoose.Schema({

  area: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  zipCode: {
    type: String,
    required: true
  },

}
)


const bookedSchema = new mongoose.Schema(
  {
    user: {
      type: String,
      required: true
    },
    serviceId: {
      type: String,
      required: true
    },
    date: {
      type: Date,
      required: true
    },
    status: {
      type: String,
      required: true
    },
    serviceOwnerEmail: {
      type: String,
      required: true
    },
    needs: {
      type: String,
    },
    serviceData: {
      type: mongoose.Schema.Types.Mixed,
      required: true
    },
    AddressDetails: AddressDetails
  },
  { timestamps: true }
)


const BookingServices = mongoose.model("BookingServices", bookedSchema)

export default BookingServices