from flask import Flask, render_template, request, jsonify, session, redirect, url_for
from flask_babel import Babel, gettext, ngettext, lazy_gettext, get_locale, _
import time
import random
import os

app = Flask(__name__)
app.secret_key = os.environ.get('SECRET_KEY', 'dev-key-change-in-production')

# Configure Babel
app.config['LANGUAGES'] = {
    'en': 'English',
    'es': 'Español', 
    'fr': 'Français'
}
app.config['BABEL_DEFAULT_LOCALE'] = 'en'
app.config['BABEL_DEFAULT_TIMEZONE'] = 'UTC'

babel = Babel()

def get_locale():
    # 1. Check if language is in URL parameters
    if request.args.get('lang'):
        session['language'] = request.args.get('lang')
    # 2. Return language from session if set
    if 'language' in session and session['language'] in app.config['LANGUAGES'].keys():
        return session['language']
    # 3. Fall back to user's browser language preference
    return request.accept_languages.best_match(app.config['LANGUAGES'].keys()) or app.config['BABEL_DEFAULT_LOCALE']

babel.init_app(app, locale_selector=get_locale)

@app.context_processor
def inject_conf_vars():
    from flask_babel import get_locale
    return {
        'get_locale': get_locale,
        'LANGUAGES': app.config['LANGUAGES']
    }

@app.route('/')
def index():
    return render_template('index.html', languages=app.config['LANGUAGES'])

@app.route('/set_language/<language>')
def set_language(language=None):
    if language in app.config['LANGUAGES']:
        session['language'] = language
    return redirect(url_for('index'))

@app.route('/api/recommend', methods=['POST'])
def recommend_vendor():
    time.sleep(random.uniform(3, 5))
    return jsonify({'vendor': 'Trail of Bits'})

if __name__ == '__main__':
    app.run(debug=True)