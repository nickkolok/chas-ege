// Константы
const emptySymbol = '*';
const CROSSWORD_STYLES = {
	CELL: {
		WIDTH: '35px',
		HEIGHT: '35px',
		BASE: 'text-align: center; vertical-align: middle; position: relative; font-size: 16px;',
		EMPTY: 'background-color: #6e6e6e; border: 1px solid #000;',
		FILLED: 'background-color: white; border: 2px solid #000; font-weight: bold;'
	},
	CONTAINER: 'margin: 40px 0; padding: 20px 0; page-break-inside: avoid; border-top: 1px solid #eee;',
	TABLE: 'border-collapse: collapse; border: 2px solid #000; background-color: white; margin: 0 auto;'
};

// Вспомогательные функции
function getVariantTitle(variantNumber) {
	return options.vanishVariants ? '' : `<h3>Вариант №${options.variantPrefix}${variantNumber}</h3>`;
}

function getCrosswordId(variantNumber, withAnswers) {
	return `crossword-variant-${variantNumber}-${withAnswers ? 'with-answers' : 'without-answers'}`;
}

function getAllAnswersForVariant(variantNum) {
	if (!crosswordAnswers[variantNum]) return [];

	return Object.values(crosswordAnswers[variantNum])
		.flat()
		.map(answerArray => answerArray.join(''));
}

function getOrientation(word) {
	const orientationMap = {
		'across': 'по горизонтали',
		'down': 'по вертикали',
		'none': ''
	};

	return orientationMap[word.orientation] || word.orientation;
}

// Функции для работы с ячейками
function getCellContent(cellValue, cellNumber, showAnswers) {
	if (cellValue === emptySymbol) {
		return '&nbsp;';
	}

	let content = showAnswers ? cellValue : '&nbsp;';

	if (cellNumber > 0) {
		content = `
            <span style="position: absolute; top: 2px; left: 2px; font-size: 10px; font-weight: normal; color: #000;">
                ${cellNumber}
            </span>
            <span style="display: inline-block; margin-top: 8px;">
                ${content === '&nbsp;' ? '&nbsp;' : content}
            </span>
        `;
	}

	return content;
}

function getCellStyle(cellValue) {
	const baseStyle = `${CROSSWORD_STYLES.CELL.BASE} width: ${CROSSWORD_STYLES.CELL.WIDTH}; height: ${CROSSWORD_STYLES.CELL.HEIGHT};`;

	if (cellValue === emptySymbol) {
		return `${baseStyle} ${CROSSWORD_STYLES.CELL.EMPTY}`;
	}

	return `${baseStyle} ${CROSSWORD_STYLES.CELL.FILLED}`;
}

// Функции для работы с номерами ячеек
function initializeCellNumbers(rows, cols) {
	return Array(rows).fill().map(() => Array(cols).fill(0));
}

function populateCellNumbers(cellNumbers, words) {
	words.forEach(word => {
		const x = word.startx - 1;
		const y = word.starty - 1;

		if (y >= 0 && y < cellNumbers.length && x >= 0 && x < cellNumbers[0]?.length) {
			cellNumbers[y][x] = word.position;
		}
	});
}

// Функции для создания таблицы
function addTable(crosswordData, cellNumbers, showAnswers = false) {
	validateCrosswordData(crosswordData);

	let html = '';

	for (let y = 0; y < crosswordData.rows; y++) {
		html += '<tr>';

		for (let x = 0; x < crosswordData.cols; x++) {
			const cellValue = crosswordData.table[y][x];
			const cellNumber = cellNumbers[y]?.[x] || 0;
			const cellContent = getCellContent(cellValue, cellNumber, showAnswers);
			const cellStyle = getCellStyle(cellValue);

			html += `<td style="${cellStyle}">${cellContent}</td>`;
		}

		html += '</tr>';
	}

	return html;
}

// Функции для списка вопросов
function addList(word, withAnswers = false) {
	let string = word.position ? `${word.position} ${getOrientation(word)}` : 'не присутствует в кроссворде';

	if (withAnswers) {
		string += ` Ответ: ${word.answer}`;
	} else {
		string += ' ____________________';
	}

	return `<li style="margin-bottom: 10px;">${string}</li>`;
}

function addQuestionList(words, title, showAnswers) {
	let html = `
        <div style="margin-top: 20px;">
            <h4>${title}</h4>
            <ol>
    `;

	words.forEach(word => {
		html += addList(word, showAnswers);
	});

	html += '</ol></div>';
	return html;
}

// Основные функции кроссворда
function createCrosswordDataFromAnyArray(flatArray) {
	return flatArray.map(answer => ({
		clue: "",
		answer: answer
	}));
}

function createCrosswordTable(crosswordData, showAnswers = false, variantNumber) {
	if (!crosswordData?.table) 
		return '';

	const title = `${showAnswers ? 'Кроссворд из ответов' : 'Кроссворд без ответов'} для Варианта № ${variantNumber}`;
	const listTitle = showAnswers ? 'Ответы: ' : 'Вопросы для заполнения: ';
	const crosswordId = getCrosswordId(variantNumber, showAnswers);

	let html = `
        <div class="crossword-container" id="${crosswordId}" style="${CROSSWORD_STYLES.CONTAINER}">
            <h3>${title}</h3>
            <table class="crossword-table" style="${CROSSWORD_STYLES.TABLE}">
    `;

	const cellNumbers = initializeCellNumbers(crosswordData.rows, crosswordData.cols);
	populateCellNumbers(cellNumbers, crosswordData.result);

	html += addTable(crosswordData, cellNumbers, showAnswers);
	html += '</table>';
	html += addQuestionList(crosswordData.result, listTitle, showAnswers);
	html += '</div>';

	return html;
}

