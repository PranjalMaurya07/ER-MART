const User = require("../models/userModel");
const Order = require("../models/orderModel");
const bcrypt = require("bcryptjs");

const hashPassword = async (password) => {
  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  } catch (error) {
    console.log(error);
  }
};

const handleUserRegistration = async (req, res) => {
  try {
    const { name, email, password, phone, address, answer } = req.body;
    if (!name) {
      return res.status(400).send({ message: "Name is required" });
    }
    if (!email) {
      return res.status(400).send({ message: "Email is required" });
    }
    if (!password) {
      return res.status(400).send({ message: "Password is required" });
    }
    if (!phone) {
      return res.status(400).send({ message: "Phone is required" });
    }
    if (!address) {
      return res.status(400).send({ message: "Address is required" });
    }
    if (!answer) {
      return res.status(400).send({ message: "Answer is required" });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send({
        success: false,
        message: "Email already exists please login",
      });
    }
    const user = await User.create({
      name,
      email,
      password,
      phone,
      address,
      answer,
    });
    user.save();
    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      user,
    });
  } catch (e) {
    return res.status(400).send({
      success: false,
      message: "Some error occurred in registration",
      e,
    });
  }
};

async function handleUserLogin(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).send({
        success: false,
        message: "Invalid credentials",
      });
    } else {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).send({
          success: false,
          message: "Email is not registerd",
        });
      }
      const isMatch = await user.comparePassword(password);
      if (isMatch) {
        const token = await user.generateAuthTokens();
        console.log(token);
        return res.send({
          success: true,
          message: "Login successfully",
          user: {
            _id: user._id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            address: user.address,
            role: user.role,
          },
          token,
        });
      } else {
        return res.status(400).send({
          success: false,
          message: "Invalid credentials",
        });
      }
    }
  } catch (err) {
    return res.status(400).send({
      success: false,
      message: "Some error occurred",
      err,
    });
  }
}

async function handleDashboard(req, res) {
  return res.status(200).send({
    ok: true,
  });
}

async function handleForgetPassword(req, res) {
  try {
    const { email, answer, newPassword } = req.body;
    if (!email) {
      res.status(400).send({ message: "Email is required" });
    }
    if (!answer) {
      res.status(400).send({ message: "Answer is required" });
    }
    if (!newPassword) {
      res.status(400).send({ message: "New Password is required" });
    }

    const user = await User.findOne({ email, answer });

    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Wrong Email Or Answer",
      });
    }
    const newHashedPassword = await bcrypt.hash(newPassword, 10);
    await User.findByIdAndUpdate(user._id, { password: newHashedPassword });
    user.save();
    res.status(200).send({
      success: true,
      message: "Password Reset Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Something went wrong",
      error,
    });
  }
}

async function handleUpdateProfile(req, res) {
  try {
    const { name, password, address, phone } = req.body;
    const id = req.user.user_id;
    const user = await User.findById(id);

    //password
    if (password && password.length < 6) {
      return res.json({
        error: "Passsword is required and should be atleast 6 character long",
      });
    }
    const hashedPassword = password ? await hashPassword(password) : undefined;
    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        name: name || user.name,
        password: hashedPassword || user?.password,
        phone: phone || user.phone,
        address: address || user.address,
      },
      { new: true }
    );
    // updatedUser?.save();
    res.status(200).send({
      success: true,
      message: "Profile updated successfully",
      updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error while updating user profile",
      error,
    });
  }
}

//orders
async function handleGetOrdersController(req, res) {
  try {
    const orders = await Order.find({ buyer: req.user.user_id })
      .populate("products", "-photo")
      .populate("buyer", "name");
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while geting orders",
      error,
    });
  }
}

async function handleGetAllOrdersController(req, res) {
  try {
    const orders = await Order.find({})
      .populate("products", "-photo")
      .populate("buyer", "name")
      // .sort({ createdAt: "-1" });
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while geting all orders",
      error,
    });
  }
}

async function handleOrderStatusController(req, res) {
  try {
    const { orderId } = req.params;
    const { status } = req.body;
    const orders = await Order.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while updating order status",
      error,
    });
  }
}

async function testController(req, res) {
  return res.status(200).send("Allowed");
}

module.exports = {
  handleUserRegistration,
  handleUserLogin,
  handleDashboard,
  handleForgetPassword,
  handleUpdateProfile,
  handleGetOrdersController,
  handleGetAllOrdersController,
  handleOrderStatusController,
  testController,
};
