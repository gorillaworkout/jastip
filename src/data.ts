export async function getOrder(id: string) {
  return (await getOrders()).find((order) => order.id.toString() === id)!
}

export async function getRecentOrders() {
  return (await getOrders()).slice(0, 10)
}

export async function getOrders() {
  return [
    {
      id: 3000,
      url: '/orders/3000',
      date: 'May 9, 2024',
      amount: {
        usd: '$80.00',
        cad: '$109.47',
        fee: '$3.28',
        net: '$106.19',
        rp: '1.000.000'
      },
      payment: {
        transactionId: 'ch_2HLf8DfYJ0Db7asfCC5T546TY',
        card: {
          number: '1254',
          type: 'American Express',
          expiry: '01 / 2025',
        },
      },
      customer: {
        name: 'Leslie Alexander',
        email: 'leslie.alexander@example.com',
        address: '123 Main St. Toronto, ON',
        country: 'Canada',
        countryFlagUrl: '/flags/ca.svg',
      },
      event: await getEvent('1000'),
    },
    {
      id: 3001,
      url: '/orders/3001',
      date: 'May 5, 2024',
      amount: {
        usd: '$299.00',
        cad: '$409.13',
        fee: '$12.27',
        net: '$396.86',
      },
      payment: {
        transactionId: 'ch_1KLf7AsYJ0Dda7fs3CC5d46TY',
        card: {
          number: '3897',
          type: 'Visa',
          expiry: '06 / 2024',
        },
      },
      customer: {
        name: 'Michael Foster',
        email: 'michael.foster@example.com',
        address: '357 Bridge St. New York, NY',
        country: 'USA',
        countryFlagUrl: '/flags/us.svg',
      },
      event: await getEvent('1000'),
    },
  ]
}

export async function getEvent(id: string) {
  return (await getEvents()).find((event) => event.id.toString() === id)!
}

export async function getEventOrders(id: string) {
  return (await getOrders()).filter((order) => order.event.id.toString() === id)
}

export async function getEvents() {
  return [
    {
      id: 1000,
      name: 'December Trip',
      url: '/events/1000',
      date: 'May 20, 2024',
      time: '10 PM',
      location: 'Harmony Theater, Winnipeg, MB',
      totalRevenue: '$102,552',
      totalRevenueChange: '+3.2%',
      ticketsAvailable: 500,
      ticketsSold: 350,
      ticketsSoldChange: '+8.1%',
      pageViews: '24,300',
      pageViewsChange: '-0.75%',
      status: 'On Sale',
      imgUrl: '/events/bear-hug.jpg',
      thumbUrl: '/events/bear-hug-thumb.jpg',
    },
    {
      id: 1001,
      name: 'January Trip',
      url: '/events/1001',
      date: 'Jun 2, 2024',
      time: '8 PM',
      location: 'Moonbeam Arena, Uxbridge, ON',
      totalRevenue: '$24,115',
      totalRevenueChange: '+3.2%',
      ticketsAvailable: 150,
      ticketsSold: 72,
      ticketsSoldChange: '+8.1%',
      pageViews: '57,544',
      pageViewsChange: '-2.5%',
      status: 'On Sale',
      imgUrl: '/events/six-fingers.jpg',
      thumbUrl: '/events/six-fingers-thumb.jpg',
    },
  ]
}

export function getCountries() {
  return [
    {
      name: 'Canada',
      code: 'CA',
      flagUrl: '/flags/ca.svg',
      regions: [
        'Alberta',
        'British Columbia',
        'Manitoba',
        'New Brunswick',
        'Newfoundland and Labrador',
        'Northwest Territories',
        'Nova Scotia',
        'Nunavut',
        'Ontario',
        'Prince Edward Island',
        'Quebec',
        'Saskatchewan',
        'Yukon',
      ],
    },
    {
      name: 'Mexico',
      code: 'MX',
      flagUrl: '/flags/mx.svg',
      regions: [
        'Aguascalientes',
        'Baja California',
        'Baja California Sur',
        'Campeche',
        'Chiapas',
        'Chihuahua',
        'Ciudad de Mexico',
        'Coahuila',
        'Colima',
        'Durango',
        'Guanajuato',
        'Guerrero',
        'Hidalgo',
        'Jalisco',
        'Mexico State',
        'Michoacán',
        'Morelos',
        'Nayarit',
        'Nuevo León',
        'Oaxaca',
        'Puebla',
        'Querétaro',
        'Quintana Roo',
        'San Luis Potosí',
        'Sinaloa',
        'Sonora',
        'Tabasco',
        'Tamaulipas',
        'Tlaxcala',
        'Veracruz',
        'Yucatán',
        'Zacatecas',
      ],
    },
    {
      name: 'United States',
      code: 'US',
      flagUrl: '/flags/us.svg',
      regions: [
        'Alabama',
        'Alaska',
        'American Samoa',
        'Arizona',
        'Arkansas',
        'California',
        'Colorado',
        'Connecticut',
        'Delaware',
        'Washington DC',
        'Micronesia',
        'Florida',
        'Georgia',
        'Guam',
        'Hawaii',
        'Idaho',
        'Illinois',
        'Indiana',
        'Iowa',
        'Kansas',
        'Kentucky',
        'Louisiana',
        'Maine',
        'Marshall Islands',
        'Maryland',
        'Massachusetts',
        'Michigan',
        'Minnesota',
        'Mississippi',
        'Missouri',
        'Montana',
        'Nebraska',
        'Nevada',
        'New Hampshire',
        'New Jersey',
        'New Mexico',
        'New York',
        'North Carolina',
        'North Dakota',
        'Northern Mariana Islands',
        'Ohio',
        'Oklahoma',
        'Oregon',
        'Palau',
        'Pennsylvania',
        'Puerto Rico',
        'Rhode Island',
        'South Carolina',
        'South Dakota',
        'Tennessee',
        'Texas',
        'Utah',
        'Vermont',
        'U.S. Virgin Islands',
        'Virginia',
        'Washington',
        'West Virginia',
        'Wisconsin',
        'Wyoming',
        'Armed Forces Americas',
        'Armed Forces Europe',
        'Armed Forces Pacific',
      ],
    },
  ]
}
