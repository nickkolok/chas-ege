from flask import Flask, request, jsonify
from flask_cors import CORS
import pymorphy2

app = Flask(__name__)
CORS(app)  # Разрешаем CORS для фронтенда
morph = pymorphy2.MorphAnalyzer()

@app.route('/api/sklon', methods=['GET'])
def handle_sklon():
    word = request.args.get('word')
    
    if not word:
        return jsonify({'error': 'Параметр word обязателен'}), 400
    
    try:
        result = sklonlxkand(word)
        return jsonify(result)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

def sklonlxkand(slovo):
    parsed_word = morph.parse(slovo)[0]
    
    singular = {
        'ie': parsed_word.inflect({'nomn'}).word,
        're': parsed_word.inflect({'gent'}).word,
        'de': parsed_word.inflect({'datv'}).word,
        've': parsed_word.inflect({'accs'}).word,
        'te': parsed_word.inflect({'ablt'}).word,
        'pe': parsed_word.inflect({'loct'}).word,
    }

    plural = {
        'im': parsed_word.inflect({'nomn', 'plur'}).word,
        'rm': parsed_word.inflect({'gent', 'plur'}).word,
        'dm': parsed_word.inflect({'datv', 'plur'}).word,
        'vm': parsed_word.inflect({'accs', 'plur'}).word,
        'tm': parsed_word.inflect({'ablt', 'plur'}).word,
        'pm': parsed_word.inflect({'loct', 'plur'}).word,
    }

    gender_map = {'masc':0, 'femn':1, 'neut':2, 'plur':3}
    gender_tag = parsed_word.tag.gender or ('plur' if 'plur' in parsed_word.tag else None)
    
    return {
        **singular,
        **plural,
        'rod': gender_map.get(gender_tag, 3),
        'odu': 1 if 'anim' in parsed_word.tag else 0
    }

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
