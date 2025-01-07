const Mapa = () => {
    return (

        <div className="mapaCont">
            <div><h1>NUESTRA UBICACIÓN</h1></div>
            <iframe
                src="https://maps.google.com/maps?q=fwd%20Costa%20Rica&amp;t=&amp;z=13&amp;ie=UTF8&amp;iwloc=&amp;output=embed" 
                width="600"
                height="450"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"

            ></iframe>
        </div>
    )
}
export default Mapa