export function promoValidator(harga, promo, checkIn) {
    const day = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"]
    let total = harga;
    let isTrue = true;
    if (!promo) {
        return { total, isTrue }
    }
    if (promo.mulai != null && promo.sampai != null) {
        if (!(promo.mulai.getTime() <= checkIn.getTime() && promo.sampai.getTime() >= checkIn.getTime())) {
            isTrue = false;
            total = harga;
            return { total, isTrue }
        }
    }
    if (promo.day[day[checkIn.getDay()]]) {
        isTrue = true;
        if (promo.amount != null) {
            total = harga - promo.amount;
        }
        if (promo.percent != null) {
            total = harga - (harga * promo.percent / 100);
        }
        return { total, isTrue }
    }
    isTrue = false;
    total = harga;
    return { total, isTrue }
}