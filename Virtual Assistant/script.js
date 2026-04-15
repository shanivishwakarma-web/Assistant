let btn = document.querySelector("#btn")
let content = document.querySelector("#content")
let voice = document.querySelector("#voice")
let language = "english"

function setLanguage(lang) {
    language = lang
    speak(`Language has been set to ${lang}`)
}

function speak(message) {
    if (language === "english") {
        console.log(message) 
    } else if (language === "hindi") {
        console.log(translateToHindi(message)) 
    }

    let text_speak = new SpeechSynthesisUtterance(message)
    text_speak.rate = 1
    text_speak.pitch = 1
    text_speak.volume = 1

    text_speak.lang = language === "english" ? "en-US" : "hi-IN"


    window.speechSynthesis.speak(text_speak)
}

function wishMe() {
    let day = new Date()
    let hours = day.getHours()

    if (hours >=0 && hours < 12) {
        speak("Good Morning Sir")
    } else if (hours >= 12 && hours < 16) {
        speak("Good Afternoon Sir")
    } else {
        speak("Good Evening Sir")
    }
}


window.addEventListener('load',function () {
        wishMe()
    })

let speechRecognition = window.speechRecognition || window.webkitSpeechRecognition
let recognition = new speechRecognition()
recognition.onresult = (event) => {
    let currentIndex = event.resultIndex
    let transcript = event.results[currentIndex][0].transcript

    content.innerText = transcript
    takeCommand(transcript.toLowerCase())
};

btn.addEventListener("click", () => {
    recognition.start()
    btn.style.display = "none"
    voice.style.display = "block"
})
function takeCommand(message) {
    btn.style.display = "flex"
    voice.style.display = "none" 
    if (message.includes("hello") || message.includes(" hey ")) {
        speak("Hello Sir, what can I help you with?")
    } else if (message.includes("who are you")) {
        speak("I am a virtual assistant, created by Shani Sir.")
    } else if (message.includes("open youtube")) {
        speak("Opening YouTube.")
        window.open("https://www.youtube.com/", "_blank")
    } else if (message.includes("open google")) {
        speak("Opening Google.")
        window.open("https://google.com/")
    } else if (message.includes("open facebook")) {
        speak("Opening Facebook.")
        window.open("https://facebook.com/", "_blank")
    } else if (message.includes("open instagram")) {
        speak("Opening Instagram.")
        window.open("https://instagram.com/", "_blank")
    } 
    else if (message.includes("open calculator")) {
        speak("Opening calculator.")
        window.open("calculator://")
    } else if (message.includes("open whatsapp")) {
        speak("Opening whatsapp.")
        window.open("whatsapp://")
    }
    else if (message.includes("time")) {
      let time=new Date().toLocaleString(undefined,{hour:"numeric",minute:"numeric"})
      speak(time)
    }else {
        let finalText="this is what i found on internet regarding" +message.replace("sunny","") || message.replace("shani","")
        speak(finalText)
        window.open(`https://www.google.com/search?q=${message.replace("sunny","")}`)
    }
}
