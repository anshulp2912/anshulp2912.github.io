# Project Structure

## Root Directory
- `index.html` - Main portfolio website
- `package.json` - Node.js dependencies and scripts
- `gulpfile.js` - Build automation tasks
- `Dockerfile` - Container configuration for Rasa deployment
- `heroku.yml` - Heroku deployment configuration
- `server.sh` - Rasa server startup script

## Frontend Assets
```
css/                    # Compiled stylesheets
├── bootstrap.min.css   # Bootstrap framework
└── styles.css          # Main compiled styles

scss/                   # Source stylesheets
└── styles.scss         # Main SCSS file

js/                     # JavaScript files
├── scripts.js          # Main JavaScript source
└── scripts.min.js      # Minified JavaScript

images/                 # Portfolio images and assets
├── resume.pdf          # Downloadable resume
├── project screenshots # Various project images
└── profile images      # Personal and bot avatars

libs/                   # Third-party libraries
└── font-awesome/       # Icon fonts and styles
```

## Chatbot Components
```
app/                    # Rasa chatbot application
├── config.yml          # Rasa NLU and Core configuration
├── domain.yml          # Bot responses, intents, entities
├── endpoints.yml       # External service endpoints
├── credentials.yml     # Authentication credentials
├── data/               # Training data
│   ├── nlu.yml         # Natural language understanding
│   ├── stories.yml     # Conversation flows
│   └── rules.yml       # Rule-based responses
├── actions/            # Custom Python actions
├── models/             # Trained Rasa models
└── tests/              # Test conversations

static/                 # Chatbot web interface
├── css/                # Chatbot-specific styles
├── js/                 # Chatbot JavaScript logic
└── img/                # Chatbot UI images
```

## Configuration Files
- `.gitignore` - Git ignore patterns
- `LICENSE.md` - MIT license
- `heroku_deploy/README.md` - Deployment documentation

## Architecture Patterns

### Dual Interface Design
The project implements a dual-interface approach:
1. **Traditional Portfolio**: Standard web portfolio in `index.html`
2. **Conversational Interface**: Rasa chatbot embedded in the same page

### Separation of Concerns
- **Frontend Logic**: jQuery-based interactions in `static/js/script.js`
- **Chatbot Logic**: Rasa framework handles NLU/NLM in `app/` directory
- **Styling**: Modular SCSS compilation via Gulp
- **Deployment**: Containerized Rasa backend with static frontend

### Data Flow
1. User interacts with chatbot widget on portfolio page
2. Frontend JavaScript sends messages to Rasa webhook API
3. Rasa processes intent and generates appropriate response
4. Response rendered in chat interface with rich UI components

## Development Workflow
1. Frontend changes: Edit SCSS/JS → Run `gulp watch` → Test in browser
2. Chatbot changes: Edit `app/` files → Run `rasa train` → Test with `rasa shell`
3. Deployment: Commit changes → Push to Heroku → Docker builds and deploys