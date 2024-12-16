function start(obj) {

    // Функция для генерации случайных координат
    function getRandomPosition() {
        const x = Math.random() * (window.innerWidth - obj.offsetWidth); // Рандомное значение по оси X
        const y = Math.random() * (window.innerHeight - obj.offsetHeight); // Рандомное значение по оси Y
        const rotation = Math.random() * 10 - 5; // Рандомный наклон от -5 до 5 градусов
        return { x, y, rotation };
    }
    function centerEnvelope() {
        const x = (window.innerWidth - obj.offsetWidth) / 2;
        const y = (window.innerHeight - obj.offsetHeight) / 2;
        obj.style.transform = `translate(${x}px, ${y}px)`;
    }

    // Инициализация с центрированием конверта и случайного движения
    
    // Функция для перемещения конверта
    function moveEnvelope() {
        const position = getRandomPosition();
        obj.style.transition = "transform 10s ease-out"; // Плавный переход
        obj.style.transform = `translate(${position.x}px, ${position.y}px) rotate(${position.rotation}deg)`;
        setInterval(moveEnvelope, 10000);
    }
    centerEnvelope();  // Сначала ставим конверт в центр
    moveEnvelope()
};

const ArrayDivs = document.getElementsByClassName("envelope")

for (let i = 0; i < ArrayDivs.length; i++) {
    const div = ArrayDivs[i];
    start(div)
  }

