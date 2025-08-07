# Stage 1: Build stage using python slim base
FROM python:3.12-slim AS builder

# Install uv binary (copy from official uv image or install via script)
COPY --from=ghcr.io/astral-sh/uv:latest /uv /bin/uv

# Set working directory
WORKDIR /backend

# Set Python environment variables
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Optionally create a virtual environment managed by uv
RUN uv venv /opt/venv

# Update PATH to prioritize virtual environment binaries
ENV PATH="/opt/venv/bin:$PATH"

# Copy only requirements file first for better caching
COPY requirements.txt /backend/

# Install dependencies using uv pip inside the venv
RUN uv pip install -r requirements.txt

# Copy the rest of the application code
COPY . /backend/

# Install the project itself in editable mode (optional, depending on project)
# RUN uv pip install -e .

# Stage 2: Production image
FROM python:3.12-slim

# Create a non-root user and directory
RUN useradd -m -r appuser && mkdir /backend && chown -R appuser /backend

WORKDIR /backend

# Copy the virtual environment and app from builder stage
COPY --from=builder /opt/venv /opt/venv
COPY --from=builder /backend /backend
COPY --from=builder /bin/uv /bin/uv

# Set PATH to use the copied virtual environment
ENV PATH="/opt/venv/bin:$PATH"

# Set Python environment variables
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Change ownership so appuser can access files
RUN chown -R appuser:appuser /opt/venv /backend

USER appuser

# Expose port
EXPOSE 8000

# Start the app (adjust as needed)
CMD ["gunicorn", "--bind", "0.0.0.0:8000", "--workers", "3", "book_circle.wsgi:application"]
