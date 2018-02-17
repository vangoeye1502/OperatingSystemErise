/* Magic Mirror Config Sample
 *
 * By Michael Teeuw http://michaelteeuw.nl
 * MIT Licensed.
 */

var config = {
	port: 8080,
	ipWhitelist: [],
    address: "0.0.0.0",
	language: 'nl',
	timeFormat: 24,
	units: 'metric',

	modules: [
		{
			module: 'alert',
		},
		/*{
			module: "updatenotification",
			position: "top_bar"
		},*/

    	{
			module: "updatenotification",
			position: "top_center",	// This can be any of the regions.
			config: {
				// The config property is optional.
				// See 'Configuration options' for more information.
			}
    	},


		{
			module: 'clock',
			position: 'top_left',
			config: {
				displayType: 'digital',
			}
		},
		/*{
			module: 'calendar',
			header: 'US Holidays',
			position: 'top_center',
			config: {
				calendars: [
					{
						symbol: 'calendar-check-o ',
						url: 'webcal://www.calendarlabs.com/templates/ical/US-Holidays.ics'
					}
				]
			}
		},*/
		/*{
			module: 'compliments',
			position: 'lower_third'
		},
		*/
		{
			module: 'currentweather',
			position: 'top_right',
			config: {
				location: 'Kruibeke',
				locationID: '2793940',  //ID from http://www.openweathermap.org
				appid: '7a67ca77de96af8bf88656128f0aed28'
			}
		},
		{
			module: 'weatherforecast',
			position: 'top_right',
			config: {
				location: 'Kruibeke',
				locationID: '2793940',  //ID from http://www.openweathermap.org
				appid: '7a67ca77de96af8bf88656128f0aed28'
			}
		},
		{
			module: 'newsfeed',
			position: 'bottom_bar',
			config: {
				feeds: [
					{
						title: "VRT NWS",
						url: "https://www.vrt.be/vrtnws/nl.rss.headlines.xml"
					}
				],
				showSourceTitle: true,
				showPublishDate: true
			}
		},
		/*{
			module: 'MMM-AlexaPi',
			position: 'lower_third'
		},*/
		/*{
			module: 'BuienRadar',
			position: 'top_center'
		},*/
        {
            module: "MMM-GoogleAssistant",
            position: "middle_center",
            config: {
                maxWidth: "100%",
                header: ""
            }
        },
		{
			module: 'MMM-Remote-Control',
			//position: 'top_center'
		},
        {
            module: 'MMM-Verkeersinfo',
            position: 'top_left',
            config: {
                apikey: 'AIzaSyA549HL_6YIE0Gvs6xusO6KUadumFqojhM',
                origin: 'Leo Heyrmanstraat 6, Kruibeke',
                startTime: '00:00',
                endTime: '23:59',
                hideDays: [0,6],
				showSummary: false,
                destinations: [
                    {
                        destination: 'Groenenborgerlaan, Antwerpen',
                        label: 'Werk',
                        mode: 'bicycling',
                        color: '#00BFA5'
                    },

                ]
            }
        }
	]

};

/*************** DO NOT EDIT THE LINE BELOW ***************/
if (typeof module !== 'undefined') {module.exports = config;}
