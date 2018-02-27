# Jellypic Dashboard

Jellypic is a sample app to demonstrate the capabilities of Progressive Web Apps.

Project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

## Setup
* `git clone {repository url}`
* `cd` into new directory
* use Node version 8.9.4
* `npm install`

## Build for Production
* `npm run build`

## Remote Debugging with Android Device
* Follow instructions here to connect my Samsung S7 with my desktop's Chrome Dev Tools: https://developers.google.com/web/tools/chrome-devtools/remote-debugging/
* I had trouble getting Chrome's Dev Tools to recognize my device. I installed and uninstalled Samsung's USB Driver for Windows from here: http://developer.samsung.com/galaxy/others/android-usb-driver-for-windows and then it started working. I documented this here: https://stackoverflow.com/a/48625119/188740
* Set device USB options and select:
  * `Connecting MIDI devices`
* In the `Remote devices` tab of Chrome Dev Tools, add this port forwarding rule:
  * `3000` --> `localhost:3000`
* Now our Samsung S7 device can run our app with url `http://localhost:3000`