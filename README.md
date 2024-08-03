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
- Django REST Framework
- Django Simple JWT
- SQLite (for development)
- React JS
- React Router
- Axios
- CSS
- HTML
- Python
- JavaScript
- VSCode

## Installation

### Prerequisites

- Python 3.8+
- pip
- Node.js 14+
- npm 
- PostgreSQL (for production) or SQLite (for local development)

### Backend (Django)

1. **Clone the Repository**

   ```bash
   git clone https://github.com/SushiOnToast/Empower-Hacks-TutorLink.git
   cd TutorLink
   ```

2. **Navigate to the Backend Directory**

   ```bash
   cd backend
   ```

3. **Create a Virtual Environment**

   ```bash
   python -m venv env
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

   Replace `your_secret_key` with a strong secret key. You can generate one by using DJango's `django-admin` command or an online key generator:

   ```bash
   django-admin shell -c "from django.core.management.utils import get_random_secret_key;          print(get_random_secret_key())"

   ```

8. **Run Migrations**

   ```bash
   python manage.py migrate
   ```

9. **Create a Superuser (optional)**

   ```bash
   python manage.py createsuperuser
   ```

10. **Run the Development Server**

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


3. **Create a `.env` File**

   Create a `.env` file in the `frontend` directory with the following content:

   ```env
   VITE_API_URL = "http://127.0.0.1:8000/"
   ```

4. **Run the Development Server**

   ```bash
   npm run dev
   ```

   Your React frontend will be running at `http://localhost:5173`.

## Usage

1. Open your browser and navigate to `http://localhost:5173` to access the React frontend.
2. The frontend communicates with the Django backend to handle user authentication, profile management, and other features.

## Contributing

We welcome contributions! If you'd like to contribute to the project, please follow these steps:

1. Fork the repository.
2. Clone your fork to your local machine (`git clone https://github.com/SushiOnToast/Empower-Hacks-TutorLink.git`)
3. Create a new branch (`git checkout -b feature/your-feature-name`).
4. Make your changes.
5. Commit your changes (`git commit -am 'Add your commit message here'`).
6. Push to the branch (`git push origin feature/your-feature-name`).
7. Create a new Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.


