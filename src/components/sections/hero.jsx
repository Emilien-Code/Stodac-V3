import React from "react"
import Button from "../atoms/Button"
import "../../assets/styles/components/sections/hero.scss"
const Hero = ()=>{
    return(
        <section className="stodac-hero">
            <div className="text">
                <h1>Stodac.</h1>
                <p>Stodac vous accompagne dans l’achat de pièces détachées de poêle a granulés.</p>
                <Button type="link" content="Acceder à la boutique" color="green"/>
            </div>
            <div className="logo">
                <svg width="574" height="549" viewBox="0 0 574 549" fill="none" xmlns="http://www.w3.org/2000/svg" data-isparallax="true" data-rotate-speed="0.1">
                    <path d="M222.841 86.6463L176.245 109.554C78.9074 157.407 38.8293 275.033 86.7277 372.279C134.626 469.525 252.363 509.565 349.7 461.712L396.296 438.804C493.633 390.951 533.711 273.325 485.813 176.079C437.914 78.8334 320.178 38.793 222.841 86.6463Z" fill="#F9F9F9"/>
                    <path d="M277.522 315.267C277.522 312.126 277.054 309.321 276.118 306.858C275.182 304.312 273.482 301.975 271.017 299.852C268.552 297.729 265.067 295.607 260.561 293.481C256.055 291.275 250.147 289.024 242.836 286.73C234.505 284.012 226.556 280.955 218.99 277.558C211.509 274.076 204.836 270.041 198.97 265.455C193.104 260.869 188.471 255.518 185.07 249.403C181.755 243.288 180.097 236.153 180.097 228C180.097 220.101 181.84 212.967 185.325 206.597C188.811 200.227 193.699 194.792 199.99 190.29C206.281 185.704 213.677 182.222 222.178 179.844C230.679 177.38 240.031 176.149 250.232 176.149C263.834 176.149 275.778 178.569 286.064 183.411C296.437 188.167 304.513 194.876 310.291 203.539C316.075 212.118 318.964 222.097 318.964 233.478H277.647C277.647 228.467 276.586 224.051 274.461 220.228C272.421 216.322 269.275 213.264 265.024 211.056C260.858 208.848 255.63 207.744 249.339 207.744C243.218 207.744 238.075 208.678 233.91 210.547C229.829 212.33 226.726 214.793 224.601 217.935C222.561 221.078 221.54 224.518 221.54 228.255C221.54 231.227 222.306 233.945 223.836 236.408C225.451 238.786 227.746 241.037 230.722 243.16C233.782 245.199 237.523 247.152 241.943 249.021C246.364 250.889 251.422 252.673 257.118 254.371C267.064 257.514 275.862 260.996 283.515 264.818C291.249 268.64 297.753 272.973 303.025 277.813C308.295 282.654 312.247 288.133 314.883 294.248C317.604 300.363 318.964 307.282 318.964 315.012C318.964 323.252 317.348 330.555 314.119 336.926C310.972 343.294 306.382 348.729 300.346 353.233C294.396 357.649 287.255 361.003 278.923 363.297C270.592 365.591 261.284 366.738 250.997 366.738C241.646 366.738 232.422 365.547 223.326 363.169C214.229 360.707 205.983 356.97 198.587 351.958C191.276 346.946 185.41 340.576 180.99 332.849C176.654 325.035 174.486 315.778 174.486 305.076H216.057C216.057 310.68 216.865 315.436 218.48 319.344C220.095 323.165 222.391 326.266 225.366 328.645C228.427 331.023 232.124 332.721 236.46 333.74C240.796 334.76 245.641 335.268 250.997 335.268C257.203 335.268 262.219 334.42 266.044 332.721C269.955 330.938 272.845 328.517 274.714 325.459C276.586 322.402 277.522 319.004 277.522 315.267ZM343.575 345.332C343.575 339.559 345.616 334.716 349.696 330.811C353.861 326.902 359.258 324.948 365.891 324.948C372.607 324.948 377.964 326.902 381.957 330.811C386.038 334.716 388.078 339.559 388.078 345.332C388.078 351.023 386.038 355.823 381.957 359.728C377.964 363.636 372.607 365.591 365.891 365.591C359.258 365.591 353.861 363.636 349.696 359.728C345.616 355.823 343.575 351.023 343.575 345.332Z" fill="#D5D5D5"/>
                </svg>
            </div>
        </section>
    )
    
}
export default Hero