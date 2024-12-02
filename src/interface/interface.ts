export interface OrderData {
    id:string;
    name: string
    address: string
    phone: string
    receiveTime: string
    pricePerKg: number
    totalKg: number
    tripName: string
    detail:string
    uid: string
  }

  export interface TripData {
    id:string;
    tripName: string;
    tripWeight: string;
    tripRoute: string;
    tripDate: string;
  }
  