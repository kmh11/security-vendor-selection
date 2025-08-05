# Security Vendor Selection Tool

A Flask-based web application that helps organizations find the right security vendor for their projects based on various requirements including project type, budget, compliance needs, and technical specifications.

## Features

- Interactive form with comprehensive project assessment
- Real-time progress tracking during vendor analysis
- Responsive web interface with modern styling
- Support for various project types, industries, and compliance requirements
- Budget and timeline considerations
- Technology stack compatibility assessment

## Prerequisites

- Python 3.11 or higher
- [uv](https://github.com/astral-sh/uv) package manager

## Installation

1. **Install uv** (if not already installed):
   ```bash
   curl -LsSf https://astral.sh/uv/install.sh | sh
   ```

2. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd <repository-name>
   ```

3. **Install dependencies**:
   ```bash
   uv sync
   ```

## Running the Application

### Development Mode

Start the Flask development server:

```bash
uv run python app.py
```

The application will be available at `http://localhost:5000`

### Production Mode

For production deployment, you can use a WSGI server like Gunicorn:

```bash
# Run with gunicorn
uv run gunicorn -w 4 -b 0.0.0.0:8000 app:app
```

## Usage

1. Open your browser and navigate to `http://localhost:5000`
2. Fill out the comprehensive security vendor selection form:
   - **Project Information**: Name, type, and company size
   - **Security Requirements**: Assessment types, priority level, budget, and timeline
   - **Technical Requirements**: Technology stack, complexity, and codebase size
   - **Compliance & Industry**: Industry type, compliance requirements, and data sensitivity
3. Click "Find My Security Vendor" to get a recommendation
4. The system will analyze your requirements and recommend an appropriate security vendor

## Development

### Adding Dependencies

To add new Python packages:

```bash
uv add package-name
```

### Running in Debug Mode

The application runs in debug mode by default when using `uv run python app.py`. This enables:
- Automatic reloading on code changes
- Detailed error messages
- Debug toolbar (if installed)

### Environment Variables

You can set environment variables for configuration:

```bash
export FLASK_ENV=development
export FLASK_DEBUG=1
uv run python app.py
```

## API Endpoints

- `GET /` - Main application page
- `POST /api/recommend` - Vendor recommendation endpoint (accepts form data and returns JSON)
