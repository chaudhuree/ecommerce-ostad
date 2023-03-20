- here i have created a seperate route for change admin role:

```
//change user role
router.put("/admin/update-role", requireSignin, isAdmin, updateRole);
module.exports= router;
```

- and in the controller i have written the code:

```
// docs: update role
exports.updateRole = async (req, res) => {
  try {
    const { email, setRole } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.json({ error: "User not found" });
    }
    if (setRole === "admin") {
      const updated = await User.findByIdAndUpdate(
        user._id,
        {
          role: 1,
        },
        { new: true }
      );
      res.json(updated);
    } else {
      const updated = await User.findByIdAndUpdate(
        user._id,
        {
          role: 0,
        },
        { new: true }
      );
      res.json(updated);
    }
  } catch (error) {
    console.log(error.message);
  }
}
```

- in UserRole.jsx page i have writeen all client related codes.

<ol>
<li>first i have fetched all the code using fetchAllUsers function</li>
<li>then showed them after filtering out the logged in users data</li>
<li>after that i have showed two buttons there</li>
<li>one is admin and another is user</li>
<li>in both button there has onClick event to handleAdmin</li>
<li>after updating data we have again called fetchAllUsers</li>
<li>by this way new data is again fetched and table is updated with new data.</li>
</ol>