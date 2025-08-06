document.addEventListener('DOMContentLoaded', () => {
    // 1. Контейнер для курсора-артефакта
    const cursorContainer = document.createElement('div');
    cursorContainer.id = 'custom-cursor-sigil';

    // 2. Душа сигила.
    cursorContainer.innerHTML = `

        <svg width="281" height="253" viewBox="0 0 281 253" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M152.379 1H143V187.044C154.092 217.536 167.74 235.394 201.744 252H279C209.342 204.733 171.261 128.845 152.379 1Z" fill="white" stroke="white"/>
<path d="M128.621 1H138V187.044C126.908 217.536 113.26 235.394 79.2559 252H2C71.6581 204.733 109.739 128.845 128.621 1Z" fill="white" stroke="white"/>
</svg>

    `;

    // 3. Артефакт в тело документа. 
    document.body.appendChild(cursorContainer);

    // 4. Стилизация сигила.
    const style = document.createElement('style');
    style.innerHTML = `
        body, body *, a, button {
            cursor: none !important;
        }

        #custom-cursor-sigil {
            position: fixed;
            z-index: 9999; /* Он должен быть выше, сука, всего */
            pointer-events: none; /* Чтобы не мешал кликать */
            transform: translate(-50%, -50%); /* Центрируем острие по указателю */
            transition: transform 0.1s ease-out; /* Плавность, как у киллера */
            width: 24px;  /* Настраиваемый размер. 24px - идеально для начала */
            height: 24px;
        }

        #custom-cursor-sigil svg {
            width: 100%;
            height: 100%;
            fill: var(--quartz); /* Цвет по умолчанию. Можно менять. */
        }
    `;
    document.head.appendChild(style);

    // 5. Сигил следует за движением.
    const sigil = document.getElementById('custom-cursor-sigil');

    const onMouseMove = (e) => {
        if (sigil) {
            sigil.style.left = `${e.clientX}px`;
            sigil.style.top = `${e.clientY}px`;
        }
    };
    
    // То же самое для касаний на мобильных устройствах. 
    const onTouchMove = (e) => {
        if (e.touches[0] && sigil) {
            sigil.style.left = `${e.touches[0].clientX}px`;
            sigil.style.top = `${e.touches[0].clientY}px`;
        }
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
});
