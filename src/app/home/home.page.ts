import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { BridgeService } from '../provider/bridge.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(
    public navCtrl: NavController,
    public bridge: BridgeService) {}

  viewDetail(){
    this.bridge.insertSyncLog("okoko")
  }
}
