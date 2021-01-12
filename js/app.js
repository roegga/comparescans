let browserAgentString = window.navigator,
    deviceModel = browserAgentString.userAgent.match(/[a-zA-Z]+\d{2,}/).pop(),
    scanInputOne = document.querySelector('#scan-one'),
    scanInputTwo = document.querySelector('#scan-two'),
    scanOneState = false,
    scanTwoState = false,
    scanOneData = '',
    scanTwoData = ''

    if (deviceModel.includes('CT')) {
        document.addEventListener('keydown', honywellLogic)
    } else if (deviceModel.includes('TC')) {
        document.addEventListener('keydown', zebraLogic)
    } else {
        scanOneData = 'Unit is neither'
        scanTwoData = 'Honywell nor Zebra'
        scanInputOne.innerHTML = scanOneData
        scanInputTwo.innerHTML = scanTwoData
    }
    
    function honywellLogic(e) {
        const scanner = new BarcodeReader(null, onBarcodeReaderComplete);
    
        function onBarcodeReaderComplete(result) {
            if (result.status == 0) {
                scanner.addEventListener("barcodedataready",onBarcodeDataReady, false)
            }else{
                scanner = null;
                alert('Failed tocreate barcodeReader ' + result.message)
            }
        }
    
        function onBarcodeDataReady (data, type, time){
    
                if (!scanOneState) {
                    scanOneData = data
                    scanOneState = true
                    scanInputOne.innerHTML = scanOneData
                } else if (scanOneState) {
                    scanTwoData = data
                    scanTwoState = true
                    scanInputTwo.innerHTML = scanTwoData
                    scanCompare(scanOneData, scanTwoData)
                }
        }
    }
    
    function zebraLogic(e) {
    
        if (e.keyCode != 13 && !scanOneState) {
            scanOneData += e.key
        } else if (e.keyCode = 13 && !scanOneState) {
            scanOneState = true
            scanInputOne.innerHTML = scanOneData
        } else if (e.keyCode != 13 && scanOneState) {
            scanTwoData += e.key
        } else if (e.keyCode = 13 && scanOneState) {
            scanTwoState = true
            scanInputTwo.innerHTML = scanTwoData
            scanCompare(scanOneData, scanTwoData)
        }
    }
    
    function scanCompare(scanOneData, scanTwoData) {
        if (scanOneData === scanTwoData) {
            setStyles('green', 'black', 'black', 'black')
            setTimeout(() => {
                resetState()
            }, 3000)
        } else if (scanOneData != scanTwoData) {
            setStyles('red', 'black', 'black', 'black')
            setTimeout(() => {
                resetState()
            }, 3000)
        }
    }
    
    function resetState() {
        setStyles('antiquewhite', '#7e766b', '#7e766b', '#ff6500')
        scanOneState = false
        scanTwoState = false
        scanOneData = ''
        scanTwoData = ''
        scanInputOne.innerHTML = ''
        scanInputTwo.innerHTML = ''
    }
    
    function setStyles(bodyBackgroundColor, scanOneTextColor, scanTwoTextColor, titleTextColor) {
        document.body.style.backgroundColor = bodyBackgroundColor
        document.getElementById('scan-one').style.color = scanOneTextColor
        document.getElementById('scan-two').style.color = scanTwoTextColor
        document.getElementById('title-text').style.color = titleTextColor
    }