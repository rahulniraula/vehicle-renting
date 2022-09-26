const mongoose = require("../config/mongooseConfig");
const { validateEmail } = require("../util");
const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    middleName: {
        type: String
    },
    lastName: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["Customer", "Service Provider"],
        default: "Customer"
    },
    email: {
        type: String,
        required: true,
        unique: [true, "This email is already taken. Please choose a different one"],
        validate: {
            validator: validateEmail,
            message: 'Please enter a valid email address'
        }
    },
    password: {
        type: String,
        required: true,
    },
});
module.exports.User = mongoose.model("User", userSchema);

const bookingSchema = mongoose.Schema({
    dateFrom: {
        type: Date,
        required: true
    },
    dateTo: {
        type: Date,
        required: true
    },
    confirmed: {
        type: Boolean,
        required: true
    }
})
const priceSchema = mongoose.Schema({
    date: {
        type: Date,
    },
    price: {
        type: Number,
    }
})
const vehicleSchema = mongoose.Schema({
    vehicleType: {
        type: String,
        enum: ['Car', 'Jeep', 'Bike', 'Bus'],
        required: true
    },
    vehicleBrand: {
        type: String,
        required: true
    },
    vehicleTransmission: {
        type: String,
        enum: ["Automatic", "Manual", "Hybrid"],
        required: true
    },
    availability: {
        type: [String],
        enum: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        required: true
    },
    description: {
        type: String,
        required: true
    },
    longitude: {
        type: Number,
        required: true
    },

    latitude: {
        type: Number,
        required: true
    },
    prices: {
        type: [priceSchema]
    },
    images: {
        type: [String],
        required: true
    },
    description: {
        type: String
    },
    bookings: {
        type: bookingSchema,
        require: false
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
}, {
    virtuals: {
        todaysRate: {
            get() {
                let filt=this.prices.filter(i=>i.date>new Date());
                filt.sort((a,b)=>a.date-b.date)
                return filt[0].price;
            }
        }
    },
    toObject: {
        virtuals: true
    },
    toJSON: {
        virtuals: true
    }
})


module.exports.Vehicle = mongoose.model("Vehicle", vehicleSchema);
