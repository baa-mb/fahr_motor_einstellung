input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    logotouch()
})
function logotouch() {
    robotbit.MotorStopAll()
    basic.showNumber(rad_faktor)
    autolauf = 0
    basic.pause(500)
    zzz = zzz_vorgabe
    v_arr = [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 15, 10, 9, 8, 7, 6, 5, 4, 3]
    for (let i = 0; i < 3; i++) {
        for (let index = 0; index <= v_arr.length - 1; index++) {
            let wert = v_arr[index]
            basic.showNumber(wert % 10)
            zzz = wert
            // dauerschleife(1)
            drehimpuls(10 * zzz)
            basic.pause(500)
        }
        robotbit.MotorStopAll()
    }

    basic.showLeds(`
        . . # . .
        . # . # .
        # . # . #
        . . # . .
        . . # . .
        `)
}

input.onButtonPressed(Button.A, function () {
    rad_faktor += -0.1
    basic.showNumber(rad_faktor)
    music.ringTone(Note.C)
})

input.onButtonPressed(Button.B, function () {
    rad_faktor += 0.1
    basic.showNumber(rad_faktor)
    music.ringTone(Note.C)
})

function drehimpuls(v: number) {
    robotbit.MotorRunDual(
        robotbit.Motors.M1A,
        v * richtung,
        robotbit.Motors.M2A,
        v * richtung * rad_faktor
    )
    robotbit.MotorRunDual(
        robotbit.Motors.M1B,
        v * richtung,
        robotbit.Motors.M2B,
        v * richtung * rad_faktor
    )
}
function init() {
    zzz_vorgabe = 5
    zzz = zzz_vorgabe
    start_speed = 110
    step_size = 10
    rad_faktor = 1
    limit = 14
    // drehimpuls(start_speed)
    basic.showIcon(IconNames.SmallHeart)
    robotbit.MotorStopAll()
    basic.showNumber(rad_faktor)
    basic.showLeds(`
        . . # . .
        . # . # .
        # . # . #
        . . # . .
        . . # . .
        `)
    logotouch()
}
function werte_rechnen(receivedNumber: number) {
    basic.clearScreen()
    if (receivedNumber == 2) {
        zzz = zzz_vorgabe
        rad_faktor = rad_faktor * 1
    }
    if (receivedNumber == -1) {
        zzz_vorgabe = zzz_vorgabe - 1
        rad_faktor = rad_faktor * 1
    }
    zzz += receivedNumber
}
input.onButtonPressed(Button.AB, function () {
    zzz_vorgabe = zzz_vorgabe + -1
    zzz = zzz_vorgabe
    init()
})

function dauerschleife(warte: number) {
    basic.showNumber(zzz % 10)
    // zzz += 1
    if (zzz >= limit) {
        zzz = zzz_vorgabe
        basic.showIcon(IconNames.Heart)
        drehimpuls(start_speed)
        basic.clearScreen()
    } else {

    }
    speed = zzz * step_size * richtung
    drehimpuls(speed)
    basic.pause(warte)
}
let speed = 0
let limit = 0
let step_size = 0
let start_speed = 0
let zzz_vorgabe = 0
let zzz = 0
let rad_faktor = 0
let autolauf = 0
let richtung = 0
let v_arr: number[] = []
v_arr = [
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    13,
    12,
    11,
    10,
    9,
    8,
    7,
    6,
    5,
    4,
    3,
    2,
    1,
    0
]
robotbit.MotorStopAll()
basic.pause(1000)
richtung = 1
autolauf = 0
init()
basic.forever(function () {
    if (autolauf == 1) {
        dauerschleife(1000)
    }
})
