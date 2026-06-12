radio.onReceivedValue(function (info, wert) {
    if (info == "kurve") {
        kurve_get = wert
        kurve_rad = Math.round(Math.map(kurve_get, -45, 45, -255, 255))
    } else if (info == "gerade") {
        gerade_get = wert
        gerade_rad = Math.round(Math.map(gerade_get, -45, 45, -255, 255))
    } else if (info == "kupplung") {
        if (wert == 0) {
            robotbit.Servo(robotbit.Servos.S1, 0)
        } else {
            robotbit.Servo(robotbit.Servos.S1, hebe_winkel)
        }
    }
})
input.onButtonPressed(Button.B, function () {
    if (oben) {
        robotbit.Servo(robotbit.Servos.S1, 0)
    } else {
        robotbit.Servo(robotbit.Servos.S1, hebe_winkel)
    }
    oben = !(oben)
})
function startimpuls () {
    robotbit.MotorStopAll()
    basic.showLeds(`
        . . . . .
        . . . . .
        # # # # #
        . . . . .
        . . . . .
        `)
    basic.pause(100)
    robotbit.MotorRunDual(
    robotbit.Motors.M1A,
    start_speed,
    robotbit.Motors.M1B,
    start_speed * rad_faktor
    )
    basic.pause(100)
    basic.showLeds(`
        . # # # .
        . . . . .
        . . . . .
        . . . . .
        . . . . .
        `)
}
let speed = 0
let oben = false
let gerade_rad = 0
let gerade_get = 0
let kurve_rad = 0
let kurve_get = 0
let rad_faktor = 0
let start_speed = 0
let hebe_winkel = 0
let abstand = 0
let rechts_ist = 0
let links_ist = 0
let rechts_rad = 0
let links_rad = 0
let lauf_flag = 0
radio.setGroup(26)
hebe_winkel = 70
let motor_links = robotbit.Motors.M1A
let motor_rechts = robotbit.Motors.M2A
robotbit.MotorStopAll()
basic.pause(1000)
let zzz_vorgabe = 4
let zzz = zzz_vorgabe
start_speed = 100
let step_size = 10
rad_faktor = 10
let limit = 10
startimpuls()
basic.forever(function () {
    led.plot(zzz % 5, 4 - Math.floor(zzz / 5))
    if (zzz >= limit) {
        zzz = zzz_vorgabe
        basic.showIcon(IconNames.Heart)
        startimpuls()
        basic.showLeds(`
            . . . . .
            . . . . .
            . . . . .
            . . . . .
            . . . . .
            `)
    } else {
        zzz += 1
    }
    speed = zzz * step_size * -1
    serial.writeValue("speed", speed)
    robotbit.MotorRunDual(
    robotbit.Motors.M1A,
    speed,
    robotbit.Motors.M1B,
    speed * rad_faktor
    )
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
