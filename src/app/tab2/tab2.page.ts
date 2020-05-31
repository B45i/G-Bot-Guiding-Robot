import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';

import { BluetoothService } from '../services/bluetooth.service';
import { PNRService } from '../services/pnr.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page {
  pnrNumber = '';
  constructor(
    public bluetoothService: BluetoothService,
    public pnrService: PNRService,
    private alertController: AlertController
  ) {}

  findPNR() {
    const pnrData = this.pnrService.findPNR(this.pnrNumber);

    if (!pnrData) {
      alert(`PNR Number ${this.pnrNumber} not found`);
      return;
    }

    this.alertController
      .create({
        header: 'Navigate',
        message: `Do you want to naviagte to ${pnrData.locname} Mr.${pnrData.Name}?`,
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            handler: () => {
              console.log('Canceled');
            },
          },
          {
            text: 'Start Navigation',
            handler: () => {
              this.bluetoothService.sendData(pnrData.locid);
            },
          },
        ],
      })
      .then(alert => alert.present());
  }
}
