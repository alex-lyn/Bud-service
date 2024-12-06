document.addEventListener("DOMContentLoaded", () => {
    menuMobile();
    setupCategorySwitching()
    setupContainers();
    setupCategories();
    chengeBtn();
    openText();
    slidProducts();
    slidSmollDot();
});

// нав меню
const menuMobile = () => {
    const btnMenu = document.querySelector(".menu");
    const btnClose = document.querySelector(".close");
    const navigation = document.querySelector(".nav-page");
    const header = document.querySelector(".header");
    const listElements = document.querySelectorAll(".item-nav");

    const openMenu = () => {
        navigation.classList.add("open");
        header.classList.add("active");
        btnMenu.classList.add("hide");
        btnClose.classList.add("active");
        document.body.style.overflow = "hidden";
    };

    const closeMenu = () => {
        navigation.classList.remove("open");
        header.classList.remove("active");
        btnMenu.classList.remove("hide");
        btnClose.classList.remove("active");
        document.body.style.overflow = "";
    };

    btnMenu.addEventListener("click", openMenu);
    btnClose.addEventListener("click", closeMenu);

    listElements.forEach(element => {
        const link = element.querySelector(".link-item_nav");
        link.addEventListener("click", event => {
            event.preventDefault();
            const targetId = link.getAttribute("href").substring(1);
            const targetSection = document.getElementById(targetId);
            closeMenu();
            targetSection.scrollIntoView({behavior: "smooth"});
        });
    });
};

// для слайда преимуществ
const slidSmollDot = () => {
    const sliderContainer = document.querySelector('.advantages-blocks');
    const slides = document.querySelectorAll('.advantag-block');
    const dots = document.querySelectorAll('.dot');

    let currentSlideIndex = 0;

    const updateSlider = (index) => {
        // Обновляем позицию слайдера
        const offset = -index * slides[0].offsetWidth;
        sliderContainer.style.transform = `translateX(${offset}px)`;

        // Обновляем активную точку
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
    };

    // Добавляем обработчик события на точки
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlideIndex = index;
            updateSlider(currentSlideIndex);
        });
    });

    // Инициализация
    updateSlider(currentSlideIndex);
};
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

//chenge btn text
const chengeBtn = () => {
    const btns = document.querySelectorAll(".text-your_btn");

    btns.forEach(button => {
        button.addEventListener("click", () => {
            const textBig = document.querySelector(".texts-your_big");
            const isHidden = textBig.style.display === "none" || !textBig.style.display;
            textBig.style.display = isHidden ? "block" : "none";
            button.textContent = isHidden ? "Приховати" : "Читати більше";
        });
    });
}

// вопросы ответы
const openText = () => {
    const questions = document.querySelectorAll(".responses-block");
    questions.forEach(questionBlock => {
        const questionTitle = questionBlock.querySelector(".responses-name");
        const answerText = questionBlock.querySelector(".responses-text");

        questionTitle.addEventListener("click", () => {
            questions.forEach(item => {
                const otherAnswer = item.querySelector(".responses-text");
                if (item !== questionBlock) {
                    otherAnswer.style.maxHeight = 0;
                    otherAnswer.classList.remove("open-text");
                    item.classList.remove("active");
                }
            });

            const isActive = questionBlock.classList.contains("active");
            answerText.style.maxHeight = isActive ? 0 : answerText.scrollHeight + "px";
            answerText.classList.toggle("open-text", !isActive);
            questionBlock.classList.toggle("active");
        });
    });
}

// для слайда категорий
const slidProducts = () => {
    const initSlider = (containerSelector, prevBtnSelector, nextBtnSelector, itemClass, minVisibleItems, maxVisibleItems) => {
        const itemsAll = document.querySelectorAll(containerSelector);
        const prevButton = document.querySelector(prevBtnSelector);
        const nextButton = document.querySelector(nextBtnSelector);
        let visibleItems, currentItem = 0, itemWidth = 322;

        const updateItemWidth = () => {
            const item = itemsAll[0];
            if (item) itemWidth = item.offsetWidth;
        };

        const updateItems = () => {
            updateItemWidth();
            const offset = -currentItem * itemWidth;
            itemsAll.forEach(item => item.style.transform = `translateX(${offset}px)`);
            prevButton.classList.toggle("disabled", currentItem === 0);
            nextButton.classList.toggle("disabled", currentItem >= itemsAll.length - visibleItems);
        };

        const updateSettings = () => {
            if (window.matchMedia("(min-width: 1200px)").matches) {
                visibleItems = itemsAll.length;
                prevButton.style.display = "none";
                nextButton.style.display = "none";
            } else if (window.matchMedia("(min-width: 768px) and (max-width: 1199px)").matches) {
                visibleItems = 2;
                prevButton.style.display = "block";
                nextButton.style.display = "block";
                itemWidth = 50;
            } else {
                visibleItems = 1;
                prevButton.style.display = "block";
                nextButton.style.display = "block";
                itemWidth = 100;
            }
            updateItems();
        };

        prevButton.addEventListener("click", () => {
            if (currentItem > 0) {
                currentItem--;
                updateItems();
            }
        });

        nextButton.addEventListener("click", () => {
            if (currentItem < itemsAll.length - visibleItems) {
                currentItem++;
                updateItems();
            }
        });

        const handleTouchEvents = () => {
            let startX, isDragging = false;

            const handleTouchStart = (e) => {
                startX = e.touches[0].clientX;
                isDragging = true;
            };

            const handleTouchMove = (e) => {
                if (!isDragging) return;
                const deltaX = startX - e.touches[0].clientX;
                if (Math.abs(deltaX) > 50) {
                    if (deltaX > 0 && currentItem < itemsAll.length - visibleItems) currentItem++;
                    else if (deltaX < 0 && currentItem > 0) currentItem--;
                    updateItems();
                    isDragging = false;
                }
            };

            const handleTouchEnd = () => {
                isDragging = false;
            };

            itemsAll.forEach(item => {
                item.addEventListener("touchstart", handleTouchStart);
                item.addEventListener("touchmove", handleTouchMove);
                item.addEventListener("touchend", handleTouchEnd);
            });
        };

        updateSettings();
        window.addEventListener("resize", updateSettings);
        handleTouchEvents();
    };

    initSlider(".container-block", ".js-prew", ".js-next", "container-block", 1, 2);
    initSlider(".cabin", ".js-prew-cabin", ".js-next-cabin", "cabin", 1, 2);
    initSlider(".san-block", ".js-prew-boks", ".js-next-boks", "san-block", 1, 2);
}












