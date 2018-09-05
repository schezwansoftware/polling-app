export function formatDate(dateString){
    const date=new Date(dateString);

    const monthNames = [
        "January", "February", "March",
        "April", "May", "June", "July",
        "August", "September", "October",
        "November", "December"
      ];

    const month=date.getMonth();
    const year=date.getFullYear();
    const day=date.getDate();

    return `${day} ${monthNames[month]} , ${year}`;
}

