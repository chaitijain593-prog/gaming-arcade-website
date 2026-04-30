const gameContainer = document.querySelector('.container'),
      userResult = document.querySelector('.user_result img'),
      cpuResult = document.querySelector('.cpu_result img'),
      result = document.querySelector('.result'),
      optionImages = document.querySelectorAll('.option_image');

optionImages.forEach((image, index) => {
    image.addEventListener("click", () => {
        image.classList.add("active");
        userResult.src = cpuResult.src = "rock.jpeg";

        optionImages.forEach((otherImage, otherIndex) => {
            if (index !== otherIndex) otherImage.classList.remove("active");
        });

        gameContainer.classList.add("start");

        setTimeout(() => {
            gameContainer.classList.remove("start");

            let imageSrc = image.querySelector("img").src;
            userResult.src = imageSrc;

            let randomNumber = Math.floor(Math.random() * 3);
            let cpuImages = ["rock.jpeg", "paper.jpeg", "scissor.jpeg"];
            cpuResult.src = cpuImages[randomNumber];

            let cpuValue = ['R', 'P', 'S'][randomNumber];
            let userValue = ['R', 'P', 'S'][index];

            let outcomes = {
                RR: "It's a draw!",
                RP: "CPU wins!",
                RS: "User wins!",
                PP: "It's a draw!",
                PS: "CPU wins!",
                PR: "User wins!",
                SS: "It's a draw!",
                SR: "CPU wins!",
                SP: "User wins!"
            };

            result.textContent = outcomes[userValue + cpuValue];
        }, 2500);
    });
});