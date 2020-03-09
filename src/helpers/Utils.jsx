import React from 'react';

  export function notify(component, message, place, type){
    
    var options = {
      place: place,
      message: (
        <div>
          <div>
            {message}
          </div>
        </div>
      ),
      type: type,
      icon: "fas fa-exclamation-circle",
      closeButton: false,
      autoDismiss: 2
    };

    component.refs.notificationAlert.notificationAlert(options)
  }

  /**
   * Check if the user device is mobile or not
   */
  export function isMobile() {
    var check = false;
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)) {
      check = true;
    }
    return check;
  }

  /**
   * Download a json containing the data given as parameter, using the Client Browser.
   * 
   * @param {*} filename : Name of the file to download. 
   * @param {*} data : 
   */
  export function exportJson(filename, data) {
    var blob = new Blob([data], {type: 'application/json'});
    if(window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveBlob(blob, filename);
    }
    else{
        var elem = window.document.createElement('a');
        elem.href = window.URL.createObjectURL(blob);
        elem.download = filename;        
        document.body.appendChild(elem);
        elem.click();        
        document.body.removeChild(elem);
    }
}

export function exportCSV(headers, items, fileTitle) {
  
}