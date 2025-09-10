# Book Circle

Book Circle is a web application built to promote affordable book reading by enabling seamless book sharing among peers, fostering a vibrant community of readers. It combines a Django backend with a React frontend and utilizes PostgreSQL as its database. The entire application is containerized using Docker to ensure smooth development and effortless deployment.

## Features

- Django 5.2 backend
- React frontend built with Vite
- PostgreSQL database
- Dockerized development and production environments

## Getting Started

### Prerequisites

- Docker & Docker Compose
- PostgreSQL (for local development)

### Local Development

1. **Clone the repository:**
   ```sh
   git clone https://github.com/aditya-vishwakarma-lab/book_circle.git
   cd book_circle
   ```

2. **Set up environment variables:**
   Create a `.env` file in the root of your project and add the following variables:
   ```
   # Database credentials
   USER=<your_database_user>
   PASSWORD=<your_database_password>
   
   # Backend Auth0 configuration
   IDENTIFIER=<your_auth0_api_identifier_url>
   AUTH0_DOMAIN=<your_auth0_api_domain>  
   AUTH0_API_AUDIENCE=<your_auth0_api_audience>  
   AUTH0_ALGORITHMS=["RS256"]
   
   # Development settings
   DEBUG=True
   CHOKIDAR_USEPOLLING=true
   PORT=5173
   
   # Frontend Auth0 config
   VITE_AUTH0_DOMAIN=<your_app_auth0_domain>
   VITE_AUTH0_CLIENT_ID=<your_app_auth0_client_id>
   VITE_API_BASE_URL=http://0.0.0.0:8000

   ```


3. **Build and start containers:**
   ```sh
   docker-compose up --build
   ```

4. The web app will be available at [http://localhost:8000](http://localhost:8000).

## Project Structure

```
book_circle/
├── backend/
│   ├── apps/
|   │   ├── books/
|   │   ├── borrow_requests/
|   │   ├── users/
│   ├── book_circle/
|   │   ├── settings.py
|   │   ├── urls.py
|   ├── Dockerfile
│   ├── manage.py
│   ├── pyproject.toml
│   └── validator.py
├── frontend/
|   ├── eslint.config.js
|   ├── src/
│   ├── Dockerfile
│   ├── package.json
│   └── vite.config.js
├── docker-compose.yml
└── README.md
```

## Contributing

- Follow the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) specification for commit messages.
- Please submit issues and pull requests via GitHub.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
