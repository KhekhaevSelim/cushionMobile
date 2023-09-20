



document.addEventListener("DOMContentLoaded", function() {
    const saleEnd = new Date("September 22, 2023 23:59:59").getTime();
    const timer = setInterval(function() {
        const now = new Date().getTime();
        let timeLeft = saleEnd - now;
        let hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)) < 10 ? `0${Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))}` : Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60)) < 10 ? `0${Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60))}` : Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((timeLeft % (1000 * 60)) / 1000) < 10 ? `0${Math.floor((timeLeft % (1000 * 60)) / 1000)}` : Math.floor((timeLeft % (1000 * 60)) / 1000);
       
        document.getElementById("hours").textContent = hours + ":";
        document.getElementById("minutes").textContent = minutes + ":";
        document.getElementById("seconds").textContent = seconds ;
      
     
        if (timeLeft < 0) {
          clearInterval(timer);
          document.getElementById("hours").textContent = "";
          document.getElementById("minutes").textContent = "";
          document.getElementById("seconds").textContent = "";
          document.querySelector(".countdown-timer").innerHTML = "Sale has ended!";
        }
      }, 1000);
    
    
    const parentElement = document.querySelector(".container_options_wrapper_productsSlice");
    const childElements = Array.from(parentElement.children);
    const currentProduct = document.getElementById("currentProduct");
    const customColorSelect = document.querySelector(".container_options_wrapper_selectorsContainer_color_customSelectContainer_select");
    const customColorSelectIcon = document.querySelector(".container_options_wrapper_selectorsContainer_color_customSelectContainer_select__icon");
    const colorSelectList = document.querySelector(".container_options_wrapper_selectorsContainer_color_customSelectContainer_list");
    const customSizeSelect = document.querySelector(".container_options_wrapper_selectorsContainer_size_customSelectContainer_select");
    const customSizeSelectIcon = document.querySelector(".container_options_wrapper_selectorsContainer_size_customSelectContainer_select__icon");
    const sizeSelectList = document.querySelector(".container_options_wrapper_selectorsContainer_size_customSelectContainer_list");
    const optionsContainer = document.querySelector(".container_options");
    const colorSelectListItems = Array.from(colorSelectList.children);
    const sizeSelectListItems = Array.from(sizeSelectList.children);
    customColorSelect.textContent = childElements[0].getAttribute("data-id").toUpperCase();
    customSizeSelect.textContent = sizeSelectListItems[0].getAttribute("data-value");
    const imagePaths = {
        black: "assets/img/blackSlippers.svg",
        orange: "assets/img/orangeSlippers.svg",
        pink: "assets/img/pinkSlippers.svg",
        yellow: "assets/img/yellowSlippers.svg"
    };
    
    childElements.forEach(element => {
        element.addEventListener("click", () => {
          const dataId = element.getAttribute("data-id");
          const imagePath = imagePaths[dataId];
          childElements.forEach((element)=>{
            element.classList.remove("container_options_wrapper_productsSlice__current")
            element.classList.add("container_options_wrapper_productsSlice__unCurrent")
          })
          element.classList.add("container_options_wrapper_productsSlice__current")
          if (imagePath) {
            currentProduct.setAttribute("src", imagePath);
            customColorSelect.textContent = dataId.toUpperCase();
          }
        });
      });
    
    customColorSelect.addEventListener("click", ()=> {
        let currentSrc = customColorSelectIcon.getAttribute("src");
        let toggleSrc = currentSrc === "assets/icons/arrowClosed.svg" ? "assets/icons/arrowOpened.svg" : "assets/icons/arrowClosed.svg";
        customColorSelectIcon.setAttribute('src', toggleSrc);
        colorSelectList.style.display =  colorSelectList.style.display === "block" ? "none" : "block";
        
    })
    customSizeSelect.addEventListener("click", ()=> {
        let currentSrc = customSizeSelectIcon.getAttribute("src");
        let toggleSrc = currentSrc === "assets/icons/arrowClosed.svg" ? "assets/icons/arrowOpened.svg" : "assets/icons/arrowClosed.svg";
        customSizeSelectIcon.setAttribute('src', toggleSrc);
        sizeSelectList.style.display =  sizeSelectList.style.display === "block" ? "none" : "block";
        
    })

    colorSelectListItems.forEach( item => {
        item.addEventListener("click", ()=> {
            const itemValue = item.getAttribute("data-value");
            const imagePath = imagePaths[itemValue];
            if (imagePath) {
                currentProduct.setAttribute("src", imagePath);
                customColorSelect.textContent = itemValue.toUpperCase();
                colorSelectList.style.display =  colorSelectList.style.display === "block" ? "none" : "block";
                childElements.forEach((element)=>{
                    if(element.getAttribute("data-id") === itemValue){
                        element.classList.add("container_options_wrapper_productsSlice__current")
                    } else{
                        element.classList.remove("container_options_wrapper_productsSlice__current")
                        element.classList.add("container_options_wrapper_productsSlice__unCurrent")
                    }
                   
                  })
              }
        })
    })

    sizeSelectListItems.forEach( item => {
        item.addEventListener("click", ()=> {
            customSizeSelect.textContent = item.getAttribute("data-value");
            sizeSelectList.style.display =  sizeSelectList.style.display === "block" ? "none" : "block";
              
        })
    })

    optionsContainer.addEventListener("click", function(event){
        if(!colorSelectList.contains(event.target) && !customColorSelect.contains(event.target)){
            colorSelectList.style.display = "none";
        }
    })

    optionsContainer.addEventListener("click", function(event){
        if(!sizeSelectList.contains(event.target) && !customSizeSelect.contains(event.target)){
            sizeSelectList.style.display = "none";
        }
    })
})
