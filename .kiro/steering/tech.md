# Technology Stack

## Frontend Technologies
- **HTML5/CSS3**: Modern web standards with responsive design
- **JavaScript/jQuery**: Interactive frontend functionality
- **Bootstrap**: CSS framework for responsive layout
- **Materialize CSS**: Material Design components
- **Font Awesome**: Icon library
- **SCSS/Sass**: CSS preprocessing

## Backend/Chatbot
- **Rasa 2.0.2**: Open-source conversational AI framework
- **Python**: Backend logic and custom actions
- **Docker**: Containerization for deployment

## Build System
- **Gulp**: Task runner for asset processing
- **Babel**: JavaScript transpilation
- **Sass**: CSS preprocessing
- **Uglify**: JavaScript minification

## Deployment
- **Heroku**: Cloud platform deployment
- **Docker**: Container-based deployment
- **Git**: Version control

## Common Commands

### Development
```bash
# Install dependencies
npm install

# Watch for changes and build assets
npm run watch

# Build assets manually
gulp scripts  # Build and minify JavaScript
gulp styles   # Compile SCSS to CSS
```

### Rasa Chatbot
```bash
# Train the Rasa model
rasa train

# Run Rasa server locally
rasa run -m models --enable-api --cors "*" --debug --port 5005

# Test conversations
rasa shell
```

### Deployment
```bash
# Deploy to Heroku (using Docker)
git push heroku main

# Build Docker image locally
docker build -t botanshul .

# Run Docker container
docker run -p 5005:5005 botanshul
```

## File Structure Notes
- Frontend assets are in root directory (`css/`, `js/`, `images/`)
- Rasa chatbot files are in `app/` directory
- Static chatbot interface files are in `static/` directory
- Build configuration in `gulpfile.js` and `package.json`