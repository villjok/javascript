'use strict';


class Book {
    /**
     * Создает экземпляр книги.
     * @param {string} title - Название книги.
     * @param {number} pubYear - Год издания.
     * @param {number} price - Цена книги.
     */
    constructor(title, pubYear, price) {
        this.title = title;       
        this.pubYear = pubYear;   
        this.#price = price;      
    }

    #price;

    get title() {
        return this._title;
    }

    set title(value) {
        if (typeof value !== 'string' || value.trim() === '') {
            throw new Error('Название книги не может быть пустой строкой.');
        }
        this._title = value;
    }

    get pubYear() {
        return this._pubYear;
    }

    set pubYear(value) {
        if (typeof value !== 'number' || value <= 0 || !Number.isInteger(value)) {
            throw new Error('Год издания должен быть положительным целым числом.');
        }
        this._pubYear = value;
    }

    get price() {
        return this.#price;
    }

    set price(value) {
        if (typeof value !== 'number' || value <= 0) {
            throw new Error('Цена должна быть положительным числом.');
        }
        this.#price = value;
    }

    show() {
        console.log(`Книга: "${this.title}", Цена: ${this.price}`);
    }

    /**
     * Статический метод для сравнения книг по году издания.
     * @param {Book} bookA - Первая книга.
     * @param {Book} bookB - Вторая книга.
     * @returns {number} Отрицательное, если A < B; положительное, если A > B; 0, если равны.
     */
    static compare(bookA, bookB) {
        return bookA.pubYear - bookB.pubYear;
    }
}

/**
 * Проверяет, пуст ли объект (включая символьные свойства).
 * @param {object} obj - Объект для проверки.
 * @returns {boolean} true, если у объекта нет свойств.
 */
function isEmpty(obj) {
    return Reflect.ownKeys(obj).length === 0;
}

/**
 * Добавляет методы addClass и removeClass в объект.
 * @param {object} obj - Объект, к которому добавляются методы.
 * @returns {object} Тот же объект с добавленными методами.
 */
function addClassMethods(obj) {
    obj.addClass = function(cls) {
        const classes = this.className ? this.className.split(' ') : [];
        if (!classes.includes(cls)) {
            classes.push(cls);
            this.className = classes.join(' ');
        }
        return this;
    };

    obj.removeClass = function(cls) {
        const classes = this.className ? this.className.split(' ') : [];
        const index = classes.indexOf(cls);
        if (index !== -1) {
            classes.splice(index, 1);
            this.className = classes.join(' ');
        }
        return this;
    };

    return obj;
}

/**
 * Преобразует объект в JSON с отступами и обратно.
 * @param {object} obj - Исходный объект.
 */
function jsonDemo(obj) {
    const jsonString = JSON.stringify(obj, null, 2);
    console.log('JSON строка:');
    console.log(jsonString);

    const obj2 = JSON.parse(jsonString);
    const isEqual = JSON.stringify(obj) === JSON.stringify(obj2);
    console.log('Объекты равны:', isEqual);
}

/**
 * Возвращает количество секунд, прошедших с начала текущего дня.
 * @returns {number} Количество секунд.
 */
function getSecondsToday() {
    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const diffMs = now - todayStart;
    return Math.floor(diffMs / 1000);
}

/**
 * Форматирует дату в строку "дд.мм.гг".
 * @param {Date} date - Объект даты.
 * @returns {string} Отформатированная строка.
 */
function formatDate(date) {
    const d = String(date.getDate()).padStart(2, '0');
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const y = String(date.getFullYear()).slice(-2);
    return `${d}.${m}.${y}`;
}

export { Book, isEmpty, addClassMethods, jsonDemo, getSecondsToday, formatDate };

console.log('Лабораторная работа №4');

console.log('\n1. Класс Book');
try {
    const book1 = new Book('JavaScript Guide', 2020, 500);
    book1.show();
    
    const book2 = new Book('Clean Code', 2008, 700);
    const book3 = new Book('Design Patterns', 1994, 600);
    
    const books = [book1, book2, book3];
    books.sort(Book.compare);
    
    console.log('Отсортированные по году книги:');
    books.forEach(b => console.log(`${b.title} (${b.pubYear})`));
} catch (e) {
    console.error('Ошибка при работе с Book:', e.message);
}

console.log('\n2. Функция isEmpty');
console.log('Пустой объект {}:', isEmpty({}));
console.log('Объект с символом:', isEmpty({[Symbol()]: true}));
console.log('Объект с non-enumerable свойством:', isEmpty(Object.defineProperty({}, 'name', { value: 'John' })));

console.log('\n3. Управление классами');
let obj = { className: 'open menu' };
obj = addClassMethods(obj);

console.log(`Исходный className: "${obj.className}"`);

obj.addClass('highlight');
console.log(`После addClass("highlight"): "${obj.className}"`);

obj.addClass('menu');
console.log(`После addClass("menu") (дубликат): "${obj.className}"`);

obj.removeClass('open');
console.log(`После removeClass("open"): "${obj.className}"`);

console.log('\n4. JSON');
const user = { name: 'Max', age: 20, skills: ['JS', 'React'] };
jsonDemo(user);

console.log('\n5. Дата и время');
console.log('Секунд с начала дня:', getSecondsToday());
console.log('Текущая дата (дд.мм.гг):', formatDate(new Date()));