function addCrossword(withAnswers = false) {
	const allAnswers = getAllAnswersForVariant(variantNumber);
	const crosswordInput = createCrosswordDataFromAnyArray(allAnswers);

	try {
		crosswordData[variantNumber] = generateLayout(crosswordInput, emptySymbol);

		return `
            <div class="variant-crossword" id="${getCrosswordId(variantNumber, withAnswers)}" 
                 style="page-break-before: always; margin-bottom: 30px;">
                ${getVariantTitle(variantNumber)}
                ${createCrosswordTable(crosswordData[variantNumber], withAnswers, variantNumber)}
            </div>
        `;
	} catch (error) {
		console.error('Ошибка при создании кроссворда:', error);
		return `<div style="color: red;">
            Ошибка при создании кроссворда из ответов для варианта ${options.variantPrefix}${variantNumber}
        </div>`;
	}
}

// Функции обновления
function updateCrosswordForVariant(variantNum) {
	const allAnswers = getAllAnswersForVariant(variantNum);
	const crosswordInput = createCrosswordDataFromAnyArray(allAnswers);

	try {
		crosswordData[variantNum] = generateLayout(crosswordInput, emptySymbol);
		updateCrosswordInContent(variantNum, false);
		updateCrosswordInTab(variantNum, true);
	} catch (error) {
		console.error('Ошибка при обновлении кроссворда:', error);
	}
}

function updateCrosswordInContent(variantNum, withAnswers) {
	const crosswordId = getCrosswordId(variantNum, withAnswers);
	const crosswordContainer = $(`#${crosswordId}`);

	if (crosswordContainer.length) {
		const newContent = getVariantTitle(variantNum) +
			createCrosswordTable(crosswordData[variantNum], withAnswers, variantNum);
		crosswordContainer.html(newContent);
	}
}

function updateCrosswordInTab(variantNum, withAnswers) {
	const crosswordId = getCrosswordId(variantNum, withAnswers);
	const crosswordContainer = $(`#cross #${crosswordId}`);

	if (crosswordContainer.length) {
		const newContent = getVariantTitle(variantNum) +
			createCrosswordTable(crosswordData[variantNum], withAnswers, variantNum);
		crosswordContainer.html(newContent);
	}
}

// Валидация
function validateCrosswordData(crosswordData) {
	if (!crosswordData || !crosswordData.table) {
		throw new Error('Invalid crossword data structure');
	}

	if (!Array.isArray(crosswordData.table) || crosswordData.table.length === 0) {
		throw new Error('Crossword table must be a non-empty array');
	}
}

// LaTeX функции (базовый вариант)
function crosswordToLatex(crosswordData, variantNumber, showAnswers = false) {
	if (!crosswordData?.table) 
		return '';

	let latex = `% Кроссворд для варианта ${options.variantPrefix}${variantNumber}\n`;
	latex += `\\begin{Puzzle}{${crosswordData.cols}}{${crosswordData.rows}}\n`;

	const cellNumbers = initializeCellNumbers(crosswordData.rows, crosswordData.cols);
	populateCellNumbers(cellNumbers, crosswordData.result);

	for (let y = 0; y < crosswordData.rows; y++) {
		let rowString = '|';

		for (let x = 0; x < crosswordData.cols; x++) {
			const cellValue = crosswordData.table[y][x];

			if (cellValue === emptySymbol) {
				rowString += '{}    |';
			} else {
				let cellContent = '';

				if (cellNumbers[y][x] > 0) {
					cellContent += `[${cellNumbers[y][x]}]`;
				}

				cellContent += cellValue.padEnd(4);
				rowString += `${cellContent}|`;
			}
		}

		latex += `${rowString}.\n`;
	}

	latex += '\\end{Puzzle}\n\n';
	latex += addListForLatex(crosswordData.result, showAnswers);

	return latex;
}

function addListForLatex(words, showAnswers = false) {
	let latex = '\\begin{enumerate}\n';

	words.forEach(word => {
		let item = word.position ? `${word.position} ${getOrientation(word)}` : 'не присутствует в кроссворде';

		if (showAnswers) {
			item += ` Ответ: ${word.answer}`;
		} else {
			item += ' \\rule{1.5cm}{0.4pt}';
		}

		latex += `\\item ${item}\n`;
	});

	latex += '\\end{enumerate}\n\n';
	return latex;
}

function createCrosswordLaTeX(showAnswers) {
	let latex = `
		\\documentclass{article}
		\\usepackage[utf8]{inputenc}
		\\usepackage[russian]{babel}
		\\usepackage[unboxed]{cwpuzzle}
		\\begin{document}
		\n`;

	for (const variantNum in crosswordData) {
		if (crosswordData.hasOwnProperty(variantNum)) {
			latex += `\\section*{Вариант ${options.variantPrefix}${variantNum}}\n`;
			latex += showAnswers ? '\\PuzzleSolution[true]' : '';
			latex += crosswordToLatex(crosswordData[variantNum], variantNum, showAnswers);
			latex += '\\newpage\n\n';
		}
	}

	latex += '\\end{document}\n';
	return latex;
}
