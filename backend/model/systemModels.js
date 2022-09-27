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
        enum: ["Customer", "Driver"],
        required:true
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
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
})
const priceSchema = mongoose.Schema({
    date: {
        type: Date,
        require:true,
        validate:{
            validator:function(v){
                return v;
            },
            message:'Please input a valid date for price'
        }
    },
    price: {
        type: Number,
        required:true,
        validate:{
            validator:function(v){
                return v;
            },
            message:'Please input a valid price'
        }
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
    location:{
        type:[Number],
        required:true,
        validate:{
            validator(v){
                if(v[0]==0 || v[1]==0){
                    return false
                }
                return true;
            },
            message:'Please provide valid location coordinates'

        },
    },
    prices: {
        type: [priceSchema],
        required:true
    },
    images: {
        type: [String],
        required: true,
        validate:{
            validator(v){
                return v[0]
            },
            message:'Please provide atleast one image'
        }
    },
    description: {
        type: String,
        required: true
    },
    bookings: {
        type: bookingSchema,
        require: false
    },
    userId: {
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
vehicleSchema.index({location:'2d'})


module.exports.Vehicle = mongoose.model("Vehicle", vehicleSchema);
