document.addEventListener("DOMContentLoaded", () => {
    setupCategorySwitching()
    setupContainers();
    setupCategories();
});


// вибор категории
const setupCategorySwitching = () => {
    const categoryItems = document.querySelectorAll(".list-elem");
    const blocks = document.querySelectorAll(".product-catalogs > div");

    // Функция для активации контейнера
    const activateContainer = (container) => {
        const allContainers = document.querySelectorAll(".container");
        allContainers.forEach(cont => cont.classList.remove("active"));
        container.classList.add("active");
    };

    // Функция для активации категории
    const activateCategory = (categoryName) => {
        // Скрываем все блоки
        blocks.forEach(block => block.style.display = "none");

        // Убираем активный класс у всех элементов списка
        categoryItems.forEach(item => item.classList.remove("active"));

        // Находим нужный блок и показываем его
        const activeBlock = document.querySelector(`.blocks-${categoryName}`);
        if (activeBlock) {
            activeBlock.style.display = "flex";
            // Активируем первый контейнер в этом блоке
            const firstContainer = activeBlock.querySelector(".container");
            if (firstContainer) {
                activateContainer(firstContainer);
            }
        }

        // Добавляем активный класс текущей категории
        const activeCategory = document.querySelector(`.catalog-${categoryName}`);
        if (activeCategory) activeCategory.classList.add("active");
    };

    // Назначаем обработчики клика для элементов списка
    categoryItems.forEach(item => {
        item.addEventListener("click", () => {
            const categoryName = item.classList[1].split("catalog-")[1];
            activateCategory(categoryName);
        });
    });

    // Изначальная активация контейнеров
    activateCategory("containers");
};

// включение зуума
const setupContainers = () => {
    const activateContainer = (container) => {
        const containers = document.querySelectorAll(".container");
        containers.forEach(cont => cont.classList.remove("active"));
        container.classList.add("active");
    };

    const zoomImage = (containerSelector, imageSelector, descriptionSelector) => {
        const containers = document.querySelectorAll(containerSelector);
        containers.forEach((imgContainer) => {
            const image = imgContainer.querySelector(imageSelector);
            const description = imgContainer.querySelector(descriptionSelector);
            if (!image || !description) return;

            imgContainer.addEventListener("mouseenter", () => {
                if (imgContainer.classList.contains("active")) {
                    description.style.opacity = "0";
                    description.style.transition = "opacity 0.3s";
                    image.style.transition = "transform 0.3s";
                    image.style.transform = "scale(1.5)";
                }
            });

            imgContainer.addEventListener("mousemove", (e) => {
                if (!imgContainer.classList.contains("active")) return;
                const rect = imgContainer.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const xPercent = (x / imgContainer.offsetWidth) * 100;
                const yPercent = (y / imgContainer.offsetHeight) * 100;
                image.style.transformOrigin = `${xPercent}% ${yPercent}%`;
                image.style.transform = "scale(1.5)";
            });

            imgContainer.addEventListener("mouseleave", () => {
                if (!imgContainer.classList.contains("active")) return;
                description.style.opacity = "1";
                image.style.transform = "scale(1)";
                image.style.transformOrigin = "center center";
            });
        });
    };

    const containers = document.querySelectorAll(".container");
    if (containers.length > 0) {
        activateContainer(containers[0]); // Активировать первый контейнер по умолчанию
    }

    containers.forEach(container => {
        container.addEventListener("click", () => {
            activateContainer(container);
        });
    });

    zoomImage(".container", ".card-img", ".card-description");
    zoomImage(".container", ".container-img", ".container-description");
    // zoomImage(".container", ".card-img", ".card-description");
};

// активацыя активного контейнера на категории
const setupCategories = () => {
    const activateContainer = (container) => {
        const containers = document.querySelectorAll(".container");
        containers.forEach(cont => cont.classList.remove("active"));
        container.classList.add("active");
    };

    const categories = document.querySelectorAll(".category");
    const blocks = document.querySelectorAll(".blocks-containers");

    const activateBlock = (categoryName) => {
        blocks.forEach(block => block.classList.remove("active"));
        categories.forEach(category => category.classList.remove("active"));

        const activeBlock = document.querySelector(`.${categoryName}`);
        if (activeBlock) {
            activeBlock.classList.add("active");

            const firstContainer = activeBlock.querySelector(".container");
            if (firstContainer) activateContainer(firstContainer);
        }

        const activeCategory = document.querySelector(`.name-${categoryName}`);
        if (activeCategory) activeCategory.classList.add("active");
    };

    activateBlock("containers"); // Активировать "containers" по умолчанию

    categories.forEach(category => {
        category.addEventListener("click", () => {
            const categoryName = category.classList[1].split("name-")[1];
            activateBlock(categoryName);
        });
    });
};