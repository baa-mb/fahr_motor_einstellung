radio.onReceivedNumber(function (receivedNumber) {
    basic.showLeds(`
        . . . . .
        . . . . .
        . . . . .
        . . . . .
        . . . . .
        `)
    zzz += receivedNumber
    if (receivedNumber == 2) {
        zzz = zzz_vorgabe
        rad_faktor = rad_faktor + 0.05
    }
})
input.onButtonPressed(Button.B, function () {
    richtung = richtung * -1
})
function startimpuls (v: number) {
    robotbit.MotorRunDual(
    robotbit.Motors.M1A,
    v * richtung,
    robotbit.Motors.M2A,
    v * richtung * rad_faktor
    )
}
let speed = 0
let rad_faktor = 0
let zzz = 0
let zzz_vorgabe = 0
let richtung = 0
robotbit.MotorStopAll()
basic.pause(1000)
richtung = 1
zzz_vorgabe = 4
zzz = zzz_vorgabe
let start_speed = 110
let step_size = 10
rad_faktor = 0.95
let limit = 14
startimpuls(start_speed)
basic.forever(function () {
    led.plot(zzz % 5, 4 - Math.floor(zzz / 5))
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
    serial.writeValue("speed", speed)
    startimpuls(speed)
    basic.pause(2000)
})
// while (true) {
// let strip: neopixel.Strip = null
// abstand = sonar.ping(
// DigitalPin.P1,
// DigitalPin.P2,
// PingUnit.Centimeters
// )
// led.plotBarGraph(
// abstand,
// 100
// )
// strip.rotate(1)
// strip.show()
// basic.pause(2000)
// }
control.inBackground(function () {
	
})
