const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://tettehk537:Q1w2e3r4t5y6@cluster0.dskip37.mongodb.net/').then(()=> console.log('MongoDB connected successfully')).catch((err)=> console.log(err));

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    age: Number,
    isActive: Boolean,
    tags: [String],
    createdAt: {type: Date, default: Date.now}
});

// create user models
const User = mongoose.model('User', userSchema);

async function runQueryExamples(){
    try{
        // create a new document
        const newUser = await User.create({
            name: 'Updated User',
            email: 'updateduser@email.com',
            age: 75,
            isActive: true,
            tags: ['Fullstack DevOp']
        });

        // const newUser = new User({
        //     name: 'Kelly Tetteh',
        //     email: 'kellytky@gmail.com',
        //     age: '21',
        //     isActive: true,
        //     tags: ['Fullstack DevOp', 'Cybersecurity personnel', 'Database Administrator']
        // });

        // await newUser.save()

        console.log('Created new user', newUser);

        // const allUsers = await User.find({});
        // console.log(allUsers);

        // const getUserName = await User.find({name: 'Kelvin Tetteh'});
        // console.log(getUserName);

        // const getLastCreatedUserById = await User.findById(newUser._id)
        // console.log(getLastCreatedUserById)

        // const selectedFields = await User.find().select('name email -_id');
        // console.log(selectedFields);

        // const limitedUsers = await User.find().limit(5).skip(1);
        // console.log("1st 5 users except the first user",limitedUsers);

        // const sortedUsers = await User.find().sort({age: 1});
        // console.log(sortedUsers);

        // const countDocuments = await User.countDocuments({isActive: true});
        // console.log('Count Documents', countDocuments);

        // const deletedUser = await User.findByIdAndDelete(newUser._id);
        // console.log('deleted user', deletedUser);

        const updatedUser = await User.findByIdAndUpdate(newUser._id, {$set : {age: 100}, $push: {tags: 'updated'}
        }, {new: true});
        console.log('Updated User:', updatedUser);

    } catch(e){
        console.log('Error ->', e);
    } finally{
        await mongoose.connection.close();
    }
}

runQueryExamples();