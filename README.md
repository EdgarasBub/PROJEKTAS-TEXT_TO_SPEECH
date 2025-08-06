# 🎙️ Speech4You

**Speech4You** – tai AI pagrindu veikiantis teksto į kalbą (Text-to-Speech) konverteris, leidžiantis tekstinę informaciją paversti į natūralų garsą.

---

## 🚀 Funkcionalumas

- 🗣️ **Teksto į kalbą konvertavimas** (TTS)
- 👤 **Vartotojų registracija ir prisijungimas**
- 🔐 **Autentifikacija per JWT tokenus**
- 🧠 **AI balsai su regioniniais akcentais**
- 🛠️ **Administravimo API**
- 📱 **Responsyvus dizainas su Bootstrap 5**
- 🧩 **REST API integracija**

---

## 🧰 Naudotos technologijos

### 🖥️ Frontend
- `React` su `Vite`
- `TypeScript`
- `React Router DOM`
- `Bootstrap 5` + `Bootstrap Icons`

### 🛠️ Backend
- `Express.js`
- `MongoDB` su `Mongoose`
- `JWT` autentifikacija
- `bcrypt` slaptažodžių apsaugai
- `dotenv` konfigūracijai

---

## 📁 Projekto struktūra

```
Speech4You/
├── client2/
│   ├── public/
│   │   └── vite.svg
│   ├── src/
│   │   ├── api/
│   │   │   └── auth.js
│   │   ├── assets/
│   │   │   ├── background.jpg
│   │   │   └── react.svg
│   │   ├── components/
│   │   │   ├── Footer.tsx
│   │   │   └── NavBar.tsx
│   │   ├── context/
│   │   │   └── AuthContext.tsx
│   │   ├── pages/
│   │   │   ├── Home.tsx
│   │   │   ├── Login.tsx
│   │   │   ├── Signup.tsx
│   │   │   └── TextToSpeech.tsx
│   │   ├── styles/
│   │   │   ├── auth/
│   │   │   │   ├── login.css
│   │   │   │   ├── shared.css
│   │   │   │   └── signup.css
│   │   │   ├── tts/
│   │   │   │   ├── TextToSpeech.css
│   │   │   │   └── Utils.css
│   │   │   ├── Footer.css
│   │   │   ├── Home.css
│   │   │   └── NavBar.css
│   │   ├── utils/
│   │   │   └── tts.ts
│   │   ├── App.css
│   │   ├── App.tsx
│   │   ├── index.css
│   │   ├── main.tsx
│   │   └── vite-env.d.ts
│   ├── index.html
│   ├── package.json
│   ├── vite.config.ts
│   └── ...
├── server/
│   ├── controllers/
│   ├── middleware/
│   │   └── hashPassword.js
│   ├── models/
│   │   └── User.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── login.js
│   │   └── signup.js
│   ├── .env
│   ├── server.js
│   └── package.json
└── README.md
```

---

## ⚙️ Diegimo instrukcijos

### 🛠️ 1. Backend paleidimas

```bash
cd server
npm install
cp .env.example .env   # Sukurk .env failą pagal pavyzdį
npm run dev
```

✅ Backend bus pasiekiamas per: `http://localhost:5001`

---

### 💻 2. Frontend paleidimas

```bash
cd client2
npm install
npm run dev
```

✅ Frontend bus pasiekiamas per: `http://localhost:5173`

---

## 🔐 `.env` (backend)

```env
PORT=5001
dbUrl=mongodb+srv://<vartotojas>:<slaptažodis>@cluster0.dj0iv4k.mongodb.net/LoginInfo
SECRET=manoSecret123
```

---

## 📡 API Endpoint’ai

| Metodas | Endpoint        | Aprašymas                   |
| ------- | --------------- | --------------------------- |
| POST    | `/api/register` | Registruoti naują vartotoją |
| POST    | `/api/login`    | Prisijungti                 |
| GET     | `/api/user`     | Gauti vartotojo duomenis    |
| POST    | `/api/tts`      | Konvertuoti tekstą į garsą  |

---

## 👨‍💻 Autorius

Projektą sukūrė: **Edgariunė** 🦾  
> _"Jei balsas yra siela, tai šis projektas leidžia tavo kodui kalbėti."_

---
<img width="1887" height="851" alt="Screenshot 2025-08-06 194807" src="https://github.com/user-attachments/assets/8678b875-4bf6-4342-929a-87d4ee84a89e" />
<img width="1882" height="845" alt="Screenshot 2025-08-06 194838" src="https://github.com/user-attachments/assets/c7b2f37c-20c7-4188-94ee-e073b0261e18" />
<img width="1892" height="862" alt="Screenshot 2025-08-06 192414" src="https://github.com/user-attachments/assets/7afc764b-b184-4a50-9e95-c9a8fd54df9a" />
<img width="1885" height="332" alt="Screenshot 2025-08-06 195009" src="https://github.com/user-attachments/assets/2c56dc68-47c8-42e9-876d-a7154b7c6137" />
<img width="997" height="842" alt="Screenshot 2025-08-06 195525" src="https://github.com/user-attachments/assets/168e71b4-ff5b-4988-b467-759f1c5f2dde" />

