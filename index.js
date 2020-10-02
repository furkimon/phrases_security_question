document.addEventListener('DOMContentLoaded', () => {

    const body = document.querySelector('.body')
    const container = document.querySelector('.container')
    const squares = document.querySelectorAll('.container div')
    const choises = document.querySelector('.choises')
    const check = document.querySelector('.check')
    const buttons = document.querySelectorAll('.choises div')
    const checkButton = document.querySelector('.checkButton')

    var randomFive = []

    const phrases = ['apple', 'pear', 'mellon', 'cherry', 'watermellon', 'grape',
        'mango', 'banana', 'orange', 'blueberry', 'strawberry', 'date',
        'apricot', 'cantaloupe', 'clementine', 'fig', 'kiwi', 'peach',
        'mulberries', 'nectarine', 'papaya', 'dragonfruit', 'pineapple', 'pomegranate'
    ]


    function showPhrases() {
        container.style.display = 'flex'
        for (let i = 0; i < phrases.length; i++) {
            if (!randomFive.includes(i)) squares[i].innerHTML = phrases[i]
            else squares[i].innerHTML = ''
        }
    }

    function chooseRandom() {
        while (randomFive.length < 5) {
            var createdRandom = Math.floor(Math.random() * 24)
            if (!randomFive.includes(createdRandom)) randomFive.push(createdRandom)
        }
    }



    function showRandom() {
        randomFive.map((random, i) => buttons[i].innerHTML = phrases[random])
    }


    function createButtons() {
        for (let i = 0; i < buttons.length; i++) {
            buttons[i].addEventListener("click", () => choosePhrase(i))
        }
    }

    let order = 0
    var controlArray = []
    function choosePhrase(number) {
        buttons[number].style.cursor = "default"
        buttons[number].style.backgroundColor = "rgb(124, 165, 243)"
        var sorted = randomFive.slice().sort((a, b) => a - b)  //sorted ascending, randomFive protected

        if (!controlArray.includes(number)) {
            squares[sorted[order]].innerHTML = phrases[randomFive[number]]
            if (order < 4) order++
        }

        controlArray.push(number)
    }

    function checkPhrases() {
        let control = 0
        for (let i = 0; i < squares.length; i++) {
            squares[i].innerHTML === phrases[i] ? control++ : null
        }
        control === 24 ? alert('YO YO YO SOME MEMORY YOU GOT THERE BRUV!!!') : alert('YOU FUCKED UP YO')
    }

    checkButton.addEventListener('click', () => checkPhrases())

    function initial() {
        for (let i = 0; i < phrases.length; i++) {
            squares[i].innerHTML = phrases[i]
        }
        const initialNav = document.createElement('div')
        const initialButton = document.createElement('div')


        initialNav.classList.add('initialNav')
        body.appendChild(initialNav)

        initialButton.classList.add('initialButton')
        initialNav.appendChild(initialButton)
        initialButton.innerHTML = 'I AM READY'

        initialButton.addEventListener('click', () => {
            container.style.display = "none"
            showPhrases()
            initialNav.style.display = "none"
            choises.style.display = "flex"
            check.style.display = "grid"

        })
    }

    initial()

    chooseRandom()
    showRandom()
    createButtons()





})