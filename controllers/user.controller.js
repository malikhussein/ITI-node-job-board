import userModel from '../models/user.model.js';
import dotenv from 'dotenv';
dotenv.config();

/**
 * GET ALL USERS
 * GET /api/users
 */
export const getAllUsers = async (req, res) => {
  try {
    //  only admin can see all users
    if (req.user.role !== 'Admin') {
      return res
        .status(403)
        .json({
          success: false,
          message: 'Not authorized to see all users',
        });
    }

    // Exclude password returned docs { password: 0 }
    const users = await userModel.find({}, { password: 0 });
    res.status(200).json({ success: true, users });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Error fetching users',
      error: err.message,
    });
  }
};
/**
 * GET USER BY ID (Protected)
 * GET /api/users/:id
 */
export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    // only the owner  view their data
    // if (req.user.id !== id) {
    //   return res
    //     .status(403)
    //     .json({ success: false, message: 'Not authorized' });
    // }
    
    // ==>
    // edited to any one can veiw data
    // req.user ==> from the authMiddleware
    if (req.user.id)
    {
      const user = await userModel.findById(id, { password: 0 });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: 'User not found' });
    }

    res.status(200).json({ success: true, user });
    }
    
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Error fetching user by ID',
      error: err.message,
    });
  }
};
/**
 * SEARCH FOR USERS BY EMAIL
 * GET /api/users/email/:email
 */
export const searchByEmail = async (req, res) => {
  try {
    const { email } = req.params;

    const user = await userModel.findOne({ email }, { password: 0 });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: 'User not found' });
    }

    res.status(200).json({ success: true, user });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Error searching user by email',
      error: err.message,
    });
  }
};
/**
 * UPDATE USER
 * PUT /api/users/:id
 */
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    // only the user or the Admin is allowed to change the data 

    // If not admin, must be the same user
    if (req.user.role !== 'Admin' && req.user.id !== id) {
      return res
        .status(403)
        .json({ success: false, message: 'Not authorized' });
    }

    // If user is not admin, disallow changing the role
    if (req.user.role !== 'Admin' && req.body.role) {
      return res.status(403).json({
        success: false,
        message: 'You cannot change your role.',
      });
    }

    // Perform the update
    const updatedUser = await userModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedUser) {
      return res
        .status(404)
        .json({ success: false, message: 'User not found' });
    }

    // Hide password (different method)
    const { password, ...rest } = updatedUser.toObject();

    return res.status(200).json({
      success: true,
      message: 'User updated successfully',
      user: rest,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: 'Error updating user',
      error: err.message,
    });
  }
};
/**
 * DELETE ALL USERS
 * DELETE /api/users
 * Only Admin can perform this.
 */
export const deleteAllUsers = async (req, res) => {
  try {
    if (req.user.role !== 'Admin') {
      return res
        .status(403)
        .json({
          success: false,
          message: 'Not authorized to delete all users',
        });
    }

    // This will remove all users whose role !== 'Admin '
    const result = await userModel.deleteMany({ role: { $ne: 'Admin' } });
    return res.status(200).json({
      success: true,
      message: 'All non-admin users deleted successfully',
      deletedCount: result.deletedCount, // optional info
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: 'Error deleting all users',
      error: err.message,
    });
  }
};
/**
 * DELETE USER BY ID (BY user or admin)
 * DELETE /api/users/:id
 */
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    // If not admin, must be the same user
    if (req.user.role !== 'Admin' && req.user.id !== id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this user',
      });
    }

    const user = await userModel.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'User deleted successfully',
      user,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: 'Error deleting user',
      error: err.message,
    });
  }
};
