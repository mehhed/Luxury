# Website name : Luxury
# Website Live Link : 
- [Live link](https://luxury-realstate-assignment.netlify.app)

# Explanation of all pages features.

# Home 

1) Navbar 🚀:
   - Intuitive navigation for a seamless user experience.
2) Banner/Slider 🎨:
   - Captivating visuals to engage and attract users.
3) Advertisement Section 🏡:
   - Attractive property cards (admin-verified) with a direct route to property details.
4) Latest User Review Section 🌟:
   - Dynamic display of recent user reviews for instant credibility.

# All Properties 🏡
1) Verified Properties 🌟:
   - Showcase admin-verified properties for user trust.
2) Search Functionality 🔍:
   - Swift property search by title for an enhanced user experience.
3) Sort Functionality 🔄:
   - Empower users with dynamic sorting options based on price range.

# Dashboard 📊
1) Role-Based Routes ✨:
   - Custom navigation links based on user roles (Normal user, Agent, Admin).
2) Different Dashboards 📝:
   - User Dashboard, Agent Dashboard, and Admin Dashboard catering to distinct needs.

# Admin Dashboard 👑
- Admin Profile Page:
1) Display admin information (name, image, role) 🌐:
   - Present admin details with a touch of professionalism.

- Manage Properties Page:
2) View all properties added by agents 🏡:
   - Navigate through properties seamlessly.
3) Table with property details (title, location, agent, email, price range) 📊:
   - Organized display of property information.
4) Verify and reject buttons for admin to manage property status ✅❌:
   - Admin controls for property verification.

- Manage Users Page:
1) Tabular view of all users 👥:
   - Simplified user management.
2) User details (name, email) 🧑‍💻:
   - Quick access to user information.
3) Admin actions: Make admin, make agent, mark as fraud, delete user ⚙:
   - Streamlined user administration.

- Manage Reviews Page:
1) Display user reviews for all properties 📝:
   - Efficient management of property reviews.
2) Admin can delete reviews 🗑:
   - Quick removal of irrelevant or inappropriate reviews.

- Advertise Property Page:
1) Admin can view all verified properties 🌟:
   - Easy access to verified property details.
2) Table with property details (image, title, price range, agent) 📊🏡:
   - Organized display of property information.
3) Advertise and Remove Advertise buttons for admin to manage property advertisements 🚀🔄:
   - Dynamic controls for property advertisement management.
4) Maximum 6 properties can be advertised 🌐6️⃣:
   - Limitation on the number of advertised properties.


# Agent DashBoard 👤

- Agent Profile Page:
1) Display agent information (name, image, role) 🌟:
   - Present agent details with a touch of professionalism.

- Add Property Page:
1) Form to add a new property (title, location, image upload, agent details, price range) 🏠📝:
   - Simplified property addition with an intuitive form.

- My Added Properties Page:
1) View all properties added by the agent 🌐:
   - Navigate through agent's properties seamlessly.
2) Table with property details 📊:
   - Organized display of property information.
3) Verify status managed by the admin ✅:
   - Admin-controlled property verification.
4) Update and delete buttons for property management 🔄🗑:
   - Dynamic controls for property updates and removal.

- Requested/Offered Properties Page:
1) Tabular View 🗂:
   - Present all offers in a clear and organized table for easy reference.
- Accept and Reject Buttons ✅❌:
1) Accept Button:
   - Empowers agents to approve offers efficiently.
   - Initiates the property transaction process.
2) Reject Button:
   - Allows agents to decline offers with a simple click.
   - Provides a streamlined approach to managing property offers.


# User Dashboard 🏡👤

- My Profile Page 📋👥
1) Display User Information 📷👤:
   - Showcase user details such as name, image, and role.
- Wishlist Page 💭🌟
1) View Wishlisted Properties 🌐💼:
   - Display a table with property details for all wishlisted properties.
   - Include "Make an Offer" and "Remove" buttons for user convenience.
- Property Bought Page 🏠🛍
1) View Properties with Offers 📑💸:
   - Present a table with property details and offer status for purchased properties.
   - Include a "Pay" button for seamless transaction completion.
   - if that properties agent accept offer then enable payment method.
- My Reviews Page 📝👀
1) View and Manage Reviews 📊👥:
   - Display a table with review details for user convenience.
   - Implement a "Delete" button for easy review management.

# Authentication Service 🔐
- Create an authentication service responsible for handling user login, registration, and token management.
1) JWT Generation on Login 🚪:
   - When a user successfully logs in, generate a JWT containing user information and role.
   - Include an expiration time to enhance security.
2) Token Storage 💾:
   - Store the JWT securely on the client-side, usually in a cookie or localStorage.
3) Access Control Middleware 🚧:
   - Implement middleware to check the user's role and allow or deny access to specific routes accordingly.
   - This middleware should verify the JWT before granting access.
4) Logout 🚪:
   - When the user logs out, remove the token from storage to invalidate it.
5) Registration 📝:
   - Implement a registration form for users to create an account.
   - Store user details securely in the database.
6)  Login and Register Pages 🌐:
   - Create separate pages for login and registration.
   - Toggle between these pages based on user interaction.
7)  User Interface 🎨:
   - Design an intuitive user interface for the login and registration forms.
