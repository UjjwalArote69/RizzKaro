const User = require('../models/user.model');

module.exports.registerUser = async (req, res) => {
  try {
    const { firstname, lastname, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'User already exists' });
    }

    const hashedPassword = await User.hashPassword(password); // ✅ using static method correctly

    const newUser = await User.create({
      fullname: { firstname, lastname },
      email,
      password: hashedPassword,
    });

    const token = newUser.generateAuthToken();

    res.status(201).json({
      message: 'User registered successfully',
      user: {
        _id: newUser._id,
        fullname: newUser.fullname,
        email: newUser.email,
        token,
      },
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Something went wrong during registration' });
  }
};

module.exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email }).select('+password');
    if (!user) return res.status(400).json({ message: 'Invalid email or password' });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid email or password' });

    const token = user.generateAuthToken();

    res.json({
      message: 'Login successful',
      user: {
        _id: user._id,
        fullname: user.fullname,
        email: user.email,
        token,
      },
    });
    // console.log('JWT SECRET:', process.env.JWT_SECRET);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    res.status(200).json({ user });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch profile' });
  }
};