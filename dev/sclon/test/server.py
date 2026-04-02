from flask import Flask, request, jsonify
import pymorphy2

app = Flask(__name__)
morph = pymorphy2.MorphAnalyzer()

@app.route('/sklonlxkand', methods=['POST'])
def sklonlxkand():
    data = request.json
    slovo = data.get('slovo', '')

    parsed_word = morph.parse(slovo)[0]

    # Singular forms
    singular = {
        'ie': parsed_word.inflect({'nomn'}).word,  # именительный
        're': parsed_word.inflect({'gent'}).word,  # родительный
        'de': parsed_word.inflect({'datv'}).word,  # дательный
        've': parsed_word.inflect({'accs'}).word,  # винительный
        'te': parsed_word.inflect({'ablt'}).word,  # творительный
        'pe': parsed_word.inflect({'loct'}).word,  # предложный
    }

    # Plural forms
    plural = {
        'im': parsed_word.inflect({'nomn', 'plur'}).word,  # именительный
        'rm': parsed_word.inflect({'gent', 'plur'}).word,  # родительный
        'dm': parsed_word.inflect({'datv', 'plur'}).word,  # дательный
        'vm': parsed_word.inflect({'accs', 'plur'}).word,  # винительный
        'tm': parsed_word.inflect({'ablt', 'plur'}).word,  # творительный
        'pm': parsed_word.inflect({'loct', 'plur'}).word,  # предложный
    }

    # Gender (rod)
    gender_map = {
        'masc': 0,  # мужской
        'femn': 1,  # женский
        'neut': 2,  # средний
        'plur': 3,  # только множественное число
    }
    gender_tag = parsed_word.tag.gender
    if gender_tag is None and 'plur' in parsed_word.tag: gender_tag = 'plur'
    rod = gender_map.get(gender_tag, 3)  # Default to plural if gender is not found

    # Animacy (odu)
    odu = 1 if 'anim' in parsed_word.tag else 0  # 1: одушевлённое, 0: неодушевлённое

    return jsonify({
        **singular,
        **plural,
        'rod': rod,
        'odu': odu,
    })

if __name__ == '__main__':
    app.run(debug=True)
