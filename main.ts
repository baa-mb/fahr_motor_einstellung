input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    init()
})
// })
input.onButtonPressed(Button.A, function () {
    // radio.sendNumber(-1)
    werte_rechnen(-1)
})
function init () {
    start_speed = 110
    step_size = 10
    rad_faktor = 1
    limit = 14
    startimpuls(start_speed)
    basic.showIcon(IconNames.SmallHeart)
}
function werte_rechnen (receivedNumber: number) {
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
input.onButtonPressed(Button.B, function () {
    // radio.sendNumber(-1)
    werte_rechnen(1)
})
function startimpuls (v: number) {
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
let speed = 0
let limit = 0
let rad_faktor = 0
let step_size = 0
let start_speed = 0
let zzz = 0
let zzz_vorgabe = 0
let richtung = 0
robotbit.MotorStopAll()
basic.pause(1000)
richtung = 1
zzz_vorgabe = 4
zzz = zzz_vorgabe
init()
basic.forever(function () {
    basic.showNumber(zzz % 10)
    // zzz += 1
    if (zzz >= limit) {
        zzz = zzz_vorgabe
        basic.showIcon(IconNames.Heart)
        startimpuls(start_speed)
        basic.showLeds(`
            . . . . .
            . . . . .
            . . . . .
            . . . . .
            . . . . .
            `)
    } else {
    	
    }
    speed = zzz * step_size * richtung
    startimpuls(speed)
    basic.pause(1000)
})
