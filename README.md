# TutorLink

TutorLink is a platform designed to connect students with volunteers for personalized tutoring and resource sharing. The project consists of a Django backend and a React frontend.

## Table of Contents

- [Features](#features)
- [Built with](#builtwith)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Features

- User authentication with JWT
- User registration and login
- Resource creation functionality
- Connection with volunteers
- Resource library
- Find a Tutor

## Built with
- Django
- Django Rest framework
- React JS

## Installation

### Prerequisites

- Python 3.8+
- Node.js 14+
- npm or Yarn
- PostgreSQL (for production) or SQLite (for local development)

### Backend (Django)

1. **Clone the Repository**

   ```bash
   git clone https://github.com/SushiOnToast/tutorlink.git
   cd tutorlink
   ```

2. **Navigate to the Backend Directory**

   ```bash
   cd backend
   ```

3. **Create a Virtual Environment**

   ```bash
   python -m venv venv
   ```

4. **Activate the Virtual Environment**

   - On Windows:

     ```bash
     venv\Scripts\activate
     ```

   - On macOS/Linux:

     ```bash
     source venv/bin/activate
     ```

5. **Install Dependencies**

   ```bash
   pip install -r requirements.txt
   ```

6. **Create a `.env` File**

   Create a `.env` file in the `backend` directory with the following content:

   ```env
   DJANGO_SECRET_KEY=your_secret_key
   DEBUG=True
   ```

   Replace `your_secret_key` with a strong secret key.

7. **Run Migrations**

   ```bash
   python manage.py migrate
   ```

8. **Create a Superuser (optional)**

   ```bash
   python manage.py createsuperuser
   ```

9. **Run the Development Server**

   ```bash
   python manage.py runserver
   ```

   Your Django backend will be running at `http://localhost:8000`.

### Frontend (React)

1. **Navigate to the Frontend Directory**

   ```bash
   cd ../frontend
   ```

2. **Install Dependencies**

   ```bash
   npm install axios jwt-decode react-router-dom styled-components
   ```

   Or, if you prefer Yarn:

   ```bash
   yarn install axios jwt-decode react-router-dom styled-components
   ```

3. **Create a `.env` File**

   Create a `.env` file in the `frontend` directory with the following content:

   ```env
   VITE_API_URL = "http://127.0.0.1:8000/"
   ```

4. **Run the Development Server**

   ```bash
   npm start
   ```

   Or, if you use Yarn:

   ```bash
   yarn start
   ```

   Your React frontend will be running at `http://localhost:5173`.

## Usage

1. Open your browser and navigate to `http://localhost:5173` to access the React frontend.
2. The frontend communicates with the Django backend to handle user authentication, profile management, and other features.

## Contributing

We welcome contributions! If you'd like to contribute to the project, please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes.
4. Commit your changes (`git commit -am 'Add new feature'`).
5. Push to the branch (`git push origin feature-branch`).
6. Create a new Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Feel free to add any additional information that might be relevant for your project!
