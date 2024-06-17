// Инициализация начальных позиций карточек
var initialPositions = {
    'card1': { 'top': '0px', 'maxWidth': '1137px', 'zIndex': 3 },
    'card2': { 'top': '27px', 'maxWidth': '1042px', 'zIndex': 2 },
    'card3': { 'top': '54px', 'maxWidth': '973px', 'zIndex': 1 }
};


// Функция для инициализации стилей карточек и установка высоты блока
function initializeCards() {
var stackedCards = document.querySelector('.stacked-cards');
    var cards = document.querySelectorAll('.stacked-cards__card');

    // Устанавливаем высоту блока .stacked-cards
    if (cards.length > 0) {
        var cardHeight = cards[0].offsetHeight;
        var totalHeight = cardHeight + (27 * (cards.length - 1));
        stackedCards.style.height = totalHeight + 'px';
    }

    // Применяем начальные стили к карточкам
    cards.forEach(card => {
        var cardId = card.id;
        card.style.top = initialPositions[cardId].top;
        card.style.maxWidth = initialPositions[cardId].maxWidth;
        card.style.zIndex = initialPositions[cardId].zIndex;
    });
}

// Функция для перемещения карточки на передний план и обновления z-index и стилей
function moveCardToTop(cardId) {
    var cards = Array.from(document.querySelectorAll('.stacked-cards__card'));
    var activeCardIndex = cards.findIndex(card => card.id === cardId);
    var newZIndex = cards.length;

    // Устанавливаем ширину всех карточек в соответствии с их порядком
    cards.forEach((card, index) => {
        let cardKey = 'card' + (index + 1);
        card.style.maxWidth = initialPositions[cardKey].maxWidth;
    });

    // Обновляем z-index и стили для всех карточек
    cards.forEach((card, index) => {
        var zIndexOffset = (index - activeCardIndex + cards.length) % cards.length;

        if (card.id === cardId) {
            // Активная карточка получает максимальный z-index и стили из initialPositions
            card.style.zIndex = newZIndex.toString();
            card.style.top = '0px';
            // Активная карточка получает ширину первой карточки
            card.style.maxWidth = initialPositions['card1'].maxWidth;
        } else {
            // Неактивные карточки получают уменьшенный z-index и обновленные стили
            card.style.zIndex = (newZIndex - zIndexOffset).toString();
            card.style.top = (27 * zIndexOffset) + 'px';
            if (newZIndex - zIndexOffset == 2) {
                card.style.maxWidth = initialPositions['card2'].maxWidth;
            }
            if (newZIndex - zIndexOffset == 1) {
                card.style.maxWidth = initialPositions['card3'].maxWidth;
            }
        }
    });

// Обновление активной кнопки
    var buttons = document.querySelectorAll('.buttons__wrapper button');
    buttons.forEach(button => {
        button.classList.remove('active');
        if (button.getAttribute('data-card') === cardId) {
            button.classList.add('active');
        }
    });
}

// Обработчик событий для инициализации стилей при загрузке страницы
document.addEventListener('DOMContentLoaded', (event) => {
    initializeCards();
    moveCardToTop('card1'); // Устанавливаем card1 как активную карточку по умолчанию
});

// Добавление обработчиков событий для кнопок
document.querySelectorAll('.buttons__wrapper button').forEach(button => {
    button.addEventListener('click', function() {
        var cardId = this.getAttribute('data-card');
        moveCardToTop(cardId);
    });
});