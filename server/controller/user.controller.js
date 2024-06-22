import User from '../models/users.model.js';

export const getUser = async (req, res) => {
    try {
        const { firebaseId } = req.params; // Use req.params instead of req.body
        const user = await User.findOne({ firebaseId });
        if (user) {
            return res.status(200).json(user);
        } else {
            return res.status(404).json({ message: 'User not found' });
        }
    } catch (err) {
        console.error("Error: " + err);
        return res.status(500).json({ message: 'Internal server error', error: err });
    }
};


export const addUser = async (req, res) => {
    try {
        console.log(req);
        const { userId, name, planType, totalAssets, purchaseDate, usedAssets } = req.body;

        // Check if the user already exists
        const existingUser = await User.findOne({ firebaseId: userId });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const newUser = new User({
            firebaseId: userId,
            name:name,
            planType:planType,
            totalAssets:totalAssets,
            purchaseDate:purchaseDate,
            usedAssets:usedAssets,
            // profilePicture: req.body.profilePicture, // Uncomment if using profilePicture
        });
        
        const savedUser = await newUser.save();
        return res.status(201).json(savedUser);
    } catch (err) {
        console.error("Error: " + err);
        return res.status(500).json({ message: 'Internal server error', error: err });
    }
};

export const addAsset = async (req, res) => {
    try {
        const { userId, planType, additionalAssets, purchaseDate } = req.body;

        const updatedUser = await User.findOneAndUpdate(
            { firebaseId: userId },
            {
                $set: {
                    planType: planType,
                    purchaseDate: purchaseDate
                },
                $inc: {
                    totalAssets: additionalAssets
                },
                $currentDate: { updatedAt: true }
            },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        return res.status(200).json(updatedUser);
    } catch (err) {
        console.error("Error: " + err);
        return res.status(500).json({ message: 'Internal server error', error: err });
    }
};

export const updateAssets = async (req, res) => {
    try {
        const { userId, additionalUsedAssets } = req.body;

        const updatedUser = await User.findOneAndUpdate(
            { firebaseId: userId },
            {
                $inc: {
                    usedAssets: additionalUsedAssets
                },
                $currentDate: { updatedAt: true }
            },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        return res.status(200).json(updatedUser);
    } catch (err) {
        console.error("Error: " + err);
        return res.status(500).json({ message: 'Internal server error', error: err });
    }
};
