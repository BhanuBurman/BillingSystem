import User from '../models/users.model.js';

export const getUser = async (req, res) => {
    try {
        console.log("Started getting user...");
        const { firebaseId } = req.params;
        console.log("firebaseId: " + firebaseId);
        const user = await User.findOne({ firebaseId });
        console.log("user: " + user);
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
        const { userId, name, planType, additionalAssets, purchaseDate, usedAssets } = req.body;
        
        // Check if the user already exists
        let user = await User.findOne({ firebaseId: userId });

        if (user) {
            // Update existing user
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
        } else {
            // Create new user
            const newUser = new User({
                firebaseId: userId,
                name: name,
                planType: planType,
                totalAssets: additionalAssets,
                purchaseDate: purchaseDate,
                usedAssets: usedAssets,
            });

            const savedUser = await newUser.save();
            return res.status(201).json(savedUser);
        }
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
