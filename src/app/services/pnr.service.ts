import { Injectable } from '@angular/core';

const PNRData = `
{
	"PNR": [{
			"pnrno": "12452512",
			"Name": "Anandu",
			"Flight": "Indigo",
			"locid": "111",
			"locname": "Check in Counter 1- Indigo"
		},
		{
			"pnrno": "13692512",
			"Name": "Ambady S",
			"Flight": "Air India",
			"locid": "120",
			"locname": "Check in Counter 2- Air India"
		},
		{
			"pnrno": "25692512",
			"Name": "Bibin Mathew",
			"Flight": "Indigo",
			"locid": "111",
			"locname": "Check in Counter 2 - Indigo "
		},
		{
			"pnrno": "89567512",
			"Name": "ANAND",
			"Flight": "GO Air",
			"locid": "112",
			"locname": "Check in Counter 3 – Go Air"
		},
		{
			"pnrno": "32456512",
			"Name": "JyothiSree",
			"Flight": "Indigo",
			"locid": "110",
			"locname": "Check in Counter 2 - Indigo"
		},
		{
			"pnrno": "11111111",
			"Name": "User",
			"Flight": "Indigo",
			"locid": "125",
			"locname": "Check in Counter 5 - Indigo"
		},
		{
			"pnrno": "25252525",
			"Name": "Test",
			"Flight": "TestFlight",
			"locid": "130",
			"locname": "Check in Counter 10 - TestFlight"
		},
		{
			"pnrno": "123456",
			"Name": "Test",
			"Flight": "TestFlight",
			"locid": "130",
			"locname": "Check in Counter 10 - TestFlight"
		}
	]
}
`;

interface IPNR {
  pnrno: string;
  Name: string;
  Flight: string;
  locid: string;
  locname: string;
}

@Injectable({
  providedIn: 'root',
})
export class PNRService {
  PNRList: Array<IPNR> = [];

  constructor() {
    this.PNRList = JSON.parse(PNRData).PNR;
  }

  findPNR(pnr: string): IPNR {
    return this.PNRList.find(x => x.pnrno === pnr);
  }
}
