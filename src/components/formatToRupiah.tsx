export default function formatToRupiah(amount: number): string {
    return 'RP ' + amount?.toFixed(0)?.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }