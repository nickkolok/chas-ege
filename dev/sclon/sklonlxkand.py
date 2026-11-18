import pymorphy2
import sys
import json

morph = pymorphy2.MorphAnalyzer()

def sklonlxkand(slovo):
    parsed_word = morph.parse(slovo)[0]

    # Singular forms
    singular = {
        'ie': parsed_word.inflect({'nomn'}).word if parsed_word.inflect({'nomn'}) else "",  # именительный
        're': parsed_word.inflect({'gent'}).word if parsed_word.inflect({'gent'}) else "",  # родительный
        'de': parsed_word.inflect({'datv'}).word if parsed_word.inflect({'datv'}) else "",  # дательный
        've': parsed_word.inflect({'accs'}).word if parsed_word.inflect({'accs'}) else "",  # винительный
        'te': parsed_word.inflect({'ablt'}).word if parsed_word.inflect({'ablt'}) else "",  # творительный
        'pe': parsed_word.inflect({'loct'}).word if parsed_word.inflect({'loct'}) else "",  # предложный
    }

    # Plural forms
    plural = {
        'im': parsed_word.inflect({'nomn', 'plur'}).word if parsed_word.inflect({'nomn', 'plur'}) else "",  # именительный
        'rm': parsed_word.inflect({'gent', 'plur'}).word if parsed_word.inflect({'gent', 'plur'}) else "",  # родительный
        'dm': parsed_word.inflect({'datv', 'plur'}).word if parsed_word.inflect({'datv', 'plur'}) else "",  # дательный
        'vm': parsed_word.inflect({'accs', 'plur'}).word if parsed_word.inflect({'accs', 'plur'}) else "",  # винительный
        'tm': parsed_word.inflect({'ablt', 'plur'}).word if parsed_word.inflect({'ablt', 'plur'}) else "",  # творительный
        'pm': parsed_word.inflect({'loct', 'plur'}).word if parsed_word.inflect({'loct', 'plur'}) else "",  # предложный
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

    # Combine all results into a dictionary
    result = {
        **singular,
        **plural,
        'rod': rod,
        'odu': odu
    }

    return result

if __name__ == "__main__":
    word = sys.argv[1]
    result = sklonlxkand(word)
    print(json.dumps(result, ensure_ascii=False))
