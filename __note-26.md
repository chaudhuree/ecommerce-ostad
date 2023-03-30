> email functionality

- create account in sendgrid and get the api key
- put it in server side env
- install packages
- add this code in product.js controller file

```
require("dotenv").config();
sgMail.setApiKey(process.env.SENDGRID_KEY);
```

- email sending codes

```
 // // prepare email
    const emailData = {
      from: process.env.EMAIL_FROM,
      to: order.buyer.email,
      subject: "Order status",
      html: `
        <h1>Hi ${order.buyer.name}, Your order's status is: <span style="color:red;">${order.status}</span></h1>
        <p>Visit <a href="${process.env.CLIENT_URL}/dashboard/user/orders">your dashboard</a> for more details</p>
      `,
    };

    try {
      await sgMail.send(emailData);
    } catch (err) {
      console.log(err);
    }
```

- have to loggend in as admin with the same user email which is verified sender in sendgrid
- then send email to the user
