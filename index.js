document.addEventListener('DOMContentLoaded', () => {

    const body = document.querySelector('.body')
    const container = document.querySelector('.container')
    const squares = document.querySelectorAll('.container div')
    const choises = document.querySelector('.choises')
    const check = document.querySelector('.check')
    const uploadButton = document.querySelector('.uploadButton')
    const buttons = document.querySelectorAll('.choises div')
    const checkButton = document.querySelector('.checkButton')
    const input = document.getElementById('file-input')

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
    uploadButton.addEventListener('click', () => input.click())

    input.onchange = function () {
        var reader = new FileReader();
        reader.onload = async function () {     
            var text = reader.result;
            var lines = await text.split(/[\r\n]+/g)
            var index = 0
            for (let i = 96; i < lines.length; i +=12) {
                // if (lines[i].includes('Tj')) {
                    console.log(i + " " + lines[i].split('(')[1].split(')')[0])   //HAHAHAAHAHAH :(
                    squares[index].innerHTML = lines[i].split('(')[1].split(')')[0]
                    index++
                // }
            }
        }
        reader.readAsText( e.target.files[0], "UTF-8");
    }

    function initial() {
        for (let i = 0; i < phrases.length; i++) {
            squares[i].innerHTML = phrases[i]
        }

        const initialNav = document.createElement('div')
        const downloadButton = document.createElement('div')
        const testButton = document.createElement('div')

        downloadButton.classList.add('downloadButton')
        testButton.classList.add('testButton')

        initialNav.appendChild(downloadButton)
        initialNav.appendChild(testButton)
        downloadButton.innerHTML = 'Download PDF'
        testButton.innerHTML = 'Ready'

        initialNav.classList.add('initialNav')
        body.appendChild(initialNav)

        downloadButton.addEventListener('click', () => {
            var firstRow = []
            var secondRow = []
            var thirdRow = []
            var fourthRow = []

            phrases.map((phrase, i) => {
                if (i < 6) firstRow.push(phrase)
                else if (i < 12) secondRow.push(phrase)
                else if (i < 18) thirdRow.push(phrase)
                else if (i < 24) fourthRow.push(phrase)
            })

            var doc = new jsPDF({
                orientation: "landscape",
                unit: "in",
                format: [8, 3]
            })

            doc.autoTable({
                head: [['', '', '', '', '', '']],
                body: [firstRow, secondRow, thirdRow, fourthRow]
            })

            doc.save('a4.pdf')
        })

        testButton.addEventListener('click', () => {
            container.style.display = "none"
            showPhrases()
            initialNav.style.display = "none"
            choises.style.display = "flex"
            check.style.display = "flex"

        })
    }

    initial()

    chooseRandom()
    showRandom()
    createButtons()
})