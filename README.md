# Jellypic Dashboard

Jellypic is a sample app to demonstrate the capabilities of Progressive Web Apps, including:
* Offline first readonly in:
  * Chrome, Firefox, Opera
  * Edge on Windows 10 1803+
  * Safari 11.1+ (iOS 11.3+ and macOS 10.13.4+)
* Saving changes still requires device to be online, but I hope to change that soon
* Push notifications on:
  * Chrome on Android
  * Chrome on Windows
  * Chrome on macOS

Project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app) and uses the following technologies:
* Service Worker
* Push API
* React.js
* Redux / Rematch
* CSS Grid

## Setup
* `git clone {repository url}`
* `cd` into new directory
* use Node version 8.9.4
* `npm install`

## Development
* Make sure [Backend Server](https://github.com/johnnyoshika/jellypic) is running
* `npm start`
* Navigate to: [http://localhost:3000/](http://localhost:3000/)

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

## Deployment
Use Linux, Windows Subsystem for Linux (WSL), or Mac
### Preparation:
* Make sure `lftp` is installed
  * Linux or WSL:
    * $ `sudo apt-get install lftp`
  * Mac:
    * $ `brew install lftp`
* Create `deploy.sh`
  * $ `touch deploy.sh`
  * May need to allow execute permission
    * Check:
      * $ `ls -al deploy.sh`
    * If change is necessary:
      * $ `chmod u+x deploy.sh`
* Set content of `deploy.sh` to:

```
#!/bin/bash

npm run build

FTP_USER={user}         # example: jellypic\\johnny_ftp (note the escaped backslash)
FTP_PASSWORD={password}
FTP_HOST={host:port}    # example: www.example.com:21
FTP_DIR=/               # another example: /site/wwwroot/wwwroot

# Deploy assets first
lftp -c "open -u $FTP_USER,$FTP_PASSWORD $FTP_HOST; set ssl:verify-certificate no; mirror --exclude index.html --exclude sw.js -R build/ $FTP_DIR"

# Deploy index.html
lftp -c "open -u $FTP_USER,$FTP_PASSWORD $FTP_HOST; set ssl:verify-certificate no; put -O $FTP_DIR build/index.html"

# Deploy sw.js
lftp -c "open -u $FTP_USER,$FTP_PASSWORD $FTP_HOST; set ssl:verify-certificate no; put -O $FTP_DIR build/sw.js"
```
* Make sure line endings are unix based (LF).

### Deploy:
* `bash deploy.sh`