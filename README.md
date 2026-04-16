⚙️ Installation & Setup

1️⃣ Clone the repository
git clone https://github.com/Lohithsharma/spotify_backend.git
cd spotify_backend

2️⃣ Install dependencies
npm install

3️⃣ Setup environment variables
Create a .env file:
MONGO_URI=your_mongodb_url
JWT_SECRET=your_secret_key
IMAGEKIT_PRIVATE_KEY=your_key

4️⃣ Run the server
npm run dev

🔐 Authentication Flow

- User logs in → receives JWT token in cookies
- Token is verified in protected routes
- Role (user / artist) determines access

Routes:

🧑‍💻 Authentication
POST   /register
POST   /login
POST   /logout

🎵 Music
POST   /upload

📀 Albums
POST   /album
GET    /albums
GET    /albums/:albumID

🏠 General
GET    /
