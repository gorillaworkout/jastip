export interface OrderData {
    id:string;
    name: string
    address: string
    phone: string
    receiveTime: string
    pricePerKg: string
    totalKg: string
    tripName: string
  }

  export interface TripData {
    id:string;
    tripName: string;
    tripWeight: string;
    tripRoute: string;
  }
  