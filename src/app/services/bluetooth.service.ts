import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

import { BluetoothSerial } from '@ionic-native/bluetooth-serial/ngx';

interface IDevice {
  class: number;
  id: string;
  address: string;
  name: string;
}

@Injectable({
  providedIn: 'root',
})
export class BluetoothService {
  constructor(
    private bluetoothSerial: BluetoothSerial,
    private alertController: AlertController,
    private router: Router
  ) {
    this.checkBluetoothStatus();
    console.log(this.router);
  }

  devices: Array<IDevice> = [];
  isConnected = false;
  isLoading = false;

  selectedDevice: IDevice;

  getDevices() {
    this.bluetoothSerial.list().then(
      devices => (this.devices = devices),
      failure => this.showAlert('Enable bluetooth and Retry !')
    );
  }

  async selectDevice(device: IDevice) {
    const alert = await this.alertController.create({
      header: 'Connect',
      message: `Do you want to connect to ${device.name}?`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          },
        },
        {
          text: 'Connect',
          handler: () => {
            this.selectedDevice = device;
            this.isLoading = true;
            this.bluetoothSerial
              .connect(device.id)
              .subscribe(this.deviceConnected, err => {
                this.isLoading = false;
                this.selectDevice = undefined;
                this.showAlert(err);
              });
          },
        },
      ],
    });
    await alert.present();
  }

  public sendData() {
    if (!this.selectedDevice) {
      this.showAlert('No Device Selected');
      return;
    }
    this.bluetoothSerial.write('25').then(
      success => this.showAlert('Success', 'Success'),
      failure => this.showAlert('Transfer Failed')
    );
  }

  private checkBluetoothStatus() {
    this.bluetoothSerial.isEnabled().then(
      success => {
        this.getDevices();
      },
      error => {
        this.showAlert('Enable bluetooth and retry');
      }
    );
  }

  private showAlert(message: string, header = 'Error') {
    this.alertController
      .create({
        cssClass: 'my-custom-class',
        header,
        message,
        buttons: ['OK'],
      })
      .then(alert => alert.present());
  }

  private deviceConnected = () => {
    this.isConnected = true;
    this.isLoading = false;
    this.router.navigate(['tabs/tab2']);
  };
}
