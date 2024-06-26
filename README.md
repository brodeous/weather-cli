# weather-cli

A CLI designed to retrieve weather data at a given location. This CLI uses the node runtime and will need to be installed prior to the installation of this application.

![terminal](https://raw.githubusercontent.com/brodeous/weather-cli/main/pics/terminal.png)

## Quick Set Up

### Installation
This CLI can be installed using the npm package manager
```
$ npm i -g @brodeous/weather-cli
```
\*\* Make sure the `-g` option is passed if you would like the CLI to be accessed from anywhere in the terminal.

### Configuration
Next you need to edit the config and add your api keys for the application to retrieve it's data.

First, lets create a config file.
```console
$ getwet config --init

[CONFIG] initialized
    \___ location: <home dir>/.config/getwet/getwet.conf
```

If you run the following command, you can see there are no api keys saved.
```console
$ getwet config --print

[CONFIG] print

Geolocation > 
Weather API > 
```
\*\* For full functionality, you will need both keys. If you do not want the ability to use your current location, we will only need the weather_api key.

You will need to go to these two websites and create an account
- [ipgeolocation.io](https://ipgeolocation.io/)
- [weatherapi.com](https://www.weatherapi.com/)

Once the accounts are made, you need to grab the keys

##### IP Geolocation
![geolocation](https://raw.githubusercontent.com/brodeous/weather-cli/main/pics/IPGeolocationAPI-DashBoard.png)

##### Weather API
![weatherapi](https://raw.githubusercontent.com/brodeous/weather-cli/main/pics/Dashboard-WeatherAPI.com.png)

To then add these keys to the CLI, you will want to run the following command in add them to the appropriate variable.
```console
$ getwet config --edit

[CONFIG] updated
```

Or if you like to work with the files themselves, you can manually change the variables at `$HOME/.config/getwet/getwet.conf`

If you run the list command again, you should now see the keys you just set.
```console
$ getwet config --print

[CONFIG] print

Geolocation > <geo key>
Weather API > <weather key>
```

## Usage
The CLI comes with a few options to retrieve the weather information for specific places.
```console
$ getwet --help
Usage: getwet [options] args

A CLI that retrieves current weather data for a specific location.
    > No option will return data based on current public ip.

Options:
  -V, --version              output the version number
  -c, --city <city>          specific city
  -z, --zipcode <zipcode>    specific zipcode
  -l, --lat_long <lat,long>  specific latitude and longitude
  -u, --uninstall            uninstall getwet
  -h, --help                 display help for command

Commands:
  config [options]           configure .conf file


Example:
    --city
        $ getwet -c Dallas
        $ getwet -c 'San Diego'
        $ getwet -c San_Diego
    --zipcode
        $ getwet -z 77007
    --lat_long
        $ getwet -l 39.76893679731222,-86.1639944813316
    --set-key
        $ getwet -s geolocation=<api key>
        $ getwet -s weatherapi=<api key>
```
