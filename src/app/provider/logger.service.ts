import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { File } from '@ionic-native/file/ngx';
import * as moment from "moment";

declare var cordova: any;
@Injectable({
  providedIn: 'root'
})
export class LoggerService {
  fileName = "loggerProvider"
  hasCordova: any = false;
  prefix = "log_";
  suffix = ".log";

  constructor(public file: File, private platform: Platform) {
        if (this.platform.is('cordova')) {
            this.hasCordova = true;
        }}

        log(className, methodName, message) {
          let msg = moment().format("MM-DD-YYYY hh:mm:ss.SSSZ a") + ': ' + className.toUpperCase() + ' : ' + methodName + ' - ' + message + "\n";
          //  07/31/2018 Zohaib Khan:Moment is called to format the current date to MM-DD-YYYY to name the logger file as perticular date
          var currentDate = this.prefix + moment(new Date()).format("MM-DD-YYYY") + this.suffix;
          if (this.hasCordova) {
  
              //  07/31/2018 Zohaib Khan: Renamed the logger file with log_current date such as log_07-31-2018.log inside the Logs directory
  
              this.file.writeFile(this.file.dataDirectory, "logs/" + currentDate, msg, { replace: false, append: true })
                  .catch((err) => {
                      //console.log("Error while logging (First try...)", err);
                      this.file.writeFile(this.file.dataDirectory, "logs/" + currentDate, msg, { replace: false })
                          .catch((err) => {
                              //console.log("Writer is Busy...");
                              setTimeout(() => { this.log(className, methodName, message); }, 100);
                          });
                  });
          } else {
              console.log(msg);
          }
      }

      
    /**
     * 08/05/2018 Zohaib Khan
     * getting dates of last 15 days from current date and converting them to log file names
     */
    getLast15DaysLogFileNames() {
      var result = [];
      for (var i = 0; i < 15; i++) {
          var d = new Date();
          d.setDate(d.getDate() - i);
          result.push(this.prefix + moment(d).format("MM-DD-YYYY") + this.suffix)
      }

      return result;
  }
      
}
