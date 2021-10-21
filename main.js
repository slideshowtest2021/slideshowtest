document.addEventListener('DOMContentLoaded', function () {
    const slider = document.querySelector('.slider')
    const sliderTrack = document.querySelector('.slider__wrapper')

    const prev = document.querySelector('.slider__arrow--left')
    const next = document.querySelector('.slider__arrow--right')

    let direction

    //** Fetch slide data **//
    const fetchSlides = async () => {
        const res = await fetch('./data.json')
        const data = await res.json()
        return data
    }
    //** Call fetch slides **//
    //** Maps through slide array **//
    //** Appends HTML with data for each array item in the array that fetchSlides() returns **//
    fetchSlides().then(function ({ slides }) {
        const slidesList = slides.map(function ({ heading, link, backgroundUrl }) {
            const SliderItem = `<div class='slide' style='background: url(${backgroundUrl}) center top/cover no-repeat;'>
                                    <div class='slide__content'>
                                        <h1 class='slide__heading'>${heading}</h1>
                                        <a aria-label="Link to slider arcticle" href='${link.href}' class='slide__button'>${link.title}</a>
                                    </div>
                                </div>`
            sliderTrack.insertAdjacentHTML('beforeend', SliderItem)
        })
        slidesCount = slidesList.length
    })

    //** Add listner to right chevron to slide to next slide on click **//
    next.addEventListener('click', function () {
        direction = -1
        sliderTrack.style.justifyContent = 'flex-start'
        sliderTrack.style.transform = 'translateX(-100%)'
    })

    //** Add listner to left chevron to slide to previous slide on click **//
    prev.addEventListener('click', function () {
        if (direction === -1) {
            direction = 1
            sliderTrack.appendChild(sliderTrack.firstElementChild)
        }
        sliderTrack.style.justifyContent = 'flex-end'
        sliderTrack.style.transform = 'translateX(100%)'
    })

    sliderTrack.addEventListener('transitionend',function () {
        if (direction === 1) {
            // Get the last element and prepend it to the front
            sliderTrack.prepend(sliderTrack.lastElementChild)
        } else {
            // Get the first element and append it to the front
            sliderTrack.appendChild(sliderTrack.firstElementChild)
        }
        sliderTrack.style.transition = 'none'
        sliderTrack.style.transform = 'translate(0)'
        setTimeout(() => {
            sliderTrack.style.transition = 'all 0.5s'
        })
    },false)
})
