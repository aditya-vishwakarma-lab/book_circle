# book_circle

Book Circle is a Django-based web application designed to facilitate book sharing and community engagement. The project uses PostgreSQL for its database and is containerized using Docker for easy development and deployment.

## Features

- Django 5.2 backend
- REST API powered by Django REST Framework
- PostgreSQL database
- Dockerized development and production environments

## Getting Started

### Prerequisites

- Docker & Docker Compose
- Python 3.12 (for local development)
- PostgreSQL (for local development)

### Local Development

1. **Clone the repository:**
   ```sh
   git clone https://github.com/yourusername/book_circle.git
   cd book_circle
   ```

2. **Set up environment variables:**
   Edit `backend/.env` with your database credentials:
   ```
   USER=your_db_user
   PASSWORD=your_db_password
   ```

3. **Install dependencies:**
   ```sh
   cd backend
   pip install -r requirements.txt
   ```

4. **Run migrations:**
   ```sh
   python manage.py migrate
   ```

5. **Start the development server:**
   ```sh
   python manage.py runserver
   ```

### Using Docker

1. **Build and start containers:**
   ```sh
   docker-compose up --build
   ```

2. The web app will be available at [http://localhost:8000](http://localhost:8000).

### Running Tests

```sh
cd backend
python manage.py test
```

## Project Structure

```
book_circle/
├── backend/
│   ├── apps/
│   ├── book_circle/
│   ├── manage.py
│   ├── requirements.txt
│   └── .env
├── docker-compose.yml
├── Dockerfile
└── README.md
```

## Contributing

- Follow the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) specification for commit messages.
- Please submit issues and pull requests via GitHub.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
