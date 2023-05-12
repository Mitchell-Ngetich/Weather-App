import Sunny from './Assets/Sunny.jpg';
import Cold from './Assets/cold.jpg';
import Description from './Components/Description/Description';
import { useEffect, useState } from 'react';
import { getWeatherData } from './Components/Weather/Weather';
import { FaCity } from 'react-icons/fa';


function App() {
	const [city, setCity] = useState("Paris")
	const [weather, setWeather] = useState(null);
	const [units, setUnits] = useState("metric");
	const [hot, setHot] = useState(Sunny);

	useEffect(() => {
		const fetchWeatherData = async () => {
			const data = await getWeatherData(city, units);
			setWeather(data);

			// dynamic background
			const background = units === "metric"? 20: 60;
			if (data.temp <= background) setHot(Cold);
			else setHot(Sunny);
		};
		fetchWeatherData();
		
	}, [units, city])

	const handleUnitsClick = (e) => {
		const button = e.currentTarget;
		const currentUnit = button.innerText.slice(1);
		const isCelsius = currentUnit === "C";
		button.innerText = isCelsius ? "°F" : "°C";
		setUnits(isCelsius? "metric" : "imperial")
	};

	const enterKeyPressed = (e) => {
		if (e.keyCode === 13) {
			setCity(e.currentTarget.value);
			e.currentTarget.blur();
		}
	}


  return (
		<div className="app" style={{ backgroundImage: `url(${hot})` }}>
			<div className="overlay">
				{weather && (
					<div className="container">
						<div className="section section__inputs">
							<input onKeyDown={enterKeyPressed}
								type="text"
								name="city"
								placeholder="Enter City..."></input>
							<button onClick={(e) => handleUnitsClick(e)}>°F</button>
						</div>

						<div className="section section__temperature">
							<div className="icon">
								<h3>{`${weather.name}, ${weather.country}`}</h3>
								<img
									src={weather.iconURL}
									alt="weatherIcon"
									className="image"
								/>
								<h3>{weather.description}</h3>
							</div>
							<div className="temperature">
								<h1>{`${weather.temp.toFixed()} °${
									units === "metric" ? "C" : "F"
								}`}</h1>
							</div>
						</div>

						{/* Descriptions */}
						<Description weather={weather} units={units} />
					</div>
				)}
			</div>
		</div>
	);
}

export default App;