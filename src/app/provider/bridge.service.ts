// import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { Platform } from '@ionic/angular';
import { LoggerService } from './logger.service';

declare var window: any;


@Injectable({
  providedIn: 'root'
})
export class BridgeService {

  data = { date:"", type:"", description:"", amount:0 };
  public dbName = 'plocker.sqlite';
  public versionDBName = 'versionDB.sqlite';
  db: any;
  versionDb: any;
  currentPlatform: any;
  fileName: any = 'Database';


  constructor(
    private sqlite: SQLite,
    private platform: Platform,
    private logger:LoggerService
  ) { 

   //this.initTableView();
  }

  initDB() {
    if (this.platform.is('cordova')) {
      this.db = this.sqlite.create({name: this.dbName,location: 'default'})
    } 
   return this.db;  
  }

   
  insertSyncLog(Start_Date) {
    this.sqlite.create({
      name: this.dbName,
      location: 'default'
    })
      .then((db: SQLiteObject) => {
    
    
        db.executeSql('create table danceMoves(name VARCHAR(32))', [])
          .then(() => alert('Executed SQL'))
          .catch(e => alert(e));
    
    
      })
      .catch(e => alert(e));
  };
}
